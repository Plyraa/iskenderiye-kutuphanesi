import React from 'react'
import axios from "axios"

import { Table, Space, notification } from 'antd'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'


import "styles/ContentsPage.css"

const BuyRentPage = () => {
  const { user } = useOutletContext()
  const { Column } = Table

  const [contents, setContents] = useState([])
  const [sortInfo, setSortInfo] = useState({ columnKey: null, order: null })


  const fetchData = async () => {
    try{
      const url = `http://localhost:5000/api/buyrent/${user.id}`
      const response = await axios.get(url)

      if (response.status === 200) {
        setContents(response.data)
      }
    }catch (error){
      console.error('Error:', error)
    }
  } 

  const handleBuy = async (record) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/buy`, { userId: user.id, contentId: record.IcerikID })

      showNotification('success', `${record.IcerikAdi} Adlı Ürünü Başarılı Bir Şekilde Aldınız`)
      fetchData()
    } catch (error) {
      console.error('Error:', error)
    }
  };

  const handleRent = async (record) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/rent`, { userId: user.id, contentId: record.IcerikID })

      showNotification('success', `${record.IcerikAdi} Adlı Ürünü Başarılı Bir Şekilde Kiraladınız`)
      fetchData()
    } catch (error) {
      console.error('Error:', error)
    }
  };

  const showNotification = (type, description) => {
    let message = ''
  
    switch(type) {
      case 'success':
        message = 'İşlem Başarılı'
        break;
      case 'error':
        message = 'İşlem Başarısız'
        break;
      default:
        message = 'Bilgi'
    }
  
    notification[type]({
      message: message,
      description: description,
      placement: 'topRight',
      duration: 3,
    });
  };
  
  const handleTableChange = (pagination, filters, sorter) => {
    setSortInfo(sorter)
  };


  useEffect(() => {
    fetchData()
  },[]);

  return (
    <div className='contentPageLayout'>
      <h2>Kullanıcının Alabileceği İçerikler</h2>

      <Table dataSource={contents} className="customTable" onChange={handleTableChange}>
        <Column title="İçerik Adı" dataIndex="IcerikAdi" key="IcerikAdi" sorter={{
            compare: (a, b) => a.IcerikAdi.localeCompare(b.IcerikAdi),
          }} sortOrder={ sortInfo.columnKey === 'IcerikAdi' && sortInfo.order }
        />
        
        <Column title="İçerik ID" dataIndex="IcerikID" key="IcerikID" sorter={{
            compare: (a, b) => a.IcerikID - b.IcerikID,
            multiple: 3,
          }} sortOrder={ sortInfo.columnKey === 'IcerikID' && sortInfo.order }
        />

        <Column title="Kiralama Fiyatı(TL)" dataIndex="KiralamaFiyati" key="KiralamaFiyati" sorter={{
            compare: (a, b) => a.KiralamaFiyati - b.KiralamaFiyati,
            multiple: 3,
          }} sortOrder={ sortInfo.columnKey === 'KiralamaFiyati' && sortInfo.order }
        />

        <Column title="SatinAlmaFiyati(TL)" dataIndex="SatinAlmaFiyati" key="SatinAlmaFiyati" sorter={{
            compare: (a, b) => a.SatinAlmaFiyati - b.SatinAlmaFiyati,
            multiple: 3,
          }} sortOrder={ sortInfo.columnKey === 'SatinAlmaFiyati' && sortInfo.order }
        />

        <Column title="Puan" dataIndex="Puan" key="Puan" sorter={{
            compare: (a, b) => a.Puan - b.Puan,
            multiple: 3,
          }} sortOrder={ sortInfo.columnKey === 'Puan' && sortInfo.order }
        />

        <Column title="Tür" dataIndex="Tur" key="Tur" sorter={{
            compare: (a, b) => a.Tur.localeCompare(b.Tur),
          }}sortOrder={ sortInfo.columnKey === 'Tur' && sortInfo.order }
        />

        <Column title="Yayın Tarihi" dataIndex="YayinTarihi" key="YayinTarihi" />

        <Column title="İşlem" key="action" render={(_, record) => (
          <Space size="middle">
            <a onClick={() => handleBuy(record)}>Satın Al</a>
            <a onClick={() => handleRent(record)}>Kirala</a>
          </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default BuyRentPage;