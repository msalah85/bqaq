import React from 'react'
import DashboardSideBar from '../../../components/dashboard/dashboarSideBar/DashboardSideBar'
import LogoBar from '../../../components/dashboard/logoBar/LogoBar'
import Sections from '../../../components/dashboard/sections/Sections'

export default function Index() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '0 1 auto' }}>
                <LogoBar />
            </div>

            <div style={{ flex: '1 1 auto', display: 'flex' }}>
                <div className='dashboard general-container'>
                    <DashboardSideBar />
                    <div className='dashboard__body'>

                        <Sections />

                    </div>
                </div>
            </div>
        </div>
    )
}
