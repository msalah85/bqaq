import React, { useState } from 'react';
import DropDown from '../../../reusable/dropdown/DropDown';
import { connect } from "react-redux";
import { REGISTER_NEW_USER } from '../../../../redux/actions/registration/index';

function SignUpForm(props) {
    const [registerForm, setRegisterForm] = useState({});

    const onFormItemValueChange = (e) => {
        let value = e.target.value;
        let key = e.target.id;
        setRegisterForm({ ...registerForm, [key]: value });
    }

    const onDropDownChange = (country) => {
        setRegisterForm({ ...registerForm, country: country });
    }

    const submitForm = (event) => {
        event.preventDefault()
        props.REGISTER_NEW_USER(registerForm, props.caseToShowController);
    }

    return (

        <form className='signIn_form' onSubmit={submitForm}>

            <div className='signIn_form__lgHeader'>إنشاء حساب</div>
            <div className='signIn_form__smHeader'>يوجد لديك حساب,<span onClick={() => { props.caseToShowController('signin') }}> تسجيل دخول</span></div>

            <div className='signIn_form__title'>الاسم كامل</div>
            <input className='signIn_form__input' id='name' onChange={onFormItemValueChange} placeholder='أدخل الاسم كامل' />

            <div className='signIn_form__title'>البريد الألكتروني</div>
            <input className='signIn_form__input' id='email' onChange={onFormItemValueChange} placeholder='أدخل البريد الألكتروني' />

            <div className='signIn_form__title'>رقم الهاتف</div>
            <input className='signIn_form__input' id='mobile' onChange={onFormItemValueChange} placeholder='أدخل رقم الهاتف' />

            <div className='signIn_form__title'>الدولة</div>
            <DropDown
                onChange={onDropDownChange}
                id='country'
                data={[{ name: 'مصر', id: '1' }, { name: 'المملكه العربيه السعوديه', id: '1' }]}
                default="اختر البلد"
            />

            <div className='signIn_form__title'>كلمة المرور</div>
            <div className='passwordInp'>
                <input id='password' type='password' onChange={onFormItemValueChange} autoComplete="new-password" className='signIn_form__input' placeholder='أدخل كلمة المرور' type='password' />
                <img src='/assets/Mask Group 69.svg' onClick={() => {
                    document.getElementById('password').type = document.getElementById('password').type == 'password' ? 'text' : 'password'
                }} />
            </div>

            <div className='signIn_form__title'>إعادة كلمة المرور</div>
            <div className='passwordInp' style={{ marginBottom: '1.7rem' }}>
                <input id='confirmPassword' type='password' onChange={onFormItemValueChange} className='signIn_form__input' placeholder='إعادة أدخال كلمة المرور' />
                <img src='/assets/Mask Group 69.svg' onClick={() => {
                    document.getElementById('confirmPassword').type = document.getElementById('confirmPassword').type == 'password' ? 'text' : 'password'
                }} />
            </div>

            <div className='signIn_form__fullSepratorLine'></div>

            <div className='signIn_form__footer'>
                <button className='signIn_form__footer__btn' type='submit'>
                    إنشاء الحساب
                </button>
            </div>

        </form>
    )
}

const mapStateToProps = () => {
    return {};
};
export default connect(mapStateToProps, {
    REGISTER_NEW_USER
})(SignUpForm);
