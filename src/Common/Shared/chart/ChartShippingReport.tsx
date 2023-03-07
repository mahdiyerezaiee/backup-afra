import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,

    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {GetShippingsReport} from "../../../services/reportService";
import {useEffect, useState} from "react";
import { AiOutlineWarning } from 'react-icons/ai';
import { ScheduleTypes } from '../../Enums/scheduleTypes';
import { formatter } from '../../../Utils/Formatter';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,

    Title,
    Tooltip,
    Filler,
    Legend
);

export function ChartShippingReport() {
    const [datas , setDatas]=useState<any>([])
    const [ScheduleTypeId , setScheduleTypeId]=useState(3)
   

useEffect(()=>{
    const GetReport = async () => {
        try {
           
            const {data , status}= await GetShippingsReport(ScheduleTypeId )

            setDatas(data.result.shippingsPerSchedule)

        }catch (e) {
            console.log(e)
        }

    }
    
     if (ScheduleTypeId  ){
        GetReport()

    }

},[ScheduleTypeId ])
    if (datas && datas.length > 0){
        const labels =datas.map((item:any)=>item.shippingCompanyName)
        let delayed:any;

    const data:any = {
        labels: labels,
        datasets: [
             {
                label: ' مقدار حمل شده',
                data: datas.map((i:any)=> i.plannedQuantity),
                borderColor: 'rgb(70,194,101)',
                backgroundColor: 'rgb(70,194,101,0.2)',
                borderWidth: 2,
                borderRadius: 2,
                borderSkipped: false,
                // stack: 0,
                // barThickness:100,

                type: 'bar'
              },
          {
            label: ' مقدار درخواست شده',
            data: datas.map((i:any)=> i.shippedQuantity),
            borderColor: 'rgb(27, 85, 226)',
                backgroundColor: "rgb(27, 85, 226 ,0.2)",
                borderWidth: 2,
                borderRadius: 2,
                borderSkipped: false,
               shadowBlur : 10,
                shadowOffsetX : 0,
                shadowOffsetY : 4,
            fill: false,
            // stack: 0,
            type: 'bar',
            // barThickness:100

          }
          
        ]
      };
      const config:any = {
        type: 'bar',
        responsive: true,
     maintainAspectRatio: false,
     animation: {
        onComplete: () => {
          delayed = true;
        },
        delay: (context:any) => {
          let delay = 0;
          if (context.type === 'data' && context.mode === 'default' && !delayed) {
            delay = context.dataIndex * 300 + context.datasetIndex * 100;
          }
          return delay;
        },
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
                    callback : function(value:any,index:any,array:any) { return  formatter.format(value)  },
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
                      },
                    //   beginAtZero: true,
                     
                  },
                
              },
              xAxes: {
                // stacked: true,
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
                          size: 10
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
                        <h5 className=""> گزارش باربری</h5>
                    </div>
                    <div className="d-inline float-left px-2">
                    <span >{"7"  + " "+ ScheduleTypes.filter((i:any)=> i.value === `${ScheduleTypeId}`).map((i:any)=> i.label) + " "+ "اخیر"}
                
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
                        
                             <a className="dropdown-item" onClick={()=> setScheduleTypeId(1)}>7 سال اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(2)}>7 ماه اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(3)}>7 اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(4)}> 7 ساعت اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(5)}> 7 اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(6)}> 7 ثانیه اخیر</a>
                           
                    
                   
                    
                    </div>
                </div>
                </div>
                <div className="btn-group m-2" role="group" aria-label="Basic example">
                </div>
                
                <div className="widget-content  pt-3 border-top" style={{height: "300px"}}>

                <Bar options={config} data={data}/>
            </div>
            </div>
        </div>
    )
    }else {
        return (
            <div id="chartArea" className="col-xl-12 layout-spacing">
            <div className="widget widget-chart-three">
                <div className="widget-heading ">
                    <div className="d-inline float-left">
                        <h5 className=""> گزارش باربری</h5>
                    </div>
                    <div className="d-inline float-left px-2">
                    <span >{"10"  + " "+ ScheduleTypes.filter((i:any)=> i.value === `${ScheduleTypeId}`).map((i:any)=> i.label) + " "+ "اخیر"}
                
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
                        
                             <a className="dropdown-item" onClick={()=> setScheduleTypeId(1)}>10 سال اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(2)}>10 ماه اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(3)}>10روز اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(4)}> 10 ساعت اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(5)}> 10دقیقه اخیر</a>
                        <a className="dropdown-item" onClick={()=> setScheduleTypeId(6)}> 10 ثانیه اخیر</a>
                           
                    
                   
                    
                    </div>
                </div>
                </div>
                <div className="btn-group m-2" role="group" aria-label="Basic example">
                </div>
                
                <div className="text-center dashboard-widget p-3 my-2">
      
      <div>اطلاعاتی برای نمایش وجود ندارد</div>
      </div>
            </div>
        </div>
        
       )
    }
}
