import DataGrid, { Column } from 'devextreme-react/data-grid';
import React from 'react'
import PdfSVG from '../../public/assets/Mask Group 16.svg';
import DocSVG from '../../public/assets/Doc.svg';
import parse from 'html-react-parser';

export default function LessonDetailsSection(props) {

    return (
        <div className='lessonsDetailsSec fade-in'>
            <div className='lessonsDetailsSec__topSec'>
                {
                    props.lessonDetailsData?.audioUrl && (
                        <audio controls>
                            <source src={props.lessonDetailsData?.audioUrl} type="audio/mpeg" />
                            <source src={props.lessonDetailsData?.audioUrl} type="audio/ogg" />
                            Your browser does not support the audio element.
                        </audio>
                    )
                }

                {
                    props.lessonDetailsData?.documentUrl && (
                        <a target='_blank' href={props.lessonDetailsData?.documentUrl}>
                            <div className='lessonsDetailsSec__topSec__imgCont'><PdfSVG /></div>
                        </a>
                    )
                }

                {/* <div className='lessonsDetailsSec__topSec__imgCont' style={{ backgroundColor: '#F4F4F4' }}><DocSVG fill='#BCBCBC' /></div> */}
            </div>
            {
                props.selectedTag ?
                    (
                        <>
                            <div className='lessonsDetailsSec__title'>{props.selectedTag.title}</div>
                            <div className='lessonsDetailsSec__desc'>
                                {parse(props.selectedTag.reference)}
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className='lessonsDetailsSec__title'>{props.lessonDetailsData?.title}</div>
                            <div className='lessonsDetailsSec__desc' >
                                {
                                    parse(props.lessonDetailsData?.tenor?.content)
                                }
                            </div>
                        </>
                    )
            }

        </div>
    )
}
