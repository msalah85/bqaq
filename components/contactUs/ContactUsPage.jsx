import React from 'react'
import Breadcrumbs from '../../reusable/breadcrumbs/Breadcrumbs'
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { CONTACT_US } from '../../redux/actions/contactUs/index';

function ContactUsPage(props) {
    const { register, getValues, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
        defaultValues: {
            advantages: []
        }
    });

    const onSubmit = (data) => {
        console.log('onSubmit', data);
        props.CONTACT_US({ ...data })
    };

    return (
        <div className='general-container contactUs' >

            <form onSubmit={handleSubmit(onSubmit)} style={{ flex: '0 0 45%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Breadcrumbs breadcrumbs={[{ name: 'تواصل معانا', url: '/contact-us' }]} />

                <div className='signIn_form__title'>الاسم</div>
                <input
                    className={`baqiq-inp ${errors.name && 'unvalid'}`}
                    {...register('name', { required: true })}
                    placeholder='أدخل اسمك'
                />

                <div className='signIn_form__title'>البريد الإلكتروني </div>
                <input
                    className={`baqiq-inp ${errors.email && 'unvalid'}`}
                    {...register('email', { required: true })}
                    placeholder='أدخل البريد الإلكتروني'
                />

                <div className='signIn_form__title'>رقم الهاتف</div>
                <input
                    className={`baqiq-inp ${errors.mobile && 'unvalid'}`}
                    {...register('mobile', { required: true })}
                    placeholder='أدخل رقم الهاتف'
                />

                <div className='signIn_form__title'>نص الرسالة</div>
                <textarea className={`baqiq-inp ${errors.message && 'unvalid'}`}
                    {...register('message', { required: true })}
                    placeholder='أدخل نص الرسالة'
                    style={{ height: '10rem' }}
                />

                <div style={{ alignSelf: 'center', width: '70%' }}>
                    <button className='baqiq-gold-btn' >ارسال</button>
                </div>

                <a href='https://api.whatsapp.com/send?phone=966500801488' target="_blank" style={{ alignSelf: 'center', width: '70%' }}>
                    <button className=' baqiq-green-btn' >تواصل معنا عبر الواتس أب</button>
                </a>

            </form>

            <div style={{ flex: '0 0 45%' }}>
                <div className='personCard__details__withImg' style={{ marginBottom: '2rem', fontSize: '1.6rem' }}><img src='/assets/Mask Group 12.png' /><div dir='auto'>0135666000 - 0500801488</div></div>
                <div className='personCard__details__withImg' style={{ marginBottom: '2rem', fontSize: '1.6rem' }}><img src='/assets/Mask Group 13.png' /><span>jjalyaat2@gmail.com</span></div>
                {/* <img width='100%' src='/assets/snazzy-image.png' /> */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1460.1299087449966!2d49.6528406!3d25.9215863!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xaf9dd878f6a7108e!2z2KfZhNmF2YPYqtioINin2YTYqti52KfZiNmG2Yog2YTZhNiv2LnZiNmHINmB2Yog2KjZgtmK2YI!5e1!3m2!1sen!2seg!4v1621522639258!5m2!1sen!2seg"
                    width="100%"
                    height="350"
                    loading="lazy"
                />
            </div>


        </ div >
    )
}

export default connect(() => { }, { CONTACT_US })(ContactUsPage);