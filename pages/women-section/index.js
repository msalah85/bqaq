import React from 'react'
import WomenSecPage from '../../components/womenSection/WomenSecPage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
export default function WomenSection() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            <NavBar />
            <LogoBar />
            <TabsBar />

            <div style={{ flex: '1 1 auto' }}>
                <WomenSecPage />
            </div>
        </div>
    )
}
