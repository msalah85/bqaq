import React, { useState } from 'react'
// import ConfirmPwForm from './authForms/ConfirmPwForm';
// import ResetPwForm from './authForms/ResetPwForm';
// import ResetPwSuccessForm from './authForms/ResetPwSuccessForm';
// import SignInForm from './authForms/SignInForm';
import ConfirmPwForm from '../../signIn_signUp_form/signin_signupForms/ConfirmPwForm';
import ForgetPwForm from '../../signIn_signUp_form/signin_signupForms/ForgetPwForm';
import ResetPwForm from '../../signIn_signUp_form/signin_signupForms/ResetPwForm';
import ResetPwSuccessForm from '../../signIn_signUp_form/signin_signupForms/ResetPwSuccessForm';
import SignInForm from '../../signIn_signUp_form/signin_signupForms/SignInForm';
import AuthVector from '../../../public/assets/Group 161622.svg'

function Authorization() {
    const [caseToShow, setCaseToShow] = useState('signin')

    return (
        <div className='dashoardAuth' >

            {(function () {
                switch (caseToShow) {
                    case 'signin':
                        return <SignInForm caseToShowController={(state) => setCaseToShow(state)} hideRegister={true} />;
                    case 'forgetPW':
                        return <ForgetPwForm caseToShowController={(state) => setCaseToShow(state)} />;
                    case 'confirmCode':
                        return <ConfirmPwForm caseToShowController={(state) => setCaseToShow(state)} />;
                    case 'resetPw':
                        return <ResetPwForm caseToShowController={(state) => setCaseToShow(state)} />;
                    case 'resetPwSuccess':
                        return <ResetPwSuccessForm caseToShowController={(state) => setCaseToShow(state)} />;

                    default:
                        return null;
                }
            })()}
            <div className='dashoardAuth__imgCont'><AuthVector /></div>
        </div>
    )
}

export default Authorization;
