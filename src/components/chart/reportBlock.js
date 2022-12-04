import {GetSimplifiedReports} from "../../services/reportService";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {BsFillArrowLeftCircleFill} from "react-icons/bs"
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
            <div className="col-md-3 col-lg-3 mb-1  " >
                <div  className="rounded p-2 mb-1" style={{backgroundColor : '#ffc457', backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  viewBox='60 0 640 512'%3E%3Cpath d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zm323-128.4l-27.8-28.1c-4.6-4.7-12.1-4.7-16.8-.1l-104.8 104-45.5-45.8c-4.6-4.7-12.1-4.7-16.8-.1l-28.1 27.9c-4.7 4.6-4.7 12.1-.1 16.8l81.7 82.3c4.6 4.7 12.1 4.7 16.8.1l141.3-140.2c4.6-4.7 4.7-12.2.1-16.8z' fill='orange' /%3E%3C/svg%3E" )`, backgroundRepeat:'no-repeat' }}>
                <h1 style={{color : 'white'}}>{item.count}</h1>
                    <p style={{color : 'white'}}>مشتریان ثبت نام شده</p>

                </div>
                <div className="text-center text-light rounded p-2 " style={{backgroundColor : 'orange' , marginTop:'-10px'}}>
                    <NavLink style={{color:"white"}}  to="/userList">اطلاعات بیشتر</NavLink>
                    {""}
                    <BsFillArrowLeftCircleFill/>

                </div>
            </div>:
                    item.entityTypeId ===2 ?
                        <div className="col-md-3 col-lg-3  mb-1  " >
                            <div className="rounded p-2 mb-1" style={{backgroundColor : 'skyblue'
                                , backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  viewBox='80 0 640 512'%3E%3Cpath d='M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z' fill='CornflowerBlue' /%3E%3C/svg%3E" )`, backgroundRepeat:'no-repeat' }}>


                          <h1 style={{color : 'white'}}>{item.count}</h1>
                                <p style={{color : 'white'}}>محصولات</p>

                            </div>
                            <div className="text-center text-light rounded p-2" style={{backgroundColor : 'CornflowerBlue' , marginTop:'-10px'}}>
                                <NavLink style={{color:"white"}}  to="/productList">اطلاعات بیشتر</NavLink>
                                {""}
                                <BsFillArrowLeftCircleFill/>

                            </div>
                        </div>:
                        item.entityTypeId ===3 ?
                            <div className="col-md-3 col-lg-3  mb-1  " >
                                <div className="rounded p-2 mb-1" style={{backgroundColor : 'LightSeaGreen'
                                    , backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  viewBox='5 0 23 23'%3E%3Cpath d=' M20,3 L20,23 L4,23 L4,3 L20,3 Z M8.042,9 L10.042,9 L10.042,7 L8.042,7 L8.042,9 Z M14,9 L16,9 L16,7 L14,7 L14,9 Z M8.042,15 L10.042,15 L10.042,13 L8.042,13 L8.042,15 Z M10.042,23 L14.042,23 L14.042,19 L10.042,19 L10.042,23 Z M14,15 L16,15 L16,13 L14,13 L14,15 Z M2,3 L22,3 L22,1 L2,1 L2,3 Z' fill='Teal' /%3E%3C/svg%3E" )`, backgroundRepeat:'no-repeat' }}>

                                <h1  style={{color : 'white'}}>{item.count}</h1>
                                    <p style={{color : 'white'}}>سازمان ها</p>


                                </div>
                                <div className="text-center text-light rounded p-2" style={{backgroundColor : 'Teal' , marginTop:'-10px'}}>
                                    <NavLink style={{color:"white"}}  to="/organizationlist">اطلاعات بیشتر</NavLink>
                                    {""}
                                    <BsFillArrowLeftCircleFill/>

                                </div>
                            </div>:
                            item.entityTypeId ===6 ?
                                <div className="col-md-3 col-lg-3 mb-1 " >
                                    <div className="rounded p-2 mb-1" style={{backgroundColor : 'lightcoral'
                                        , backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  viewBox='5 0 512 512'%3E%3Cpath d=' M35.68 54.7l-4.89 17.17 92.71 27.3 5.3 1.53L179 367.4c3.4-1.2 6.9-2.2 10.6-2.9 1.7-.3 3.3-.5 5-.7L142.1 85.03 35.68 54.7zm274.62 59.2l-139.5 26.3 20.4 107.9L330.7 222l-20.4-108.1zm86.6 113.9l-45.2 8.5v.1l-128.5 24.1-28.7 5.4 18.4 98c21.3 3 40.3 15.3 51.8 33.3l158.5-29.8-26.3-139.6zM458 379.1L272.6 414c.9 2.9 1.6 5.8 2.2 8.8.4 2.3.8 4.6 1 6.9l185.1-34.8-2.9-15.8zm-254 2.1c-3.6 0-7.3.3-11.1 1-29.9 5.6-49.5 34.3-43.8 64.2 5.6 30 34.2 49.5 64.2 43.9 30-5.6 49.5-34.2 43.9-64.2-5-26.3-27.5-44.5-53.2-44.9zm-1.6 21.3c15.3.3 29 11.3 32 26.9 3.3 17.7-8.6 35.1-26.4 38.5-17.8 3.3-35.1-8.5-38.5-26.3-3.3-17.8 8.5-35.2 26.3-38.6 2.2-.4 4.4-.6 6.6-.5zm-.2 17.9c-1 0-2 .1-3 .3-8.3 1.6-13.6 9.3-12 17.5 1.5 8.3 9.3 13.6 17.5 12 8.3-1.6 13.5-9.3 12-17.5-1.4-7.3-7.5-12.2-14.5-12.3z' fill='IndianRed' /%3E%3C/svg%3E" )`, backgroundRepeat:'no-repeat' }}>

                                    <h1 style={{color : 'white'}}>{item.count}</h1>
                                        <p style={{color : 'white'}}>تامین کنندگان</p>

                                    </div>
                                    <div className="text-center text-light rounded p-2" style={{backgroundColor : 'indianred' , marginTop:'-10px'}}>
                                        <NavLink style={{color:"white"}}  to="/supplierList">اطلاعات بیشتر</NavLink>
                                        {""}
                                        <BsFillArrowLeftCircleFill/>

                                    </div>
                                </div>:
null

            )}
        </div>

    </div>)
}
export default ReportBlock