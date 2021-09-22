import React from 'react'

function ResetPwSuccessForm(props) {
    return (
        <div className='signIn_form'>
            <img src={"assets/successIcon.svg"} style={{ marginBottom: '1rem' }} />
            <div className='signIn_form__lgHeader'>تم تغير كلمة المرور بنجاح</div>
            <div className='signIn_form__fullSepratorLine' style={{margin:'2rem 0rem 0'}}></div>
            <div className='signIn_form__footer'>
                <div className='signIn_form__footer__btn' onClick={() => props.caseToShowController('signin')}>
                    الرجوع لتسجيل الحضور
            </div>
            </div>
        </div>
    )
}
export default (ResetPwSuccessForm)