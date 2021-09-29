import React, { useEffect, useState } from 'react'
import { Gallery, Item } from 'react-photoswipe-gallery';
import { useForm } from 'react-hook-form';
import Spinner from '../../../../../reusable/spinner/Spinner';
import { Failed, Success } from '../../../alertPopup/AlertPopup';
import axios from 'axios';
import requester from '../../../../../requester/requester';
import { FileSizeValidator } from '../../../../../utils/FileSizeValidator';

export default function UpdatePage(props) {
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [praiseDetails, setPraiseDetails] = useState({});
    const [gallery, setGallery] = useState([]);
    const [sheikhImage, setSheikhImage] = useState(null);

    useEffect(async () => {
        if (props.selectedScientistPraise) {
            setShowLoadPanel(true);

            await requester.get(`/praises/get-praise-details?praiseId=${props.selectedScientistPraise?.id}`).then(response => {
                setShowLoadPanel(false);
                setPraiseDetails(response.data.model);
                reset(response.data.model);
            }).catch(() => { setShowLoadPanel(false) });
        }

    }, [props.selectedScientistPraise])

    const { register, reset, getValues, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
    });

    const updateRecord = (data) => {
        // let newPraise = new FormData();

        // newPraise.append("title", data.title);
        // newPraise.append("description", data.description);
        // newPraise.append("sheikhName", data.sheikhName);
        // sheikhImage && newPraise.append("sheikhImage", sheikhImage, sheikhImage.name);
        setShowLoadPanel(true)
        requester.put(`/praises/update-praise`, { id: data.id, sheikhName: data.sheikhName, title: data.title, description: data.description })
            .then(async (response) => {
                if (gallery && gallery.length > 0) {

                    let imagesUpload = await gallery.map(image => {
                        let newImageFormData = new FormData();
                        newImageFormData.append("Id", response.data?.model?.id);
                        newImageFormData.append("Type", '1');
                        newImageFormData.append("MediaFile", image, image.name);
                        return requester.patch('/praises/upload-praise-media', newImageFormData)
                    })

                    if (sheikhImage) {
                        let sheikhImageFormData = new FormData();
                        sheikhImageFormData.append("PraiseId", praiseDetails.id);
                        sheikhImageFormData.append("File", sheikhImage);

                        var sheikhImageUpload = requester.patch(`/praises/change-or-remove-avatar`, sheikhImageFormData)
                    }

                    axios.all([...imagesUpload, sheikhImageUpload]).then(axios.spread((...responses) => {
                        Success();
                        props.setCaseToShow('');
                        props.fetchPraiseData()
                    })).catch(() => {
                        Success();
                        props.setCaseToShow('');
                        props.fetchPraiseData()
                    })
                }
                else {
                    if (sheikhImage) {
                        let sheikhImageFormData = new FormData();
                        sheikhImageFormData.append("PraiseId", praiseDetails.id);
                        sheikhImageFormData.append("File", sheikhImage);

                        requester.patch(`/praises/change-or-remove-avatar`, sheikhImageFormData).then(() => {
                            Success();
                            props.setCaseToShow('');
                            props.fetchPraiseData();
                        })
                    }
                    else {
                        console.log('added');
                        Success();
                        props.setCaseToShow('');
                        props.fetchPraiseData();
                    }
                }


            })
            .catch(() => {
                setShowLoadPanel(false);
                Failed();
            })
    }

    const onSubmit = (data) => {
        console.log('newPraise', data);
        updateRecord(data);
    }

    const onGalleryChange = async (e) => {
        e.target.files[0] && setGallery([...gallery, e.target.files[0]])
    }

    const deleteFile = (index) => {
        let images = gallery;
        if (index > -1) {
            images.splice(index, 1);
            setGallery([...images])
        }
    }

    const deleteAvatar = () => {
        setShowLoadPanel(true)
        let deleteImage = new FormData();
        deleteImage.append("PraiseId", praiseDetails.id);
        requester.patch(`/praises/change-or-remove-avatar`, deleteImage).then((response) => {
            setShowLoadPanel(false)
            setPraiseDetails({ ...praiseDetails, sheikhImage: null })
            Success();
        }).catch(() => {
            setShowLoadPanel(false)
            Failed();
        })
    }

    const onAvatarChange = async (e) => {
        setSheikhImage(e.target.files[0] || null)
    }

    const deleteMedia = (mediaUrl) => {
        setShowLoadPanel(true);
        let deleteImage = new FormData();
        deleteImage.append("Id", praiseDetails.id);
        deleteImage.append("MediaUrl", mediaUrl);

        requester.patch(`/praises/remove-praise-media`, deleteImage).then((response) => {
            setShowLoadPanel(false)
            setPraiseDetails({ ...praiseDetails, media: response.data?.model?.media })
            Success();
        }).catch(() => {
            setShowLoadPanel(false)
            Failed();
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}
            <div className='inp-title'>عنوان</div>
            <input
                className={`baqiq-inp ${errors.title && 'unvalid'}`}
                {...register('title', { required: true })}
                placeholder='عنوان الثناء'
                style={{ width: '100%', borderRadius: '3rem' }}

            />

            <div className='inp-title'>الوصف</div>
            <textarea
                className={`baqiq-inp ${errors.description && 'unvalid'}`}
                {...register('description', { required: true })}
                placeholder='الوصف'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            <div className='inp-title'>اسم الشيخ</div>
            <input
                className={`baqiq-inp ${errors.sheikhName && 'unvalid'}`}
                {...register('sheikhName', { required: true })}
                placeholder='اسم الشيخ'
                style={{ width: '100%', borderRadius: '3rem' }}
            />

            <div className='inp-title'>صورة الشيخ</div>

            {/* <label htmlFor='shiekhImage' className='dashBoardImgCont' style={{ cursor: 'pointer' }}>
                {
                    sheikhImage ? <img src={URL.createObjectURL(sheikhImage)} /> : <img src={"/assets/plus.svg"} style={{ width: '4rem' }} />
                }
            </label>

            <input id={"shiekhImage"} type="file" hidden onChange={onFileChange} accept="image/*" /> */}

            <div className='dashBoardImgCont' style={{ position: 'relative' }}>
                {praiseDetails?.sheikhImage && <div
                    className='popup__form__nav__closeBtn'
                    style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                    onClick={() => deleteAvatar()}
                >
                    <img src="/assets/Mask Group 67.svg" />
                </div>}
                {praiseDetails?.sheikhImage ? <Gallery>
                    <Item
                        original={praiseDetails?.sheikhImage}
                        thumbnail={praiseDetails?.sheikhImage}
                        width="1024"
                        height="1024"
                    >
                        {({ ref, open }) => (
                            <img ref={ref} onClick={open} src={praiseDetails?.sheikhImage} onError={e => { e.target.src = "/assets/fallbacks/news-fallback-image.png" }} />
                        )}
                    </Item>
                </Gallery> :
                    <>
                        <label htmlFor='shiekhImage' className='dashBoardImgCont' style={{ cursor: 'pointer' }}>
                            {
                                sheikhImage ? <img src={URL.createObjectURL(sheikhImage)} /> : <img src={"/assets/plus.svg"} style={{ width: '4rem' }} />
                            }
                        </label>

                        <input id={"shiekhImage"} type="file" hidden onChange={(e) => { FileSizeValidator(e, onAvatarChange) }} accept="image/*" />
                    </>
                }
            </div>

            <div className='inp-title'>معرض الصور</div>
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
                {
                    praiseDetails?.media?.images.map((image, index) => {
                        return <div key={index} className='dashBoardImgCont' style={{ position: 'relative' }}>
                            <div
                                className='popup__form__nav__closeBtn'
                                style={{ position: 'absolute', top: '0', right: '0', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                onClick={() => deleteMedia(image)}
                            >
                                <img src="/assets/Mask Group 67.svg" />
                            </div>
                            <Gallery>
                                <Item
                                    original={image}
                                    thumbnail={image}
                                    width="1024"
                                    height="1024"
                                >
                                    {({ ref, open }) => (
                                        <img ref={ref} onClick={open} src={image} onError={e => { e.target.src = "/assets/fallbacks/news-fallback-image.png" }} />
                                    )}
                                </Item>
                            </Gallery>
                        </div>
                    })
                }

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
