import React from 'react'


const Button = ({text, clickAction, buttonType="button"}) => {

  return (
    <button style={{
      backgroundColor:"#a688fa", 
      width:"150px", 
      height:"50px", 
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:"50px"}}
      type={buttonType}
      onClick={clickAction}    
    >
      {text}
    </button>
  )
}

export default Button