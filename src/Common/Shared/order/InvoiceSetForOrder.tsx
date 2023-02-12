import React,{useState} from 'react'
import { PaymentStructureEnums } from './../../Enums/PaymentStructureEnums';
import  Modal  from 'react-modal';
import  Select  from 'react-select';
import  DatePicker,{DateObject}  from 'react-multi-date-picker';
import  persian  from 'react-date-object/calendars/persian';
import  persian_fa  from 'react-date-object/locales/persian_fa';
import  {ClipLoader}  from 'react-spinners';
import { CreateInvoice } from './../../../services/invoiceService';
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
interface Props {
  closeModal: any,
  isOpenInvoice: any, orderId: any
}
const InvoiceSetForOrder: React.FC<Props> = ({ closeModal, isOpenInvoice, orderId }) => {

  const [loading, setLoading] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<any>(0);
  const [installmentStartDate, setInstallmentStartDate] = useState<any>(new Date());
  const [installmentPeriod, setInstallmentPeriod] = useState(0);
  const [installmentOccureCount, setInstallmentOccureCount] = useState(0);
  const [comment, setComment] = useState<any>(null);


  const handelStartDate = (value:any) => {
    if (value === null) {
        setInstallmentStartDate(new Date())
    }
    //تغییرات روی تاریخ رو اینجا اعمال کنید
    if (value instanceof DateObject) {
        setInstallmentStartDate(new Date(value.toDate()))



    }
}


  const paymentMethodIDs = () => {
    return (PaymentStructureEnums.map((data: any) => ({ label: data.name, value: data.id })))
  }

const handelSubmit=async()=>{
  const body={
    entityTypeId:10,
    entityId: orderId,
    paymentMethodId,
    installmentStartDate,
    installmentPeriod,
    installmentOccureCount,
    comment
  }
try {
  
  const {data,status}=await CreateInvoice(body)
  if(status===200){
    toast.success(`فاکتور با شناسه ${data.result.invoiceId} ثبت شد`, {
      position: "top-right",
      closeOnClick: true
  });
  }
  
} catch (error) {
  console.log(error);
  
}
  closeModal()
}

  return (
    <Modal
      isOpen={isOpenInvoice}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Selected Option"
      ariaHideApp={false}>
      <div style={{ height: 'fit-content', width: '20rem' }}>

        <div className='form-row textOnInput'>
          <div className='col-lg-12 mb-4 '>
            <div className=" form-control-sm">
              <label> نحوه پرداخت </label>

              <Select
                placeholder=' پرداخت '
                options={paymentMethodIDs()}

                onChange={(e: any) => {

                  setPaymentMethodId(e.value)

                }}
              />
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

export default InvoiceSetForOrder