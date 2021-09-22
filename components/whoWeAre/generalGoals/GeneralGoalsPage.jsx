import React from 'react'
import WhoWeAreSidebar from '../whoWeAreSidebar/WhoWeAreSidebar'
import GeneralGoalsDetails from './GeneralGoalsDetails'

export default function GeneralGoals() {
    return (
        <div className='whoWeAre general-container'>
            <WhoWeAreSidebar breadcrumbs={[{ name: 'الأهداف العامة', url: '/provided-services' }]} />
            <div className='whoWeAre__body'>
                <GeneralGoalsDetails />
            </div>
        </div>
    )
}
