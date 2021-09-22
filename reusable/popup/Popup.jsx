import React from 'react'

function Popup({ children, show, showController, enableCloseBtn, enableBackBtn, onClickBackBtnFunc, onClickOutsideClose }) {
    return (
        show && <div className='popup '>
            <div className='popup__background' onClick={() => { onClickOutsideClose && showController(false) }} />
            <div className='popup__form animate__animated animate__zoomIn'>
                <div className='popup__form__nav'>
                    {enableBackBtn && <div className='popup__form__nav__backBtn' onClick={onClickBackBtnFunc}>🡨</div>}
                    {enableCloseBtn && <div className='popup__form__nav__closeBtn' onClick={() => showController(false)}><img src='/assets/Mask Group 67.svg' /></div>}
                </div>
                {children}

            </div>

        </div>

    )
}

export default (Popup)