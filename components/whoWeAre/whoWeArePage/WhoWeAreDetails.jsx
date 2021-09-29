import React, { Fragment } from 'react'
import ReactImageFallback from 'react-image-fallback'
import { Gallery, Item } from 'react-photoswipe-gallery';
import ReactPlayer from 'react-player';

export default function WhoWeAreDetails(props) {
    return (
        <div className='whoWeAreDetails fade-in'>
            <div className='whoWeAreDetails__right'>
                {
                    props.whoWeAreData?.audio?.map((audio, index) => {
                        return (
                            <audio controls key={index}>
                                <source src={audio?.url} type="audio/ogg" />
                                <source src={audio?.url} type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        )
                    })
                }

                {props.whoWeAreData?.containers?.whoWeAre?.definition?.reverse()?.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <div className='whoWeAreDetails__right__title'>{item.definition}</div>
                            <div className='whoWeAreDetails__right__desc'>{item.description}</div>
                        </Fragment>
                    )
                })
                }

            </div>
            <div className='whoWeAreDetails__left'>
                <div className='whoWeAreDetails__left__section'>
                    <div className='whoWeAreDetails__left__section__title'>معرض الصور</div>
                    <div className='whoWeAreDetails__left__section__gridCont'>

                        {
                            props.whoWeAreData?.images?.map((image, index) => {
                                return (
                                    <div className='whoWeAreDetails__left__section__gridCont__imgCont' key={index}>

                                        <Gallery>
                                            <Item
                                                original={image.url}
                                                thumbnail={image.url}
                                                width="1024"
                                                height="1024"
                                            >
                                                {({ ref, open }) => (
                                                    <img ref={ref} onClick={open} src={image.url} onError={e => { e.target.src = "/assets/fallbacks/news-fallback-image.png" }} />
                                                )}
                                            </Item>
                                        </Gallery>

                                    </div>
                                )

                            })
                        }


                    </div>
                </div>

                <div className='whoWeAreDetails__left__section' >
                    <div className='whoWeAreDetails__left__section__title'>معرض الفيديوهات</div>
                    <div className='whoWeAreDetails__left__section__gridCont'>
                        {props.whoWeAreData?.videos?.map((video, index) => {
                            return (
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactPlayer
                                        url={video.url}
                                        controls={true}
                                        volume={1}
                                        muted={false}
                                        width='100%'
                                        height='100%'
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    />
                                </div>
                            )
                        })}


                        {/* <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=Ad1KQdA7Zrg'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=owo8rw4GOmo'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=UlEQOpvO9XU'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=xY4jFIEMkAM'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=4H_LvlpNW20'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=sgtqZzFbMiY&ab_channel=%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A8%D9%82%D9%8A%D9%82'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=LZLzAJ3vlTY&ab_channel=%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A8%D9%82%D9%8A%D9%82'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>
 */}

                        {/* <div className='whoWeAreDetails__left__section__gridCont__seeAll'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/Mask Group 8.png"
                                initialImage="/assets/Mask Group 8.png"
                                alt="صورة الخبر"
                            />
                            <div className='whoWeAreDetails__left__section__gridCont__seeAll__text'>رؤية الكل</div>
                        </div> */}

                    </div>
                </div>

            </div>
        </div >
    )
}
