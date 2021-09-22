import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import Popup from "../../reusable/popup/Popup";
import ConfirmPwForm from './signin_signupForms/ConfirmPwForm';
import ForgetPwForm from './signin_signupForms/ForgetPwForm';
import ResetPwForm from './signin_signupForms/ResetPwForm';
import ResetPwSuccessForm from './signin_signupForms/ResetPwSuccessForm';
import SignInForm from './signin_signupForms/SignInForm';
import SignUpForm from './signin_signupForms/SignUpForm';
import { TOGGLE_SIGNIN_POPUP, CLEAN_UP_RESET_DATA } from '../../redux/actions/registration/index'
function SignInPopup(props) {
  useEffect(() => {
    return () => {
      props.CLEAN_UP_RESET_DATA()
    }
  }, [])
  const [caseToShow, setCaseToShow] = useState('signin')
  return (
    <>
      <Popup
        show={props.showSigninPoopup}
        showController={(status) => { props.TOGGLE_SIGNIN_POPUP(status); setCaseToShow('signin') }}
        enableCloseBtn
        onClickOutsideClose
        enableBackBtn={caseToShow == 'forgetPW' || caseToShow == 'confirmCode' || caseToShow == 'resetPw' ? true : false}
        onClickBackBtnFunc={() => setCaseToShow('signin')}
      >
        {(function () {
          switch (caseToShow) {
            case 'signin':
              return <SignInForm caseToShowController={(state) => setCaseToShow(state)} />;
            case 'signup':
              return <SignUpForm caseToShowController={(state) => setCaseToShow(state)} />;
            case 'forgetPW':
              return <ForgetPwForm caseToShowController={(state) => setCaseToShow(state)} />;
            case 'confirmCode':
              return <ConfirmPwForm caseToShowController={(state) => setCaseToShow(state)} />;
            case 'resetPw':
              return <ResetPwForm caseToShowController={(state) => setCaseToShow(state)} />;
            case 'resetPwSuccess':
              return <ResetPwSuccessForm caseToShowController={(state) => setCaseToShow(state)} />;

            default:
              return <SignInForm caseToShowController={(state) => setCaseToShow(state)} />;
          }
        })()}

      </Popup>
    </>
  )
}

const mapStateToProps = (state) => {
  return { showSigninPoopup: state.authorization?.showSigninPopup };
};

export default connect(mapStateToProps, { TOGGLE_SIGNIN_POPUP, CLEAN_UP_RESET_DATA })(SignInPopup);
