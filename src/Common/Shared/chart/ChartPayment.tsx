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
import {GetPaymentsReport, GetPeriodicSalesReport} from "../../../services/reportService";
import {useEffect, useState} from "react";
import  QueryString  from 'qs';
import { ScheduleTypes } from '../../Enums/scheduleTypes';

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


    
    



export function ChartPayment() {
    const [datas , setDatas]=useState<any>([])
    const [ScheduleTypeId , setScheduleTypeId]=useState(3)   
     const [PriceUnitId , setPriceUnitId]=useState(3)

    const [PaymentMethodId , setPaymentMethodId]=useState(0)
    
    const totalDuration = 2000;
    const delayBetweenPoints = totalDuration / datas.length;
    const previousY = (ctx:any) => ctx.index === 0 ? ctx.chart.scales.yAxes.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
      x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx:any) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      },
      y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx:any) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      }
    };
  

useEffect(()=>{
    const GetReport = async () => {
        try {
            let config = {

                headers: { 'Content-Type': 'application/json' },
    
                params: {
                    ScheduleTypeId,
                    PaymentMethodId,
                    PriceUnitId
    
                },
                paramsSerializer: (params:any) => {
    
                    return QueryString.stringify(params)
                }
    
    
            };
            const {data , status}= await GetPaymentsReport(config)

            setDatas(data.result.paymentsPerSchedule)

        }catch (e) {
            console.log(e)
        }

    }
    
     if (ScheduleTypeId || PaymentMethodId || PriceUnitId){
        GetReport()

    }

},[ScheduleTypeId , PaymentMethodId , PriceUnitId])
    
    if (datas && datas.length >0){
        
       
        let labels  = datas.map((item:any)=>item.current === true ? item.scheduleName + " " + "(اکنون)": item.scheduleName)

    const data:any = {
        labels: labels,
        datasets: [
          {
            label: 'پرداخت شده',
            data: datas.map((i:any)=> i.paid),
            borderColor: "MediumVioletRed",
            // fill: false,
            pointStyle: 'circle',
          
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBorderColor:"#ffffff",
            pointBackgroundColor:'MediumVioletRed',
           shadowBlur : 10,
            shadowOffsetX : 0,
            shadowOffsetY : 4,

          }, {
            label: 'پرداخت نشده',
            data: datas.map((i:any)=> i.notPaid),
            borderColor: "OliveDrab",
            // fill: false,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBorderColor:"#ffffff",
            pointBackgroundColor:'OliveDrab',
           shadowBlur : 10,
            shadowOffsetX : 0,
            shadowOffsetY : 4,
          }, {
            label: 'کل',
            data: datas.map((i:any)=> i.total),
            borderColor: "MediumSlateBlue",
            // fill: false,
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBorderColor:"#ffffff",
            pointBackgroundColor:'MediumSlateBlue',
           shadowBlur : 10,
            shadowOffsetX : 0,
            shadowOffsetY : 4,
          },
          
        ]
      };
     
      const config:any = {
        responsive: true,
        maintainAspectRatio: false,
    backgroundColor: "blue",

    animation,
    interaction: {
      intersect: false
    },
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
                display: false,
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
                      // borderDash: [10, 10],
                      drawBorder: false,
      
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
                  },
                 
              },
              xAxes: {
                
                
                  barPercentage: 1.6,
                  grid: {
                      borderDash: [10, 10],
                      display: (c:any) => {
                        
                        return c.scale.ticks.map((i:any)=>i.label.includes("اکنون") )? false : true
                    },
                      zeroLineColor: "transparent"
                  },
                  ticks: {
  
                    rtl:false,
                    color: (c:any) => {
                        return c.tick.label.includes('اکنون') ? "red" : "black"
                    },
                      padding: 4,
                      font: {
                          family: "diroz", // Add your font here to change the font of your x axis
                          size: 8,
                          weight:500,
                      },
      
                      major: {
                          enable: false
                      }
                  }
              }
          }
      };
    return (
        <div id="chartArea" className="col-xl-12 layout-spacing">
            <div className="widget widget-chart-three">
                <div className="widget-heading ">
                    <div className="d-inline float-left">
                        <h5 className=""> گزارش پرداخت ها</h5>
                    </div>
                    <div className="d-inline float-left px-2">
                    <span >{"10"  + " "+ ScheduleTypes.filter((i:any)=> i.value === `${ScheduleTypeId}`).map((i:any)=> i.label) + " "+ "اخیر"}
                 { " " }
                    در مقیاس   
                    { " " }
                    {PriceUnitId === 1 ? "ریال" : PriceUnitId === 2 ? "تومان" : PriceUnitId === 3 ? "  میلیون تومان"    :"میلیارد تومان"}
                    </span> 
                    </div>

                <div className="dropdown  custom-dropdown d-inline float-right ">
                    <a className="dropdown-toggle" role="button" id="uniqueVisitors" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-more-horizontal">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </a>

                    <div className="dropdown-menu" aria-labelledby="uniqueVisitors" style={{width:"20rem"}}>
                        <div  className='row'>
                             <div className='col-6 border-right'>
                                <span>تاریخ</span>
                             <a className="dropdown-item" onClick={()=> setScheduleTypeId(1)}>10 سال اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(2)}>10 ماه اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(3)}>10روز اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(4)}> 10 ساعت اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(5)}> 10دقیقه اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(6)}> 10 ثانیه اخیر</a>
                            </div>
                            <div className='col-6'> 
                            <span>واحد قیمت</span>
                            <a className="dropdown-item" onClick={()=> setPriceUnitId(1)}>ریال</a>
                        <a className="dropdown-item" onClick={()=> setPriceUnitId(2)}>تومان</a>
                        <a className="dropdown-item" onClick={()=> setPriceUnitId(3)}> میلیون تومان</a>
                        <a className="dropdown-item" onClick={()=> setPriceUnitId(4)}> میلیارد تومان</a>
                            </div>
                            </div>
                    
                   
                    
                    </div>
                    
                </div>
                </div>
                
                    
                
                      
               
                <div className="btn-group m-2" role="group" aria-label="Basic example">
                </div>
                <div className="widget-heading ">
                 <span className="m-auto text-dark">نحوه پرداخت</span> :
<div className='d-inline p-2 '>

<input type="radio" className='mx-1' checked={PaymentMethodId === 0} onChange={()=> setPaymentMethodId(0)}/> 
کل
</div>
<div className='d-inline p-2 '>

<input type="radio" className='mx-1' checked={PaymentMethodId === 2} onChange={()=> setPaymentMethodId(2)}/> 
نقدی
</div>
<div className='d-inline p-2 '>

<input type="radio" className='mx-1' checked={PaymentMethodId === 4} onChange={()=> setPaymentMethodId(4)}/> 
اعتباری(چک)
</div>



                </div>
                <div className="widget-content  pt-3 border-top" style={{height: "300px"}}>

                <Line options={config} data={data}/>
            </div>
            </div>
        </div>
    )
    }else {
        return (<div className="text-center dashboard-widget p-3 my-2">
      
        <div>اطلاعاتی برای نمایش وجود ندارد</div>
        </div>)
    }
}
