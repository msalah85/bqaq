import Link from 'next/link'
import React from 'react'
import ProjectCard from './projectCard/ProjectCard'

export default function ProjectSection(props) {
    return (
        <div className='general-container projectSection'>
            <div className='projectSection__title'>
                <div>مشاريع الجمعية</div>

                <Link href='/our-projects'>
                    <a className='projectSection__title__moreBtn'>
                        المزيد
                    </a>
                </Link>

            </div>
            <div className='projectSection__projectContainer'>

                {
                    props.projects?.slice(0, 6).map((project, index) => {

                        return <ProjectCard
                            id={project.id}
                            name={project.name}
                            desc={project.description}
                            cover={project.media?.images}
                        />

                    })
                }
                {/* <ProjectCard
                    id={'21cbfd8a-efc3-434c-b710-0ba130950ec8'}
                    name={'وقف الوالدين الدعوي'}
                    desc={'أقامت الجمعية معرضاً لآثار الإرهاب على المملكة العربية السعودية يصنف إعلامياً من أكبر المعارض على مستوى المملكة ويحكي آثار الإرهاب على بلادنا لقرابة 27 سنة ويحتوي على قرابة 200 صورة ويمتد لقرابة 90 متر طولي ومترجم بالعربية والإنجليزية.'}
                />

                <ProjectCard
                    id={'c1969efa-a7b6-49a2-80df-3d7c09b7fd01'}
                    name={'حملة عطاء لصيانة المصاحف'}
                    desc={'أقامت الجمعية معرضاً لآثار الإرهاب على المملكة العربية السعودية يصنف إعلامياً من أكبر المعارض على مستوى المملكة ويحكي آثار الإرهاب على بلادنا لقرابة 27 سنة ويحتوي على قرابة 200 صورة ويمتد لقرابة 90 متر طولي ومترجم بالعربية والإنجليزية.'}
                />

                <ProjectCard
                    id={'7b599134-3eea-4ddf-afc2-5c57bc043394'}
                    name={'الاستقطاع الشهري نموزج'}
                    desc={'أقامت الجمعية معرضاً لآثار الإرهاب على المملكة العربية السعودية يصنف إعلامياً من أكبر المعارض على مستوى المملكة ويحكي آثار الإرهاب على بلادنا لقرابة 27 سنة ويحتوي على قرابة 200 صورة ويمتد لقرابة 90 متر طولي ومترجم بالعربية والإنجليزية.'}
                />

                <ProjectCard
                    id={'70e1e306-651b-4b9e-97cf-fd343812b859'}
                    name={'صيانة المصاحف'}
                    desc={'أقامت الجمعية معرضاً لآثار الإرهاب على المملكة العربية السعودية يصنف إعلامياً من أكبر المعارض على مستوى المملكة ويحكي آثار الإرهاب على بلادنا لقرابة 27 سنة ويحتوي على قرابة 200 صورة ويمتد لقرابة 90 متر طولي ومترجم بالعربية والإنجليزية.'}
                /> */}


            </div>
        </div >
    )
}
