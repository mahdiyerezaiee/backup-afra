import {GetScheduleJobsReport} from "../../../services/reportService";
import {useEffect, useState} from "react";
import {GrUpdate} from "react-icons/gr"
const ScheduleJob = () => {
  const [report , setReport] = useState([])
    const GetData =async () => {
      try {
          const {data , status} = await GetScheduleJobsReport()
          setReport(data.result.scheduledJobs)
      }catch (e) {
          console.log(e)
      }
    }
    useEffect(()=>{
        GetData()
    },[])
    return(
        <div className="px-3 " style={{height: "330px" , overflowY:"auto"}}>
<div className=" ">
    {report.map(item=>
    <div className="   rounded" style={{backgroundColor:"white",padding:"14px 19px",border:" 2px solid #e0e6ed", borderRadius: "8px",marginBottom: "4px"}}>
        <div className="accordion-icon d-inline pr-2"  style={{color:"#1b55e2"}} >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="rgba(27, 85, 226, 0.239216)"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="feather feather-airplay">
            <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path>
            <polygon points="12 15 17 21 7 21 12 15"></polygon>
        </svg>
        </div>

        <span><b>{item.type} :</b></span>
        <span >{item.message}</span>
        <span  className="float-right">{new  Date(item.createDate).toLocaleString('fa-IR')}</span>
    </div>
    )}
</div>
        </div>
    )
}
export default  ScheduleJob