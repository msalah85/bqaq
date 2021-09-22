import React from 'react'
import ElgaliaDetailsPage from '../../components/el-galiat/details/ElgaliaDetailsPage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'

export default function ElgaliaDetails() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <ElgaliaDetailsPage />
            </div>
        </div>
    )
}
