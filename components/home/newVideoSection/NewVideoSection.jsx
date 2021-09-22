import Link from 'next/link'
import React from 'react'
import ReactPlayer from 'react-player'
import NewVideoCard from './newVideoCard/NewVideoCard'

export default function NewVideoSection(props) {
    return (
        <div className='general-container newVideoSection'>

            <div className='newVideoSection__title'>

                <div>جديد المرئيات</div>

                <Link href='/videos'>
                    <a className='newVideoSection__title__moreBtn'>
                        المزيد
                    </a>
                </Link>

            </div>

            <div className='newVideoSection__newVideoContainer'>

                {
                    props.videos?.slice(0, 4).map(video => {
                        return <NewVideoCard video={video} />
                    })
                }

            </div>

        </div>
    )
}
