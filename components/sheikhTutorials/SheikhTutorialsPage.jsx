import React, { useEffect, useState } from 'react'
import SheikhTutorialsDetails from './SheikhTutorialsDetails'
import SheikhTutorialsSidebar from './SheikhTutorialsSidebar'
import { useRouter } from 'next/router'
import ShareWithSection from '../../reusable/shareWithSection/ShareWithSection';

export default function SheikhTutorialsPage() {
    const router = useRouter();
    const [id, setId] = useState(null)

    useEffect(() => {
        setId(router.query && router.query.params && router.query.params[0])
    })
    return (
        <div className='lessons general-container'>
            <SheikhTutorialsSidebar id={id} breadcrumbs={[{ name: 'الدروس', url: '/lessons' }]} />
            <div className='lessons__body'>
                <SheikhTutorialsDetails id={id} />
            </div>
        </div>
    )
}
