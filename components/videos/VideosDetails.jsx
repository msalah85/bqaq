import React, { useEffect } from 'react'
import DetailsCard from '../../reusable/detailsCard/DetailsCard'
export default function VideosDetails(props) {
    useEffect(() => {
        console.log('props', props);
    }, [props])
    return (
        <div className='videos fade-in'>

            <div className='lessonsDetails__navbar'>
                <div className={`lessonsDetails__navbar__item ${props?.pageFiltersController?.pageFilters?.tagId == null && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, tagId: null }) }}>الكل</div>

                {
                    Array.isArray(props?.videosData?.tags) && props?.videosData?.tags.map((tag, index) => {
                        return <div key={index} className={`lessonsDetails__navbar__item ${props?.pageFiltersController?.pageFilters?.tagId == tag.id && 'activeItem'}`} onClick={() => { props?.pageFiltersController?.setPageFilters({ ...props?.pageFiltersController?.pageFilters, tagId: tag.id }) }}>{tag.name}</div>
                    })
                }
            </div>



            {
                Array.isArray(props?.videosData?.videos) && props?.videosData?.videos.length > 0 ?
                    <div className='videos__gridCont'>
                        {
                            props?.videosData?.videos.map
                                ((item, index) => {
                                    return (
                                        <div style={{ height: 'fit-content' }} key={index}>
                                            <DetailsCard
                                                title={item.title}
                                                subtitle={item.sheikhName}
                                                video={item.url || 'no video'}
                                            />
                                        </div>
                                    )
                                })
                        }
                    </div>
                    :
                    <div style={{ marginTop: '4rem', textAlign: 'center', width: '100%', fontSize: '2.5rem', fontWeight: '500', color: '#d3d3d3' }}>لا توجد بيانات</div>
            }

            {/* <div className='videos__gridCont'>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'فتاوى رمضان لمعالي الشيخ الدكتور عبد السلام السليمان عضو هيئة كبار العلماء واللجنة الدائمة للإفتاء'}
                        subtitle={' عبدالسلام_السليمان'}
                        video={'https://youtu.be/I7xQMdFLOYU'}
                    />
                </div>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'قصة يوسف عليه السلام الجزء الأول لفضيلة الشيخ الدكتور حمد بن محمد الوهيبي'}
                        subtitle={' الشيخ الدكتور حمد بن محمد الوهيبي'}
                        video={'https://www.youtube.com/watch?v=MgRezJmKA2M'}
                    />
                </div>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'حال السلف في العشر الأواخر من رمضان لفضيلة الشيخ ناصر بن محمد الهاجري'}
                        subtitle={' الشيخ ناصر بن محمد الهاجري'}
                        video={'https://www.youtube.com/watch?v=hLiuPHbF7DA'}
                    />
                </div>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'دورة فقه الدعوة إلى الله المجلس3 لفضيلة الشيخ الدكتور عزيز بن فرحان العنزي'}
                        subtitle={' الشيخ الدكتور عزيز بن فرحان العنزي'}
                        video={'https://www.youtube.com/watch?v=GwQFCEsZtd0&ab_channel=%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A8%D9%82%D9%8A%D9%82'}
                    />
                </div>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'شرح علم المواريث(1)│مقدمة علم المواريث│فضيلة الشيخ راشد بن خليفة الكليب'}
                        subtitle={' فضيلة الشيخ راشد بن خليفة الكليب'}
                        video={'https://www.youtube.com/watch?v=5fClCUPCvPo'}
                    />
                </div>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'شرح ممتع لمسائل مهمة من أواخر العقيدة الواسطية2│فضيلة الشيخ عبدالله بن صالح القصير'}
                        subtitle={'فضيلة الشيخ عبدالله بن صالح القصير'}
                        video={'https://www.youtube.com/watch?v=RMx_NJxHEkU'}
                    />
                </div>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'شرح كتاب السياسة الشرعية لابن تيمية (مجلس1)المقدمة لفضيلة الشيخ سعيد بن هليل الشمري'}
                        subtitle={'الشيخ سعيد بن هليل الشمري'}
                        video={'https://www.youtube.com/watch?v=_j9flsa3d44'}
                    />
                </div>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'شرح نخبة الفكر في مصطلح أهل الأثر المجلس 1 فضيلة الشيخ بدر بن محمد آل بدر العنزي'}
                        subtitle={'الشيخ بدر بن محمد آل بدر العنزي'}
                        video={'https://www.youtube.com/watch?v=nmjYnz8RMx0&ab_channel=%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A8%D9%82%D9%8A%D9%82'}
                    />
                </div>

                <div style={{ height: '27rem' }} >
                    <DetailsCard
                        title={'دراسة كتب السنة صحيح البخاري رحمه الله لفضيلة الشيخ الدكتور علي بن صالح المري'}
                        subtitle={'الشيخ الدكتور علي بن صالح المري'}
                        video={'https://www.youtube.com/watch?v=-csJ5yYBjKI&ab_channel=%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A8%D9%82%D9%8A%D9%82'}
                    />
                </div>

            </div> */}

        </div>

    )
}
