import React from 'react'
import DashboardMainPage from '../../components/dashboard/dashboardMainPage/DashboardMainPage'
import LogoBar from '../../components/dashboard/logoBar/LogoBar'

export default function index() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '0 1 auto' }}>
                <LogoBar />
            </div>
            <div style={{ flex: '1 1 auto', display: 'flex' }}>
                <DashboardMainPage />
            </div>
        </div>

    )
}
