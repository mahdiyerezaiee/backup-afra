import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import Select from "react-select"
import { toast } from 'react-toastify';
import { CreateInvoice } from '../../../services/invoiceService';
import { PaymentStructureEnums } from '../../Enums/PaymentStructureEnums';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { ClipLoader } from "react-spinners";

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
interface Props {
    modalIsOpen: any, closeModal: any, orderDetailId: any, Order: any, defaultPaymentId: any

}
const CraeteInvoceOrderDetail: React.FC<Props> = ({ modalIsOpen, closeModal, orderDetailId, Order, defaultPaymentId }) => {
    const [loading, setLoading] = useState(false);
    const [paymentMethodId, setPaymentMethodId] = useState<any>(0);
    const [installmentStartDate, setInstallmentStartDate] = useState<any>(new Date());
    const [installmentPeriod, setInstallmentPeriod] = useState<any>(null);
    const [installmentOccureCount, setInstallmentOccureCount] = useState<any>(null);
    const [comment, setComment] = useState<any>(null);
    const handelStartDate = (value: any) => {
        if (value === null) {
            setInstallmentStartDate(new Date())
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setInstallmentStartDate(new Date(value.toDate()))



        }
    }
    

    
    
    useEffect(() => {
        setDefault()


    }, [])
   
    const setDefault=()=>{

        if(defaultPaymentId().length>0){
      
          if(defaultPaymentId().length===1){
          
            setPaymentMethodId(defaultPaymentId()[0].payments?defaultPaymentId()[0].payments:2)
            setInstallmentOccureCount(defaultPaymentId()[0].installmentOccureCount)
            setInstallmentPeriod(defaultPaymentId()[0].installmentPeriod)
          
          
          }
          else if(defaultPaymentId().length>1){
        let newPayments:any=[]
      
        newPayments=[...new Set(defaultPaymentId().map((i:any)=>i.payments!==undefined?i.payments:i.payments=2))]
      
      
        
      
        
        if(newPayments.length>1){
      
          setPaymentMethodId(null)
        }
        else{
          let newArray:any= defaultPaymentId().filter((i:any)=>i.payments===newPayments[0])
      
          
          
          if(newArray.length>1){
            setPaymentMethodId(newArray[0].payments)
            setInstallmentOccureCount(newArray[0].installmentOccureCount)
            setInstallmentPeriod(newArray[0].installmentPeriod)
      
            
            
          }
            else{
              setPaymentMethodId(2)
            }
             
        }
      
      
      
          }
          
          
          }
      }
      



    const handelSubmit = async (e: any) => {
        setLoading(true)
        e.preventDefault();
        let body = {}

        if(orderDetailId.length===1){

            console.log(orderDetailId[0]);
            
            body = {
                "entityTypeId": 11,
                "entityId": orderDetailId[0],
                "paymentMethodId": paymentMethodId,
                "installmentStartDate": paymentMethodId !== 4 ? null : installmentStartDate,
                installmentPeriod:installmentPeriod!==0?Number(installmentPeriod):null,
                installmentOccureCount:installmentOccureCount!==0?Number(installmentOccureCount):null,
                "comment": comment
            }

            try {
                const { data, status } = await CreateInvoice(body)
              
    
                    if (status === 200) {
    
                        toast.success('فاکتور با موفقیت صادر شد', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined
                        });
    
                        window.location.reload()
    
    
                    }
    
    
                    setLoading(false)
                    closeModal()
                } catch (error) {
                    setLoading(false)
                    closeModal()
                }

        }
        else{

        
        for (let i = 0; i < orderDetailId.length; i++) {
            body = {
                "entityTypeId": 11,
                "entityId": orderDetailId[i].id,
                "paymentMethodId": paymentMethodId,
                "installmentStartDate": paymentMethodId !== 4 ? null : installmentStartDate,
                "installmentPeriod": installmentPeriod,
                "installmentOccureCount": installmentOccureCount,
                "comment": comment
            }
            try {
            const { data, status } = await CreateInvoice(body)
          

                if (status === 200) {

                    toast.success('فاکتور با موفقیت صادر شد', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    });

                    window.location.reload()


                }


                setLoading(false)
                closeModal()
            } catch (error) {
                setLoading(false)
                closeModal()
            }
        }
    }



    }
    const paymentMethodIDs = () => {
        return (PaymentStructureEnums.filter((i:any)=>i.id===2 ||i.id===4).map((data: any) => ({ label: data.name, value: data.id })))
    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}>
            <div style={{ height: 'fit-content', width: '20rem' }}>

                <div className='form-row textOnInput'>
                    <div className='col-lg-12 mb-4 '>
                        <div className=" form-control-sm">
                            <label> نحوه پرداخت </label>
                            {paymentMethodId !== 0 ? <Select
                                value={paymentMethodIDs().filter((i: any) => i.value === paymentMethodId).map((i: any) => i)}
                                placeholder=' پرداخت '
                                options={paymentMethodIDs()}

                                onChange={(e: any) => {

                                    setPaymentMethodId(e.value)

                                }}
                            /> :

                                <Select placeholder=' پرداخت '
                                    options={paymentMethodIDs()}

                                    onChange={(e: any) => {

                                        setPaymentMethodId(e.value)

                                    }} />}
                        </div>
                    </div>
                    {paymentMethodId === 4 ?
                        <div className="row">
                            <div className='col-lg-12 col-sm-12 mb-4 mt-4'>
                                <div className=" form-control-sm">
                                    <label className="date-piker-form" > تاریخ پرداخت </label>
                                    <div className='form-group  '>
                                        <DatePicker
                                            calendar={persian}
                                            locale={persian_fa}
                                            style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                            value={installmentStartDate}
                                            onChange={handelStartDate}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-6 col-sm-12 mb-4 mt-4'>
                                <label> بازه </label>

                                <input className="form-control opacityForInput  mb-4" type="text"
                                    placeholder=" بازه "
                                    value={installmentPeriod} onChange={(e: any) => setInstallmentPeriod(e.target.value)} />
                            </div>
                            <div className='col-lg-6 col-sm-12 mb-4 mt-4'>
                                <label>  تعداد اقساط</label>

                                <input className="form-control opacityForInput  mb-4" type="text"
                                    placeholder=" تعداد اقساط "
                                    value={installmentOccureCount} onChange={(e: any) => setInstallmentOccureCount(e.target.value)} />
                            </div></div> : null}
                    <div className="col-12  mt-4">
                        <div className="form-group mb-4 textOnInput">
                            <label >توضیحات</label>

                            <textarea className="form-control opacityForInput " rows={4} placeholder='توضیحات تکمیلی' value={comment} onChange={(e: any) =>
                                setComment(e.target.value)
                            } />

                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row'>
                            <div className='col-6'>
                                <button className="btn btn-success float-right "
                                    disabled={loading} onClick={handelSubmit}>تایید

                                    <ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>
                            </div>
                            <div className='col-6'>
                                <button className="btn btn-danger " onClick={closeModal}> بازگشت</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
export default CraeteInvoceOrderDetail