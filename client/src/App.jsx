import Button from 'components/Button'
import { useNavigate } from 'react-router-dom';
import githubLogo from "/github.svg"
import './App.css'

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login")
  }

  const handleSignup = () => {
    navigate("/register")
  }

  console.log("/App");

  return (
    <div className='main'>
      <div>
        <a href="https://github.com/Plyraa/iskenderiye-kutuphanesi" target="_blank">
          <img src={githubLogo} className="logo" alt="Github logo" />
        </a>
      </div>

      <h1>İskenderiye Kütüphanesi</h1>
      
      <div className="card">
        <Button text={"Kayıt Ol"} clickAction={handleSignup}/>
        <Button text={"Giriş Yap"} clickAction={handleLogin}/>
      </div>
    </div>
  )
}

export default App;
