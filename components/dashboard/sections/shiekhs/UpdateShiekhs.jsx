import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Spinner from '../../../../reusable/spinner/Spinner';
import { Failed, Success } from '../../alertPopup/AlertPopup';
import axios from 'axios';
import requester from '../../../../requester/requester';
import SelectBox from 'devextreme-react/select-box';
import { List } from 'devextreme-react';
import { FileSizeValidator } from '../../../../utils/FileSizeValidator';
import ReactImageFallback from 'react-image-fallback';


export default function UpdateShiekhs(props) {

    const [shiekhDetails, setShiekhDetails] = useState({});
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    var newImage = null;

    useEffect(() => {
        if (props.selectedShiekh.id) {
            setShowLoadPanel(true);
            requester.get("/lessons/sheikh/get-single?sheikhId=" + props.selectedShiekh.id)
                .then((response) => {
                    setShiekhDetails(response.data.model);
                    reset(response.data.model);
                    setShowLoadPanel(false);
                })
                .catch((err) => {
                    console.log(err);
                    setShowLoadPanel(false);
                })
        }

    }, [props.selectedShiekh]);


    const { register, getValues, reset, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
        defaultValues: {
            advantages: []
        }
    });

    const updateRecord = (data) => {
        setShowLoadPanel(true);
        requester.put('/lessons/sheikh/update', { ...data })
            .then((res) => {
                if (newImage) {

                    let image = new FormData();
                    image.append("Image", newImage, newImage.name);
                    image.append("Id", data.id);

                    requester.patch('/lessons/sheikh/upload-avatar', image, { headers: { "Content-Type": "multipart/form-data" } })
                        .then(() => {
                            newImage = null;
                            Success();
                            props.setCaseToShow('');
                        }).catch(() => {
                            newImage = null;
                            Failed();
                            setShowLoadPanel(false);
                        })

                } else {
                    Success();
                    props.setCaseToShow('');
                }
            }).catch((err) => {
                console.log(err)
                setShowLoadPanel(false);
                Failed();
            })
    };

    const onSubmit = (data) => {
        console.log('onSubmit', data);
        updateRecord(data);
    };

    const onImageChange = (event) => {
        console.log('event', event);
        if (event.target.files[0]) {
            let imgSrc = URL.createObjectURL(event.target.files[0]);
            document.getElementById("dashboard-img-update") && (document.getElementById("dashboard-img-update").src = imgSrc)
            newImage = event.target.files[0];
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}


            <div className='inp-title'>اسم الشيخ</div>
            <input
                className={`baqiq-inp ${errors.name && 'unvalid'}`}
                {...register('name', { required: true })}
                placeholder='اسم الشيخ'
                style={{ width: '100%', borderRadius: '3rem' }}

            />


            <div className='inp-title'>اعماله</div>
            <textarea
                className={`baqiq-inp ${errors.working && 'unvalid'}`}
                {...register('working', { required: true })}
                placeholder='اعماله'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            <div className='inp-title'>ملامح من صفاته</div>
            <textarea
                className={`baqiq-inp ${errors.about && 'unvalid'}`}
                {...register('about', { required: true })}
                placeholder='ملامح من صفاته'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            <div className='inp-title'>شيوخه</div>
            <textarea
                className={`baqiq-inp ${errors.teachers && 'unvalid'}`}
                {...register('teachers', { required: true })}
                placeholder='شيوخه'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            <div className='inp-title'>طلابه</div>
            <textarea
                className={`baqiq-inp ${errors.students && 'unvalid'}`}
                {...register('students', { required: true })}
                placeholder='طلابه'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            <div className='inp-title'>اعماله و نشاطه العلمي</div>
            <textarea
                className={`baqiq-inp ${errors.history && 'unvalid'}`}
                {...register('history', { required: true })}
                placeholder='اعماله و نشاطه العلمي'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            <div className='inp-title'>أسمه و مولده</div>
            <textarea
                className={`baqiq-inp ${errors.bio && 'unvalid'}`}
                {...register('bio', { required: true })}
                placeholder='أسمه و مولده'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            <label htmlFor='dashboard-img-upload' className={"dashboard-edit-img-cont"}>
                <div className={"dashboard-img-cont-overlay"} >اضف</div>
                <ReactImageFallback
                    src={shiekhDetails.avatarUrl}
                    fallbackImage={'/assets/fallbacks/Admin Avatar.svg'}
                    className="dashboard-img"
                    id={"dashboard-img-update"}
                />
            </label>
            <form hidden>
                <input id={"dashboard-img-upload"} type="file" accept="image/*"
                    onChange={(e) => { FileSizeValidator(e, onImageChange) }} />
            </form>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='submit' className='add-new-file' style={{ width: '40%', textAlign: 'center', border: 'none' }}>حفظ</button>
            </div>

        </form>
    )
}
