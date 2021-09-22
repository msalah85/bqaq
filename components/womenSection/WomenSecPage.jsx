import React, { useEffect, useState } from 'react';
import WomenSecDetails from './WomenSecDetails'
import WomenSecSidebar from './WomenSecSidebar'
import { GET_WOMEN_SECTION } from '../../redux/actions/women-section/index'
import { connect } from 'react-redux';

function WomenSecPage(props) {

    const [pageFilters, setPageFilters] = useState({
        postId: null,
    });

    useEffect(() => {
        props.GET_WOMEN_SECTION();
    }, []);

    useEffect(() => {
        setPageFilters({ postId: props.womenSectionData?.containers?.titles[0].id })
    }, [props.womenSectionData]);

    return (
        <div className='lessons general-container'>
            <WomenSecSidebar breadcrumbs={[{ name: 'القسم النسائي', url: '/women-section' }]} pageFiltersController={{ pageFilters, setPageFilters }} indexer={props.womenSectionData?.containers?.titles} />
            <div className='lessons__body'>
                <WomenSecDetails postData={props.womenSectionData?.containers?.post} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { womenSectionData: state.womenSection };
};

export default connect(mapStateToProps, { GET_WOMEN_SECTION })(WomenSecPage);