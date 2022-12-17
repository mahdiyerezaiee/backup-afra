import Modal from 'react-modal';

import { useState } from 'react';
import { attachmentUpload } from '../services/attachmentService';
import { toast } from 'react-toastify';

const customStyles = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '5%',
        border: '2px ridge black'
    }

}


const ImageFileUploader = ({ EntityTypesId, EntityId, modalIsOpen, closeModal,comment }) => {
    const [files, setFiles] = useState('')
    const [filename, setFileName] = useState('انتخاب فایل')





    const handelSubmit =async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('Files', files)
        formData.append('EntityTypeId', EntityTypesId)
        formData.append('EntityId', EntityId)

        try {
            const {data,status}=await attachmentUpload(formData)

            if(status===200){
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                
closeModal()
            }
        } catch (error) {
            console.log(error);
        }


closeModal()

window.location.reload()

    }




const handelCancel=()=>{

setFiles('')
setFileName('انتخاب فایل')
closeModal()

}



    const onchange = (e) => {

        setFiles(e.target.files[0])
        setFileName(e.target.files[0].name)
        console.log(e.target.files);
    }

    return (

        <Modal

            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}

        >
            <div className="d-block clearfix mb-2" onClick={closeModal}><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x close"
                data-dismiss="alert"><line x1="18" y1="6"
                                           x2="6"
                                           y2="18"></line><line
                x1="6" y1="6" x2="18" y2="18"></line></svg></div>
            <div style={{ height: '15rem', width: '20rem' }}>


                <p className='text-left'>{comment}</p>
                <div className="form-group mt-5  ">
                    <div className='form-row mb-5'>
                        <div className="col-12 ">

                            <div className="custom-file">
                                <input  type="file" className="custom-file-input" id="customFile" accept='image/*' onChange={onchange}/>
                                <label className="custom-file-label" for="customFile">{filename}</label>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='row mt-5 '>

                    <div className='col-12'>
                        <button disabled={files.length<1?true:false} onClick={handelSubmit} className="btn btn-primary " >ارسال</button>
                    </div>
                   
                </div>

            </div>
        </Modal>


    )
}

export default ImageFileUploader