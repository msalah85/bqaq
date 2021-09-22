import React from 'react'
import ReactImageFallback from 'react-image-fallback'

export default function NewDetailsPage(props) {
    return (
        <div className='newDetails fade-in'>
            <div className='newDetails__right'>

                <div className='newDetails__right__infoBar'>
                    <div className='title-bg-green'>{props.postDetails?.title}</div>
                    {/* <div className='newDetails__right__infoBar__downloadSec'><img src={'/assets/Mask Group 16.png'} /></div>
                    <div className='newDetails__right__infoBar__downloadSec'><img src={'/assets/Mask Group 17.png'} /></div> */}
                </div>

                <div className='newDetails__right__details'>
                    {props.postDetails?.content}
                </div>
            </div>


            {/* <div className='newDetails__left'>
                <div className='newDetails__left__section'>
                    <div className='newDetails__left__section__title'>معرض الصور</div>
                    <div className='newDetails__left__section__gridCont'>
                        <div className='newDetails__left__section__gridCont__imgCont'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                initialImage="/assets/fallbacks/news-fallback-image.png"
                                alt="صورة الخبر"
                            />
                        </div>
                        <div className='newDetails__left__section__gridCont__imgCont'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                initialImage="/assets/fallbacks/news-fallback-image.png"
                                alt="صورة الخبر"
                            />
                        </div>
                        <div className='newDetails__left__section__gridCont__imgCont'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                initialImage="/assets/fallbacks/news-fallback-image.png"
                                alt="صورة الخبر"
                            />
                        </div>
                        <div className='newDetails__left__section__gridCont__imgCont'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                initialImage="/assets/fallbacks/news-fallback-image.png"
                                alt="صورة الخبر"
                            />
                        </div>

                        <div className='newDetails__left__section__gridCont__imgCont'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                initialImage="/assets/fallbacks/news-fallback-image.png"
                                alt="صورة الخبر"
                            />
                        </div>
                        <div className='newDetails__left__section__gridCont__imgCont'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                initialImage="/assets/fallbacks/news-fallback-image.png"
                                alt="صورة الخبر"
                            />
                        </div>
                        <div className='newDetails__left__section__gridCont__imgCont'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                initialImage="/assets/fallbacks/news-fallback-image.png"
                                alt="صورة الخبر"
                            />
                        </div>
                        <div className='newDetails__left__section__gridCont__imgCont'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                initialImage="/assets/fallbacks/news-fallback-image.png"
                                alt="صورة الخبر"
                            />
                        </div>
                        <div className='newDetails__left__section__gridCont__seeAll'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/Mask Group 8.png"
                                initialImage="/assets/Mask Group 8.png"
                                alt="صورة الخبر"
                            />
                            <div className='newDetails__left__section__gridCont__seeAll__text'>رؤية الكل</div>
                        </div>

                    </div>
                </div>

                <div className='newDetails__left__section' >
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
