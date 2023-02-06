
import {useNavigate} from "react-router-dom";
import ListTicket from './ListTicket';

const Ticket:React.FC = () => {
  const Navigate=useNavigate()

  const newTicket = () => {
    Navigate("/admin/newTicket")
  }
  return(
      <div className="chat-section layout-top-spacing">
        <div className="row">

          <div className="col-xl-12 col-lg-12 col-md-12">


<ListTicket/>

  </div>
  </div>
  </div>
  )
}
export default Ticket