import React, { useEffect, useState } from 'react'
import requester from '../../../../requester/requester';
import { Gallery, Item } from 'react-photoswipe-gallery';
import ReactPlayer from 'react-player';
import { Failed, Success } from '../../alertPopup/AlertPopup';
import Spinner from '../../../../reusable/spinner/Spinner';
import { FileSizeValidator } from '../../../../utils/FileSizeValidator';
export default function WhoWeAreGallery() {

    const [records, setRecords] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);

    useEffect(() => {
        setShowLoadPanel(false);
    }, [records]);

    useEffect(() => {
        fetchMediaFila();
    }, []);

    const runLoadPanel = () => {
        setShowLoadPanel(true)
    }

    const fetchMediaFila = () => {
        runLoadPanel();
        requester.get(`/content/albums/get?source=1`).then((response) => {
            setRecords(response.data.model || []);
        }).catch(() => {
            setRecords([]);
        })
    }

    const deleteFile = (fileId) => {
        runLoadPanel();
        requester.delete(`/content/albums/delete?id=${fileId}`).then((response) => {
            fetchMediaFila();
            Success();
        }).catch(() => {
            fetchMediaFila();
            Failed();
        })
    }

    const onFileChange = async (e) => {
        console.log(e.target.files[0]);
        let fileType = e.target.files[0] && e.target.files[0].type || '';
        let formData = new FormData();
        formData.append("File", e.target.files[0], e.target.files[0].name);
        formData.append("Source", '1');
        const uploadFile = (file) => {
            runLoadPanel();
            requester.patch(`/content/albums/upload`, file, { headers: { "Content-Type": "multipart/form-data" } })
                .then(() => {
                    fetchMediaFila();
                })
                .catch(() => {
                    fetchMediaFila();
                })
        }

        if (e.target.files[0]) {
            if (fileType.includes('image')) {
                formData.append("Type", '1');
                uploadFile(formData);
                console.log('image');
            } else if (fileType.includes('video')) {
                formData.append("Type", '2');
                uploadFile(formData);
                console.log('video');

            }
            else if (fileType.includes('audio')) {
                formData.append("Type", '3');
                uploadFile(formData);
                console.log('audio');

            }
        }

    }

    return (
        <div className='galleryContainer' style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}
            <div className='galleryTitle'>معرض الصور</div>
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

                {
                    records?.map((file, index) => {
                        if (file.type == '1')
                            return <div className='whoWeAreDetails__left__section__gridCont__imgCont' key={index} style={{ position: 'relative' }}>
                                <div
                                    className='popup__form__nav__closeBtn'
                                    style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                    onClick={() => deleteFile(file.id)}
                                >
                                    <img src="/assets/Mask Group 67.svg" />
                                </div>
                                <Gallery>
                                    <Item
                                        original={file.url}
                                        thumbnail={file.url}
                                        width="1024"
                                        height="1024"
                                    >
                                        {({ ref, open }) => (
                                            <img ref={ref} onClick={open} src={file.url} onError={e => { e.target.src = "/assets/fallbacks/news-fallback-image.png" }} />
                                        )}
                                    </Item>
                                </Gallery>

                            </div>


                    })
                }


            </div>

            <div className='galleryTitle'>معرض الفيديوهات</div>
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

                {
                    records?.map((file, index) => {
                        if (file.type == '2')
                            return <div className='whoWeAreDetails__left__section__gridCont__imgCont' key={index} style={{ position: 'relative' }}>
                                <div
                                    className='popup__form__nav__closeBtn'
                                    style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                    onClick={() => deleteFile(file.id)}
                                >
                                    <img src="/assets/Mask Group 67.svg" />
                                </div>
                                <ReactPlayer
                                    url={file.url}
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

            <div className='galleryTitle'>الصوتيات</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {
                    records?.map((file, index) => {
                        if (file.type == '3')
                            return <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <audio controls>
                                    <source src={file.url} type="audio/ogg" />
                                    <source src={file.url} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <img src="/assets/delete.svg" style={{ width: '3rem', cursor: 'pointer' }} onClick={() => deleteFile(file.id)} />
                            </div>
                    })
                }


            </div>

            <div>
                <label htmlFor='input-file-upload' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='add-new-file'>إضافة فيديو ، صوره او ملف صوتي جديد</div>
                </label>
                <input id={"input-file-upload"} type="file" onChange={(e) => { FileSizeValidator(e, onFileChange) }} hidden />
            </div>
        </div>

    )
}
