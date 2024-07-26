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
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")  
  const [password, setPassword] = useState('')
  const [mail, setMail] = useState("")
  const [date, setDate] = useState();
  const [gender, setGender] = useState("")


  const { login } = useAuth();
  const navigate = useNavigate();

  const register = async (mail, password, name, surname, date, gender) => {
    try {
      const url = 'http://localhost:5000/api/register'
      const response = await axios.post(url, {
        email: mail,
        password: password,
        name: name,
        gender: gender,
        surname: surname,
        date: date,
      })

      if (response.data.success) {
        return true;
      } else { return false; }
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault()

    const registerSuccess = await register(mail, password, name, surname, gender, date)

    if (registerSuccess) {
      const loginSuccess = await login(mail, password)

      if(loginSuccess){
        showNotification('success', `Kullanıcı Kaydı Oluşturuldu! Hoşgeldin ${name} ${surname}`)
        navigate('/dashboard')
      }
    } else {
      showNotification('error', `Beklenmedik Bir Hata Gerçekleşti!`)
      setError('Geçersiz kullanıcı adı veya şifre')
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


  const handleReturn = () => { navigate("/") }

  return (
    <div style={{flex:"1", display:"flex", width:"100vw", height:"100vh", justifyContent:"center", alignItems:"center"}}>
      <div className='signupContainer'>
        <h2>Kayıt Ol</h2>

        <form onSubmit={handleSubmit} className='formContainer'>
          <div className='formElementContainer'>
            <TextField 
              required 
              label="Ad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor:"white",
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                }
              }}
              />
          </div>

          <div className='formElementContainer'>
            <TextField 
              required 
              label="Soyad"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor:"white",
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                }
              }}
              />
          </div>

          <div className='formElementContainer'>
            <TextField 
              required 
              label="Mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor:"white",
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                }
              }}
              />
          </div>

          <div className='formElementContainer'>
            <TextField 
              required 
              label="Şifre" 
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor:"white",
                },
                '& .MuiInputBase-input': {
                  color: 'black',
                },
              }}
              />
          </div>

          <div className='formElementContainer'>
            <DatePicker value={date} onChange={(e) => setDate(e)}/>
          </div>

          <div style={{backgroundColor:"white", borderRadius:"25px", width:"15rem", display:"flex", flexDirection:"row",justifyContent:"space-around", alignItems:"flex-start"}}>
            <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
              <Radio value={"Erkek"}>Erkek</Radio>
              <Radio value={"Kadın"}>Kadın</Radio>
            </Radio.Group>
          </div>


          <div className='buttonContainer' style={{paddingTop:"1rem"}}>
            <Button text={"Kayıt Ol"} buttonType='submit'/>
            <Button text={"Geri Dön"} clickAction={handleReturn}/>
          </div>
          
        </form>

      </div>

    </div>
  );
};

export default SignupPage;
