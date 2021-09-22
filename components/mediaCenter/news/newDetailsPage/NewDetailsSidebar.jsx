import React from 'react'
import ActiveLink from '../../../../reusable/activeLink/ActiveLink'
import Breadcrumbs from '../../../../reusable/breadcrumbs/Breadcrumbs'
import moment from 'moment'

export default function NewDetailsSidebar(props) {
    return (
        <div className='sidebar'>
            <Breadcrumbs breadcrumbs={props.breadcrumbs} />
            <table >
                <tr>
                    <th>عنوان الخبر :</th>
                    <td>{props.postDetails?.title}</td>
                </tr>
                <tr>
                    <th>نوع الخبر :</th>
                    <td>{props.postDetails?.categoryName}</td>
                </tr>
                <tr>
                    <th>التاريخ :</th>
                    <td>{moment(props.postDetails?.date).format('YYYY / MM / DD')}</td>
                </tr>
            </table>
            <div className='sidebar__visitUs'>الوصول الي الموقع</div>


        </div>

    )
}
