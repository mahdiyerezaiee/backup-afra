import {GetSimplifiedReports} from "../../services/reportService";
import {useEffect, useState} from "react";
import {FaUserCheck} from "react-icons/fa"
const ReportBlock = () => {
const [report , setReport] = useState([])
  const getReport= async ()=> {
      try {
          const {data , status} = await  GetSimplifiedReports()
          setReport(data.result.simplifiedReports)
          console.log(data )
      }catch (e){
          console.log(e)
      }
  }
  useEffect(()=>{
      getReport()
  },[])
    return(<div className="widget  shadow" >
        <div className="row ">
            {report.map(item=>
                item.entityTypeId ===1 ?
            <div className="col-md-3 col-lg-3  " >
                <div  className="rounded p-2" style={{backgroundColor : 'orange' , backgroundImage:`url(${FaUserCheck()})` }}>
                <h1 style={{color : 'white'}}>{item.count}</h1>
                    <p style={{color : 'white'}}>مشتریان ثبت نام شده</p>

                </div>
            </div>:
                    item.entityTypeId ===2 ?
                        <div className="col-md-3 col-lg-3    " >
                            <div className="rounded p-2" style={{backgroundColor : 'skyblue'}}>
                          <h1 style={{color : 'white'}}>{item.count}</h1>
                                <p style={{color : 'white'}}>محصولات</p>

                            </div>
                        </div>:
                        item.entityTypeId ===3 ?
                            <div className="col-md-3 col-lg-3    " >
                                <div className="rounded p-2" style={{backgroundColor : 'green'}}>
                                    <h1  style={{color : 'white'}}>{item.count}</h1>
                                    <p style={{color : 'white'}}>سازمان ها</p>


                                </div>
                            </div>:
                            item.entityTypeId ===6 ?
                                <div className="col-md-3 col-lg-3  " >
                                    <div className="rounded p-2" style={{backgroundColor : 'lightcoral'}}>
                                        <h1 style={{color : 'white'}}>{item.count}</h1>
                                        <p style={{color : 'white'}}>تامین کنندگان</p>


                                    </div>
                                </div>:
null

            )}
        </div>

    </div>)
}
export default ReportBlock