import React, { useEffect, useState } from 'react';
import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';
import requester from '../../../requester/requester';
import Spinner from '../../../reusable/spinner/Spinner';

export default function HomeDashboard() {

    const [records, setRecords] = useState([]);
    const [showLoadPanel, setShowLoadPanel] = useState(false);


    useEffect(() => {
        setShowLoadPanel(false);
    }, [records]);


    useEffect(() => {
        fetchTableData();
    }, []);


    const runLoadPanel = () => {
        setShowLoadPanel(true)
    }


    const fetchTableData = () => {
        runLoadPanel();
        requester.get("/projects/donate/get-all-donates")
            .then((response) => {
                let chartData = {}
                let finalResult = []

                response.data?.model?.map(donation => {
                    chartData[donation.projectName] = (chartData[donation.projectName] || 0) + donation.donateValue
                })

                Object.entries(chartData).map((project, index) => {
                    let projectAsObject =
                        finalResult.push({ projectName: project[0], value: project[1] })
                })

                setRecords(finalResult);
            }).catch(() => {
                setRecords([]);
            })
    }


    return (
        <div>

            {showLoadPanel && <Spinner />}

            <Chart id="chart" dataSource={records} rtlEnabled width='100%'>

                <CommonSeriesSettings
                    argumentField="state"
                    type="bar"
                    hoverMode="allArgumentPoints"
                    selectionMode="allArgumentPoints"
                >

                    <Label visible={true}>
                        <Format type="fixedPoint" precision={0} />
                    </Label>

                </CommonSeriesSettings>

                <Series
                    valueField="value"
                    argumentField="projectName"
                    name="التبرع للمشريع"
                    type="bar"
                    color="#195F30"
                    barWidth="100"
                    hoverMode="allArgumentPoints"
                />

            </Chart>
        </div>
    )
}
