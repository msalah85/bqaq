import { combineReducers } from "redux";
import authorization from './registration/index';
import whoWeAre from './who-we-are/index';
import ourProjects from './our-projects/index';
import lessons from './lessons/index';
import videos from './videos/index';
import elgaliat from './elgaliat/index';
import bookStore from './bookstore/index'
import womenSection from './women-section/index';
import mediaCenter from './mediaCenter/index'
import antiTerrorism from './anti-terrorism/index'
import donnationListOfProject from './donnation/index';
import home from './home/index';
import spinner from './spinner/index';

export default combineReducers({
    authorization,
    whoWeAre,
    ourProjects,
    lessons,
    videos,
    elgaliat,
    womenSection,
    bookStore,
    mediaCenter,
    antiTerrorism,
    donnationListOfProject,
    home,
    spinner,
});


