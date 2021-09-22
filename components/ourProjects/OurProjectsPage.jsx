import React, { useEffect } from 'react'
import OurProjectsDetails from './OurProjectsDetails'
import OurProjectsSidebar from './OurProjectsSidebar'
import { GET_OUR_PROJECTS } from '../../redux/actions/our-projects/index'
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function OurProjectsPage(props) {
    const router = useRouter();

    useEffect(() => {
        props.GET_OUR_PROJECTS();
    }, []);

    useEffect(() => {
        if ((router.query?.id == 'index') && props.ourProjectData.containers) {

            router.replace(`${props.ourProjectData.containers?.indexer[0]?.id}`)
        }

    }, [props.ourProjectData]);

    return (
        <div className='whoWeAre general-container'>
            <OurProjectsSidebar breadcrumbs={[{ name: 'مشاريع الجمعيه', url: '/our-projects' }, { name: props.ourProjectData?.containers?.projects?.find(project => project.id == router.query.id)?.name, url: '/our-projects' }]} projectsList={props.ourProjectData?.containers?.indexer} />
            <div className='whoWeAre__body'>
                <OurProjectsDetails projectDetails={props.ourProjectData?.containers?.projects} audio={props.ourProjectData.audio} video={props.ourProjectData.videos} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { ourProjectData: state.ourProjects };
};

export default connect(mapStateToProps, { GET_OUR_PROJECTS })(OurProjectsPage);