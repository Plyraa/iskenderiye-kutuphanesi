import mysql.connector
import os
import sys
import random

from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from datetime import date
from dateutil import relativedelta


load_dotenv("../.env")

app = Flask(__name__)
CORS(app)

db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME', 'entertainment'),
}

def get_db_connection():
    return mysql.connector.connect(**db_config)


#Helper for Getting All Available Contents At the DB
def get_all_available_content(user_id):
    try:  
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""SELECT 
            i.IcerikID,
            i.IcerikAdi,
            i.Tur,
            i.Puan,
            i.SatinAlmaFiyati,
            i.KiralamaFiyati,
            i.YayinTarihi
        FROM 
            Icerik i
        LEFT JOIN 
            Kayit ky ON ky.IcerikID = i.IcerikID AND ky.KullaniciID = %s
        LEFT JOIN 
            EngelKayit ek ON ek.KayitID = ky.KayitID
        LEFT JOIN 
            KiralamaKayit kk ON kk.KayitID = ky.KayitID
        LEFT JOIN 
            SatinAlmaKayit sak ON sak.KayitID = ky.KayitID
        WHERE 
            ky.KayitID IS NULL
            AND ek.KayitID IS NULL
            AND kk.KayitID IS NULL
            AND sak.KayitID IS NULL
        ORDER BY 
            i.IcerikAdi;
        """,(user_id,))
        
        content = cursor.fetchall()

        for item in content:
            item['YayinTarihi'] = item['YayinTarihi'].strftime('%d/%m/%Y')

        cursor.close()
        conn.close()

        print(type(content))
        return content
    except Exception as e:
        print(e)
        return []

#Helper for Getting User History
def get_watch_history(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT 
				i.IcerikID,
                i.IcerikAdi,
                ky.KayitTarihi,
                kk.KiralamaBitisTarihi,
                i.tur,
                CASE 
                    WHEN kk.KayitID IS NOT NULL THEN i.KiralamaFiyati
                    WHEN sak.KayitID IS NOT NULL THEN i.SatinAlmaFiyati
                    ELSE NULL
                END AS Fiyat
            FROM 
                Icerik i
            JOIN 
                Kayit ky ON i.IcerikID = ky.IcerikID
            LEFT JOIN 
                KiralamaKayit kk ON ky.KayitID = kk.KayitID
            LEFT JOIN 
                SatinAlmaKayit sak ON ky.KayitID = sak.KayitID
            WHERE 
                ky.KullaniciID = %s
            ORDER BY 
                i.IcerikAdi;
        """, (user_id,))
        
        history = cursor.fetchall()

        for item in history:
            item['KayitTarihi'] = item['KayitTarihi'].strftime('%d/%m/%Y')

            if item['KiralamaBitisTarihi'] is not None:
                item['KiralamaBitisTarihi'] = item['KiralamaBitisTarihi'].strftime('%d/%m/%Y')
        
        cursor.close()
        conn.close()
        
        return history
    except Exception as e:
        print(f"Error fetching watch history: {e}", file=sys.stderr)
        return []

#Helper for Getting All Content At the DB
def get_content():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT * FROM icerik;
        """)
        
        content = cursor.fetchall()
        
        for item in content:
            item['YayinTarihi'] = item['YayinTarihi'].strftime('%d/%m/%Y')

        cursor.close()
        conn.close()
        
        return content
    except Exception as e:
        print(f"Error fetching watch history: {e}", file=sys.stderr)
        return []





#For Buying Content
@app.route('/api/buy', methods=['POST'])
def buy_content():
    try:
        userId = request.json.get('userId')
        contentId = request.json.get('contentId')
        today = date.today()
        
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        conn.start_transaction()
        
        # Retrieve the OdemeID using the userId
        cursor.execute("""
            SELECT OdemeID FROM Odeme WHERE KullaniciID = %s
        """, (userId,))
        odeme = cursor.fetchone()
        
        if not odeme:
            return jsonify({'success': False, 'message': 'Ödeme bilgisi bulunamadı'}), 404
        
        odemeID = odeme['OdemeID']
        
        cursor.execute("""
            INSERT INTO Kayit (KullaniciID, IcerikID, OdemeID, KayitTarihi)
            VALUES 
            (%s, %s, %s, %s); 
        """,(userId, contentId, odemeID, today))

        kayitID = cursor.lastrowid

        cursor.execute("""
            INSERT INTO satinalmakayit
            VALUES 
            (%s); 
        """,(kayitID,))
        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401
    
    return jsonify({'success': True, 'message': 'İşlem Tamamlandı'}), 200
    
@app.route('/api/block', methods=['POST'])
def block_content():
    userId = request.json.get('userId')
    contentId = request.json.get('contentId')
    today = date.today()

    if not userId or not contentId:
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401

    try:
        with get_db_connection() as conn:
            with conn.cursor(dictionary=True) as cursor:
                conn.start_transaction()

                cursor.execute("""
                    INSERT INTO Kayit (KullaniciID, IcerikID, KayitTarihi)
                    VALUES (%s, %s, %s); 
                """, (userId, contentId, today))

                kayitID = cursor.lastrowid

                cursor.execute("""
                    INSERT INTO engelkayit
                    VALUES (%s); 
                """, (kayitID,))

                conn.commit()

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401

    return jsonify({'success': True, 'message': 'İşlem Tamamlandı'}), 200


#For Renting Content
@app.route('/api/rent', methods=['POST'])
def rent_content():
    try:
        userId = request.json.get('userId')
        contentId = request.json.get('contentId')
        today = date.today()
        endDate = today + relativedelta.relativedelta(months=1)

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        conn.start_transaction()
        cursor.execute("""
            INSERT INTO Kayit (KullaniciID, IcerikID, OdemeID, KayitTarihi)
            VALUES 
            (%s, %s, %s, %s); 
        """,(userId, contentId, 5, today))

        kayitID = cursor.lastrowid

        cursor.execute("""
            INSERT INTO kiralamakayit (KayitID, KiralamaBitisTarihi)
            VALUES 
            (%s, %s); 
        """,(kayitID,endDate))
        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401
    
    return jsonify({'success': True, 'message': 'İşlem Tamamlandı'}), 200




#For Wishlist Page
@app.route('/api/get-wishlist/<int:user_id>', methods=['GET'])
def get_wishlist(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT KullaniciID, IcerikAdi, Tur, Puan, IcerikID FROM isteklistesi natural join icerik WHERE KullaniciID=%s
        """,(user_id,))
        
        wishlist = cursor.fetchall()

        cursor.close()
        conn.close()
        
        return wishlist
    except Exception as e:
        print(f"Error fetching watch history: {e}", file=sys.stderr)
        return []

