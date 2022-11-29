import {useEffect, useRef, useState} from "react";
import {
    GetSupportRequesstsAdmin, GetSupportRequesstsUser,
    GetSupportRequestMessages,
    SetSupportRequestMessage
} from "../../services/TicketService";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Card ,Button} from "react-bootstrap";

const Message = () => {
    const user = useSelector(state => state.userInfo);
const [newMessage ,setNewMessage]=useState("")
    const params = useParams()
    const [getmessage, setGetMessage] = useState('')
   
    const showMessage = async () => {
        try {
            const {data, status} = await GetSupportRequestMessages(params.id)
            setGetMessage(data.result.supportRequestMessages.values)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        showMessage()
    }, [])
    const messageInfo={
        "supportRequestMessageDto": {
            supportRequestId:params.id,
            creatorId:user.id,
            message:newMessage,
            createDate: new Date()
        }

    }
    const sendMessage =async () => {
      try {
          const {data , status}=await SetSupportRequestMessage(messageInfo)
          setNewMessage("");
          showMessage()

      }catch (err){
          console.log(err)
      }
    }
    const interHandler = (e) => {
        if (e.key=== 'Enter'){
            sendMessage()

        }
    }
    
    return (<div className='  user-progress' >
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                <h5 >عنوان تیکت:{params.title}
                </h5>
            </div>
        </div>

        <div className="p-3 user-list-box">
            <div className="people  ps--active-y clearfix" id="chat-content"  >

                {getmessage&&getmessage.map((item) => {
                    if (item.creatorId === user.id)
                        return (<div className=" col-lg-8 col-md-8 col-sm-8 col-xs-8 p-3 m-2 float-left d-grid" key={item.id}>


<Card border="primary" text="dark" color="dark" className="d-block"  >

    <Card.Header className="p-2 " ><Card.Text>{item.creatorName}</Card.Text>
        <time style={{float:'left' , color: 'black'}}>{  new Date(item.createDate.toString()).toLocaleString('fa-IR')}</time></Card.Header>
    <hr style={{color:'primary', borderTop: '2px solid blue'}}/>
                           <Card.Body>
                                <Card.Text>
                                    {item.message}
                                </Card.Text>

                           </Card.Body>
</Card>

                        </div>)
                    else
                        return (

                            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 p-3 m-2 float-right d-grid" key={item.id}>

                                <Card border="success" text="dark" color="dark"  className="d-block m-2 " >
                                    <Card.Header  className="p-2"  ><Card.Text>{item.creatorName}</Card.Text>
                                        <time style={{float:'left' , color: 'black'}}>{new Date(item.createDate).toLocaleString('fa-IR')}</time></Card.Header>
                                    <hr style={{color:'forestgreen', borderTop: '2px solid forestgreen'}}/>

                                    <Card.Body>
                                        <Card.Text>
                                            {item.message}
                                        </Card.Text>

                                    </Card.Body>
                                </Card>

                            </div>)

                })}
                <div className="ps__rail-x" style={{left: '0px', bottom: '-600px'}}>
                    <div className="ps__thumb-x" tabIndex="0" style={{left: '0px', width: '0px'}}></div>
                </div>
                <div className="ps__rail-y" style={{top: "600px", height: "99px" ,right: "318px"}}>
                    <div className="ps__thumb-y" tabIndex="0" style={{top: '56px', height: '9px'}}></div>
                </div>
            </div>

            <div className="publisher bt-1 border-light">

                <input
                    className="publisher-input w-50"
                    type="text"
                    placeholder="پیام..."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={interHandler}
                />
<input type="file" disabled/>
                <Button className=" " onClick={sendMessage}> ارسال پیام</Button>
            </div>
        </div>
    </div>)
}
export default Message