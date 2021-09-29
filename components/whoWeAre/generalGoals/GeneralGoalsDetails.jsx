
import React, { useEffect } from 'react'
import ReactImageFallback from 'react-image-fallback'
// import { GET_OUR_GOALS } from '../../../redux/actions/who-we-are/index';
import { connect } from 'react-redux';
function GeneralGoalsDetails(props) {
    // useEffect(() => {
    //     props.GET_OUR_GOALS()
    // }, [])
    return (
        <div className='whoWeAreDetails fade-in'>
            {
                (props.ourGoals && props.ourGoals.length > 0) ? <>
                    <div className='whoWeAreDetails__right'>
                        {/* <audio controls>
                    <source src="x" type="audio/ogg" />
                    <source src="x" type="audio/mpeg" />
                            Your browser does not support the audio element.
                </audio> */}

                        {
                            (props.ourGoals && props.ourGoals.length > 0) && props.ourGoals.map(item => {
                                return <>
                                    <div className='whoWeAreDetails__right__title'>{item.definition}</div>
                                    <div className='whoWeAreDetails__right__desc'>{item.description}</div>

                                </>
                            })
                        }

                        {/* <div className='whoWeAreDetails__right__title'>تعريف الجمعية</div>
                <div className='whoWeAreDetails__right__desc'>لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأسنيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم.</div>
                <div className='whoWeAreDetails__right__title'>رسالة الجمعية</div>
                <div className='whoWeAreDetails__right__desc'>لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأسنيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم.</div>
                <div className='whoWeAreDetails__right__title'>رؤية الجمعية</div>
                <div className='whoWeAreDetails__right__desc'>لوريم ايبسوم دولار سيت أميت ,كونسيكتيتور أدايبا يسكينج أليايت,سيت دو أيوسمود تيمبور أنكايديديونتيوت لابوري ات دولار ماجنا أليكيوا . يوت انيم أد مينيم فينايم,كيواس نوستريد أكسير سيتاشن يللأمكو لابورأسنيسي يت أليكيوب أكس أيا كوممودو كونسيكيوات . ديواس أيوتي أريري دولار إن ريبريهينديرأيت فوليوبتاتي فيلايت أيسسي كايلليوم دولار أيو فيجايت نيولا باراياتيور. أيكسسيبتيور ساينت أوككايكات كيوبايداتات نون بروايدينت ,سيونت ان كيولبا كيو أوفيسيا ديسيريونتموليت انيم أيدي ايست لابوريوم.</div> */}

                    </div>
                    {/* <div className='whoWeAreDetails__left'>
                        <div className='whoWeAreDetails__left__section'>
                            <div className='whoWeAreDetails__left__section__title'>معرض الصور</div>
                            <div className='whoWeAreDetails__left__section__gridCont'>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                        initialImage="/assets/fallbacks/news-fallback-image.png"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                        initialImage="/assets/fallbacks/news-fallback-image.png"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                        initialImage="/assets/fallbacks/news-fallback-image.png"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                        initialImage="/assets/fallbacks/news-fallback-image.png"
                                        alt="صورة الخبر"
                                    />
                                </div>

                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                        initialImage="/assets/fallbacks/news-fallback-image.png"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                        initialImage="/assets/fallbacks/news-fallback-image.png"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                        initialImage="/assets/fallbacks/news-fallback-image.png"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/news-fallback-image.png"
                                        initialImage="/assets/fallbacks/news-fallback-image.png"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__seeAll'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/Mask Group 8.png"
                                        initialImage="/assets/Mask Group 8.png"
                                        alt="صورة الخبر"
                                    />
                                    <div className='whoWeAreDetails__left__section__gridCont__seeAll__text'>رؤية الكل</div>
                                </div>

                            </div>
                        </div>
                        <div className='whoWeAreDetails__left__section' >
                            <div className='whoWeAreDetails__left__section__title'>معرض الفيديوهات</div>
                            <div className='whoWeAreDetails__left__section__gridCont'>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/Play.svg"
                                        initialImage="/assets/fallbacks/Play.svg"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/Play.svg"
                                        initialImage="/assets/fallbacks/Play.svg"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/Play.svg"
                                        initialImage="/assets/fallbacks/Play.svg"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/Play.svg"
                                        initialImage="/assets/fallbacks/Play.svg"
                                        alt="صورة الخبر"
                                    />
                                </div>

                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/Play.svg"
                                        initialImage="/assets/fallbacks/Play.svg"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/Play.svg"
                                        initialImage="/assets/fallbacks/Play.svg"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/Play.svg"
                                        initialImage="/assets/fallbacks/Play.svg"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__imgCont'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/fallbacks/Play.svg"
                                        initialImage="/assets/fallbacks/Play.svg"
                                        alt="صورة الخبر"
                                    />
                                </div>
                                <div className='whoWeAreDetails__left__section__gridCont__seeAll'>
                                    <ReactImageFallback
                                        src="xx"
                                        fallbackImage="/assets/Mask Group 8.png"
                                        initialImage="/assets/Mask Group 8.png"
                                        alt="صورة الخبر"
                                    />
                                    <div className='whoWeAreDetails__left__section__gridCont__seeAll__text'>رؤية الكل</div>
                                </div>

                            </div>
                        </div>

                    </div> */}

                </>
                    : <div style={{ marginTop: '4rem', textAlign: 'center', width: '100%', fontSize: '2.5rem', fontWeight: '500', color: '#d3d3d3' }}>لا توجد بيانات</div>
            }

        </div>
    )
}
const mapStateToProps = (state) => {
    return { ourGoals: state.whoWeAre?.containers?.whoWeAre?.goals?.reverse() };
};

export default connect(mapStateToProps, {})(GeneralGoalsDetails);
