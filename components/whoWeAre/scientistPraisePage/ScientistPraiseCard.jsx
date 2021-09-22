import React from 'react'
import Link from 'next/link'
import ReactImageFallback from 'react-image-fallback'

export default function ScientistPraiseCard(props) {
    return (
        <div className='scientistPraiseCard'>
            <div className='scientistPraiseCard__rightSec' style={props.dashboardCard && { width: '10rem', height: '10rem' }}>
                <ReactImageFallback
                    src={props.data.sheikhImage}
                    fallbackImage="/assets/fallbacks/Admin Avatar.svg"
                    initialImage="/assets/fallbacks/Admin Avatar.svg"
                    alt="صورة الخبر"
                />
            </div>
            <div className='scientistPraiseCard__leftSec'>
                <div className='scientistPraiseCard__leftSec__title'>{props.data.title}</div>
                <div className='scientistPraiseCard__leftSec__desc three-lines'>{props.data.description}</div>
                {!props.dashboardCard && <Link
                    // href='/who-we-are/scientist-praise/123'
                    href={{
                        pathname: '/who-we-are/scientist-praise/[id]',
                        query: { id: props.data.id },
                    }}
                >
                    <a className='baqiq-gold-btn'>المزيد</a>
                </Link>}

                {/* <button className='baqiq-gold-btn'>المزيد</button> */}
            </div>

        </div>
    )
}
