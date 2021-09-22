import Head from 'next/head'
import React from 'react'
import ScientistPraiseDetails from '../../../components/whoWeAre/scientistPraisePage/scientistPraiseDetails/ScientistPraiseDetailsPage'
import requester from '../../../requester/requester'
import LogoBar from '../../../reusable/navbars/LogoBar'
import NavBar from '../../../reusable/navbars/NavBar'
import TabsBar from '../../../reusable/navbars/TabsBar'

function PraiseDetails(props) {
    return (
        <>
            <Head>
                <title>بقيق | {props?.scientistPraiseDetails?.title}</title>
                <meta name="description" content={props?.scientistPraiseDetails?.description} />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content={props?.scientistPraiseDetails?.title} />
                <meta property="og:description" content={props?.scientistPraiseDetails?.description} />
                <meta property="og:image" content={props.scientistPraiseDetails?.sheikhImage} />

                {/* Twitter */}
                <meta property="twitter:title" content={props?.scientistPraiseDetails?.title} />
                <meta property="twitter:description" content={props?.scientistPraiseDetails?.description} />
                <meta property="twitter:image" content={props.scientistPraiseDetails?.sheikhImage} />

            </Head>

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <ScientistPraiseDetails scientistPraiseDetails={props.scientistPraiseDetails} />
                </div>

            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    return await requester.get(`/praises/get-praise-details?praiseId=${context.params.id}`).then((res) => {
        return {
            props: { scientistPraiseDetails: res.data.model }, // will be passed to the page component as props
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

export default PraiseDetails;