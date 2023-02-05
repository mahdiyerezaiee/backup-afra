import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.css"
import { Fragment } from 'react';

const video = require("../Common/Shared/Assets/img/Home.mp4")



const SysPlus: React.FC = () => {
  const navigate = useNavigate()

  const handelNavigate = (e: any) => {
    e.preventDefault()
    navigate('/login')


  }
  return (
    <Fragment>
      <div className='video'>
        <div className='video-section'>
          <video autoPlay loop muted style={{ width: '100%', height: '20%' }}>
            <source src={video} type="video/mp4" />
          </video>

        </div>
        <div className="button-video ">
          <button className='btn btn-outline-dark ' style={{ fontSize: "1rem" }} onClick={handelNavigate}>
            ورود به سامانه
          </button>

        </div>

      </div>
     
    </Fragment>
  )
}

export default SysPlus