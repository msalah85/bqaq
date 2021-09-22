import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import { Gallery, Item } from 'react-photoswipe-gallery';

export default function OurProjectsDetails(props) {
    const router = useRouter();
    const [selectedProject, setSelectedProject] = useState({})

    useEffect(() => {

        setSelectedProject(props.projectDetails?.find(project => project.id == router.query.id))

    }, [router.query.id, props.projectDetails])



    return (
        <>
            {
                selectedProject ? (
                    <div className='ourProjectsDetails fade-in'>

                        <div className='ourProjectsDetails__right'>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div className='ourProjectsDetails__right__title'>{selectedProject?.name}</div>
                                <Link href={`/donnation/${selectedProject?.id}`}>
                                    <a>
                                        <button style={{ width: '20rem' }} className='baqiq-green-btn'>تبرع للمشروع</button>
                                    </a>
                                </Link>
                            </div>

                            <div className='ourProjectsDetails__right__desc'>{selectedProject?.description}</div>

                            <div className='ourProjectsDetails__right__title'>مميزات المشروع</div>
                            <ul className='ourProjectsDetails__right__desc'>
                                {
                                    selectedProject?.advantages?.map((advantage, index) => {
                                        return (
                                            <li key={index}>{advantage}</li>
                                        )
                                    })
                                }

                                {/* <li>لوريم ايبسوم دولار سيت أميت</li>
                    <li>لوريم ايبسوم دولار سيت أميت</li>
                    <li>لوريم ايبسوم دولار سيت أميت</li>
                    <li>لوريم ايبسوم دولار سيت أميت</li> */}
                            </ul>

                            <div className='ourProjectsDetails__right__title'>مواعيد المشروع</div>
                            <div className='ourProjectsDetails__right__desc'>{selectedProject?.times}</div>

                        </div>

                        <div className='ourProjectsDetails__left'>
                            <div className='ourProjectsDetails__left__section'>
                                <div className='ourProjectsDetails__left__section__title'>معرض الصور</div>
                                <div className='ourProjectsDetails__left__section__gridCont'>
                                    {
                                        selectedProject?.media?.images?.map((image, index) => {
                                            return <div key={index} className='ourProjectsDetails__left__section__gridCont__imgCont'>
                                                <Gallery>
                                                    <Item
                                                        original={image}
                                                        thumbnail={image}
                                                        width="1024"
                                                        height="1024"
                                                    >
                                                        {({ ref, open }) => (
                                                            <img ref={ref} onClick={open} src={image} onError={e => { e.target.src = props.fallbackImg }} />
                                                        )}
                                                    </Item>
                                                </Gallery>

                                            </div>
                                        })
                                    }


                                </div>
                            </div>

                            <div className='ourProjectsDetails__left__section' >
                                <div className='ourProjectsDetails__left__section__title'>معرض الفيديوهات</div>
                                <div className='ourProjectsDetails__left__section__gridCont'>
                                    {
                                        selectedProject?.media?.video.map((video, index) => {
                                            return <div key={index} className='ourProjectsDetails__left__section__gridCont__imgCont'>
                                                <ReactPlayer
                                                    url={video}
                                                    controls={true}
                                                    volume={1}
                                                    muted={false}
                                                    width='100%'
                                                    height='100%'
                                                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                                />
                                            </div>

                                        })
                                    }

                                </div>
                            </div>

                        </div>

                    </div>


                ) : <div style={{ textAlign: 'center', marginTop: '10rem', fontSize: '2.5rem', fontWeight: '500', color: '#d3d3d3' }}>لا توجد بيانات</div>
            }
        </>

    )
}
