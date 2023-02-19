import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.css"
import { Fragment } from 'react';

const video = require("../Common/Shared/Assets/img/Home.mp4")

const SysPlus: React.FC = () => {
  useEffect(()=>{
    
      if (window.innerWidth <= 600) {
        let vid:any= document.getElementById('video');
        console.log(vid);
        
        let wrap:any = document.getElementById('videowrapper');
        vid.removeAttribute("autoPlay");
        // wrap.classList.toggle('hide');
        // vid.play();
        // vid.addEventListener('ended',function(e:any) {
        //   wrap.classList.toggle('hide');    
        // });
      }
   
  },[window.innerWidth <= 600 ])
  const navigate = useNavigate()
const token=localStorage.getItem('token')
  const handelNavigate = (e: any) => {
    e.preventDefault()
    if(token){
      navigate('/client')
    }
    else{
    navigate('/login')
    }

  }
  return (
    <Fragment>
      <div className='video'>
        <div id="videowrapper"  className='video-section ' >
          <video autoPlay loop muted  id="video">
            <source src={video} type="video/mp4" />
          </video>

        </div>
        <div className="button-video  ">
          <button className='btn btn-outline-dark ' style={{ fontSize: "1rem" }} onClick={handelNavigate}>
            ورود به سامانه
          </button>

        </div>
        <div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div >
      </div>

    </Fragment>
  )
}

export default SysPlus