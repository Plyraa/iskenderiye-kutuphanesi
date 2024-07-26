import React from 'react'
import LogoutButton from 'components/LogoutButton'
import NavbarElement from 'components/NavbarElement'

import { useAuth } from 'components/AuthContext'
import { useNavigate, Outlet } from 'react-router-dom'

import "styles/DashboardPage.css"

const DashboardPage = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    return (
        <div className='DashboardLayout'>
            <div className="AdminNavbarLayout">
                <div className='infoHeader'>
                    <p> İskenderiye Kütüphanesi </p>
                    <p> Mevcut Kullanıcı: {user.name} </p>
                </div>

                <div className='AdminNavbarContainer'>
                    <NavbarElement text={"İçerikler"} clickAction={() => navigate("content")}/>
                    <NavbarElement text={"Kirala/Satın Al"} clickAction={() => navigate("buy-rent")}/>
                    <NavbarElement text={"Kullanıcı Geçmişi"} clickAction={() => navigate("history")}/>
                    <NavbarElement text={"İstek Listesi"} clickAction={() => navigate("wishlist")}/>
                    <NavbarElement text={"İncelemeler"} clickAction={() => navigate("ratings")}/>
                    <NavbarElement text={"Kendimi Şanslı Hissediyorum"} clickAction={() => navigate("lucky")}/>
                    <LogoutButton/>
                </div>

            </div>
            <div className="mainLayout">
                <div className="mainContainer">
                    <Outlet context={{user}}/>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;