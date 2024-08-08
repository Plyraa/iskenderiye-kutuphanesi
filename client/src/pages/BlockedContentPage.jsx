import React from 'react'
import axios from "axios"

import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Space, Table, notification, message } from 'antd'

import "styles/ContentsPage.css"

const BlockedContentPage = () => {
  const { user } = useOutletContext()
  const { Column } = Table

  const [blocked, setBlocked] = useState([])
  const [sortInfo, setSortInfo] = useState({ columnKey: null, order: null })

  const fetchData = async () => {
    try{
      const url = `http://localhost:5000/api/get-block/${user.id}`
      const response = await axios.get(url)

      if (response.status === 200) {
        setBlocked(response.data)
      }
    }catch (error){
      console.error('Login error:', error)
    }
  }

  const handleRemoval = async(record) => {
    try{
      const url = `http://localhost:5000/api/remove-block`
      const response = await axios.post(url,{ userId: user.id, contentId: record.IcerikID })

      showNotification('success', `${record.IcerikAdi} Engel Listesinden Çıkarıldı!`)
      fetchData()
    }catch (error){
      showNotification('error', `${record.IcerikAdi} Çıkarılırken Hata Oluştu!`)
      console.error('Login error:', error)
    }
  }
  
  const handleTableChange = (pagination, filters, sorter) => {
    setSortInfo(sorter)
  };

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
    <h2>Engellenen İçerikler</h2>

    <Table dataSource={blocked} className="customTable" onChange={handleTableChange}>
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

      <Column title="İşlem" key="action" render={(_, record) => (
        <Space size="middle">
          <a onClick={() => handleRemoval(record)}>Engel Listesinden Çıkar</a>
        </Space>
        )}
      />
    </Table>
  </div>
  )
}

export default BlockedContentPage;