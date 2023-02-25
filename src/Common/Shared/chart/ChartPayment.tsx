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
    const [PaymentMethodId , setPaymentMethodId]=useState(0)

const config:any = {
    type: 'line',
    responsive: true,
  data:datas,
    maintainAspectRatio: false,
    
      elements: {
          point: {
              radius: 0,
              hoverRadius: 5,
              hitRadius: 20,
  
          },
          line: {
              // tension: 0.4
          }
      },
      plugins: {
         
          legend: {
              rtl: true,
              labels: {
                  yPadding: '10',
                  position: 'left',
                  usePointStyle: true,
                
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
                      enable: true
                  }
              },
              suggestedMin: -10,
                suggestedMax: 200
          },
          xAxes: {
              barPercentage: 1.6,
              grid: {
                  borderDash: [10, 10],
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
                      enable: false
                  }
              }
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
                    PaymentMethodId
                    
    
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
    
     if (ScheduleTypeId || PaymentMethodId){
        GetReport()

    }

},[ScheduleTypeId , PaymentMethodId])
    if (datas && datas.length >0){
        const labels =datas.map((item:any)=>item.scheduleName === new Date().toLocaleDateString("fa-IR") ? item.scheduleName + "امروز": item.scheduleName)
    
    const data:any = {
        labels: labels,
        datasets: [
          {
            label: 'پرداخت شده',
            data: datas.map((i:any)=> i.paid),
            borderColor: "MediumVioletRed",
            fill: false,
            pointStyle: 'circle',

          }, {
            label: 'پرداخت نشده',
            data: datas.map((i:any)=> i.notPaid),
            borderColor: "OliveDrab",
            fill: false,
          }, {
            label: 'کل',
            data: datas.map((i:any)=> i.total),
            borderColor: "MediumSlateBlue",
            fill: false
          },
          
        ]
      };

    return (
        <div id="chartArea" className="col-xl-12 layout-spacing">
            <div className="widget widget-chart-three">
                <div className="widget-heading ">
                    <div className="d-inline float-left">
                        <h5 className=""> گزارش پرداخت ها</h5>
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

                    <div className="dropdown-menu" aria-labelledby="uniqueVisitors">
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(1)}>10 سال اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(2)}>10 ماه اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(3)}>10روز اخیر</a>
                    </div>
                </div>
                </div>
                <div className="btn-group m-2" role="group" aria-label="Basic example">
                </div>
                <div className="widget-heading text-center">
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
        return null
    }
}
