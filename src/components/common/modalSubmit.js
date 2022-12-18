import {useState} from "react";

const ModalSubmit = ({name , modalInfo , submitHandler ,closeModal,quantity, setquantity , formatter, productSupplyConditionId }) => {
    const [check,setCheck]=useState(false)
    return(
      <>
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
          <h4 className="text-center mb-2">{name.name}</h4>
          <p className="text-center text-primary">لطفا مقدار درخواست را به کیلوگرم وارد کنید</p>
          <p className="text-center m-1" >

              <button className="btn-sm btn-light border-0 bg-transparent non-hover p-2" onClick={() => setquantity(Number(quantity) + 1000)}>+
              </button>
              <input  className="form-control opacityForInput col-4 d-inline" placeholder="وزن سفارش" step={100}
                      type="text" value={quantity} onChange={(e) => setquantity(Number(e.target.value))} />
              <button className="btn-sm btn-light border-0 bg-transparent non-hover p-2"  onClick={() =>quantity>=1000 ?setquantity(Number(quantity) - 1000):""}>--
              </button>
          </p>
          {modalInfo.productSupplyConditions[0]? (
              <div>
                  { quantity >= modalInfo.productSupplyConditions.filter(i=> i.id === productSupplyConditionId ).map(item=>item.minSellableAmount) ? (<p></p>) : (
                      <p className="text-danger text-center mt-3">مقدار از حداقل مجاز سفارش کمتراست</p>)}
                  { quantity <= modalInfo.productSupplyConditions.filter(i=> i.id === productSupplyConditionId ).map(item=> item.maxSellableAmount) ? (<p></p>) : (
                      <p className="text-danger text-center mt-3">مقدار از حداکثر مجاز سفارش بیشتراست</p>)}
                  {modalInfo.comment ?<div className="form-group" style={{width: '510px'}}>
                      <p ><b style={{fontSize: 'medium'}}> توضیحات</b> : {modalInfo.comment}</p>
                      <p className="text-center">

                          <label className="text-danger" style={{fontSize:'small'}}>توضیحات و شرایط را قبول دارم</label>
                          <input className="form-check-inline m-1 " type='checkbox' onChange={(e)=>setCheck(e.target.checked)}/>


                      </p>
                  </div>:""}
                  <h5 className="text-center ">قیمت کل :   {formatter.format(modalInfo.price * quantity)}</h5>
                  {modalInfo.comment ? <button disabled={  quantity >=  modalInfo.productSupplyConditions.filter(i=> i.id === productSupplyConditionId ).map(item=> item.minSellableAmount) && quantity <= modalInfo.productSupplyConditions.filter(i=> i.id === productSupplyConditionId ).map(item=> item.maxSellableAmount) && check  ? false : true}
                                               className="btn btn-success  float-left" onClick={submitHandler}>اضافه به سبدخرید
                      </button>:
                      <button disabled={  quantity >=  modalInfo.productSupplyConditions.filter(i=> i.id === productSupplyConditionId ).map(item=> item.minSellableAmount) && quantity <= modalInfo.productSupplyConditions.filter(i=> i.id === productSupplyConditionId ).map(item=> item.maxSellableAmount)  ? false : true}
                              className="btn btn-success  float-left" onClick={submitHandler}>اضافه به سبدخرید
                      </button>
                  }


                   </div>):(<div><h5 className="text-center ">قیمت کل :   {formatter.format(modalInfo.price * quantity)}</h5> <button className="btn btn-primary text-sm-center d-block m-auto" onClick={submitHandler}>اضافه به سبدخرید
          </button>  </div>) }

      </>
  )
}
export  default  ModalSubmit