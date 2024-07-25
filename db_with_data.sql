-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS entertainment;

-- Use the created database
USE entertainment;

-- Create tables
CREATE TABLE Kullanici (
    KullaniciID INT PRIMARY KEY,
    Ad VARCHAR(50),
    Soyad VARCHAR(50),
    Eposta VARCHAR(100),
    Cinsiyet VARCHAR(10),
    Email VARCHAR(100),
    Password VARCHAR(100),
    DogumTarihi DATE,
    Para INT -- Balance field added to Kullanici
);

CREATE TABLE Icerik (
    IcerikID INT PRIMARY KEY,
    IcerikAdi VARCHAR(200),
    Tur VARCHAR(50),
    Puan INT,
    SatinAlmaFiyati INT,
    KiralamaFiyati INT,
    YayinTarihi DATE
);

CREATE TABLE Kitap (
    KitapID INT PRIMARY KEY,
    Yazar VARCHAR(100),
    SayfaSayisi INT,
    FOREIGN KEY (KitapID) REFERENCES Icerik(IcerikID)
);

CREATE TABLE Film (
    FilmID INT PRIMARY KEY,
    Yoneten VARCHAR(100),
    FilmSuresi TIME,
    FOREIGN KEY (FilmID) REFERENCES Icerik(IcerikID)
);

CREATE TABLE Oyun (
    OyunID INT PRIMARY KEY,
    Gelistirici VARCHAR(100),
    Platform VARCHAR(50),
    FOREIGN KEY (OyunID) REFERENCES Icerik(IcerikID)
);

CREATE TABLE Odeme (
    OdemeID INT PRIMARY KEY,
    KartNo VARCHAR(16),
    CVC VARCHAR(3),
    Yil INT,
    Ay INT,
    Miktar INT
);

CREATE TABLE Kayit (
    KayitID INT PRIMARY KEY,
    KullaniciID INT,
    IcerikID INT,
    OdemeID INT,
    KayitTarihi DATE,
    FOREIGN KEY (KullaniciID) REFERENCES Kullanici(KullaniciID),
    FOREIGN KEY (IcerikID) REFERENCES Icerik(IcerikID),
    FOREIGN KEY (OdemeID) REFERENCES Odeme(OdemeID)
);

CREATE TABLE KiralamaKayit (
    KayitID INT PRIMARY KEY,
    KiralamaBitisTarihi DATE,
    FOREIGN KEY (KayitID) REFERENCES Kayit(KayitID)
);

CREATE TABLE SatinAlmaKayit (
    KayitID INT PRIMARY KEY,
    FOREIGN KEY (KayitID) REFERENCES Kayit(KayitID)
);

CREATE TABLE EngelKayit (
    KayitID INT PRIMARY KEY,
    FOREIGN KEY (KayitID) REFERENCES Kayit(KayitID)
);

CREATE TABLE IstekListesi (
    KullaniciID INT,
    IcerikID INT,
    PRIMARY KEY (KullaniciID, IcerikID),
    FOREIGN KEY (KullaniciID) REFERENCES Kullanici(KullaniciID),
    FOREIGN KEY (IcerikID) REFERENCES Icerik(IcerikID)
);

CREATE TABLE Incelemeler (
    KullaniciID INT,
    IcerikID INT,
    Puan INT,
    PRIMARY KEY (KullaniciID, IcerikID),
    FOREIGN KEY (KullaniciID) REFERENCES Kullanici(KullaniciID),
    FOREIGN KEY (IcerikID) REFERENCES Icerik(IcerikID)
);

