import React from 'react';
import ShareWithSection from '../../../reusable/shareWithSection/ShareWithSection';
import SheikhVideosDetails from './SheikhVideosDetails';
import SheikhVideosSidebar from './SheikhVideosSidebar';

export default function SheikhVideosPage() {
    return (
        <div className='lessons general-container'>
            <SheikhVideosSidebar breadcrumbs={[{ name: 'المرئيات', url: '/videos' }, { name: 'أسم الشيخ', url: '/videos/1' }]} />
            <div className='lessons__body'>
                <SheikhVideosDetails />
            </div>
        </div>
    )
}