import React, { useEffect, useState } from 'react';
import { GET_ELGALIAT } from '../../redux/actions/elgaliat/index';
import { connect } from 'react-redux';
import ElgaliatSidebar from './ElgaliatSidebar';
import ElgaliatDetails from './home/ElgaliatDetails';
import ElgaliatDesignsDetails from './designs/ElgaliatDesignsDetails';
import ElgaliatVideos from './videos/ElgaliatVideos'

function ElgaliatPage(props) {
    const [pageFilters, setPageFilters] = useState({
        languageId: null,
        tagId: null,
    });

    const [pageToShow, setPageToShow] = useState('lessons');

    useEffect(() => {
        console.log(props.elgaliatData);
        props.GET_ELGALIAT(pageFilters);
    }, [pageFilters.languageId, pageFilters.tagId]);

    return (
        <div className='lessons general-container'>

            <ElgaliatSidebar
                showLangs={pageToShow != 'designs'}
                breadcrumbs={[{ name: 'الجاليات', url: '/el-galiat' }]}
                pageControll={{ pageToShow, setPageToShow }}
                pageFiltersController={{ pageFilters, setPageFilters }}
                indexer={props.elgaliatData?.containers?.languages}
            />

            <div className='lessons__body'>

                {
                    pageToShow == 'lessons' && <ElgaliatDetails pageFiltersController={{ pageFilters, setPageFilters }} lessonsData={props.elgaliatData?.containers} /> ||
                    pageToShow == 'designs' && <ElgaliatDesignsDetails designsData={props.elgaliatData?.containers?.designs} /> ||
                    pageToShow == 'videos' && <ElgaliatVideos videosData={props.elgaliatData?.containers?.videos} />
                }

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { elgaliatData: state.elgaliat };
};

export default connect(mapStateToProps, { GET_ELGALIAT })(ElgaliatPage);