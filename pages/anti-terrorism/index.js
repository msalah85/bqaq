import React from 'react'
import Head from 'next/head'
import OrganizationEffortsPage from '../../components/anti-terrorism/organizationEfforts/OrganizationEffortsPage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import titles_description from '../../seo/titles_description.json';

export default function Index() {
    return (
        <>

            <Head>
                <title>بقيق | مركز  مكافحة الإرهاب</title>
            </Head>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <OrganizationEffortsPage />
                </div>
            </div>
        </>
    )
}
