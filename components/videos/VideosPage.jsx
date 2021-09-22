import React, { useEffect, useState } from 'react';
import VideosDetails from './VideosDetails';
import VideosSidebar from './VideosSidebar';
import { GET_VIDEOS } from '../../redux/actions/videos/index'
import { connect } from 'react-redux';

function VideosPage(props) {

    const [pageFilters, setPageFilters] = useState({
        sheikhId: null,
        languageId: null,
        tagId: null,
        categoryName: null,
        usePaging: false,
        pageNumber: 0
    });

    useEffect(() => {
        props.GET_VIDEOS(pageFilters);
    }, [pageFilters.languageId, pageFilters.tagId, pageFilters.sheikhId]);

    return (
        <div className='lessons general-container'>
            <VideosSidebar
                breadcrumbs={[{ name: 'المرئيات', url: '/videos' }]}
                pageFiltersController={{ pageFilters, setPageFilters }}
                indexer={props.videosData}
            />
            <div className='lessons__body'>
                <VideosDetails pageFiltersController={{ pageFilters, setPageFilters }} videosData={props.videosData} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { videosData: state.videos?.containers };
};

export default connect(mapStateToProps, { GET_VIDEOS })(VideosPage);