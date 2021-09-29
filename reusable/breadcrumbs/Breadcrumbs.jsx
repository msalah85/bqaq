import React, { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ActiveLink from '../activeLink/ActiveLink'




export default function Breadcrumbs(props) {

    // const [urlArr, setUrlArr] = useState([]);
    // const router = useRouter();
    // let routesNameInArabic = {
    //     'who-we-are': 'من نخن',
    //     'scientist-praise': 'قالوا عنا'
    // }
    // useEffect(async () => {
    //     await getAndFormatUrl()

    // }, [])

    // const getAndFormatUrl = () => {

    //     // let x =.split('/').reverse().splice(0, 1)
    //     setUrlArr(router.pathname.split('/').reverse().splice(0, props.index))
    //     console.log();
    // }

    return (
        <div className='routesbar'>
            <ActiveLink href='/'><a className='routesbar__routeCont__route'>الرئيسية</a></ActiveLink>

            <div>{'>'}</div>


            {
                props.breadcrumbs?.map((item, index) => {
                    return <Fragment key={index}>
                        <ActiveLink href={item?.url || '/'}>
                            <a key='index' className='routesbar__routeCont__route one-line'>{item?.name || ''}<span>{'>'}</span></a>
                        </ActiveLink>
                    </Fragment>
                })
            }
        </div>
    )
}