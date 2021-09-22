import React, { useState } from 'react';
import { connect } from "react-redux";
import { SIGNIN_WITH_EMAIL, TOGGLE_SIGNIN_POPUP } from '../../../../redux/actions/registration/index';

function SignInForm(props) {

    const [signinForm, setSigninForm] = useState({});

    const onFormItemValueChange = (e) => {
        let value = e.target.value;
        let key = e.target.id;
        setSigninForm({ ...signinForm, [key]: value });
    }

    const submitForm = (event) => {
        event.preventDefault();
        props.SIGNIN_WITH_EMAIL(signinForm, props.TOGGLE_SIGNIN_POPUP);
    }

    return (
        <form onSubmit={submitForm}>

            <div className='signIn_form'>
                <div className='signIn_form__mdHeader'>تسجيل الدخول</div>
                <div className='signIn_form__smHeader'>ليس لديك حساب, <span onClick={() => props.caseToShowController('signup')}>  انشاء حساب</span></div>

                <div className='signIn_form__title'>البريد الالكتروني</div>
                <input className='signIn_form__input' placeholder='أدخل البريد الاكتروني' id='email' onChange={onFormItemValueChange} />
                <div className='signIn_form__title'>كلمة المرور</div>
                <div className='passwordInp'>
                    <input id='password' type='password' autoComplete="new-password" className='signIn_form__input' placeholder='أدخل كلمة المرور' type='password' onChange={onFormItemValueChange} />
                    <img src='/assets/Mask Group 69.svg' onClick={() => {
                        document.getElementById('password').type = document.getElementById('password').type == 'password' ? 'text' : 'password'
                    }} />
                </div>                <div className='signIn_form__forgetPwBtn' onClick={() => props.caseToShowController('forgetPW')}>نسيت كلمة المرور</div>

                <div className='signIn_form__fullSepratorLine'></div>

                <div className='signIn_form__footer'>
                    <button type='submit' className='signIn_form__footer__btn'>تسجيل دخول</button>
                </div>
            </div>

        </form>
    )
}

const mapStateToProps = () => {
    return {};
};
export default connect(mapStateToProps, {
    SIGNIN_WITH_EMAIL, TOGGLE_SIGNIN_POPUP
})(SignInForm);
