import React, { useEffect } from 'react';
import VideoInfoCenterDetails from './VideoInfoCenterDetails'
import VideoInfoCenterSidebar from './VideoInfoCenterSidebar'
import { GET_VIDEOS } from '../../../../redux/actions/anti-terrorism/index';
import { connect } from 'react-redux';

function VideoInfoCenterPage(props) {

    useEffect(() => {
        props.GET_VIDEOS();
    }, []);


    return (
        <div className='lessons general-container'>
            <VideoInfoCenterSidebar breadcrumbs={[{ name: 'مركز مكافحة الإرهاب', url: '/anti-terrorism' }]} />
            <div className='lessons__body'>
                <VideoInfoCenterDetails videosData={props.videosData} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { videosData: state.antiTerrorism?.videos };
};

export default connect(mapStateToProps, { GET_VIDEOS })(VideoInfoCenterPage);