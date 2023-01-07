
import './style.css'

import {OrderStatusEnumsProgressBar} from "../Common/Enums/OrderStatusEnumsProgressBar";
const ProgressBar = ({id ,number}) => {
    return(
      <div  className="form-group mb-5 textOnInput col-lg-12 rounded border  border-dark  m-auto p-2  text-center">
          <label> وضعیت سفارش</label>
      <div className="container-fluid">
        <br/><br/>
          {id?
          id === 13 ? <h4 className="mb-4"><b className="bold text-danger" >سفارش لغو شد</b> </h4>:
            <ul className= { "list-unstyledr multi-stepss"}>
                 {
                     OrderStatusEnumsProgressBar.sort((a, b) => (a.number > b.number ? 1 : -1)).map(item =>
                   item.id !== 13 ?  <li key={item.id} id={`step-${item.id}`}
                            className={item.id === id ? 'is-active' : ''}>{item.name}
                            {item.id !== 12 ? <div className={"progress-bars progress-bars--success"}>
                                <div className={item.number >= number ? "progress-bars__bars" : ''}></div>
                            </div> : ""}
                        </li>: ''
                    )
                }


        </ul>:''}

      </div>
      </div>
  )
}
export default ProgressBar