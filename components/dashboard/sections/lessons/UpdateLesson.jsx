import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Spinner from '../../../../reusable/spinner/Spinner';
import { Failed, Success } from '../../alertPopup/AlertPopup';
import axios from 'axios';
import requester from '../../../../requester/requester';
import SelectBox from 'devextreme-react/select-box';
import { List } from 'devextreme-react';
import { FileSizeValidator } from '../../../../utils/FileSizeValidator';


export default function UpdateLesson(props) {

    const [sheikhs, setSheikhs] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [tags, setTags] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [lessonDetails, setLessonDetails] = useState({});
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [lessonAudio, setLessonAudio] = useState([]);
    const [lessonFiles, setLessonFiles] = useState([]);

    useEffect(() => {
        if (props.selectedLesson.id) {
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

            requestsArray.push(
                requester.get(`/lessons/get-details?lessonId=${props.selectedLesson?.id}`)
            );

            axios.all([...requestsArray])
                .then(axios.spread((...responses) => {

                    setShowLoadPanel(false);
                    setLanguages(responses[0].data.model);
                    setTags(responses[1].data.model);
                    setSheikhs(responses[2].data.model);
                    setLessonDetails(responses[3].data.model);
                    setBookmarks([...responses[3].data.model?.tenor?.bookmarks || []])
                    reset(responses[3].data.model);

                }))
                .catch((err) => {
                })
        }

    }, [props.selectedLesson]);

    useEffect(() => {
    }, [lessonFiles])
    
    const { register, getValues, reset, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
        defaultValues: {
            advantages: []
        }
    });

    const updateRecord = (data) => {
        setShowLoadPanel(true);
        data.tenor['Content'] = 'test';
        requester.put(`/lessons/update`, {
            ...data,
            audioUrl: undefined,
            date: undefined,
            documentUrl: undefined,
            hijriDate: undefined,
            media: undefined,
            sheikhName: undefined,
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
        updateRecord(data);
    };

    const onFileChange = async (e) => {
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

    const removeBookmark = (index) => {
        let newArray = [...bookmarks];
        newArray.splice(index, 1);
        lessonDetails.tenor.bookmarks = newArray;
        setLessonDetails(lessonDetails);
        reset(lessonDetails);
        setBookmarks([...newArray]);
    }

    const deleteMedia = (id) => {
        setShowLoadPanel(true);

        requester.delete(`/content/albums/delete?id=${id}`,).then((response) => {
            requester.get(`/lessons/get-details?lessonId=${props.selectedLesson?.id}`).then((res) => {
                setLessonDetails(res.data.model);
                setShowLoadPanel(false);
                Success();
            }).catch(() => {
                props.setCaseToShow('');
            })

        }).catch(() => {
            setShowLoadPanel(false)
            Failed();
        })
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            {showLoadPanel && <Spinner />}



            <div className='inp-title'>?????????? ??????????</div>
            <input
                className={`baqiq-inp ${errors.title && 'unvalid'}`}
                {...register('title', { required: true })}
                placeholder='?????????? ??????????'
                style={{ width: '100%', borderRadius: '3rem' }}

            />

            <div className='inp-title'>?????? ??????????</div>
            <SelectBox
                rtlEnabled
                searchEnabled
                noDataText='???? ???????? ????????????'
                dataSource={sheikhs}
                valueExpr="id"
                displayExpr="name"
                placeholder={lessonDetails.sheikhName || "?????? ??????????"}
                onValueChange={(value) => { setValue('sheikhId', value); }}
            />


            <div className='inp-title'>?????? ??????????</div>
            <SelectBox
                rtlEnabled
                searchEnabled
                noDataText='???? ???????? ????????????'
                items={languages}
                valueExpr='id'
                displayExpr='name'
                placeholder={"?????? ??????????"}
                onValueChange={(value) => { setValue('languageId', value); }}
            />




            <div className='inp-title'>?????????? ??????????</div>
            <SelectBox
                rtlEnabled
                searchEnabled
                noDataText='???? ???????? ????????????'
                items={tags}
                valueExpr='id'
                displayExpr='name'
                placeholder="?????????? ??????????"
                onValueChange={(value) => { setValue('tagId', value); }}
            />




            <div className='inp-title'>?????? ??????????????</div>
            <input
                className={`baqiq-inp ${errors.parts && 'unvalid'}`}
                {...register('parts', { required: true })}
                placeholder='?????? ??????????????'
                style={{ width: '100%', borderRadius: '3rem' }}

            />

            {
                bookmarks.map((bookmark, index) => {
                    return (
                        <div className='bookmark-card' key={index}>
                            <div onClick={() => removeBookmark(index)}
                                className="dx-list-static-delete-button dx-button dx-button-normal dx-button-mode-contained dx-widget dx-rtl dx-button-has-icon"
                                aria-label="remove" role="button">
                                <div className="dx-button-content"><i className="dx-icon dx-icon-remove"></i></div>
                            </div>
                            <div className='inp-title'>?????????? ????????????</div>

                            <input
                                className={`baqiq-inp ${errors?.tenor?.bookmarks && errors?.tenor?.bookmarks[index]?.title && 'unvalid'}`}
                                {...register(`tenor.bookmarks[${index}].title`, { required: true })}
                                placeholder='?????????? ????????????'
                                style={{ width: '100%', borderRadius: '3rem' }}

                            />

                            <div className='inp-title'>?????? ????????????</div>

                            <textarea
                                className={`baqiq-inp ${errors?.tenor?.bookmarks && errors?.tenor?.bookmarks[index]?.reference && 'unvalid'}`}
                                {...register(`tenor.bookmarks[${index}].reference`, { required: true })}
                                placeholder='?????? ????????????'
                                style={{ width: '100%', resize: 'vertical', maxHeight: '25rem', minHeight: '5rem', height: '10rem', borderRadius: '3rem', padding: '1.2rem', transition: 'none' }}
                            />

                        </div>
                    )
                })
            }
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <button onClick={addNewBookmark} className='baqiq-text-btn' type='button'>?????????? ???????? ????????</button>
            </div>



            {((lessonAudio.length > 0) || (lessonDetails?.media?.length > 0)) && <>
                <div className='inp-title' style={{ marginTop: '8rem', fontSize: '1.8rem', fontWeight: '700' }}>????????????????</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {
                        lessonDetails?.media?.map((audio, index) => {
                            if (audio.type == 'Audio')
                                return <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                    <audio controls >
                                        <source src={audio.url} type="audio/ogg" />
                                        <source src={audio.url} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                    <img src="/assets/delete.svg" style={{ width: '3rem', cursor: 'pointer' }} onClick={() => deleteMedia(audio.id)} />
                                </div>

                        })
                    }
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

            <div className='inp-title' style={{ marginTop: '8rem', fontSize: '1.8rem', fontWeight: '700' }}>?????????? ??????????</div>
            <List
                noDataText={' ???? ???????? ?????????? ????????????'}
                className='mt-2'
                items={lessonDetails?.media?.filter(file => file.type == 'Document')}
                displayExpr={'url'}
                height={'auto'}
                rtlEnabled
                allowItemDeleting
                onItemDeleted={(e) => { deleteMedia(e.itemData.id); }}
            />
            <List
                noDataText={' ???? ???????? ?????????? ???????????? ?????? ???????? '}
                className='mt-2'
                items={lessonFiles}
                displayExpr={'name'}
                height={'auto'}
                allowItemDeleting
                itemDeleteMode='static'
                rtlEnabled
                onItemDeleted={(e) => { setLessonFiles([...lessonFiles]) }}
            />


            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <label htmlFor='input-file-upload' className='add-new-file'>?????????? ?????? ???????? ???? ?????? (PDF/WORD)</label>
                </div>
                <input id={"input-file-upload"} type="file" onChange={(e) => { FileSizeValidator(e, onFileChange) }} hidden accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, audio/*" />
            </div>



            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button type='submit' className='add-new-file' style={{ width: '40%', textAlign: 'center', border: 'none' }}>??????</button>
            </div>

        </form>
    )
}
