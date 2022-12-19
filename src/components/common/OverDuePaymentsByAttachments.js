import {useEffect, useState} from "react";
import {HasOverDuePaymentsByAttachments} from "../../services/orderService";
import {Link, useNavigate} from "react-router-dom";
import {FiAlertOctagon} from "react-icons/fi"
import {BsArrowLeftCircle} from "react-icons/bs"
const OverDuePaymentsByAttachments = () => {
    const navigate = useNavigate()

  const [checked , setChecked]= useState(false)
    const data = async () => {
      try {
          const {data , status} = await HasOverDuePaymentsByAttachments()
          if (data.success === true){
              setChecked(true)
          }
      }catch (e) {
          console.log(e)
      }

    }
    useEffect(()=>{
        data()
    },[])

    if (checked ){
        return(
        <Link to="/orderList" state="fromDashboard" className="text-light">
        <div className="w-100 bg-danger p-2 rounded">
        <div className="row">
            <div className="col-lg-6 ">
                <div className="float-left">
                    <FiAlertOctagon size='2rem' className="m-2"/>
                <span>
                    موعد سررسید چند سفارش رسیده
                </span>
                </div>
            </div>
            <div className="col-lg-6 m-auto">

                <div className="float-right ">
                    <Link to="/orderList" state="fromDashboard" className="text-light">  مشاهده بیشتر</Link>
                    <BsArrowLeftCircle size="1.5rem" className="mx-2" style={{position: 'relative',animation: "changeRight 1s infinite"}}/>

                </div>
            </div>
        </div>
    </div>
        </Link>)}else {
        return(null)
    }

}
export default OverDuePaymentsByAttachments