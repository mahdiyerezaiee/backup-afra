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
import { RiDatabase2Fill } from 'react-icons/ri';

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
interface Props {
    data1: any;
    data2: any;

    labels: any;
  }
export function ChartBar({ data1, data2, labels }: Props) {
   
 const data:any = {
        labels: labels,
        datasets: [
          {
            
            data: [data1 , data2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
              ],
              borderWidth: 1
          }
          
        ]
      };
      const config:any = {
        type: 'bar',
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
                display: false,

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
              
               
                
                <div className="" >

                <Bar options={config} data={data}/>
            </div>
            </div>
        </div>
    )
    
}
