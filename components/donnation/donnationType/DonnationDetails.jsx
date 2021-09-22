import React, { useEffect, useState } from 'react';
import ReactImageFallback from 'react-image-fallback';
import DropDown from '../../../reusable/dropdown/DropDown';
import { GET_DONNATION_LIST_OF_PROJECT, MAKE_NEW_DONNATION } from '../../../redux/actions/donnation/index';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
function DonnationDetailsPage(props) {

    const router = useRouter();

    const [selectedDonation, setSelectedDonation] = useState({})

    // const { donnation, handleSubmit } = useForm();
    const { register, getValues, setValue, trigger, handleSubmit, formState: { errors }, } = useForm({
        mode: 'onBlur',
        defaultValues: {
            isAnonymous: false,
            paymentReference: 'visa'
        }
    });

    useEffect(() => {
        router.query.id && props.GET_DONNATION_LIST_OF_PROJECT(router.query.id);
    }, [router.query.id]);

    function onSubmit(data) {
        console.log('formData', { ...data, donationId: selectedDonation.id }, register);
        props.MAKE_NEW_DONNATION({ ...data, donationId: selectedDonation.id });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className='donnationDetails fade-in'>

                <div className='donnationDetails__rightSec'>

                    <div className='donnationDetails__rightSec__title'>{selectedDonation?.name}</div>
                    {/* {selectedDonation.value && <div className='donnationDetails__rightSec__subTitle'>قيمة السهم :  {selectedDonation.value} ريال سعودي</div>} */}
                    <div className='donnationDetails__rightSec__inpTitle'>نوع التبرع</div>
                    <DropDown
                        onChange={(name, id) => setSelectedDonation(props.donnationList?.find(donnation => donnation.id == id))}
                        data={props.donnationList}
                        default="اختر نوع التبرع"
                    />

                    <div className='donnationDetails__rightSec__inpTitle'>المبلغ</div>
                    <input className={`baqiq-inp ${errors.donateValue && 'unvalid'}`} type='number' placeholder='المبلغ' {...register("donateValue", { required: true, min: 1, valueAsNumber: true, })} />

                    <div className='donnationDetails__rightSec__inpTitle'>رقم الجوال</div>
                    <input className={`baqiq-inp ${errors.mobile && 'unvalid'}`} placeholder='رقم الجوال' {...register('mobile', { required: true })} />

                    <div className='donnationDetails__rightSec__inpTitle'>البريد الإلكتروني</div>
                    <input className={`baqiq-inp ${errors.email && 'unvalid'}`} placeholder='البريد الإلكتروني' {...register('email', { required: true })} />

                    <div className='donnationDetails__rightSec__inpTitle'>الاسم كامل</div>
                    <div className='donnationDetails__rightSec__benefactor'>
                        <input className={`baqiq-inp ${errors.name && 'unvalid'}`} placeholder='الاسم كامل' style={{ marginLeft: '2rem' }} d id='benefactorName' {...register('name')} disabled={getValues('isAnonymous')} />
                        <label for="benefactor" className='donnationDetails__rightSec__benefactor__title'>
                            <div >فاعل خير </div>
                        </label>

                        <input id="benefactor" name="benefactor" type="checkbox" style={{ marginRight: '-2rem', width: 'fit-content' }} onChange={(e) => { document.getElementById('benefactorName').disabled = e.target.checked; setValue('isAnonymous', e.target.checked); setValue('name', null); }} />

                    </div>
                    <button className='baqiq-green-btn ' style={{ width: '70%', margin: '3rem auto' }} type='submit' disabled={!(selectedDonation.id)}>تبرع</button>


                </div>

                <div className='donnationDetails__leftSec'>
                    {
                        selectedDonation?.imageUrl && (
                            <div className='donnationDetails__leftSec__imgCont'>
                                <ReactImageFallback
                                    src={selectedDonation.imageUrl}
                                    fallbackImage="/assets/fallbacks/Play.svg"
                                    // initialImage="/assets/fallbacks/Play.svg"
                                    alt="صورة الخبر"
                                />
                            </div>
                        )
                    }
                </div>

            </div>

        </form>
    )
}
const mapStateToProps = (state) => {
    return { donnationList: state.donnationListOfProject };
};

export default connect(mapStateToProps, { GET_DONNATION_LIST_OF_PROJECT, MAKE_NEW_DONNATION })(DonnationDetailsPage);