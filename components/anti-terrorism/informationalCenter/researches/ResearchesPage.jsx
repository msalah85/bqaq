import React, { useEffect, useState } from 'react';
import ResearchesDetails from './ResearchesDetails'
import ResearchesSidebar from './ResearchesSidebar'
import { GET_RESEARCH } from '../../../../redux/actions/anti-terrorism/index';
import { connect } from 'react-redux';

function ResearchesPage(props) {
    const [selectedTopic, setSelectedTopic] = useState({});

    useEffect(() => {
        props.GET_RESEARCH();
    }, []);

    useEffect(() => {
        setSelectedTopic(props.researchData?.[0]);
    }, [props.researchData]);

    return (
        <div className='lessons general-container'>
            <ResearchesSidebar breadcrumbs={[{ name: 'مركز مكافحة الإرهاب', url: '/anti-terrorism' }]} pageTopicController={{ selectedTopic, setSelectedTopic }} researchData={props.researchData} />
            <div className='lessons__body'>
                <ResearchesDetails pageTopicController={{ selectedTopic, setSelectedTopic }} />
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return { researchData: state.antiTerrorism?.researches };
};

export default connect(mapStateToProps, { GET_RESEARCH })(ResearchesPage);