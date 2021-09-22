import React, { useState } from 'react'
import DashboardSideBar from '../dashboarSideBar/DashboardSideBar'
import HomeDashboard from '../../dashboard/home/Home'
export default function DashboardMainPage() {
    const [caseToShow, setCaseToShow] = useState('sections')
    return (
        <div className='dashboard general-container'>
            <DashboardSideBar />
            <div className='dashboard__body'>

                <HomeDashboard />
            </div>
        </div>
    )
}
