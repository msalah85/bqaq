import React from 'react'
import Breadcrumbs from '../../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../../reusable/shareWithSection/ShareWithSection'
import SearchSVG from '../../../public/assets/Search.svg'
import ReactImageFallback from 'react-image-fallback'

export default function BookSidebar(props) {

    return (
        <div className='bookSidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />
            <div className='bookSidebar__imgCont'>
                <ReactImageFallback
                    src={props.bookDetails?.coverUrl}
                    fallbackImage="/assets/fallbacks/open-book.svg"
                    initialImage="/assets/fallbacks/open-book.svg"
                    alt="غلاف الكتاب"
                />
            </div>
            <div className='bookSidebar__title'>{props.bookDetails?.bookName}</div>
            <div className='bookSidebar__subtitle'>{props.bookDetails?.author}</div>
            <div className='bookSidebar__graySubtitle'>{props.bookDetails?.languageName}</div>
            <div className='bookSidebar__graySubtitle'>{props.bookDetails?.isAvailable}</div>
            <div className='bookSidebar__greenSubtitle' >{props.bookDetails?.price}</div>

        </div>


    )
}
