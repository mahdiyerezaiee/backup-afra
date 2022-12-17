import React from 'react'
import { useNavigate } from 'react-router-dom';

const SysPlus = () => {
  const navigate=useNavigate()

  const handelNavigate=(e)=>{
e.preventDefault()
navigate('/login')


  }
  return (
    <div className='container'>
      <div>
      <img src="" className="img-fluid" alt="Responsive image" />

      </div>
    
    <div className='text-center'>  

    <button className='btn btn-primary'  onClick={handelNavigate}>
          ورود به سامانه 
    </button>
    </div>

    </div>
  )
}

export default SysPlus