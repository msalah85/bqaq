import React, { useState } from 'react'
import { connect } from "react-redux";
import { FORGET_PASSWORD } from '../../../redux/actions/registration/index';

function ForgetPwForm(props) {
    const [forgetPwForm, setForgetPwForm] = useState({});
    const [validate, setValidation] = useState(false);


    const onFormItemValueChange = (e) => {
        let value = e.target.value;
        let key = e.target.id;
        setForgetPwForm({ ...forgetPwForm, [key]: value });
    }

    const submitForm = (event) => {
        event.preventDefault();
        if (!forgetPwForm.email)
            setValidation(true)
        else
            props.FORGET_PASSWORD(forgetPwForm, props.caseToShowController);
    }

    return (
        <form className='signIn_form' onSubmit={submitForm}>

            <div className='signIn_form__lgHeader'>نسيت كلمة المرور</div>
            <div className='signIn_form__smHeader' style={{ width: '23rem', textAlign: 'center' }}>اذا نسيت كلمة المرور ادخل البريد الالكتروني من اجل إعادة انشاء كلمة مرور جديدة</div>

            <div className='signIn_form__title'>البريد الألكتروني</div>
            <input className={`signIn_form__input ${validate && 'unvalid'}`} placeholder='أدخل البريد الألكتروني' style={{ marginBottom: '3rem' }} id='email' onChange={onFormItemValueChange} />

            <div className='signIn_form__fullSepratorLine'></div>

            <div className='signIn_form__footer'>
                <button className='signIn_form__footer__btn' type='submit'>
                    إرسال
                </button>
            </div>

        </form>
    )
}

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, {
    FORGET_PASSWORD
})(ForgetPwForm);
