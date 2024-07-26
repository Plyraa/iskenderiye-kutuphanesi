import React from 'react'
import axios from "axios"

import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Space, Table, notification, message } from 'antd'

import "styles/ContentsPage.css"

const WishlistPage = () => {
  const { user } = useOutletContext()
  const { Column } = Table

  const [history, setHistory] = useState([])
  const [sortInfo, setSortInfo] = useState({ columnKey: null, order: null })

  const fetchData = async () => {
    try{
      const url = `http://localhost:5000/api/get-wishlist/${user.id}`
      const response = await axios.get(url)

      if (response.status === 200) {
        setHistory(response.data)
      }
    }catch (error){
      console.error('Login error:', error)
    }
  } 

  const handleTableChange = (pagination, filters, sorter) => {
    setSortInfo(sorter)
  };

  const handleRemoval = async(record) => {
    try{
      const url = `http://localhost:5000/api/update-wishlist`
      const response = await axios.post(url,{ userId: user.id, contentId: record.IcerikID })

      showNotification('success', `${record.IcerikAdi} İstek Listesinden Çıkarıldı!`)
      fetchData()
    }catch (error){
      showNotification('error', `${record.IcerikAdi} Çıkarılırken Hata Oluştu!`)
      console.error('Login error:', error)
    }
  }

  const showNotification = (type, description) => {
    notification[type]({
      message: 'İşlem Sonucu',
      description: description,
      placement: 'topRight',
      duration: 3,
    });
  }

  useEffect(() => {
    fetchData()
  },[])

  return (
    <div className='contentPageLayout'>
    <h2>İstek Listesi</h2>

    <Table dataSource={history} className="customTable" onChange={handleTableChange}>
      <Column title="İçerik Adı" dataIndex="IcerikAdi" key="IcerikAdi" sorter={{
          compare: (a, b) => a.IcerikAdi.localeCompare(b.IcerikAdi),
        }} sortOrder={ sortInfo.columnKey === 'IcerikAdi' && sortInfo.order }
      />

      <Column title="İçerik ID" dataIndex="IcerikID" key="IcerikID" sorter={{
          compare: (a, b) => a.IcerikID - b.IcerikID,
          multiple: 3,
        }} sortOrder={ sortInfo.columnKey === 'IcerikID' && sortInfo.order }
      />

      <Column title="Tür" dataIndex="Tur" key="Tur" sorter={{
          compare: (a, b) => a.Tur.localeCompare(b.Tur),
        }} sortOrder={ sortInfo.columnKey === 'Tur' && sortInfo.order }
      />

      <Column title="Puan" key="Puan" dataIndex="Puan"/>

      <Column title="İşlem" key="action" render={(_, record) => (
        <Space size="middle">
          <a onClick={() => handleRemoval(record)}>İstek Listesinden Çıkar</a>
        </Space>
        )}
      />
    </Table>
  </div>
  )
}

export default WishlistPage;