#To Remove From Wishlist
@app.route('/api/update-wishlist', methods=['POST'])
def remove_content_from_wishlist():
    try:
        userId = request.json.get('userId')
        contentId = request.json.get('contentId')

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            DELETE FROM isteklistesi WHERE KullaniciID=%s AND IcerikID=%s; 
        """,(userId, contentId))

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401
    
    return jsonify({'success': True, 'message': 'İşlem Tamamlandı'}), 200


#For Adding to Wishlist
@app.route('/api/add-wishlist', methods=['POST'])
def add_content_to_wishlist():
    try:
        userId = request.json.get('userId')
        contentId = request.json.get('contentId')

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            INSERT INTO isteklistesi (KullaniciID, IcerikID)
            VALUES 
            (%s, %s); 
        """,(userId, contentId))

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401
    
    return jsonify({'success': True, 'message': 'İşlem Tamamlandı'}), 200


#For Getting Reviews
@app.route('/api/get-reviews/<int:user_id>', methods=['GET'])
def get_reviews(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("""
            SELECT inc.IcerikID, ky.IcerikAdi, ky.Tur, inc.Puan FROM incelemeler AS inc JOIN icerik AS ky ON ky.IcerikID = inc.IcerikID WHERE inc.KullaniciID=%s;
        """,(user_id,))
        
        reviews = cursor.fetchall()

        cursor.close()
        conn.close()
        
        return reviews
    except Exception as e:
        print(f"Error fetching watch history: {e}", file=sys.stderr)
        return []
    

#For Adding New Reviews
@app.route('/api/submit-review', methods=['POST'])
def add_review():
    try:
        userId = request.json.get('userId')
        contentId = request.json.get('contentId')
        score = request.json.get('score')


        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            INSERT INTO incelemeler (KullaniciID, IcerikID, Puan)
            VALUES 
            (%s, %s, %s); 
        """,(userId, contentId, score))

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401
    
    return jsonify({'success': True, 'message': 'İşlem Tamamlandı'}), 200

#For Removing Reviews
@app.route('/api/remove-review', methods=['POST'])
def remove_review():
    try:
        userId = request.json.get('userId')
        contentId = request.json.get('contentId')

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            DELETE FROM incelemeler WHERE KullaniciID=%s AND IcerikID=%s; 
        """,(userId, contentId))

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401
    
    return jsonify({'success': True, 'message': 'İşlem Tamamlandı'}), 200




#For Register Page
@app.route('/api/register', methods=['POST'])
def register():
    try:  
        email = request.json.get('email')
        password = request.json.get('password')
        date = request.json.get('date')
        gender = request.json.get('gender')
        name = request.json.get('name')
        surname = request.json.get('surname')

        gender_a = date
        date_a = datetime.fromisoformat(gender.replace('Z', '+00:00')).strftime('%Y-%m-%d')

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            INSERT INTO Kullanici (Ad, Soyad, Cinsiyet, Email, Password, DogumTarihi)
            VALUES 
            (%s,%s,%s,%s,%s,%s)
        """,(name, surname, gender_a, email, password, date_a))

        conn.commit()

        cursor.close()
        conn.close()

    except Exception as e:
        print(e)
        return jsonify({'success': False, 'message': 'Eksik/Yanlış Veri'}), 401
    
    return jsonify({'success': True, 'message': 'Kayıt Tamamlandı'}), 200


#For Login Page
@app.route('/api/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM Kullanici WHERE Email = %s", (email,))
    user = cursor.fetchone()
    
    cursor.close()
    conn.close()

    if user:
        if password == user['Password']:
            return jsonify({
                'success': True,
                'user': {
                    'id': user['KullaniciID'],
                    'email': user['Email'],
                    'name': f"{user['Ad']} {user['Soyad']}"
                }
            })
    
    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401



@app.route('/api/buyrent/<int:user_id>', methods=['GET'])
def buy_rent_list(user_id):
    buy_rent = get_all_available_content(user_id)
    return jsonify(buy_rent)

@app.route('/api/watch-history/<int:user_id>', methods=['GET'])
def watch_history(user_id):
    history = get_watch_history(user_id)
    return jsonify(history)

@app.route('/api/content', methods=['GET'])
def all_contents():
    contents = get_content()
    return jsonify(contents)


@app.route('/api/feeling-lucky/<int:user_id>', methods=['GET'])
def feeling_lucky(user_id):
    get_all_possible_content = get_all_available_content(user_id)

    recommendations = random.sample(get_all_possible_content, 3)

    if recommendations:
        return jsonify(recommendations)
    else:
        return jsonify({'message': 'No recommendations available'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=int(os.getenv('PORT', 5000)))
