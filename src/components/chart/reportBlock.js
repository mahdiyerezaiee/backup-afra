import {GetSimplifiedReports} from "../../services/reportService";
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {BsFillArrowLeftCircleFill} from "react-icons/bs"
import {IoIosArrowBack} from "react-icons/io"
import {IoIosArrowForward} from "react-icons/io"
import {ReportEntityStyle} from "../../Enums/ReportEntityStyle";

const ReportBlock = () => {
    const [showMore, setShowMore] = useState(false);
    const defaultStyles= {
        transition: `opacity 300ms ease-in-out`,
        opacity: 0,
    };

    const transitionStyles = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
    };
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
    let repots =   showMore ? ReportEntityStyle.slice( 6 , 11  ) : ReportEntityStyle.slice( 0 ,6  )
    return(<div className="widget  shadow sliderReport" >
        <div className="row " style={{zIndex:"2" , backgroundColor:'white'}}>
            <div className="col-md-6 col-lg-1 mb-1  " >
             <button className="border-0  py-5  float-right bg-transparent edit-btn"   disabled={!showMore } onClick={()=> setShowMore(false)}><IoIosArrowForward size={'3rem'}/></button>
            </div>

            {report.map(item=>

                repots.map(i => i.id === item.entityTypeId  ?
            <div className="col-md-6 col-lg-2 mb-1  " style={{ zIndex:'1',position: 'relative',animation:showMore?"changeRight 1s " : "changeLeft 1s"}} >
                <div  className="rounded p-2 mb-1" style={{backgroundColor : `${i.color}`,
                    backgroundImage:`${i.icon}`, backgroundRepeat:'no-repeat' }}>
                <h1 style={{color : 'white'}}>{item.count}</h1>
                    <p style={{color : 'white'}}>{i.name}</p>

                </div>
                <div className="text-center text-light rounded p-2 " style={{backgroundColor : `${i.colorLink}` , marginTop:'-10px'}}>
                    <NavLink style={{color:"white"}}  to={i.path}>اطلاعات بیشتر</NavLink>
                    {""}
                    <BsFillArrowLeftCircleFill/>

                </div>
            </div>:null) )}
            <div className="col-md-6 col-lg-1 mb-1  "  >
                <button className="border-0 m-auto py-5 bg-transparent edit-btn"  disabled={showMore } onClick={()=> setShowMore(true)}>  <IoIosArrowBack size={'3rem'}/></button>

            </div>
        </div>


    </div>)
}
export default ReportBlock