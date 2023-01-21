import React from 'react'
import { useNavigate } from 'react-router-dom';
const video=require(  "../../Common/Shared/Assets/img/Home.mp4")
import "./style.css"
const SysPlus:React.FC = () => {
  const navigate=useNavigate()

  const handelNavigate=(e:any)=>{
e.preventDefault()
navigate('/login')


  }
  return (
    <div className='video'>
    <div className='video-section'>
        <video  autoPlay loop muted  style={{width: '100%', height: '100%'}}>
            <source src={video} type="video/mp4" />
        </video>

    </div>
        <div className="button-video ">
            <button className='btn btn-outline-dark ' style={{fontSize:"1rem"}}  onClick={handelNavigate}>
                ورود به سامانه
            </button>

        </div>

    </div>
  )
}

export default SysPlus