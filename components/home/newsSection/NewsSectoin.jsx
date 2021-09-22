import Link from 'next/link'
import React from 'react'
import NewCard from './newCard/NewCard'

export default function NewsSectoin(props) {
    return (
        <div className='general-container news'>
            <div className='news__title'>
                <div>الأخبار</div>
                <Link href='/media-center/news'>
                    <a className='news__title__moreBtn'>
                        المزيد
                    </a>
                </Link>
                {/* <div >المزيد</div> */}
            </div>
            <div className='news__container'>
                {
                    props.news?.slice(0, 4).map((news, index) => {
                        return (
                            <NewCard url={news.coverUrl} title={news.title} subtitle={news.subtitle} postId={news.postId} />
                        )
                    })
                }

            </div>
        </div>
    )
}
