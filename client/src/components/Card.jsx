import React from 'react'
import { useState, useEffect } from 'react'


import 'styles/Card.css'

const Card = ({content}) => {
    const [text, setText] = useState({})

    useEffect(() => {
        setText(content)
    },[content])

    return (
        <div className='CardLayout'>
            <div className='CardContainer'>
                <h4>{text.IcerikAdi}</h4>
                <p>İçerik ID: {text.IcerikID}</p>
                <p>Tür: {text.Tur}</p>
                <p>Puanı: {text.Puan}</p>
                <p>Satın Alma Fiyatı: {text.SatinAlmaFiyati} TL</p>
                <p>Kiralama Fiyatı: {text.KiralamaFiyati} TL</p>
                <p>Yayın Tarihi: {text.YayinTarihi}</p>
            </div>
        </div>
    )
}

export default Card;