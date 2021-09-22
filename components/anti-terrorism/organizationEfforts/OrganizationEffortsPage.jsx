import React, { useEffect, useState } from 'react';
import OrganizationEffortsDetails from './OrganizationEffortsDetails';
import OrganizationEffortsSidebar from './OrganizationEffortsSidebar';
import { GET_EFFORTS } from '../../../redux/actions/anti-terrorism/index';
import { connect } from 'react-redux';

function OrganizationEffortsPage(props) {

    const [selectedTopic, setSelectedTopic] = useState({});

    useEffect(() => {
        props.GET_EFFORTS();
    }, []);

    useEffect(() => {
        setSelectedTopic(props.effortsData?.[0]);
    }, [props.effortsData]);
    return (
        <div className='lessons general-container'>
            <OrganizationEffortsSidebar breadcrumbs={[{ name: 'مركز مكافحة الإرهاب', url: '/anti-terrorism' }]} pageTopicController={{ selectedTopic, setSelectedTopic }} effortsData={props.effortsData} />
            <div className='lessons__body'>
                <OrganizationEffortsDetails pageTopicController={{ selectedTopic, setSelectedTopic }} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { effortsData: state.antiTerrorism?.efforts };
};

export default connect(mapStateToProps, { GET_EFFORTS })(OrganizationEffortsPage);