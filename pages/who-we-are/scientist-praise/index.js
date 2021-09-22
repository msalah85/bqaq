import React from 'react'
import ScientistPraise from '../../../components/whoWeAre/scientistPraisePage/ScientistPraisePage'
import LogoBar from '../../../reusable/navbars/LogoBar'
import NavBar from '../../../reusable/navbars/NavBar'
import TabsBar from '../../../reusable/navbars/TabsBar'
import PageHeader from '../../../seo/PageHeader'

export default function Index() {
    return (
        <>

            <PageHeader index='praises' />

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

                <NavBar />
                <LogoBar />
                <TabsBar />

                <div style={{ flex: '1 1 auto' }}>
                    <ScientistPraise />
                </div>

            </div>
        </>
    )
}