-- Insert more data into Kullanici table
INSERT INTO Kullanici (KullaniciID, Ad, Soyad, Eposta, Cinsiyet, Email, Password, DogumTarihi, Para)
VALUES 
(1, 'Ahmet', 'Yılmaz', 'ahmet@email.com', 'Erkek', 'ahmet@email.com', 'password123', '1990-05-15', 100),
(2, 'Ayşe', 'Demir', 'ayse@email.com', 'Kadın', 'ayse@email.com', 'securepass', '1985-11-20', 150),
(3, 'Mehmet', 'Kaya', 'mehmet@email.com', 'Erkek', 'mehmet@email.com', 'mehmet123', '1995-03-10', 75),
(4, 'Fatma', 'Öztürk', 'fatma@email.com', 'Kadın', 'fatma@email.com', 'fatma456', '1988-07-22', 200),
(5, 'Ali', 'Çelik', 'ali@email.com', 'Erkek', 'ali@email.com', 'ali789', '1992-09-30', 125),
(6, 'Zeynep', 'Yıldız', 'zeynep@email.com', 'Kadın', 'zeynep@email.com', 'zeynep321', '1998-01-05', 90),
(7, 'Emre', 'Aksoy', 'emre@email.com', 'Erkek', 'emre@email.com', 'emre567', '1993-04-12', 180),
(8, 'Selin', 'Korkmaz', 'selin@email.com', 'Kadın', 'selin@email.com', 'selin890', '1997-08-25', 135),
(9, 'Burak', 'Şahin', 'burak@email.com', 'Erkek', 'burak@email.com', 'burak234', '1989-12-03', 220),
(10, 'Deniz', 'Aydın', 'deniz@email.com', 'Diğer', 'deniz@email.com', 'deniz678', '1994-06-18', 160);

-- Insert more data into Icerik table
INSERT INTO Icerik (IcerikID, IcerikAdi, Tur, Puan, SatinAlmaFiyati, KiralamaFiyati, YayinTarihi)
VALUES 
(1, 'Yüzüklerin Efendisi', 'Film', 9, 30, 5, '2001-12-19'),
(2, 'Harry Potter ve Felsefe Taşı', 'Kitap', 8, 25, 3, '1997-06-26'),
(3, 'The Witcher 3', 'Oyun', 10, 50, 10, '2015-05-18'),
(4, 'Inception', 'Film', 9, 28, 4, '2010-07-16'),
(5, '1984', 'Kitap', 9, 20, 2, '1949-06-08'),
(6, 'Red Dead Redemption 2', 'Oyun', 10, 60, 12, '2018-10-26'),
(7, 'The Shawshank Redemption', 'Film', 9, 25, 3, '1994-09-23'),
(8, 'To Kill a Mockingbird', 'Kitap', 8, 22, 2, '1960-07-11'),
(9, 'The Legend of Zelda: Breath of the Wild', 'Oyun', 10, 55, 11, '2017-03-03'),
(10, 'The Great Gatsby', 'Kitap', 8, 18, 2, '1925-04-10'),
(11, 'Forrest Gump', 'Film', 9, 27, 4, '1994-07-06'),
(12, 'Minecraft', 'Oyun', 9, 30, 6, '2011-11-18'),
(13, 'Interstellar', 'Film', 9, 29, 5, '2014-11-07'),
(14, 'The Catcher in the Rye', 'Kitap', 7, 16, 2, '1951-07-16'),
(15, 'Grand Theft Auto V', 'Oyun', 9, 45, 9, '2013-09-17');

-- Insert more data into Kitap table
INSERT INTO Kitap (KitapID, Yazar, SayfaSayisi)
VALUES 
(2, 'J.K. Rowling', 223),
(5, 'George Orwell', 328),
(8, 'Harper Lee', 281),
(10, 'F. Scott Fitzgerald', 180),
(14, 'J.D. Salinger', 234);

-- Insert more data into Film table
INSERT INTO Film (FilmID, Yoneten, FilmSuresi)
VALUES 
(1, 'Peter Jackson', '02:58:00'),
(4, 'Christopher Nolan', '02:28:00'),
(7, 'Frank Darabont', '02:22:00'),
(11, 'Robert Zemeckis', '02:22:00'),
(13, 'Christopher Nolan', '02:49:00');

