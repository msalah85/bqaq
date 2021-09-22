import React, { useEffect, useState } from 'react';
import LessonDetailsSection from './LessonDetailsSection';
import LessonDetailsSidebar from './LessonDetailsSidebar';
// import { GET_LESSON_DETAILS } from '../../redux/actions/lessons/index';
// import { connect } from 'react-redux';
// import { useRouter } from 'next/router';

export default function LessonDetailsPage(props) {
    // const router = useRouter();

    const [selectedTag, setSelectedTag] = useState(null);

    // useEffect(() => {
    //     router.query?.id && props.GET_LESSON_DETAILS({ lessonId: router.query.id });
    // }, [router.query.id]);

    return (
        <>
            {
                props.lessonDetailsData && <div className='lessons general-container'>
                    <LessonDetailsSidebar
                        breadcrumbs={[{ name: 'الدروس', url: '/lessons' }, { name: props.lessonDetailsData?.title, url: '/lessons' }]}
                        pageFiltersController={{ selectedTag, setSelectedTag }}
                        lessonDetailsData={props.lessonDetailsData}
                    />
                    <div className='lessons__body'>
                        <LessonDetailsSection lessonDetailsData={props.lessonDetailsData} selectedTag={selectedTag} />
                    </div>
                </div>
            }
        </>

    )
}

// const mapStateToProps = (state) => {
//     return { lessonDetailsData: state.lessons?.lessonDetailsData };
// };

// export default connect(mapStateToProps, { GET_LESSON_DETAILS })(LessonDetailsPage);