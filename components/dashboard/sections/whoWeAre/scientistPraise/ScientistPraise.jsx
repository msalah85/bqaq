import React, { Fragment, useEffect, useState } from 'react'
import requester from '../../../../../requester/requester';
import ScientistPraiseCard from '../../../../whoWeAre/scientistPraisePage/ScientistPraiseCard';
import AddPage from './AddPraisePage';
import Spinner from '../../../../../reusable/spinner/Spinner';
import UpdatePage from './UpdatePraisePage';
import { Failed, Success } from '../../../alertPopup/AlertPopup';

export default function ScientistPraiseDashboard() {
    const [scientistPraise, setScientistPraise] = useState([]);
    const [caseToShow, setCaseToShow] = useState('');
    const [showLoadPanel, setShowLoadPanel] = useState(false);
    const [selectedScientistPraise, setSelectedScientistPraise] = useState({});

    useEffect(() => {
        fetchPraiseData();
    }, []);

    const fetchPraiseData = () => {
        runLoadPanel(true);

        requester.get('/praises/get-praises').then(response => {
            runLoadPanel(false);
            setScientistPraise(response.data.model);
        }).catch(() => { runLoadPanel(false) });
    }

    const runLoadPanel = (status) => {
        setShowLoadPanel(status)
    }

    const addBtnHandle = () => {
        setCaseToShow(() => {
            if (caseToShow == '') {
                return 'add'
            }
            else {
                return ''
            }
        })
    }

    const deletePraise = (id) => {
        runLoadPanel(true);


        requester.delete(`/praises/delete-praise?praiseId=${id}`,).then(() => {
            fetchPraiseData()
            Success();
        }).catch(() => {

            Failed();
        })
    }
    return (
        <div className='whoWeAreBody' style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <div className='section-title'>قالوا عنا</div>

                <div
                    className='add-new-file'
                    style={{ marginTop: '0', padding: '1rem' }}
                    onClick={addBtnHandle}
                >
                    {
                        caseToShow != '' ? 'إلغاء' : 'إضافة ثناء'
                    }
                </div>

            </div>

            {showLoadPanel && <Spinner />}

            {

                caseToShow == 'add' ?
                    <AddPage fetchPraiseData={fetchPraiseData} setCaseToShow={setCaseToShow} praiseData={{ setScientistPraise, scientistPraise }} />
                    :
                    caseToShow == 'update' ?
                        <UpdatePage selectedScientistPraise={selectedScientistPraise} fetchPraiseData={fetchPraiseData} setCaseToShow={setCaseToShow} praiseData={{ setScientistPraise, scientistPraise }} />
                        :
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: '1fr', gridGap: '1.5rem', marginTop: '5rem' }}>
                            {scientistPraise?.map((item, index) => {
                                return <div style={{ position: 'relative' }}>
                                    <div key={index} style={{ cursor: 'pointer' }} onClick={() => { setCaseToShow('update'); setSelectedScientistPraise(item) }}>
                                        <ScientistPraiseCard data={item} dashboardCard={true} />
                                    </div>
                                    <div
                                        className='popup__form__nav__closeBtn'
                                        style={{ position: 'absolute', top: '0', left: '50px', background: 'grey', zIndex: '1', borderRadius: '0.5rem' }}
                                        onClick={() => deletePraise(item.id)}
                                    >
                                        <img src="/assets/Mask Group 67.svg" />
                                    </div>
                                </div>
                            })}
                        </div>

            }

        </div >
    )
}
