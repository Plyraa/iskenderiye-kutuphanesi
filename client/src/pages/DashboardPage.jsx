import React from 'react'
import { useAuth } from 'components/AuthContext';
import LogoutButton from 'components/LogoutButton';

const DashboardPage = () => {
    return (
        <>
            <div>DashboardPage</div>
            
            <LogoutButton/>
        </>
        
    )
}

export default DashboardPage