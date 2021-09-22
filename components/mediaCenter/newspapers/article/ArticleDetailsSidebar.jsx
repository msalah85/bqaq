import moment from 'moment'
import React from 'react'
import Breadcrumbs from '../../../../reusable/breadcrumbs/Breadcrumbs'

export default function ArticleDetailsSidebar(props) {
    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />
            <table >
                <tr>
                    <th>عنوان المقال :</th>
                    <td>{props.postDetails?.title}</td>
                </tr>
                <tr>
                    <th>نوع المقال :</th>
                    <td>{props.postDetails?.categoryName}</td>
                </tr>
                <tr>
                    <th>التاريخ :</th>
                    <td>{moment(props.postDetails?.date).format('YYYY / MM / DD')}</td>
                </tr>
            </table>
            {/* <div className='sidebar__visitUs'>زيارة موقع المقال</div> */}


        </div>
    )
}
