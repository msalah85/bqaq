import Head from 'next/head'
import React from 'react'
import titles_description from './titles_description.json'
export default function PageHeader({ index }) {
    return (
        <Head>
            <title>{titles_description.[index]?.title}</title>
            <meta name="description" content={titles_description.[index]?.desc} />

            {/* Open Graph / Facebook */}
            <meta property="og:title" content={titles_description.[index]?.title} />
            <meta property="og:description" content={titles_description.[index]?.desc} />

            {/* Twitter */}
            <meta property="twitter:title" content={titles_description.[index]?.title} />
            <meta property="twitter:description" content={titles_description.[index]?.desc} />
        </Head>
    )
}