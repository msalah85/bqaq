import Link from 'next/link';
import React from 'react'
import ReactImageFallback from "react-image-fallback";
import { Gallery, Item } from 'react-photoswipe-gallery';

export default function NewCard(props) {
    return (
        <div className='newCard'>
            <div className='newCard__imgCont'>
                <ReactImageFallback
                    src={props.url}
                    fallbackImage="assets/fallbacks/news-fallback-image.png"
                    initialImage="assets/fallbacks/news-fallback-image.png"
                    alt="صورة الخبر"
                />
                {/* <Gallery>
                    <Item
                        original={props.url}
                        thumbnail={props.url}
                        width="1024"
                        height="1024"
                    >
                        {({ ref, open }) => (
                            <img ref={ref} onClick={open} src={props.url} onError={e => { e.target.src = "/assets/fallbacks/news-fallback-image.png" }} />
                        )}
                    </Item>
                </Gallery> */}
            </div>
            <div className='newCard__title'>{props.title}</div>

            <div className='newCard__describtion'>{props.subtitle}</div>

            <Link href={`/media-center/news/${props.postId}`}>
                <button className='baqiq-gold-btn '>المزيد</button>
            </Link>

        </div>
    )
}
