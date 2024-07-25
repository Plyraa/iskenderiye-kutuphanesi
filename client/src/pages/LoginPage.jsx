import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'components/AuthContext';


import "styles/LoginPage.css";
import Button from 'components/Button';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login(username, password);
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
            <label style={{margin:"1%", fontWeight:"bold"}}>Kullanıcı Adı</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className='inputElement'
              placeholder='Kullanıcı Adı'
            />
          </div>

          <div className='formElementContainer'>
            <label style={{margin:"1%" , fontWeight:"bold"}}>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='inputElement'
              placeholder='Şifre'
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
