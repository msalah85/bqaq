import React from 'react'
import DonnationSidebar from '../../components/donnation/DonnationSidebar'
import DonnationDetailsPage from '../../components/donnation/donnationType/DonnationDetails'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection'

export default function Index() {
    return (
        <>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div className=' general-container'>
                <DonnationDetailsPage />
            </div>
        </>
    )
}



