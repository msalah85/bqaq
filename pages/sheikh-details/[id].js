import React from 'react'
import SheikhDetailsPage from '../../components/sheikhDetails/SheikhDetailsPage'
import requester from '../../requester/requester'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import Head from 'next/head'

function SheikhDetails(props) {
    return (
        <>
            <Head>
                <title>بقيق | {props.sheikhDetails?.name}</title>
                <meta name="description" content={props.sheikhDetails?.bio} />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content={props.sheikhDetails?.name} />
                <meta property="og:description" content={props.sheikhDetails?.bio} />
                <meta property="og:image" content={props.sheikhDetails?.avatarUrl} />

                {/* Twitter */}
                <meta property="twitter:title" content={props.sheikhDetails?.name} />
                <meta property="twitter:description" content={props.sheikhDetails?.bio} />
                <meta property="og:image" content={props.sheikhDetails?.avatarUrl} />

            </Head>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <SheikhDetailsPage sheikhDetails={props.sheikhDetails} />
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    return await requester.get(`/lessons/sheikh/get-single?sheikhId=${context.params.id}`).then((res) => {
        return {
            props: { sheikhDetails: res.data.model }, // will be passed to the page component as props
        }
    }).catch(() => {
        return {
            redirect: {
                destination: '/404',
                permanent: false,
            },
        }
    });
}

export default SheikhDetails;