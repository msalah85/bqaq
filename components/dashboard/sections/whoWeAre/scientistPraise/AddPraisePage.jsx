import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Spinner from '../../../../../reusable/spinner/Spinner';
import { Failed, Success } from '../../../alertPopup/AlertPopup';
import axios from 'axios';
import requester from '../../../../../requester/requester';
import { FileSizeValidator } from '../../../../../utils/FileSizeValidator';

export default function AddPage(props) {

    const [sheikhImage, setSheikhImage] = useState(null);
    const [gallery, setGallery] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);


    const { register, getValues, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
    });

    const addNewRecord = (data) => {
        let newPraise = new FormData();

        newPraise.append("Title", data.Title);
        newPraise.append("Description", data.Description);
        newPraise.append("SheikhName", data.SheikhName);
        sheikhImage && newPraise.append("SheikhImage", sheikhImage, sheikhImage.name);
        setShowLoadPanel(true)
        requester.post(`/praises/create-new-praise`, newPraise, { headers: { "Content-Type": "multipart/form-data" } })
            .then(async (response) => {
                if (gallery && gallery.length > 0) {

                    let imagesUpload = await gallery.map(image => {
                        let newImageFormData = new FormData();
                        newImageFormData.append("Id", response.data?.model?.id);
                        newImageFormData.append("Type", '1');
                        newImageFormData.append("MediaFile", image, image.name);
                        return requester.patch('/praises/upload-praise-media', newImageFormData)
                    })

                    axios.all([...imagesUpload]).then(axios.spread((...responses) => {
                        Success();
                        props.setCaseToShow('');
                        props.fetchPraiseData()
                    })).catch(() => {
                        Success();
                        props.setCaseToShow('');
                        props.fetchPraiseData()
                    })
                } else {
                    console.log('added');
                    Success();
                    props.setCaseToShow('');
                    props.praiseData.setScientistPraise([...props.praiseData.scientistPraise, response.data.model]);
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

    const onFileChange = async (e) => {
        console.log(e.target.files[0]);
        setSheikhImage(e.target.files[0] || null)
    }

    const onGalleryChange = async (e) => {
        console.log(e.target.files[0]);

        e.target.files[0] && setGallery([...gallery, e.target.files[0]])
    }

    const deleteFile = (index) => {
        let images = gallery;
        if (index > -1) {
            images.splice(index, 1);
            setGallery([...images])
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}
            <div className='inp-title'>عنوان</div>
            <input
                className={`baqiq-inp ${errors.Title && 'unvalid'}`}
                {...register('Title', { required: true })}
                placeholder='عنوان الثناء'
                style={{ width: '100%', borderRadius: '3rem' }}

            />

            <div className='inp-title'>الوصف</div>
            <textarea
                className={`baqiq-inp ${errors.Description && 'unvalid'}`}
                {...register('Description', { required: true })}
                placeholder='الوصف'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            <div className='inp-title'>اسم الشيخ</div>
            <input
                className={`baqiq-inp ${errors.SheikhName && 'unvalid'}`}
                {...register('SheikhName', { required: true })}
                placeholder='اسم الشيخ'
                style={{ width: '100%', borderRadius: '3rem' }}
            />

            <div className='inp-title'>صورة الشيخ</div>

            <label htmlFor='shiekhImage' className='dashBoardImgCont' style={{ cursor: 'pointer' }}>
                {
                    sheikhImage ? <img src={URL.createObjectURL(sheikhImage)} /> : <img src={"/assets/plus.svg"} style={{ width: '4rem' }} />
                }
            </label>

            <input id={"shiekhImage"} type="file" hidden onChange={(e) => { FileSizeValidator(e, onFileChange) }} accept="image/*" />

            {/* <div>
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
            </div> */}

            <div className='inp-title'>معرض الصور</div>
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
                {
                    gallery.map((image, index) => {
                        return <div key={index} className='dashBoardImgCont' style={{ position: 'relative' }}>


                            <div
                                className='popup__form__nav__closeBtn'
                                style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                onClick={() => deleteFile(index)}
                            >
                                <img src="/assets/Mask Group 67.svg" />
                            </div>


                            <img src={URL.createObjectURL(image)} />
                        </div>
                    })
                }


                <label htmlFor='gallery' className='dashBoardImgCont' style={{ cursor: 'pointer' }}>
                    <img src={"/assets/plus.svg"} style={{ width: '4rem' }} />
                </label>
                <input id={"gallery"} type="file" hidden onChange={(e) => { FileSizeValidator(e, onGalleryChange) }} accept="image/*" />
            </div>




            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='submit' className='add-new-file' style={{ width: '40%', textAlign: 'center', border: 'none' }}>حفظ</button>
            </div>

        </form>
    )
}
