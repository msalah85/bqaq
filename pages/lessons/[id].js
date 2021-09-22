import React from 'react'
import LessonDetailsPage from '../../components/lessonDetails/LessonDetailsPage'
import requester from '../../requester/requester'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import Head from 'next/head'

function LessonDetails(props) {
    return (
        <>

            <Head>
                <title>بقيق | {props?.lessonDetailsData?.title}</title>
                <meta name="description" content={props?.lessonDetailsData?.sheikhName} />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content={props?.lessonDetailsData?.title} />
                <meta property="og:description" content={props?.lessonDetailsData?.sheikhName} />

                {/* Twitter */}
                <meta property="twitter:title" content={props?.lessonDetailsData?.title} />
                <meta property="twitter:description" content={props?.lessonDetailsData?.sheikhName} />

            </Head>

            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <LessonDetailsPage lessonDetailsData={props.lessonDetailsData} />
                </div>
            </div>
        </>
    )
}
export async function getServerSideProps(context) {
    return await requester.get(`/lessons/get-details?lessonId=${context.params.id}`).then((res) => {
        return {
            props: { lessonDetailsData: res.data.model }, // will be passed to the page component as props
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

export default LessonDetails;