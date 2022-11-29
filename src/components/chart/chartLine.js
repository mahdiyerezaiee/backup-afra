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

const labels = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر'];

export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'فروش کالا 1',
            data: [88, 5, 10, 15, 44, 9, 46],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(255,255,255,0)',
        },
        {
            fill: true,
            label: 'فروش کالا 2',
            data: [10, 8, 18, 15, 94, 5, 4],
            borderColor: 'rgb(235,53,86)',
            backgroundColor: 'rgba(255,255,255,0)',
        },
    ],
};

export function ChartLine() {
    return (
        <div id="chartArea" className="col-xl-12 layout-spacing">
            <div className="statbox widget  box-shadow ">
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
