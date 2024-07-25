import React from 'react'


const NavbarElement = ({text, clickAction}) => {
  return (
    <button style={{
        backgroundColor:"#3f3f3f", 
        width:"18rem", 
        height:"3rem", 
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"50px",
    }}
        onClick={clickAction}    
    >
        {text}
    </button>
  )
}

export default NavbarElement