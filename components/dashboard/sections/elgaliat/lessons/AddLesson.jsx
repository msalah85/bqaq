import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Spinner from '../../../../../reusable/spinner/Spinner';
import { Failed, Success } from '../../../alertPopup/AlertPopup';
import axios from 'axios';
import requester from '../../../../../requester/requester';
import SelectBox from 'devextreme-react/select-box';
import { List } from 'devextreme-react';
import { FileSizeValidator } from '../../../../../utils/FileSizeValidator';


export default function AddLesson(props) {

    const [sheikhs, setSheikhs] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [lessonAudio, setLessonAudio] = useState([]);
    const [lessonFiles, setLessonFiles] = useState([]);

    useEffect(() => {
        setShowLoadPanel(true);
        let requestsArray = [];
        requestsArray.push(
            requester.get('/lessons/languages/get')
        );
        requestsArray.push(
            requester.get('/lessons/tags/get')
        );
        requestsArray.push(
            requester.get('/lessons/sheikh/get')
        );

        axios.all([...requestsArray]).then(axios.spread((...responses) => {
            setLanguages(responses[0].data.model);
            setTags(responses[1].data.model);
            setSheikhs(responses[2].data.model);
            setShowLoadPanel(false);

        }))
    }, []);

    const { register, getValues, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
        defaultValues: {
            advantages: []
        }
    });

    const addNewRecord = (data) => {
        setShowLoadPanel(true);
        requester.post(`/lessons/create`, {
            ...data,
        })
            .then(async (lessonResponse) => {
                if (lessonAudio?.length > 0 || lessonFiles?.length > 0) {

                    let audioUpload = await lessonAudio.map(audio => {
                        let newAudioFormData = new FormData();
                        newAudioFormData.append("Source", '3');
                        newAudioFormData.append("Type", '3');
                        newAudioFormData.append("File", audio, audio.name);
                        return requester.patch('/content/albums/upload', newAudioFormData, { headers: { "Content-Type": "multipart/form-data" } });
                    })

                    let filesUpload = await lessonFiles.map(file => {
                        let newFileFormData = new FormData();
                        newFileFormData.append("Source", '3');
                        newFileFormData.append("Type", '4');
                        newFileFormData.append("File", file, file.name);
                        return requester.patch('/content/albums/upload', newFileFormData, { headers: { "Content-Type": "multipart/form-data" } })
                    })

                    axios.all([...audioUpload, ...filesUpload]).then(axios.spread((...responses) => {
                        requester.post(`/lessons/attach-albums`, {
                            lessonId: lessonResponse.data.model?.id,
                            albumsIds: responses.map(fileResponse => {
                                return fileResponse.data.model?.id
                            })
                        })
                            .then(() => {
                                Success();
                                props.setCaseToShow('');
                                props.fetchTableData()
                            }).catch(() => {
                                Success();
                                props.setCaseToShow('');
                                props.fetchTableData()
                            })
                    })).catch(() => {
                        Success();
                        props.setCaseToShow('');
                        props.fetchTableData()
                    })
                } else {
                    Success();
                    props.setCaseToShow('');
                    props.fetchTableData();
                }
            })
            .catch(() => {
                setShowLoadPanel(false);
                Failed();
            })
    };

    const onSubmit = (data) => {
        console.log('onSubmit', data);
        addNewRecord(data);
    };

    const onFileChange = async (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0]) {
            let fileType = e.target.files[0] && e.target.files[0].type || '';
            if (fileType.includes('audio')) {
                setLessonAudio([...lessonAudio, e.target.files[0]]);
            } else {
                setLessonFiles([...lessonFiles, e.target.files[0]]);
            }
        }
    };

    const deleteAudio = (index) => {
        let audio = lessonAudio;
        if (index > -1) {
            audio.splice(index, 1);
            setLessonAudio([...audio])
        }
    }

    const addNewBookmark = () => {
        let newArray = [...bookmarks];
        newArray.push(newArray.length)
        setBookmarks([...newArray]);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}



            <div className='inp-title'>عنوان الدرس</div>
            <input
                className={`baqiq-inp ${errors.title && 'unvalid'}`}
                {...register('title', { required: true })}
                placeholder='عنوان الدرس'
                style={{ width: '100%', borderRadius: '3rem' }}

            />

            <div className='inp-title'>اسم الجاليه</div>
            <input
                className={`baqiq-inp ${errors.galyaName && 'unvalid'}`}
                {...register('galyaName', { required: true })}
                placeholder='اسم الجاليه'
                style={{ width: '100%', borderRadius: '3rem' }}

            />


            <div className='inp-title'>أسم الشيخ</div>
            <SelectBox
                rtlEnabled
                searchEnabled
                noDataText='لا توجد بيانات'
                items={sheikhs}
                valueExpr='id'
                displayExpr='name'
                placeholder="أسم الشيخ"
                onValueChange={(value) => { setValue('sheikhId', value); }}
            />


            <div className='inp-title'>لغة الدرس</div>
            <SelectBox
                rtlEnabled
                searchEnabled
                noDataText='لا توجد بيانات'
                items={languages}
                valueExpr='id'
                displayExpr='name'
                placeholder="لغة الدرس"
                onValueChange={(value) => { setValue('languageId', value); }}
            />




            <div className='inp-title'>تصنيف الدرس</div>
            <SelectBox
                rtlEnabled
                searchEnabled
                noDataText='لا توجد بيانات'
                items={tags}
                valueExpr='id'
                displayExpr='name'
                placeholder="تصنيف الدرس"
                onValueChange={(value) => { setValue('tagId', value); }}
            />




            <div className='inp-title'>عدد الاجزاء</div>
            <input
                className={`baqiq-inp ${errors.parts && 'unvalid'}`}
                {...register('parts', { required: true })}
                placeholder='عدد الاجزاء'
                style={{ width: '100%', borderRadius: '3rem' }}

            />


            <div className='inp-title'>المقدمه</div>
            <textarea
                className={`baqiq-inp ${errors.tenor?.content && 'unvalid'}`}
                {...register('tenor.content', { required: true })}
                placeholder='المقدمه'
                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
            />

            {
                bookmarks.map((bookmark, index) => {
                    return (
                        <>

                            <div className='inp-title'>عنوان الفقره</div>

                            <input
                                className={`baqiq-inp ${errors?.tenor?.bookmarks && errors?.tenor?.bookmarks[index]?.title && 'unvalid'}`}
                                {...register(`tenor.bookmarks[${index}].title`, { required: true })}
                                placeholder='عنوان الفقره'
                                style={{ width: '100%', borderRadius: '3rem' }}

                            />

                            <div className='inp-title'>وصف الفقرة</div>

                            <textarea
                                className={`baqiq-inp ${errors?.tenor?.bookmarks && errors?.tenor?.bookmarks[index]?.reference && 'unvalid'}`}
                                {...register(`tenor.bookmarks[${index}].reference`, { required: true })}
                                placeholder='وصف الفقرة'
                                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
                            />

                        </>
                    )
                })
            }
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <button onClick={addNewBookmark} className='baqiq-text-btn' type='button'>إضافة فقرة جديد</button>
            </div>



            {lessonAudio.length > 0 && <>
                <div className='inp-title' style={{ marginTop: '8rem', fontSize: '1.8rem', fontWeight: '700' }}>الصوتيات</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {
                        lessonAudio?.map((audio, index) => {
                            return <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <audio controls >
                                    <source src={URL.createObjectURL(audio)} type="audio/ogg" />
                                    <source src={URL.createObjectURL(audio)} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                                <img src="/assets/delete.svg" style={{ width: '3rem', cursor: 'pointer' }} onClick={() => deleteAudio(index)} />
                            </div>
                        })
                    }

                </div>
            </>}

            {lessonFiles.length > 0 && <>
                <div className='inp-title' style={{ marginTop: '8rem', fontSize: '1.8rem', fontWeight: '700' }}>ملفات الدرس</div>
                <List
                    noDataText={' لا يوجد ملفات '}
                    className='mt-2'
                    items={lessonFiles}
                    displayExpr={'name'}
                    height={'auto'}
                    allowItemDeleting
                    itemDeleteMode='static'
                    rtlEnabled
                    onItemDeleted={(e) => { setLessonFiles([...lessonFiles]) }}
                />
            </>
            }
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <label htmlFor='input-file-upload' className='add-new-file'>إضافة ملف صوتي او ملف (PDF/WORD)</label>
                </div>
                <input id={"input-file-upload"} type="file" onChange={(e) => { FileSizeValidator(e, onFileChange) }} hidden accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, audio/*" />
            </div>



            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='submit' className='add-new-file' style={{ width: '40%', textAlign: 'center', border: 'none' }}>حفظ</button>
            </div>

        </form>
    )
}
