import {useState , useRef} from "react";
import {useSelector} from "react-redux";
import {setSupportRequessts, SetSupportRequestMessage} from "../../services/TicketService";
import {NavLink, useNavigate} from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";

const NewTicket = () => {
    const user = useSelector(state => state.userInfo);
   

    const Navigate=useNavigate()

    const [title , setTitle]=useState("")
    const [message ,setMessage]=useState("")
    let supportRequestId=0
    const validator = useRef(new SimpleReactValidator({
        validators:{
            alpha:{

                rule: (val ,params,validator) => {
                    return validator.helpers.testRegex(val, /^[A-Z آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]*$/i, )&& params.indexOf(val) === -1;
                }
            },

        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد",
            alpha:"لطفا از حروف استفاده کنید"

        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));
    const sendTicket = {
        "supportRequestDto":{
            title,
    creatorId:user.id,
    onlineChat: false,
        }

}


    const sendMessage =async () => {
        const messageInfo={
            "supportRequestMessageDto": {
                supportRequestId,
                creatorId:user.id,
                message,
            }

        }
        try {
            const {data , status}=await SetSupportRequestMessage(messageInfo)

        }catch (err){
            console.log(err)
        }
    }
    const sendTicketHandler = async () => {
        const {data , status} = await setSupportRequessts(sendTicket)
        if (status === 200) { supportRequestId=(data.result.supportRequestId); }
        
        await sendMessage()
    }
    const submit = (e) => {
        e.preventDefault()

        sendTicketHandler()
        Navigate("/ticket")
    }
    return(
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف تیکت جدید</h5>
                    <p>در این بخش می توانید تیکت جدید تعریف  کنید.</p>
                    
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-4 col-xs-12'>


                    <form className="col" >
                        
                        <div className="form-group mb-4 textOnInput  align-content-between">

                            <label >عنوان</label>
                            <input type="text" className="form-control opacityForInput" placeholder="عنوان " value={title}
                                   onChange={e => {
                                       setTitle(e.target.value)
                                       validator.current.showMessageFor("alpha");
                                   }} />
                            {validator.current.message("alpha", title, "required|alpha")}

                        </div>
                        <div className="form-group mb-4 textOnInput">
                            <label >پیام</label>
                            <textarea   rows={10} className="form-control opacityForInput" placeholder="پیام " value={message}
                                        onChange={e => {
                                            setMessage(e.target.value)
                                            validator.current.showMessageFor("required");
                                        }} />
                            {validator.current.message("required", message, "required")}

                        </div>
                        <div className='row'>
                            <div className='col-6 '>
                                <button type="submit" className="btn btn-success float-left"  onClick={submit} >تایید</button>
                            </div>
                            <div className='col-6 '>
                                <NavLink to='/ticket' className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>




                    </form>
                </div >
            </div >
        </div>

    )
}
export default NewTicket