import React from 'react'
import ReactImageFallback from 'react-image-fallback'
import Breadcrumbs from '../../../../reusable/breadcrumbs/Breadcrumbs'
import ShareWithSection from '../../../../reusable/shareWithSection/ShareWithSection'

export default function ScientistPraiseDetailsSidebar(props) {
    return (
        <div className='SP_DetailsSidebar'>
            <Breadcrumbs breadcrumbs={[{ name: 'من نحن', url: '/who-we-are' }, { name: 'قالوا عنا', url: '/who-we-are/scientist-praise' }]} />

            <div className='SP_DetailsSidebar__headBar'>
                <div className='SP_DetailsSidebar__headBar__imgCont'>
                    {/* <img src='/assets/Mask Group 71.svg' /> */}
                    <ReactImageFallback
                        src={props?.praiseDetails?.sheikhImage}
                        fallbackImage="/assets/fallbacks/Admin Avatar.svg"
                        initialImage="/assets/fallbacks/Admin Avatar.svg"
                        alt="صورة الخبر"
                    />
                </div>

                <div className='SP_DetailsSidebar__headBar__name'>{props?.praiseDetails?.sheikhName}</div>
            </div>

            {/* <div className='SP_DetailsSidebar__imgCont'>
                <img src='/assets/Mask Group 71.svg' />
            </div> */}

            {/* <div className='SP_DetailsSidebar__audio'>
                <audio controls>
                    <source src="x" type="audio/ogg" />
                    <source src="x" type="audio/mpeg" />
                            Your browser does not support the audio element.
                </audio>
            </div>

            <div className='SP_DetailsSidebar__video'>
                فيديو للشيخ او العالم او الداعية
            </div> */}


        </div>

    )
}
