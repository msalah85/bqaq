import React from 'react'
import BookPage from '../../components/bookstore/bookDetails/BookPage'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import Head from 'next/head'
import requester from '../../requester/requester'

function Book_Details(props) {
    return (
        <>
            <Head>
                <title>بقيق | {props?.bookDetailsData?.bookName}</title>
                <meta name="description" content={props?.bookDetailsData?.author} />

                {/* Open Graph / Facebook */}
                <meta property="og:title" content={props?.bookDetailsData?.bookName} />
                <meta property="og:description" content={props?.bookDetailsData?.author} />
                <meta property="og:image" content={props.bookDetailsData?.coverUrl} />

                {/* Twitter */}
                <meta property="twitter:title" content={props?.lessonDetailsData?.bookName} />
                <meta property="twitter:description" content={props?.bookDetailsData?.author} />
                <meta property="og:image" content={props.bookDetailsData?.coverUrl} />

            </Head>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <NavBar />
                <LogoBar />
                <TabsBar />
                <div style={{ flex: '1 1 auto' }}>
                    <BookPage bookDetailsData={props.bookDetailsData} />
                </div>
            </div>
        </>
    )
}
export async function getServerSideProps(context) {
    return await requester.get(`/books/get-details?bookId=${context.params.id}`).then((res) => {
        return {
            props: { bookDetailsData: res.data.model }, // will be passed to the page component as props
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

export default Book_Details;