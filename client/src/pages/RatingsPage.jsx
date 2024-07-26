import React from 'react'
import axios from "axios"

import { Table, Space, notification, message } from 'antd'
import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'

import "styles/ContentsPage.css"

const RatingsPage = () => {
  const { user } = useOutletContext()
  const { Column } = Table

  const [reviews, setReviews] = useState([])
  const [sortInfo, setSortInfo] = useState({ columnKey: null, order: null })


  const fetchData = async () => {
    try{
      const url = `http://localhost:5000/api/get-reviews/${user.id}`
      const response = await axios.get(url)

      if (response.status === 200) {
        console.log(true)
        setReviews(response.data)
      }
    }catch (error){
      console.error('Error:', error)
    }
  } 

  const handleReviewRemoval = async (record) => {
    try{
      const url = `http://localhost:5000/api/remove-review`

      const response = await axios.post(url, {
        userId: user.id,
        contentId: record.IcerikID,
      });

      showNotification('success', `İnceleme Kaldırıldı!`);
      fetchData()
    }catch (error){
      showNotification('error', `Beklenmedik Bir Hata Gerçekleşti!`);
      console.error('Error:', error)
    }
  }

  const showNotification = (type, description) => {
    let message = ''
  
    switch(type) {
      case 'success':
        message = 'İşlem Başarılı';
        break;
      case 'error':
        message = 'İşlem Başarısız';
        break;
      default:
        message = 'Bilgi';
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
      <h2>İncelemeler</h2>

      <Table dataSource={reviews} className="customTable" onChange={handleTableChange}>
        <Column title="İçerik Adı" dataIndex="IcerikAdi" key="IcerikAdi" sorter={{
            compare: (a, b) => a.IcerikAdi.localeCompare(b.IcerikAdi),
          }} sortOrder={ sortInfo.columnKey === 'IcerikAdi' && sortInfo.order }
        />

        <Column title="İçerik ID" dataIndex="IcerikID" key="IcerikID" sorter={{
            compare: (a, b) => a.IcerikID - b.IcerikID,
            multiple: 3,
          }} sortOrder={ sortInfo.columnKey === 'IcerikID' && sortInfo.order }
        />

        <Column title="Kullanıcı Puanı" dataIndex="Puan" key="Puan" sorter={{
            compare: (a, b) => a.Puan - b.Puan,
            multiple: 3,
          }} sortOrder={ sortInfo.columnKey === 'Puan' && sortInfo.order }
        />

        <Column title="Tür" dataIndex="Tur" key="Tur" sorter={{
            compare: (a, b) => a.Tur.localeCompare(b.Tur),
          }} sortOrder={ sortInfo.columnKey === 'Tur' && sortInfo.order }
        />

        <Column title="İşlem" key="action" render={(_, record) => (
          <Space size="middle">
            <a onClick={() => handleReviewRemoval(record)}>İncelemeyi Kaldır</a>
          </Space>
          )}
        />

      </Table>
    </div>
  )
}

export default RatingsPage;