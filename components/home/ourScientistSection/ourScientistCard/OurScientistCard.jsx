import Link from 'next/link'
import React from 'react'
import ReactImageFallback from 'react-image-fallback'

export default function OurScientistCard(props) {
    return (
        <div className='ourScientistCard'>
            <div className='ourScientistCard__imgCont'>
                <ReactImageFallback
                    src={props.scientist?.sheikhImage}
                    fallbackImage="/assets/fallbacks/person-fallback-image.png"
                    initialImage="/assets/fallbacks/person-fallback-image.png"
                    alt="صورة العالم"
                />
            </div>
            <div className='ourScientistCard__title'>{props.scientist?.sheikhName}</div>
            <div className='ourScientistCard__describtion'>{props.scientist?.description}</div>
            <Link href={`/sheikh/${props.scientist?.id}`}>
                <button className='baqiq-gold-btn '>المزيد</button>
            </Link>

        </div>
    )
}
