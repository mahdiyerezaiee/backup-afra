import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {GetPeriodicSalesReport} from "../../services/reportService";
import {useEffect, useState} from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,

    elements: {
        point: {
            radius: 0,
            hoverRadius: 5,
            hitRadius: 20,
        },
        line: {
            tension: 0.4
        }
    },
    plugins: {
        legend: {
            rtl: true,
            display: true,
            labels: {
                yPadding: '10',
                position: 'left',
                usePointStyle: true,
                pointStyle: 'circle',
                font: {
                    family: "diroz"
                }
            },

        },
        dataLabels: {
            display: true,
            color: "white",
        },
        tooltip: {
            previousBodyPadding: 'circle',
            usePointStyle: true,
            backgroundColor: "rgba(23,21,21,0.78)",
            Color: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
            bodyFont: {
                family: "diroz",
                size: 8


            },
            titleFont: {
                family: "diroz",
                size: 10

            }
        },
        
    },


    scales: {
        yAxes: {
            barPercentage: 1.6,
            grid: {
                display: false,
                zeroLineColor: "transparent"
            },
            ticks: {
                padding: 4,
                font: {
                    family: "diroz", // Add your font here to change the font of your x axis
                    size: 8
                },

                major: {
                    enable: true
                }
            }
        },
        xAxes: {
            barPercentage: 1.6,
            grid: {
                borderDash: [10, 10],
                display: true,
                zeroLineColor: "transparent"
            },
            ticks: {
                padding: 4,
                font: {
                    family: "diroz", // Add your font here to change the font of your x axis
                    size: 8
                },

                major: {
                    enable: false
                }
            }
        }
    }
};



export function ChartLine() {
    const [datas , setDatas]=useState([])
    const [TypeId , setTypeId]=useState(2)
    useEffect(()=>{
        const GetReport = async () => {
            try {
                const {data , status}= await GetPeriodicSalesReport(TypeId)
                setDatas(data.result.ordersPerSchedule)
            }catch (e) {
                console.log(e)
            }

        }
        GetReport()
    },[TypeId])
    const labels = datas.map(item=> item.scheduleName);

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: " سفارشات",
                data: datas.map(item=> item.orderCount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(255,255,255,0)',
            },


        ],
    };

    return (
        <div id="chartArea" className="col-xl-12 layout-spacing">
            <div className="widget widget-chart-three">
                <div className="widget-heading ">
                    <div className="d-inline float-left">
                        <h5 className="">تعداد سفارشات</h5>
                    </div>
                <div className="dropdown  custom-dropdown d-inline float-right ">
                    <a className="dropdown-toggle" href="#" role="button" id="uniqueVisitors" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-more-horizontal">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </a>

                    <div className="dropdown-menu" aria-labelledby="uniqueVisitors">
                        <a className="dropdown-item" onClick={()=> setTypeId(1)}>1 سال گذشته</a>
                        <a className="dropdown-item" onClick={()=> setTypeId(2)}>10 ماه گذشته</a>
                        <a className="dropdown-item" onClick={()=> setTypeId(3)}>10روز گذشته</a>
                    </div>
                </div>
                </div>
                <div className="btn-group m-2" role="group" aria-label="Basic example">
                </div>
                {/*<div className="widget-heading">*/}
                {/*    <h5 className="">درآمد</h5>*/}

                {/*</div>*/}
                <div className="widget-content" style={{height: "300px"}}>

                <Line options={options} data={data}/>
            </div>
            </div>
        </div>
    )
}
