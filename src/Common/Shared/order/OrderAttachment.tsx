import ImageFileUploader from "../../../Utils/ImageFileUploader";

const attachmet=(window as any).globalThis.stie_att

interface Props{
    order:any,params:any ,attachments:any ,handelPreview :any, modalIsOpenUpload:any , closeModalForUpload :any, setIsOpenUpload:any
}
const OrderAttAchment:React.FC<Props> = ({order,params ,attachments ,handelPreview , modalIsOpenUpload , closeModalForUpload , setIsOpenUpload}) => {
    let newAttachment=attachments.filter((item:any)=>item.deleted===false)

   
    
    
    return(<div>

        <div  className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark  mt-4 p-2">
            <label>فایل ضمیمه </label>
            <div className="text-center">
                <div className=" row text-center">
                    {newAttachment.length>0?


                        (newAttachment.map((item:any) =>
                            <div onClick={() => handelPreview(item)} className={item.attachmentTypeId ===2 ?" img col-md-2 col-sm-12" :"  col-md-2 col-sm-12"} >
                                   <img src={`${attachmet}${item.path}`} className={item.attachmentTypeId ===2 ?"img-thumbnail border-danger":" img-thumbnail"} alt={item.name}  />
                                {item.attachmentTypeId ===2 ?  <div className="detial-img">
                                    <div className="text">
                                        <p >مقدار چک : { item.value}</p>
                                        <p >شماره چک : { item.trackingCode}</p>
                                        <p >موعد چک : { new Date(item.dueDate).toLocaleDateString("fa-IR")}</p></div>

                                </div>:null}
                            </div>
                        )):
                        <div className="text-center col-md-12 ">
                            <h5> تصویری موجود نیست</h5>
                        </div>

                    }
                </div>

            </div>
            <div className='  '>

                <button disabled={order.orderStatusId === 1} style={{marginTop:'-.8rem', marginLeft:'.6rem' , background:'white'}} className=" border-0 Attachment   float-right " title="افزودن تصویر"  onClick={()=>setIsOpenUpload(true)}>
                    <svg  style={{width:'24px', height:'38px'}} xmlns="http://www.w3.org/2000/svg"  fill="currentColor"
                          className="bi bi-plus-circle" viewBox="0 0 17 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>

                </button>
                <ImageFileUploader modalIsOpen={modalIsOpenUpload} closeModal={closeModalForUpload} EntityId={params.id} EntityTypesId={10} comment={'لطفا فایل  مورد نظر را بارگزاری کنید.'}/>

            </div>
        </div>

    </div> )
}
export default OrderAttAchment