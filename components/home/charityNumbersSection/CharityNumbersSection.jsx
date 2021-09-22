import React from 'react'

export default function CharityNumbersSection(props) {
    return (
        <>

            <div className='general-container '>

                <div className='newVideoSection__title'>
                    <div>الجمعية في أرقام</div>
                </div>

                <div className='charityNumbersSection'>
                    <div className='charityNumbersSection__item'>
                        <img src='/assets/Mask Group 71.svg' />
                        <div className='charityNumbersSection__item__title'>الدروس</div>
                        <div className='charityNumbersSection__item__number'>{props.counts?.lessons}</div>
                    </div>

                    <div className='charityNumbersSection__item'>
                        <img src='/assets/Mask Group 72.svg' />
                        <div className='charityNumbersSection__item__title'>المشتركين الجدد</div>
                        <div className='charityNumbersSection__item__number'>{props.counts?.newAccounts}</div>
                    </div>

                    <div className='charityNumbersSection__item'>
                        <img src='/assets/Mask Group 73.svg' />
                        <div className='charityNumbersSection__item__title'>المشتركين</div>
                        <div className='charityNumbersSection__item__number'>{props.counts?.accounts}</div>
                    </div>

                    <div className='charityNumbersSection__item'>
                        <img src='/assets/Mask Group 74.svg' />
                        <div className='charityNumbersSection__item__title'>زوار الموقع</div>
                        <div className='charityNumbersSection__item__number'>{props.counts?.visitors}</div>
                    </div>
                </div>


            </div>
        </>
    )
}
