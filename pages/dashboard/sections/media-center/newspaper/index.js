import React from 'react'
import DashboardSideBar from '../../../../../components/dashboard/dashboarSideBar/DashboardSideBar'
import LogoBar from '../../../../../components/dashboard/logoBar/LogoBar'
import SideBar from '../../../../../components/dashboard/sections/mediaCenter/SideBar'
import NewspaperDashboard from '../../../../../components/dashboard/sections/mediaCenter/newspaper/Newspaper'


export default function Index() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: '0 1 auto' }}>
                <LogoBar />
            </div>
            <div style={{ flex: '1 1 auto', display: 'flex' }}>
                <div className='dashboard general-container'>
                    <DashboardSideBar />

                    <div style={{ display: 'flex' }}>

                        <SideBar />

                        <div className='dashboard__whoWeAre-body'>

                            <NewspaperDashboard />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
