import React, { useEffect } from 'react'
import ArticleDetailsPage from '../../../components/mediaCenter/newspapers/article/ArticleDetailsPage'
import ArticleDetailsSidebar from '../../../components/mediaCenter/newspapers/article/ArticleDetailsSidebar'
import LogoBar from '../../../reusable/navbars/LogoBar'
import NavBar from '../../../reusable/navbars/NavBar'
import TabsBar from '../../../reusable/navbars/TabsBar'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { GET_POST_DETAILS } from '../../../redux/actions/mediaCenter/index';

function Article(props) {
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
                    <ArticleDetailsSidebar breadcrumbs={[{ name: 'المركز الاعلامي', url: '/media-center' }, { name: props.postDetailsData?.title, url: '/media-center/newspapers/0' }]} postDetails={props.postDetailsData} />
                    <div className='lessons__body'>
                        <ArticleDetailsPage postDetails={props.postDetailsData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { postDetailsData: state.mediaCenter?.postDetails };
};

export default connect(mapStateToProps, { GET_POST_DETAILS })(Article);