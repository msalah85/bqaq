import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Spinner from '../../../../reusable/spinner/Spinner';
import { Failed, Success } from '../../alertPopup/AlertPopup';
import axios from 'axios';
import requester from '../../../../requester/requester';
import { Button, TextBox } from "devextreme-react/text-box";
import List from 'devextreme-react/list';
import ReactPlayer from 'react-player';
import { DateBox } from 'devextreme-react';
import moment from 'moment';
import { FileSizeValidator } from '../../../../utils/FileSizeValidator';

export default function UpdateProject(props) {

    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [advs, setAdvs] = useState([]);
    const [newAdv, setNewAdv] = useState('');
    const [projectImages, setProjectImages] = useState([]);
    const [projectVideos, setProjectVideos] = useState([]);

    useEffect(() => {
        reset(props.selectedProject);
        setAdvs(props.selectedProject?.advantages || [])
    }, [props.selectedProject])

    const { register, reset, getValues, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
        defaultValues: {
            advantages: []
        }
    });

    const updateRecord = (data) => {
        setShowLoadPanel(true);
        requester.put(`/projects/update-project`, {
            ...data,
        })
            .then(async (response) => {
                if (projectImages?.length > 0 || projectVideos?.length > 0) {

                    let imagesUpload = await projectImages.map(image => {
                        let newImageFormData = new FormData();
                        newImageFormData.append("Id", response.data?.model?.id);
                        newImageFormData.append("Type", '1');
                        newImageFormData.append("MediaFile", image, image.name);
                        return requester.patch('/projects/upload-project-media', newImageFormData, { headers: { "Content-Type": "multipart/form-data" } });
                    })

                    let videosUpload = await projectVideos.map(video => {
                        let newVideoFormData = new FormData();
                        newVideoFormData.append("Id", response.data?.model?.id);
                        newVideoFormData.append("Type", '2');
                        newVideoFormData.append("MediaFile", video, video.name);
                        return requester.patch('/projects/upload-project-media', newVideoFormData, { headers: { "Content-Type": "multipart/form-data" } })
                    })

                    axios.all([...imagesUpload, ...videosUpload]).then(axios.spread((...responses) => {
                        Success();
                        props.setCaseToShow('');
                        props.fetchTableData()
                    })).catch(() => {
                        Success();
                        props.setCaseToShow('');
                        props.fetchTableData()
                    })
                } else {
                    console.log('added');
                    Success();
                    props.setCaseToShow('');
                    props.fetchTableData();
                }
            })
            .catch(() => {
                setShowLoadPanel(false);
                Failed();
            })
    }

    const onSubmit = (data) => {
        console.log('newPraise', register);
        updateRecord(data);
    }

    const deleteImage = (index) => {
        let images = projectImages;
        if (index > -1) {
            images.splice(index, 1);
            setProjectImages([...images])
        }
    }

    const deleteVideo = (index) => {
        let videos = projectVideos;
        if (index > -1) {
            videos.splice(index, 1);
            setProjectVideos([...videos])
        }
    }
    const onFileChange = async (e) => {
        if (e.target.files[0]) {
            let fileType = e.target.files[0] && e.target.files[0].type || '';
            if (fileType.includes('image')) {
                setProjectImages([...projectImages, e.target.files[0]]);
            } else if (fileType.includes('video')) {
                setProjectVideos([...projectVideos, e.target.files[0]]);
            }
        }
    }

    const addButton = {
        text: 'اضف',
        onClick: () => {
            if (newAdv != '') {
                let allAdvs = [...advs];
                allAdvs.push(newAdv);
                setValue('advantages', allAdvs);
                setAdvs(allAdvs);
                setNewAdv('');
            }
        }
    };

    const deleteMedia = (mediaUrl) => {
        setShowLoadPanel(true);
        let deleteImage = new FormData();
        deleteImage.append("Id", props.selectedProject?.id);
        deleteImage.append("MediaUrl", mediaUrl);

        requester.patch(`/projects/remove-project-media`, deleteImage).then((response) => {
            setShowLoadPanel(false)
            props.setSelectedProject({ ...props.selectedProject, media: response.data.model?.media })
            Success();
        }).catch(() => {
            setShowLoadPanel(false)
            Failed();
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}

            <div className='inp-title'>أسم المشروع</div>
            <input
                className={`baqiq-inp ${errors.name && 'unvalid'}`}
                {...register('name', { required: true })}
                placeholder='أسم المشروع'
                style={{ width: '100%', borderRadius: '3rem' }}

            />



            <div className='inp-title'>الوصف</div>
            <textarea
                className={`baqiq-inp ${errors.description && 'unvalid'}`}
                {...register('description', { required: true })}
                placeholder='الوصف'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />




            <div className='inp-title'>ميعاد المشروع</div>
            <DateBox
                placeholder={props.selectedProject?.times || 'اختر ميعاد للمشروع'}
                type="date"
                onValueChange={(value) => { console.log(value); setValue('time', moment(value).format('DD/MM/YYYY')) }}
                rtlEnabled
            />




            <div className='inp-title'>مميزات المشروع</div>
            <List
                noDataText={' لا يوجد مميزات للمشروع'}
                className='mt-2'
                items={advs}
                height={'auto'}
                allowItemDeleting
                itemDeleteMode='static'
                rtlEnabled
            />
            <TextBox value={newAdv} onValueChanged={(e) => { setNewAdv(e.value) }} placeholder='اضف مميزات للمشروع' rtlEnabled>

                <Button
                    name="Add"
                    location="after"
                    options={addButton}
                />

            </TextBox>






            {projectImages.length > 0 || props.selectedProject?.media?.images?.length > 0 && <div className='inp-title'>معرض الصور</div>}
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

                {
                    props.selectedProject?.media?.images.map((image, index) => {
                        return <div className='whoWeAreDetails__left__section__gridCont__imgCont' key={index} style={{ position: 'relative' }}>
                            <div
                                className='popup__form__nav__closeBtn'
                                style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                onClick={() => deleteMedia(image)}
                            >
                                <img src="/assets/Mask Group 67.svg" />
                            </div>
                            <img src={image} />

                        </div>

                    })
                }
                {
                    projectImages?.map((image, index) => {

                        return <div className='whoWeAreDetails__left__section__gridCont__imgCont' key={index} style={{ position: 'relative' }}>
                            <div
                                className='popup__form__nav__closeBtn'
                                style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                onClick={() => deleteImage(index)}
                            >
                                <img src="/assets/Mask Group 67.svg" />
                            </div>
                            <img src={URL.createObjectURL(image)} />

                        </div>


                    })
                }


            </div>







            {projectVideos.length > 0 || props.selectedProject?.media?.video?.length > 0 && <div className='inp-title'>معرض الفيديوهات</div>}
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {
                    props.selectedProject?.media?.video?.map((video, index) => {
                        return <div className='whoWeAreDetails__left__section__gridCont__imgCont' key={index} style={{ position: 'relative' }}>
                            <div
                                className='popup__form__nav__closeBtn'
                                style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                onClick={() => deleteMedia(video)}
                            >
                                <img src="/assets/Mask Group 67.svg" />
                            </div>
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
                {
                    projectVideos?.map((video, index) => {
                        return <div className='whoWeAreDetails__left__section__gridCont__imgCont' key={index} style={{ position: 'relative' }}>
                            <div
                                className='popup__form__nav__closeBtn'
                                style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                onClick={() => deleteVideo(index)}
                            >
                                <img src="/assets/Mask Group 67.svg" />
                            </div>
                            <ReactPlayer
                                url={URL.createObjectURL(video)}
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



            <div>
                <label htmlFor='input-file-upload' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='add-new-file'>إضافة فيديو او صوره    </div>
                </label>
                <input id={"input-file-upload"} type="file" onChange={(e) => { FileSizeValidator(e, onFileChange) }} hidden />
            </div>





            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='submit' className='add-new-file' style={{ width: '40%', textAlign: 'center', border: 'none' }}>حفظ</button>
            </div>

        </form>
    )
}
