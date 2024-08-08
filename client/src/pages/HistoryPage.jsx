import React from 'react'
import axios from "axios"
import Button from 'components/Button'


import { useOutletContext } from 'react-router-dom'
import { Table, Select, notification } from 'antd'
import { useEffect, useState } from 'react'

import "styles/ContentsPage.css"

const { Option } = Select;

const HistoryPage = () => {
  const { user } = useOutletContext()
  const { Column } = Table

  const [points, setPoints] = useState({})
  const [history, setHistory] = useState([])
  const [sortInfo, setSortInfo] = useState({ columnKey: null, order: null })
  const [expandedRowKeys, setExpandedRowKeys] = useState([])


  const fetchData = async () => {
    try {
      const url = `http://localhost:5000/api/watch-history/${user.id}`
      const response = await axios.get(url)

      if (response.status === 200) {
        setHistory(response.data)
      }
    } catch (error) {
      console.error('Fetch error:', error)
    }
  };

  const handleConfirm = async (contentId) => {
    const score = points[contentId]

    if (score) {
      try {
        const response = await axios.post(`http://localhost:5000/api/submit-review`, {
          userId: user.id,
          contentId,
          score,
        })

        showNotification('success', `İnceleme Başarılı!`)
        if (response.status === 200) {
          console.log('Score submitted successfully')
        }
      } catch (error) {
        showNotification('error', `Aynı anda en fazla bir inceleme olabilir! Puan verebilmek için önceki incelemeyi kaldırın.`)
        console.error('Error submitting score:', error)
      }
    } else {
      console.log('No score selected')
    }
  };

  
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

  const expandedRowRender = (record) => {
    return (
      <div style={{display:"flex", gap:"2rem", justifyContent:"flex-start",alignItems:"center"}}>
        {
          record.KiralamaBitisTarihi ? ( <p>İşlem Türü: Kiralama</p>) : (
            <p>İşlem Türü: Satın Alma</p>)
        }
        <p>İnceleme Puanı:</p>
        <Select
          placeholder="Puan"
          style={{ width: 200 }}
          onChange={(value) => handleScoreChange(record.IcerikID, value)}
        >
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="6">6</Option>
          <Option value="7">7</Option>
          <Option value="8">8</Option>
          <Option value="9">9</Option>
          <Option value="10">10</Option>
        </Select>

        <Button text={"Puan Ver"} clickAction={() => handleConfirm(record.IcerikID)}/>
      </div>
    );
  };


  const handleScoreChange = (contentId, value) => {
    setPoints(prev => ({
      ...prev,
      [contentId]: value,
    }));
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setSortInfo(sorter)
  };

  const onExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.IcerikID] : [])
  };

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <div className='contentPageLayout'>
      <h2>İşlem Geçmişi</h2>
      <Table
        dataSource={history}
        className="customTable"
        onChange={handleTableChange}
        expandedRowRender={expandedRowRender}
        rowKey="IcerikID"
        expandedRowKeys={expandedRowKeys}
        onExpand={onExpand}
      >
        <Column title="İçerik Adı" dataIndex="IcerikAdi" key="IcerikAdi" sorter={{
            compare: (a, b) => a.IcerikAdi.localeCompare(b.IcerikAdi),
          }} sortOrder={sortInfo.columnKey === 'IcerikAdi' && sortInfo.order}
        />

        <Column title="İçerik ID" dataIndex="IcerikID" key="IcerikID" sorter={{
            compare: (a, b) => a.IcerikID - b.IcerikID,
            multiple: 3,
          }} sortOrder={sortInfo.columnKey === 'IcerikID' && sortInfo.order}
        />

        <Column title="Fiyat (TL)" key="Fiyat" dataIndex="Fiyat" />
        
        <Column title="Başlangıç Tarihi" key="KayitTarihi" dataIndex="KayitTarihi" />
        <Column title="Bitiş Tarihi" key="KiralamaBitisTarihi" dataIndex="KiralamaBitisTarihi" />
      </Table>
    </div>
  );
}

export default HistoryPage;
