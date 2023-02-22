import React from 'react'
import  Modal  from 'react-modal';

interface Props{
    modalIsOpen:boolean,closeModal:any,item:any,EntityType:number
}
const customStyles: any = {
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
};
const addMemberToCredit:React.FC<Props> = ({modalIsOpen,closeModal,item,EntityType}) => {



  return (
    <Modal isOpen={modalIsOpen}
    onRequestClose={closeModal}
    style={customStyles}
    contentLabel="Selected Option"
    ariaHideApp={false}>
    {/* <div >


        <div>


            <div  >
                <div className="card-body p-0 ">

                    <div className="form-row">
                        <div className="n-chk d-flex  ">

                          

                        </div>

                    </div>

                    <div className="form-row">
                        <div className="  form-group col-md-6 col-xs-12 textOnInput  " >

                            <label>نوع پرداخت</label>


                            <Select
                                placeholder="نوع پرداخت"
                                options={paymentMethod()}
                                onChange={(e:any) => setpaymentMethodId(e.value)}
                            />
                            {paymentMethodId === 0 ? (<span className="text-danger">نوع پرداخت را وارد کنید</span>) : null}

                        </div>

                        <div className="  form-group col-md-6 col-xs-12 textOnInput  seectIndex"
                            style={{ zIndex: '4' }}>

                            <label>نوع افزایش</label>


                            <>
                                <Select
                                    name="additionalTypeId"
                                    placeholder="نوع افزایش"
                                    options={additionalTypeIdS()}
                                    onChange={(e:any) => setadditionalTypeId(e.value)}
                                />

                                {additionalTypeId === 0 ? (<span className="text-danger">نوع افزایش را وارد کنید</span>) : null}

                            </>

                        </div>

                    </div>

                    {paymentMethodId === 4 ?
                        <div className='form-row'>
                            <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                <label>تعداد اقساط</label>
                                <input type="number" className="form-control opacityForInput"
                                    name="installmentOccureCount" onChange={handleAddFormChange} />
                            </div>

                            <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                <label> چند روزه</label>
                                <input type="number" className="form-control opacityForInput"
                                    name="installmentPeriod" onChange={handleAddFormChange} />

                            </div>


                        </div>
                        :
                        ''
                    }
                    <div className='form-row'>
                        <div className=" form-group col-md-6 col-xs-12 textOnInput">
                            <label>مقدار افزایش</label>
                            <input type="number" className="form-control opacityForInput"
                                name="additionalAmount"
                                onChange={handleAddFormChange} />
                        </div>


                        <div className="form-group col-md-6 col-xs-12 textOnInput   "
                            style={{ zIndex: '3' }}>
                            <label>گروه مشتریان</label>
                            <Select
                                placeholder="گروه مشتریان"
                                options={CustomerG()}
                                onChange={(e:any) => setcustomerGroupId(e.value)}
                            />
                            {customerGroupId === 0 ? (<span className="text-danger">گروه مشتریان را وارد کنید</span>) : null}

                        </div>
                    </div>
                    <div className="form-row">
                        <div className=" form-group col-md-6 col-xs-12 textOnInput">
                            <label>حداقل سفارش</label>
                            <input type="number" className="form-control opacityForInput"
                                name="minSellableAmount"
                                onChange={handleAddFormChange} />
                        </div>
                        <div className=" form-group col-md-6 col-xs-12 textOnInput">
                            <label>حداکثر سفارش</label>
                            <input type="text" className="form-control opacityForInput"
                                name="maxSellableAmount"
                                value={quantity}
                                onChange={handleAddFormChange} />
                        </div>

                    </div>

                    <div className="form-group  textOnInput ">
                        <label>توضیحات</label>

                        <textarea  className="form-control opacityForInput " rows={4}
                            placeholder='توضیحات تکمیلی' name="comment" onChange={handleAddFormChange} />

                    </div>
                    <div className='row '>

                        <div className='col-6 '>
                            <button className="btn btn-success float-left "
                                disabled={loading ? true : false || paymentMethodId === 0 ? true : false && additionalTypeId === 0 ? true : false && customerGroupId === 0 ? true : false} onClick={handleAddFormSubmit}>تایید
                                <ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                        </div>
                        <div className='col-6 '>
                            <button className="btn btn-danger float-right "
                                onClick={closeModal}>بازگشت
                            </button>
                        </div>
                    </div>


                </div>

            </div>

        </div>

    </div> */}
</Modal>
  )
}

export default addMemberToCredit