import React from 'react';
import Link from 'next/link';
// import BaqiqLogo from '../../public/assets/Baqiq-Logo.svg'

export default function LogoBar() {
    return (
        <div className='general-container logoBar'>

            <Link href='/'>
                <a className='logoBar__rightSection'>
                    <img className='logoBar__rightSection__logo' src='/assets/Baqiq-Logo.svg' />
                    <img className='logoBar__rightSection__textLogo' src='/assets/textLogo.svg' />
                </a>
            </Link>

            <div className='logoBar__leftSection'>
                <img className='logoBar__logo' src='/assets/Saudi Vision 2030 Logo.png' />
            </div>

        </div>
    )
}
