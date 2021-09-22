import React from 'react'
import WhoWeAre from '../../components/whoWeAre/whoWeArePage/WhoWeArePage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import PageHeader from '../../seo/PageHeader'

export default function Index() {
    return (
        <>
            <PageHeader index='whoWeAre' />

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                <NavBar />
                <LogoBar />
                <TabsBar />

                <div style={{ flex: '1 1 auto' }}>
                    <WhoWeAre />
                </div>

            </div>
        </>
    )
}
