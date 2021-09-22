import React from 'react'
import SuspicionsResponsesPage from '../../../../components/anti-terrorism/informationalCenter/suspicionsResponses/SuspicionsResponsesPage'
import LogoBar from '../../../../reusable/navbars/LogoBar'
import NavBar from '../../../../reusable/navbars/NavBar'
import TabsBar from '../../../../reusable/navbars/TabsBar'

export default function Index() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <SuspicionsResponsesPage />
            </div>
        </div>
    )
}
