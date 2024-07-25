import Button from 'components/Button'
import { useNavigate } from 'react-router-dom';


import viteLogo from '/vite.svg'
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

  return (
    <div className='main'>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://github.com/Plyraa/iskenderiye-kutuphanesi" target="_blank">
          <img src={githubLogo} className="logo" alt="Github logo" />
        </a>
      </div>
      <h1>İskenderiye Kütüphanesi</h1>
      <div className="card">
        <Button text={"Kayıt Ol"} clickAction={handleSignup}/>
        <Button text={"Admin Girişi"} clickAction={handleLogin}/>
      </div>
    </div>
  )
}

export default App;