-- Insert more data into Oyun table
INSERT INTO Oyun (OyunID, Gelistirici, Platform)
VALUES 
(3, 'CD Projekt Red', 'PC, PlayStation, Xbox'),
(6, 'Rockstar Games', 'PlayStation, Xbox'),
(9, 'Nintendo', 'Nintendo Switch'),
(12, 'Mojang Studios', 'PC, Console, Mobile'),
(15, 'Rockstar North', 'PC, PlayStation, Xbox');


-- Insert more data into Odeme table
INSERT INTO Odeme (OdemeID, KartNo, CVC, Yil, Ay, Miktar)
VALUES 
(1, '1234567890123456', '123', 2025, 12, 30),
(2, '9876543210987654', '456', 2024, 6, 25),
(3, '1111222233334444', '789', 2026, 3, 50),
(4, '5555666677778888', '321', 2025, 9, 28),
(5, '9999000011112222', '654', 2024, 11, 20),
(6, '3333444455556666', '987', 2026, 7, 60),
(7, '7777888899990000', '135', 2025, 8, 18),
(8, '2222333344445555', '246', 2024, 10, 27),
(9, '6666777788889999', '357', 2026, 5, 30),
(10, '1212343456567878', '468', 2025, 7, 29);

-- Insert more data into Kayit table
INSERT INTO Kayit (KayitID, KullaniciID, IcerikID, OdemeID, KayitTarihi)
VALUES 
(1, 1, 1, 1, '2023-07-01'),
(2, 2, 2, 2, '2023-07-02'),
(3, 3, 3, 3, '2023-07-03'),
(4, 4, 4, 4, '2023-07-04'),
(5, 5, 5, 5, '2023-07-05'),
(6, 6, 6, 6, '2023-07-06'),
(7, 1, 7, 1, '2023-07-07'),
(8, 2, 8, 2, '2023-07-08'),
(9, 3, 9, 3, '2023-07-09'),
(10, 7, 10, 7, '2023-07-10'),
(11, 8, 11, 8, '2023-07-11'),
(12, 9, 12, 9, '2023-07-12'),
(13, 10, 13, 10, '2023-07-13'),
(14, 7, 14, 7, '2023-07-14'),
(15, 8, 15, 8, '2023-07-15');

-- Insert more data into KiralamaKayit table
INSERT INTO KiralamaKayit (KayitID, KiralamaBitisTarihi)
VALUES 
(1, '2023-07-08'),
(4, '2023-07-11'),
(7, '2023-07-14'),
(10, '2023-07-17'),
(13, '2023-07-20');

-- Insert more data into SatinAlmaKayit table
INSERT INTO SatinAlmaKayit (KayitID)
VALUES 
(2),
(5),
(8),
(11),
(14);

-- Insert more data into EngelKayit table
INSERT INTO EngelKayit (KayitID)
VALUES 
(3),
(6),
(9),
(12),
(15);

-- Insert more data into IstekListesi table
INSERT INTO IstekListesi (KullaniciID, IcerikID)
VALUES 
(1, 2),
(2, 3),
(3, 1),
(4, 5),
(5, 6),
(6, 4),
(1, 8),
(2, 9),
(3, 7),
(7, 11),
(8, 12),
(9, 13),
(10, 14),
(7, 15),
(8, 10);

-- Insert more data into Incelemeler table
INSERT INTO Incelemeler (KullaniciID, IcerikID, Puan)
VALUES 
(1, 1, 9),
(2, 2, 8),
(3, 3, 10),
(4, 4, 9),
(5, 5, 9),
(6, 6, 10),
(1, 7, 9),
(2, 8, 8),
(3, 9, 10),
(7, 10, 8),
(8, 11, 9),
(9, 12, 9),
(10, 13, 9),
(7, 14, 7),
(8, 15, 9);