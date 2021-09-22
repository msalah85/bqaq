import React, { useEffect } from 'react'
import LogoBar from '../../reusable/navbars/LogoBar'
import NavBar from '../../reusable/navbars/NavBar'
import TabsBar from '../../reusable/navbars/TabsBar'
import BroadcastSection from './broadcastSection/BroadcastSection'
import NewsSectoin from './newsSection/NewsSectoin'
import ProjectSection from './projectsSection/ProjectSection'
import SectionBar from './sectionsBar/SectionBar'
import VisualBroadcastSection from './visualBroadcastSection/VisualBroadcastSection'
import OurScientistSection from './ourScientistSection/OurScientistSection'
import NewAudioSection from './newAudioSection/NewAudioSection'
import NewVideoSection from './newVideoSection/NewVideoSection'
import CharityNumbersSection from './charityNumbersSection/CharityNumbersSection'
import CarouselBar from './banners/CarouselBar'
import { GET_HOME_DATA } from '../../redux/actions/home/index';
import { connect } from 'react-redux';

function Home(props) {

    useEffect(() => {
        props.GET_HOME_DATA();
    }, []);

    useEffect(() => {

        console.log('homeData', props.homeData);
    })
    return (
        <>

            <NavBar />
            <LogoBar />
            <TabsBar />
            <CarouselBar />


            <NewsSectoin news={props.homeData?.news} />
            <SectionBar />
            <ProjectSection projects={props.homeData?.projects} />
            {/* <BroadcastSection />
            <VisualBroadcastSection /> */}
            <OurScientistSection scientist={props.homeData?.praise} />
            <NewAudioSection />
            <NewVideoSection videos={props.homeData?.videos} />
            <CharityNumbersSection counts={props.homeData?.counts} />

        </>
    )
}
const mapStateToProps = (state) => {
    return { homeData: state.home?.homeData?.containers };
};

export default connect(mapStateToProps, { GET_HOME_DATA })(Home);