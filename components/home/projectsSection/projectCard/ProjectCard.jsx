import Link from 'next/link'
import React from 'react'
import ReactImageFallback from 'react-image-fallback'
import ReactPlayer from 'react-player'

export default function ProjectCard(props) {
    return (
        <Link href={`/our-projects/${props.id}`}>
            <a>
                <div className='projectCard'>
                    <div className='projectCard__imgCont'>
                        <ReactImageFallback
                            src={props.cover && props.cover[0]}
                            fallbackImage="/assets/Baqiq-Logo.svg"
                            initialImage="/assets/fallbacks/project-fallback-image.png"
                            alt="صورة المشروع"
                        />
                    </div>
                    <div className='projectCard__projectDetails'>
                        <div className='projectCard__projectDetails__title'>{props.name}</div>
                        <div className='projectCard__projectDetails__description'>{props.desc}</div>
                    </div>
                </div>

            </a>
        </Link >

    )

}
