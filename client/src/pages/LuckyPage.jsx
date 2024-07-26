import React from 'react'
import axios from "axios"
import Card from 'components/Card'
import Button from 'components/Button'

import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'


const LuckyPage = () => {
  const {user} = useOutletContext()
  const [data, setData] = useState([])

  const fetchData = async () => {
    try{
      const url = `http://localhost:5000/api/feeling-lucky/${user.id}`
      const response = await axios.get(url)

      setData(response.data)
      console.log(response.data)
    }catch(error){

    }
  };

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div style={{ display:"flex", flex:"1", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"3rem"}}>
      <h2>Kendimi Şanslı Hissediyorum</h2>
      
      <div style={{ display:"flex", flexDirection:"row",gap:"5rem", justifyContent:"center"}}>
        {data.map((item, index) => (
          <Card key={index} content={item} />
        ))}
      </div>

      <Button text={"Yeni Öneri Yap"} clickAction={() => fetchData()}/>
    </div>

  )
}

export default LuckyPage;