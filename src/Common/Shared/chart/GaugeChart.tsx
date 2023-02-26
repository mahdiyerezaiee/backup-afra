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
    ArcElement
} from 'chart.js';

import {Doughnut} from 'react-chartjs-2';
import { GetPaymentsReport, GetShippingsReport} from "../../../services/reportService";
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
    Legend,
    ArcElement
);


    
    

interface Props{
    data1:any , data2:any ,data3:any, labels:any
}

export function GaugeChart({data1 , data2 ,data3, labels}:Props) {
    console.log(data2);
    
 const data:any = {
    labels:labels,

        datasets: [
          {
            // label:labels,
            data: [data1 , data2 ,data3  ],
            backgroundColor: ["rgba(255, 99, 132, 0.2)" , "#51f4eb42" ,"#74fac16b"  ],
        borderColor: ["rgba(255, 99, 132, 1)" , "#51f4eb" , "#74fac1" ],
        borderWidth: 1
          }
        ]
      };
      const config:any = {
        type: "doughnut",
       
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
 cutout: '64',
 legend: {
    rtl: true,
    labels: {
        yPadding: '10',
        position: 'left',
        usePointStyle: true,
      
        font: {
            family: "diroz"
        }
    },}
         
         
      };
    return (
        <div id="chartArea" className="col-xl-12 layout-spacing">
            <div className="">
               
            <div className="  pt-3 "   style={{height: "230px"}}>

                <Doughnut options={config} data={data}/>
            </div>
            </div>
        </div>
    )
   
}
