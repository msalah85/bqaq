import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { connect } from "react-redux";
import { VERIFY_RESET_CODE } from '../../../../redux/actions/registration/index';

function ConfirmPwForm(props) {
    const [confirmCode, setConfirmCode] = useState('');

    const submitForm = (event) => {
        event.preventDefault();

        let data = { resetCode: confirmCode, clientId: props.resetPwData?.clientId }
        console.log(data);
        props.VERIFY_RESET_CODE(data, props.caseToShowController);
    }

    return (
        <form className='signIn_form' onSubmit={submitForm}>
            <div className='signIn_form__lgHeader'>كود التأكيد</div>
            <div className='signIn_form__smHeader' style={{ width: '23rem', textAlign: 'center' }}>
                إدخال كود التأكيد لتغير كلمة المرور
            </div>

            <OtpInput
                value={confirmCode}
                onChange={(otp) => { setConfirmCode(otp) }}
                numInputs={6}
                containerStyle={{ width: '100%', justifyContent: 'space-evenly', margin: '3rem 0', direction: 'ltr' }}
                className='signIn_form__otp'
            />

            <div className='signIn_form__fullSepratorLine'></div>

            <div className='signIn_form__footer' >
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
    VERIFY_RESET_CODE
})(ConfirmPwForm);