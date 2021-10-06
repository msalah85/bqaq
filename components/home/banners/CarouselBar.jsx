import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { GET_BANNERS } from '../../../redux/actions/home/index';
import { connect } from 'react-redux';
import ReactPlayer from 'react-player';
import ReactImageFallback from 'react-image-fallback';

function CarouselBar(props) {
    const [autoPlay, setAutoPlay] = useState(false);
    const [videoPlay, setVideoPlay] = useState(true);

    useEffect(() => {
        props.GET_BANNERS();
    }, []);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <>
            {props.banners && <div className='carousel'>

                <Carousel
                    swipeable
                    draggable
                    showDots
                    responsive={responsive}
                    // ssr // means to render carousel on server-side.
                    // infinite={autoPlay}
                    autoPlay={autoPlay}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    containerClass="carousel__container"
                    renderDotsOutside
                    arrows={true}
                    beforeChange={(e) => { setVideoPlay(false) }}
                >
                    {props.banners?.map(banner => {
                        if (banner.mediaType === 1)
                            return <div className='carousel__item'>
                                <ReactImageFallback
                                    src={banner.bannerUrl}
                                    fallbackImage='./assets/Banner.jpg'
                                    draggable={false}
                                />
                            </div>
                        else if (banner.mediaType === 2)
                            return <div className='carousel__item' >
                                <ReactPlayer
                                    url={banner.bannerUrl}
                                    playing={videoPlay}
                                    controls={true}
                                    volume={1}
                                    muted={false}
                                    width='100%'
                                    height='100%'
                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    onEnded={() => { setAutoPlay(true) }}
                                    onPause={() => { setAutoPlay(true) }}
                                    onPlay={() => { setAutoPlay(false) }}
                                />
                            </div>
                    })}

                    {/* <div className='carousel__item' style={{ height: '100%' }}>
                        <ReactPlayer
                            url={'https://www.youtube.com/watch?v=NlEa9-xZZTY&ab_channel=%D8%B1%D9%88%D8%A7%D8%A6%D8%B9%D8%A7%D9%84%D9%83%D9%84%D9%85'}
                            playing={videoPlay}
                            controls={true}
                            volume={1}
                            muted={false}
                            width='100%'
                            height='100%'
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            onEnded={() => { setAutoPlay(true) }}
                            onPause={() => { setAutoPlay(true) }}
                            onPlay={() => { setAutoPlay(false) }}
                        />
                    </div>

                    <div className='carousel__item'>
                        <img src='/assets/Banner.jpg' width='100%' height='100%' draggable={false} />

                    </div>

                    <div className='carousel__item'>
                        <img src='/assets/Banner.jpg' width='100%' height='100%' draggable={false} />
                    </div> */}

                </Carousel>

            </div >}
        </>
    )

}
const mapStateToProps = (state) => {
    return { banners: state.home?.banners };
};

export default connect(mapStateToProps, { GET_BANNERS })(CarouselBar);
