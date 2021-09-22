import React, { useEffect, useState } from 'react'
import LessonsDetails from './LessonsDetails'
import LessonsSidebar from './LessonsSidebar'
import { GET_LESSONS } from '../../redux/actions/lessons/index'
import { connect } from 'react-redux';
function LessonsPage(props) {

    const [pageFilters, setPageFilters] = useState({
        languageId: null,
        tagId: null,
        usePaging: false,
    });

    useEffect(() => {
        props.GET_LESSONS(pageFilters);
    }, [pageFilters.languageId, pageFilters.tagId]);

    return (
        <div className='lessons general-container'>
            <LessonsSidebar breadcrumbs={[{ name: 'الدروس', url: '/lessons' }]} pageFiltersController={{ pageFilters, setPageFilters }} indexer={props.lessonsData?.containers?.indexer} />
            <div className='lessons__body'>
                <LessonsDetails pageFiltersController={{ pageFilters, setPageFilters }} lessonsData={props.lessonsData} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { lessonsData: state.lessons.lessonsData };
};

export default connect(mapStateToProps, { GET_LESSONS })(LessonsPage);