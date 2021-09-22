import React, { useState } from 'react';
import { connect } from "react-redux";
import { RESET_PASSWORD } from '../../../redux/actions/registration/index';

function ResetPwForm(props) {
    const [resetPwForm, setResetPwForm] = useState({});

    const onFormItemValueChange = (e) => {
        let value = e.target.value;
        let key = e.target.id;
        setResetPwForm({ ...resetPwForm, [key]: value });
    }

    const submitForm = (event) => {
        event.preventDefault();
        let resetPwData = { ...resetPwForm, clientId: props.resetPwData.clientId, resetCode: props.resetPwData.resetCode }
        props.RESET_PASSWORD(resetPwData, props.caseToShowController);
    }

    return (
        <form className='signIn_form' onSubmit={submitForm}>
            <div className='signIn_form__lgHeader'>استرجاع كلمة المرور</div>
            <div className='signIn_form__smHeader' style={{ width: '23rem', textAlign: 'center' }}>تغير كلمة المرور الخاصة بك</div>

            <div className='signIn_form__title'>كلمة المرور</div>
            <div className='passwordInp'>
                <input id='newPassword' type='password' autoComplete="new-password" className='signIn_form__input' placeholder='أدخل كلمة المرور' type='password' onChange={onFormItemValueChange} />
                <img src='/assets/Mask Group 69.svg' onClick={() => {
                    document.getElementById('newPassword').type = document.getElementById('newPassword').type == 'password' ? 'text' : 'password'
                }} />
            </div>

            <div className='signIn_form__title'>إعادة كلمة المرور</div>
            <div className='passwordInp' style={{ marginBottom: '1.7rem' }}>
                <input id='confirmPassword' type='password' className='signIn_form__input' placeholder='إعادة أدخال كلمة المرور' onChange={onFormItemValueChange} />
                <img src='/assets/Mask Group 69.svg' onClick={() => {
                    document.getElementById('confirmPassword').type = document.getElementById('confirmPassword').type == 'password' ? 'text' : 'password'
                }} />
            </div>
            <div className='signIn_form__fullSepratorLine'></div>

            <div className='signIn_form__footer'>
                <button className='signIn_form__footer__btn' type='submit'>
                    إرسال
            </button>
            </div>
        </form>
    )
}

const mapStateToProps = (state) => {
    return { resetPwData: state.authorization?.resetPWData };
};

export default connect(mapStateToProps, {
    RESET_PASSWORD
})(ResetPwForm);
