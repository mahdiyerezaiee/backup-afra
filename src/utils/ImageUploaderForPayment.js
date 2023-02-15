import React from 'react'
import { useState } from 'react';
import { Fragment } from 'react';
import ImagePriviewerForPayment from './ImagePriviewerForPayment';

const ImageUploaderForPayment = ({data,index,Ids}) => {

    const [files, SetFiles] = useState([])
    const[child,Setchild] =useState(false)
    const onchange = (e) => {

        SetFiles([...files,... e.target.files])

    }

    console.log(child);
    

    return (
        <Fragment>
            <ImagePriviewerForPayment images={files} submited={Setchild} file={SetFiles} payments={data} Index={index} Ids={Ids} />
            {!child?
        <div className='d-flex justify-content-end'>  
            <input disabled={false}  type="file" className="custom-file-input" id="PaymentFile" accept='image/*' onChange={onchange}  />
            <label for="PaymentFile"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-plus" viewBox="0 0 16 16"> <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" /> <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" /> </svg> </label>
        </div>:<div className='d-flex justify-content-end' >  
        <p className='text-nowrap text-danger'>لطفا پیش از بارگزاری اطلاعات پرداخت جدید ، اطلاعات بارگزاری شده را ثبت نهایی فرمایید</p>
            <input disabled={true}  type="file" className="custom-file-input" id="PaymentFile" accept='image/*' onChange={onchange}  />
            <label  for="PaymentFile"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-file-plus" viewBox="0 0 16 16"> <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" /> <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" /> </svg> </label>
        </div>}



        </Fragment>
    )
}

export default ImageUploaderForPayment