import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Spinner from '../../../../../reusable/spinner/Spinner';
import { Failed, Success } from '../../../alertPopup/AlertPopup';
import axios from 'axios';
import requester from '../../../../../requester/requester';
import ReactPlayer from 'react-player';
import SelectBox from 'devextreme-react/select-box';
import ReactImageFallback from 'react-image-fallback';
import { FileSizeValidator } from '../../../../../utils/FileSizeValidator';

export default function AddPost(props) {

    useEffect(() => {
        setShowLoadPanel(true);

        requester.get('/media-center/categories/get')
            .then(res => {
                setCategory(res.data.model)
                setShowLoadPanel(false);
            })
    }, []);

    const postTypes = [
        { value: 1, name: "اخبار" },
        { value: 2, name: "أقوال الصحف" },
        { value: 3, name: "تقارير و انجزات" }
    ]
    const [category, setCategory] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [postImages, setPostImages] = useState([]);
    const [postVideos, setPostVideos] = useState([]);
    const [coverImg, setCoverImg] = useState(null);


    const { register, setValue, clearErrors, setError, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
        defaultValues: {
            advantages: []
        },

    });

    const addNewRecord = (data) => {
        setShowLoadPanel(true);
        requester.post(`/media-center/posts/create`, {
            ...data, isRelatedToWomanSection: false, type: props.postType
        })
            .then(async (response) => {
                if (postImages?.length > 0 || postVideos?.length > 0 || coverImg) {



                    let imagesUpload = await postImages.map(image => {
                        let newImageFormData = new FormData();
                        newImageFormData.append("Source", 3);
                        newImageFormData.append("Type", '1');
                        newImageFormData.append("File", image, image.name);
                        return requester.patch('/content/albums/upload', newImageFormData, { headers: { "Content-Type": "multipart/form-data" } });
                    }) || []



                    let videosUpload = await postVideos.map(video => {
                        let newVideoFormData = new FormData();
                        newImageFormData.append("Source", 3);
                        newVideoFormData.append("Type", '2');
                        newVideoFormData.append("File", video, video.name);
                        return requester.patch('/projects/upload-project-media', newVideoFormData, { headers: { "Content-Type": "multipart/form-data" } })
                    }) || []



                    if (coverImg) {
                        let coverFormData = new FormData();
                        coverFormData.append("CoverImage", coverImg, coverImg.name);
                        coverFormData.append("PostId", response.data.model?.id);
                        var coverImage = requester.patch('/media-center/posts/upload-cover', coverFormData)
                    }



                    axios.all([...imagesUpload, ...videosUpload, coverImage])
                        .then(axios.spread((...responses) => {
                            var media = {
                                postId: response.data.model?.id,
                                albumsIds: responses.map(response => response.data.model?.id).filter(Boolean)
                            }

                            media.albumsIds?.length > 0 ? requester.patch('/media-center/posts/set-media', { ...media })
                                .then(() => {
                                    Success();
                                    props.setCaseToShow('');
                                    props.fetchTableData();
                                })
                                .catch(() => {
                                    setShowLoadPanel(false);
                                    Failed();
                                })
                                :
                                Success();
                            props.setCaseToShow('');
                            props.fetchTableData();


                        }))
                        .catch(() => {
                            setShowLoadPanel(false);
                            Failed();
                        })
                } else {
                    console.log('added');
                    Success();
                    props.setCaseToShow('');
                    props.fetchTableData();
                }
            })
            .catch((err) => {
                console.log("err", err);
                setShowLoadPanel(false);
                Failed();
            })
    }

    const onSubmit = (data) => {
        console.log('newPraise', register);
        if (!data.categoryId) {

            (!data.categoryId) && setError("categoryId");

        } else {
            addNewRecord(data);
        }

    }

    const deleteImage = (index) => {
        let images = postImages;
        if (index > -1) {
            images.splice(index, 1);
            setPostImages([...images])
        }
    }

    const deleteVideo = (index) => {
        let videos = postVideos;
        if (index > -1) {
            videos.splice(index, 1);
            setPostVideos([...videos])
        }
    }

    const onFileChange = async (e) => {
        if (e.target.files[0]) {
            let fileType = e.target.files[0] && e.target.files[0].type || '';
            if (fileType.includes('image')) {
                setPostImages([...postImages, e.target.files[0]]);
            } else if (fileType.includes('video')) {
                setPostVideos([...postVideos, e.target.files[0]]);
            }
        }
    }

    const onCoverChange = (event) => {
        console.log('event', event);
        if (event.target.files[0]) {
            let imgSrc = event.target.files[0];
            setCoverImg(imgSrc);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}

            <div className='inp-title'>أسم الموضوع</div>
            <input
                className={`baqiq-inp ${errors.title && 'unvalid'}`}
                {...register('title', { required: true })}
                placeholder='أسم الموضوع'
                style={{ width: '100%', borderRadius: '3rem' }}

            />

            <div className='inp-title'>عنوان فرعي</div>
            <input
                className={`baqiq-inp ${errors.subtitle && 'unvalid'}`}
                {...register('subtitle', { required: true })}
                placeholder='عنوان فرعي'
                style={{ width: '100%', borderRadius: '3rem' }}

            />

            <div className='inp-title'>الوصف</div>
            <textarea
                className={`baqiq-inp ${errors.content && 'unvalid'}`}
                {...register('content', { required: true })}
                placeholder='الوصف'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />



            <div className='inp-title'>تصنيف الموضوع</div>
            <SelectBox
                rtlEnabled
                searchEnabled
                noDataText='لا توجد بيانات'
                items={category}
                valueExpr='id'
                displayExpr='categoryName'
                placeholder="تصنيف الموضوع"
                onValueChange={(value) => { setValue('categoryId', value); clearErrors('categoryId'); }}
                isValid={!errors.categoryId}
            />




            <label htmlFor='dashboard-img-upload' className={"dashboard-edit-img-cont"}>
                <div className={"dashboard-img-cont-overlay"} >اضف</div>
                <ReactImageFallback
                    src={coverImg && URL.createObjectURL(coverImg)}
                    fallbackImage={'/assets/fallbacks/Media Center.svg'}
                    className="dashboard-img"
                    id={"dashboard-img-update"}
                />
            </label>
            <form hidden>
                <input id={"dashboard-img-upload"} type="file" accept="image/*"
                    onChange={(e) => { FileSizeValidator(e, onCoverChange) }} />
            </form>



            {postImages.length > 0 && <div className='inp-title'>معرض الصور</div>}
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

                {
                    postImages?.map((image, index) => {

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



            {postVideos.length > 0 && <div className='inp-title'>معرض الفيديوهات</div>}
            <div className='whoWeAreDetails__left__section__gridCont' style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>

                {
                    postVideos?.map((video, index) => {
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <label htmlFor='input-file-upload' className='add-new-file'>إضافة فيديو او صوره</label>
                </div>
                <input id={"input-file-upload"} type="file" onChange={(e) => { FileSizeValidator(e, onFileChange) }} hidden />
            </div>



            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='submit' className='add-new-file' style={{ width: '40%', textAlign: 'center', border: 'none' }}>حفظ</button>
            </div>

        </form >
    )
}
