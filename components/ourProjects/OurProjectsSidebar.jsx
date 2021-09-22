import React from 'react'
import ActiveLink from '../../reusable/activeLink/ActiveLink'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import { useRouter } from 'next/router'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection';

export default function OurProjectsSidebar(props) {
    const router = useRouter();
    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />

            <div className='sidebar__contents'>
                <div className='sidebar__contents__title'>الفهرس</div>

                {
                    props.projectsList?.map((project) => {
                        return (
                            <ActiveLink href={`/our-projects/${project.id}`} activeClassName='activeItem'>
                                <a className='sidebar__contents__item'>
                                    {project.name}
                                </a>
                            </ActiveLink>
                        )

                    })
                }

            </div>

        </div>

    )
}
