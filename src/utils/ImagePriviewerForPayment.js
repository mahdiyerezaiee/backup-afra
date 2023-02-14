import React, { Fragment, useState } from 'react'
import Select from 'react-select';

const ImagePriviewerForPayment = ({ images,submited,file }) => {

const[price,SetPrice]=useState('')



    if (images.length > 0) {
       submited(true)
        const handelSubmit=(e)=>{
          

        submited(false)
        file([])
        
        }

      




        return (
            <div>
                {images.map(item => (
                    <div className='form-row border rounded mt-2 p-2'>
                        <div className="col-md-2">
                            <img src={URL.createObjectURL(item)} className='img-thumbnail' />
                        </div>
                        <div className="col-md-8 form-row mb-4 textOnInput mt-2 ">
                            <div className="col-md-6">
                                <lable></lable>
                                <Select />
                            </div>
                            <div className="col-md-6">
                                <input type='text' className='form-control' value={price} onChange={e=>SetPrice(e.target.value)} />
                            </div>
                            <div className="col-md-6 mt-2">
                                <input type='text' className='form-control' />
                            </div>
                            <div className="col-md-6 mt-2">
                                <input type='text' className='form-control' />
                            </div>
                        </div>
                        <div className="col-md-2 mt-4 ml-2" >
                            <button className='btn btn-sm btn-success' onClick={handelSubmit}>ثبت</button>
                        </div>

                    </div>))
                }

            </div>

        )
    }
    else {
        return (null)
    }
}

export default ImagePriviewerForPayment