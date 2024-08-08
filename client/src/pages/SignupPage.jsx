import React from 'react'
import Button from 'components/Button'
import axios from "axios"

import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'components/AuthContext'
import { TextField } from '@mui/material'
import { DatePicker, Radio,notification } from 'antd'


import "styles/SignupPage.css"

const SignupPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState("");
  const [date, setDate] = useState(null);
  const [gender, setGender] = useState("");
  const [kartno, setKartno] = useState("");
  const [cvc, setCvc] = useState("");
  const [yil, setYil] = useState("");
  const [ay, setAy] = useState("");


  const { login } = useAuth();
  const navigate = useNavigate();

  const register = async (mail, password, name, surname, date, gender) => {
    try {
      const url = 'http://localhost:5000/api/register'
      const response = await axios.post(url, {
        email: mail,
        password: password,
        name: name,
        surname: surname,
        date: date,
        gender: gender,
        kartno: kartno,
        cvc: cvc,
        yil: yil,
        ay: ay,
      });

      if (response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerSuccess = await register(mail, password, name, surname, date, gender, kartno, cvc, yil, ay);

    if (registerSuccess) {
      const loginSuccess = await login(mail, password);

      if (loginSuccess) {
        showNotification('success', `Kullanıcı Kaydı Oluşturuldu! Hoşgeldin ${name} ${surname}`);
        navigate('/dashboard');
      }
    } else {
      showNotification('error', `Beklenmedik Bir Hata Gerçekleşti!`);
      setError('Geçersiz kullanıcı adı veya şifre');
    }
  };

  const showNotification = (type, description) => {
    let message = ''
  
    switch(type) {
      case 'success':
        message = 'İşlem Başarılı'
        break;
      case 'error':
        message = 'İşlem Başarısız'
        break;
      default:
        message = 'Bilgi'
    }
  
    notification[type]({
      message: message,
      description: description,
      placement: 'topRight',
      duration: 3,
    });
  }

  const handleReturn = () => { navigate("/") };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center", overflowY: "auto"}}>
      <div className='signupContainer' style={{ backgroundColor: "#333", padding: "2rem", borderRadius: "10px", width: "90%", maxWidth: "600px", height: "90vh", overflowY: "auto" }}>
        <h2 style={{ textAlign: "center", color: "white" }}>Kayıt Ol</h2>

        <form onSubmit={handleSubmit} className='formContainer' style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            required 
            label="Ad"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: "white",
              },
              '& .MuiInputBase-input': {
                color: 'black',
              }
            }}
          />

          <TextField
            required
            label="Soyad"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: "white",
              },
              '& .MuiInputBase-input': {
                color: 'black',
              }
            }}
          />

          <TextField
            required
            label="Mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: "white",
              },
              '& .MuiInputBase-input': {
                color: 'black',
              }
            }}
          />

          <TextField
            required
            label="Şifre"
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: "white",
              },
              '& .MuiInputBase-input': {
                color: 'black',
              }
            }}
          />

          <DatePicker
            value={date}
            onChange={(e) => setDate(e)}
            sx={{
              width: '100%',
              '& .MuiInputBase-root': {
                backgroundColor: "white",
              },
              '& .MuiInputBase-input': {
                color: 'black',
              }
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-around", backgroundColor: "white", borderRadius: "25px", padding: "0.5rem" }}>
            <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
              <Radio value={"Erkek"}>Erkek</Radio>
              <Radio value={"Kadın"}>Kadın</Radio>
            </Radio.Group>
          </div>

          <TextField
            required
            label="Kart No"
            value={kartno}
            onChange={(e) => setKartno(e.target.value)}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: "white",
              },
              '& .MuiInputBase-input': {
                color: 'black',
              }
            }}
          />

          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
            <TextField
              required
              label="CVC"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              sx={{
                flex: 1,
                '& .MuiInputBase-root': {
                  backgroundColor: "white",
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                }
              }}
            />

            <TextField
              required
              label="Yıl"
              value={yil}
              onChange={(e) => setYil(e.target.value)}
              sx={{
                flex: 1,
                '& .MuiInputBase-root': {
                  backgroundColor: "white",
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                }
              }}
            />

            <TextField
              required
              label="Ay"
              value={ay}
              onChange={(e) => setAy(e.target.value)}
              sx={{
                flex: 1,
                '& .MuiInputBase-root': {
                  backgroundColor: "white",
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                }
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: "4rem" }}>
            <Button text={"Kayıt Ol"} buttonType='submit' />
            <Button text={"Geri Dön"} clickAction={handleReturn} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;