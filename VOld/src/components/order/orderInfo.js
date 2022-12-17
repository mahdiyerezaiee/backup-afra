import {useSelector} from "react-redux";

const OrderInfo = ({orderWeight,TakhsisWeight,havalehWeight,barbariWeight}) => {
    const roles = useSelector(state => state.userRole)

    return(
      <div className=' row col-lg-12 col-md-12 col-sm-12 col-xs-12 p-4  '>


          < div className="form-group mb-4 textOnInput col-lg-2 rounded border  border-dark m-auto p-2 text-center" style={{background:'#ffffd9'}} >

              <label>وزن سفارش </label>

              <span style={{fontWeight:'bold',color:'black',fontSize:'15px'}}>{orderWeight}</span>
          </div>
           < div className=" form-group mb-4 textOnInput col-lg-2 rounded border  border-dark m-auto p-2  text-center" style={{background:'#ffffd9'}} >

              <label>وزن تخصیص</label>

              <span style={{fontWeight:'bold',color:'black',fontSize:'15px'}}>{TakhsisWeight}</span>
          </div>
          {roles.includes(7) || roles.includes(5) ||roles.includes(8) ?  < div className=" form-group mb-4 textOnInput col-lg-2 rounded border  border-dark  m-auto p-2  text-center" style={{background:'#ffffd9'}}>

              <label>وزن حواله</label>

              <span style={{fontWeight:'bold',color:'black',fontSize:'15px'}}>{havalehWeight}</span>
          </div>:''}
          < div className=" form-group mb-4 textOnInput col-lg-2 rounded border  border-dark  m-auto p-2  text-center " style={{background:'#ffffd9'}}>

              <label>وزن بارنامه</label>

              <span style={{fontWeight:'bold',color:'black',fontSize:'15px'}}>{barbariWeight}</span>
          </div>
      </div>
  )
}
export default OrderInfo