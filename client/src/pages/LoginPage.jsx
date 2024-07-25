import React, { useState } from 'react';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'components/AuthContext';
import { TextField } from '@mui/material';
import "styles/LoginPage.css";



const LoginPage = () => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login(mail, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleReturn = () => {
    navigate("/")
  }

  return (
    <div style={{flex:"1", display:"flex", width:"100vw", height:"100vh", justifyContent:"center", alignItems:"center"}}>
      <div className='loginContainer'>
        <h2>Giriş Yap</h2>

        <form onSubmit={handleSubmit} className='formContainer'>
          <div className='formElementContainer'>
            <TextField 
              required 
              label="Mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              sx={{
                '& .MuiInputBase-root': {
                  backgroundColor:"white", // Background color with transparency
                },
                '& .MuiInputBase-input': {
                  color: 'black', // Text color
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
                  backgroundColor:"white", // Background color with transparency
                },
                '& .MuiInputBase-input': {
                  color: 'black', // Text color
                },
              }}
              />
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='buttonContainer' style={{paddingTop:"1rem"}}>
            <Button text={"Giriş Yap"} buttonType='submit'/>
            <Button text={"Geri Dön"} clickAction={handleReturn}/>
          </div>
          
        </form>

      </div>

    </div>
  );
};

export default LoginPage;
