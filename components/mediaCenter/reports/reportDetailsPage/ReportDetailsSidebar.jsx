import React from 'react'
import Breadcrumbs from '../../../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../../../reusable/shareWithSection/ShareWithSection'
import ReactImageFallback from 'react-image-fallback'

export default function ReportDetailsSidebar(props) {
    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='bookSidebar__imgCont'>
                <ReactImageFallback
                    src={props.postDetails?.coverUrl}
                    fallbackImage="/assets/fallbacks/open-book.svg"
                    initialImage="/assets/fallbacks/open-book.svg"
                    alt="غلاف الكتاب"
                />
            </div>

        </div>

    )
}
