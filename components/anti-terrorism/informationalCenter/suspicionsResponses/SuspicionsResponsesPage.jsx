import React, { useEffect, useState } from 'react';
import SuspicionsResponsesDetails from './SuspicionsResponsesDetails'
import SuspicionsResponsesSidebar from './SuspicionsResponsesSidebar'
import { GET_SUSPICIONS } from '../../../../redux/actions/anti-terrorism/index';
import { connect } from 'react-redux';
function SuspicionsResponsesPage(props) {
    const [selectedTopic, setSelectedTopic] = useState({});

    useEffect(() => {
        props.GET_SUSPICIONS();
    }, []);

    useEffect(() => {
        setSelectedTopic(props.suspicionsData?.[0]);
    }, [props.suspicionsData]);

    return (
        <div className='lessons general-container'>
            <SuspicionsResponsesSidebar breadcrumbs={[{ name: 'مركز مكافحة الإرهاب', url: '/anti-terrorism' }]} pageTopicController={{ selectedTopic, setSelectedTopic }} suspicionsData={props.suspicionsData} />
            <div className='lessons__body'>
                <SuspicionsResponsesDetails pageTopicController={{ selectedTopic, setSelectedTopic }} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { suspicionsData: state.antiTerrorism?.suspicions };
};

export default connect(mapStateToProps, { GET_SUSPICIONS })(SuspicionsResponsesPage);