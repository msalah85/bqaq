import React, { useEffect } from 'react';
import AudioInfoCenterDetails from './AudioInfoCenterDetails'
import AudioInfoCenterSidebar from './AudioInfoCenterSidebar'
import { GET_AUDIOS } from '../../../../redux/actions/anti-terrorism/index';
import { connect } from 'react-redux';

function AudioInfoCenterPage(props) {

    useEffect(() => {
        props.GET_AUDIOS();
    }, []);

    return (
        <div className='lessons general-container'>
            <AudioInfoCenterSidebar breadcrumbs={[{ name: 'مركز مكافحة الإرهاب', url: '/anti-terrorism' }]} />
            <div className='lessons__body'>
                <AudioInfoCenterDetails audioData={props.audioData} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { audioData: state.antiTerrorism?.audios };
};

export default connect(mapStateToProps, { GET_AUDIOS })(AudioInfoCenterPage);