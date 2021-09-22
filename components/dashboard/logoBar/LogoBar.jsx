import React from 'react'

function LogoBar() {
    return (
        <div className='logoBar-container'>
            <div className='general-container dashboard-logobar'>
                <div className='dashboard-logobar__rightSection'>
                    <img className='dashboard-logobar__rightSection__logo' src='/assets/Baqiq-Logo.svg' />
                </div>

                <div className='dashboard-logobar__leftSection'>
                    <img className='dashboard-logobar__logo' src='/assets/Saudi Vision 2030 Logo.png' />
                </div>
            </div>
        </div>
    )
}

export default LogoBar
