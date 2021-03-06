import React, { useState } from 'react'
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

export default function AddProject(props) {

    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [advs, setAdvs] = useState([]);
    const [newAdv, setNewAdv] = useState('');
    const [projectImages, setProjectImages] = useState([]);
    const [projectVideos, setProjectVideos] = useState([]);


    const { register, getValues, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
        defaultValues: {
            advantages: []
        }
    });

    const addNewRecord = (data) => {
        setShowLoadPanel(true);
        requester.post(`/projects/create-new-project`, {
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
        addNewRecord(data);
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
        text: '??????',
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

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}

            <div className='inp-title'>?????? ??????????????</div>
            <input
                className={`baqiq-inp ${errors.name && 'unvalid'}`}
                {...register('name', { required: true })}
                placeholder='?????? ??????????????'
                style={{ width: '100%', borderRadius: '3rem' }}

            />



            <div className='inp-title'>??????????</div>
            <textarea
                className={`baqiq-inp ${errors.description && 'unvalid'}`}
                {...register('description', { required: true })}
                placeholder='??????????'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />




            <div className='inp-title'>?????????? ??????????????</div>
            <DateBox placeholder='???????? ?????????? ??????????????'
                type="date"
                onValueChange={(value) => { setValue('time', moment(value).format('DD/MM/YYYY')) }}
                rtlEnabled
            />




            <div className='inp-title'>???????????? ??????????????</div>
            <List
                noDataText={' ???? ???????? ???????????? ??????????????'}
                className='mt-2'
                items={advs}
                height={'auto'}
                allowItemDeleting
                itemDeleteMode='static'
                rtlEnabled
            />
            <TextBox value={newAdv} onValueChanged={(e) => { setNewAdv(e.value) }} placeholder='?????? ???????????? ??????????????' rtlEnabled>

                <Button
                    name="Add"
                    location="after"
                    options={addButton}
                />

            </TextBox>






            {projectImages.length > 0 && <div className='inp-title'>???????? ??????????</div>}
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

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







            {projectVideos.length > 0 && <div className='inp-title'>???????? ????????????????????</div>}
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

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
                    <div className='add-new-file'>?????????? ?????????? ???? ????????    </div>
                </label>
                <input id={"input-file-upload"} type="file" onChange={(e) => { FileSizeValidator(e, onFileChange) }} hidden />
            </div>





            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='submit' className='add-new-file' style={{ width: '40%', textAlign: 'center', border: 'none' }}>??????</button>
            </div>

        </form>
    )
}
