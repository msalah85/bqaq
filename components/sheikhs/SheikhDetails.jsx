import React from 'react'
import ReactImageFallback from 'react-image-fallback';
import Link from 'next/link'

export default function SheikhDetails(props) {
    console.log(props);
    return (
        <div className='sheikhDetails fade-in'>
            <div className='sheikhDetails__rightSec'>
                <ReactImageFallback
                    src={props.sheikhDetails?.avatarUrl}
                    fallbackImage="/assets/fallbacks/Admin Avatar.svg"
                    initialImage="/assets/fallbacks/Admin Avatar.svg"
                    alt="صورة الخبر"
                    style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
            </div>
            <div className='sheikhDetails__leftSec'>
                <div className='sheikhDetails__leftSec__title'>{props.sheikhDetails?.name}</div>
                <div className='sheikhDetails__leftSec__desc three-lines'>{props.sheikhDetails?.bio}</div>
                <div className='sheikhDetails__leftSec__buttons'>
                    <Link
                        // href='/who-we-are/scientist-praise/123'
                        href={{
                            pathname: '/sheikh-details/[id]',
                            query: { id: props.sheikhDetails?.id },
                        }}
                    >
                        <a className='baqiq-gold-btn'>ترجمة الشيخ</a>
                    </Link>
                    {/* <Link
                        // href='/who-we-are/scientist-praise/123'
                        href={`/sheikh-tutorials/123/all-tutorials`}
                    >
                        <a className='baqiq-gold-btn'>مواد الشيخ</a>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}
