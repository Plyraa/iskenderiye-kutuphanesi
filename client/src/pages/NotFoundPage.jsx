import React from 'react'
import Button from 'components/Button'

import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      gap:"2rem"
    }}>
      <div>404! Not Found</div>
      <Button text={"Geri Dön"} clickAction={() => navigate("/dashboard")}/>
    </div>
    
  )
}

export default NotFoundPage;