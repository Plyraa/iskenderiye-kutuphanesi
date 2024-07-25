import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'components/AuthContext';


import "styles/SignupPage.css";
import Button from 'components/Button';

const SignupPage = () => {
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mail, setMail] = useState("")

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
      setError('Geçersiz kullanıcı adı veya şifre');
    }
  };

  const handleReturn = () => {
    navigate("/")
  }

  return (
    <div style={{flex:"1", display:"flex", width:"100vw", height:"100vh", justifyContent:"center", alignItems:"center"}}>
      <div className='signupContainer'>
        <h2>Kayıt Ol</h2>

        <form onSubmit={handleSubmit} className='formContainer'>
            <div className='formElementContainer'>
            <label style={{margin:"1%", fontWeight:"bold"}}>Ad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='inputElement'
              placeholder='Ad'
            />
          </div>

          <div className='formElementContainer'>
            <label style={{margin:"1%" , fontWeight:"bold"}}>Soyad</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className='inputElement'
              placeholder='Soyad'
            />
          </div>

          <div className='formElementContainer'>
            <label style={{margin:"1%" , fontWeight:"bold"}}>Email</label>
            <input
              type="text"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              className='inputElement'
              placeholder='Mail'
            />
          </div>


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
            <Button text={"Kayıt Ol"} buttonType='submit'/>
            <Button text={"Geri Dön"} clickAction={handleReturn}/>
          </div>
          
        </form>

      </div>

    </div>
  );
};

export default SignupPage;
