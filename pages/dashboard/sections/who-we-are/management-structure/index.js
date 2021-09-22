import React from 'react'
import DashboardSideBar from '../../../../../components/dashboard/dashboarSideBar/DashboardSideBar'
import LogoBar from '../../../../../components/dashboard/logoBar/LogoBar'
import ManagementStructureDashBaord from '../../../../../components/dashboard/sections/whoWeAre/managementStructure/ManagementStructureDashboard'
import SideBar from '../../../../../components/dashboard/sections/whoWeAre/SideBar'


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

                            <ManagementStructureDashBaord />

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
