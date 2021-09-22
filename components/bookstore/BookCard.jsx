import React from 'react'
import ReactImageFallback from 'react-image-fallback'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function BookCard(props) {
    const router = useRouter();

    return (
        <div className='bookCard'>
            <div className='bookCard__rightSec'>
                <Link href={props.href} >

                    <a className='bookCard__rightSec__imgCont'>
                        <ReactImageFallback
                            src={props.book?.coverUrl}
                            fallbackImage="/assets/fallbacks/open-book.svg"
                            initialImage="/assets/fallbacks/open-book.svg"
                            alt="صورة الخبر"
                        />
                    </a>

                </Link>
                {props.book?.documentUrl && (
                    <a className='bookCard__rightSec__downloadSec' target='_blank' href={props.book?.documentUrl}>
                        <img src='/assets/Mask Group 63.svg' /><span>تحميل</span>
                    </a>
                )}
            </div>
            <Link href={props.href} >

                <a className='bookCard__leftSec'>
                    <div className='bookCard__leftSec__title'>{props.book?.bookName}</div>
                    <div className='bookCard__leftSec__subtitle'>{props.book?.author}</div>
                    <div className='bookCard__leftSec__graySubtitle'>{props.book?.languageName}</div>
                    {/* <div className='bookCard__leftSec__graySubtitle'>متوفر او غير متوفر</div> */}
                    <div className='bookCard__leftSec__greenSubtitle' >{props.book?.price} ريال</div>
                </a>
            </Link>

        </div>

    )
}
