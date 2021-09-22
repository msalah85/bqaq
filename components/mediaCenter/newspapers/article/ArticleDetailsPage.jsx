import React from 'react'
import ReactImageFallback from 'react-image-fallback'

export default function ArticleDetailsPage(props) {
    return (
        <div className='newDetails fade-in'>
            <div className='newDetails__right'>

                <div className='title-bg-green'>{props.postDetails?.title}</div>

                <div className='newDetails__right__details'>
                    {props.postDetails?.content}
                </div>

            </div>


            {/* <div className='newDetails__left'>

                <div className='newDetails__left__section' >
                    <div className='newDetails__left__section__videoCont'>
                        <ReactImageFallback
                            src="xx"
                            fallbackImage="/assets/fallbacks/Play.svg"
                            initialImage="/assets/fallbacks/Play.svg"
                            alt="صورة الخبر"
                        />
                    </div>
                    <div className='newDetails__left__section__videoCont'>
                        <ReactImageFallback
                            src="xx"
                            fallbackImage="/assets/fallbacks/Play.svg"
                            initialImage="/assets/fallbacks/Play.svg"
                            alt="صورة الخبر"
                        />
                    </div>
                    <div className='newDetails__left__section__videoCont'>
                        <ReactImageFallback
                            src="xx"
                            fallbackImage="/assets/fallbacks/Play.svg"
                            initialImage="/assets/fallbacks/Play.svg"
                            alt="صورة الخبر"
                        />
                    </div>
                    <div className='newDetails__left__section__videoCont'>
                        <ReactImageFallback
                            src="xx"
                            fallbackImage="/assets/fallbacks/Play.svg"
                            initialImage="/assets/fallbacks/Play.svg"
                            alt="صورة الخبر"
                        />
                    </div>
                </div>

            </div>
         */}
        </div>

    )
}
