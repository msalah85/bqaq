import React, { useEffect, useState } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import ReactPlayer from 'react-player/lazy';
import PdfSVG from '../../public/assets/Mask Group 16.svg';
import parse from 'html-react-parser';

export default function WomenSecDetails(props) {

    const [media, setMedia] = useState({
        video: [],
        image: []
    });

    useEffect(() => {
        let video = [];
        let image = [];

        if (Array.isArray(props.postData?.media)) {
            props.postData.media.map(item => {
                item.medialFileType == 'Image' && image.push(item)
                item.medialFileType == 'Video' && video.push(item)

            })
            setMedia({
                video, image
            })
        }
        // setMedia({
        //     video: props.postData?.media?.filter?.filter(item => item.medialFileType == 'Video') || [],
        //     image: props.postData?.media?.filter?.filter(item => item.medialFileType == 'Image') || []
        // })
    }, [props.postData]);

    return (
        <div className='womenSecDetails fade-in'>
            <div className='womenSecDetails__right'>
                <div className='womenSecDetails__right__infoBar'>
                    <div className='title-bg-green'>{props.postData?.title}</div>
                    {
                        props?.documentUrl && (
                            <a target='_blank' href={props.postData?.documentUrl}>
                                <div className='womenSecDetails__right__infoBar__downloadSec'>
                                    <PdfSVG />
                                </div>

                            </a>
                        )
                    }
                    {/* <div className='womenSecDetails__right__infoBar__downloadSec'><img src={'/assets/Mask Group 17.png'} /></div> */}
                </div>

                <div className='womenSecDetails__right__details' style={{ textAlign: 'justify' }}>
                    {parse(props.postData?.content || '')}
                </div>
            </div>


            <div className='womenSecDetails__left'>
                {/* <div className='womenSecDetails__left__section'>
                    <div className='womenSecDetails__left__section__title'>معرض الصور</div>
                    <div className='womenSecDetails__left__section__gridCont'>
                        {
                            media.image.length > 0 ? media.image.map((item, index) => {
                                return <div className='womenSecDetails__left__section__gridCont__imgCont' key={index}>

                                    <Gallery>
                                        <Item
                                            original={item?.url}
                                            thumbnail={item?.url}
                                            width="1024"
                                            height="1024"
                                        >
                                            {({ ref, open }) => (
                                                <img ref={ref} onClick={open} src={item?.url} onError={e => { e.target.src = "./assets/fallbacks/news-fallback-image.png" }} />
                                            )}
                                        </Item>
                                    </Gallery>
                                </div>

                            }) : <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '500', color: '#d3d3d3' }}>لا توجد بيانات</div>
                        }

                    </div>
                </div > */}

                < div className='womenSecDetails__left__section' >
                    <div className='womenSecDetails__left__section__title'>معرض الفيديوهات</div>
                    <div className='womenSecDetails__left__section__gridCont'>
                        {/* {
                            media.video.length > 0 ? media.video.map((item, index) => {
                                return <div className='womenSecDetails__left__section__gridCont__imgCont' key={index}>
                                    <ReactPlayer
                                        url={item.url}
                                        controls={true}
                                        volume={1}
                                        muted={false}
                                        width='100%'
                                        height='100%'
                                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                    />
                                </div>
                            }) : <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: '500', color: '#d3d3d3' }}>لا توجد بيانات</div>
                        } */}

                        <div className='womenSecDetails__left__section__gridCont__imgCont' >
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=oI8W5IUQxb8'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='womenSecDetails__left__section__gridCont__imgCont' >
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=8iI-RJ5rKAM'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='womenSecDetails__left__section__gridCont__imgCont' >
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=Rvns9RTNWp4&ab_channel=%D8%B1%D9%88%D8%A7%D8%A6%D8%B9%D8%A7%D9%84%D9%83%D9%84%D9%85'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='womenSecDetails__left__section__gridCont__imgCont' >
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=6u4jg3WxMS8'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>

                        <div className='womenSecDetails__left__section__gridCont__imgCont' >
                            <ReactPlayer
                                url={'https://www.youtube.com/watch?v=xurUyEwF8Q4'}
                                controls={true}
                                volume={1}
                                muted={false}
                                width='100%'
                                height='100%'
                                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </div>
                        {/* <div className='womenSecDetails__left__section__gridCont__seeAll'>
                            <ReactImageFallback
                                src="xx"
                                fallbackImage="/assets/Mask Group 8.png"
                                initialImage="/assets/Mask Group 8.png"
                                alt="صورة الموضوع"
                            />
                            <div className='womenSecDetails__left__section__gridCont__seeAll__text'>رؤية الكل</div>
                        </div> */}

                    </div>
                </div>

            </div >




        </div >
    )
}
