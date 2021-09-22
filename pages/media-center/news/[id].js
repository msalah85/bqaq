import React, { useEffect } from 'react'
import NewDetailsPage from '../../../components/mediaCenter/news/newDetailsPage/NewDetailsPage'
import NewDetailsSidebar from '../../../components/mediaCenter/news/newDetailsPage/NewDetailsSidebar'
import LogoBar from '../../../reusable/navbars/LogoBar'
import NavBar from '../../../reusable/navbars/NavBar'
import TabsBar from '../../../reusable/navbars/TabsBar'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { GET_POST_DETAILS } from '../../../redux/actions/mediaCenter/index';

function NewDetails(props) {
    const router = useRouter();

    useEffect(() => {

        router.query?.id && props.GET_POST_DETAILS({ postId: router.query.id });
    }, [router.query.id]);


    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <NavBar />
            <LogoBar />
            <TabsBar />
            <div style={{ flex: '1 1 auto' }}>
                <div className='lessons general-container'>
                    <NewDetailsSidebar breadcrumbs={[{ name: 'المركز الاعلامي', url: '/media-center' }, { name: props.postDetailsData?.title, url: '/media-center/news/1' }]} postDetails={props.postDetailsData} />
                    <div className='lessons__body'>
                        <NewDetailsPage postDetails={props.postDetailsData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { postDetailsData: state.mediaCenter?.postDetails };
};

export default connect(mapStateToProps, { GET_POST_DETAILS })(NewDetails);