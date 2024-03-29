import React, { useEffect, useState } from "react";
import { GetAllProductSupply } from "../../../services/productSupplyService";
import { PaymentStructureEnums } from "../../../Common/Enums/PaymentStructureEnums";
import { AdditionalTypeId } from "../../../Common/Enums/AdditionalTypeIdEnums";
import OrderProductSupplyConditionEdit from "./OrderProductSupplyConditionEdit";

interface Props{
  orderCondition:any, getOrderDetail:any, Order:any, productSupply:any
}
const OrderConditionEdit:React.FC<Props> = ({ orderCondition, getOrderDetail, Order, productSupply }) => {
  const [cottageCode, setcottageCode] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(0);
  const [detail, setDetail] = useState([]);

  const openModal = (id:number, details:any) => {
    setDetail(details)
    setId(id)
    setIsOpen(true);
  }
  const closeModal = () => {

    getOrderDetail()
    setIsOpen(false)



  }


  const getSupplyCode = async () => {
    try {
      const { data, status } = await GetAllProductSupply(orderCondition[0].productSupplyId)
      setcottageCode(data.result.productSupply.cottageCode)
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    getSupplyCode()
    getOrderDetail()
  }, [])

  if (productSupply !== null) {
    return (
      <div className="table-responsive p-2">
        {orderCondition.map((item:any) => item.productSupplyConditionId !== null) ?
          <table
            className="table table-bordered table-hover table-striped  mt-2  mb-4">
            <thead>
              <tr style={{ fontSize: '10px' }}>

                <th style={{ fontSize: '10px' }} className="text-center" >  عرضه</th>
                <th style={{ fontSize: '10px' }} className="text-center" >  کوتاژ</th>
                <th style={{ fontSize: '10px' }} className="text-center"> کالا</th>
                <th style={{ fontSize: '10px' }} className="text-center"> وزن خرید</th>
                <th style={{ fontSize: '10px' }} className="text-center"> فی</th>
                <th style={{ fontSize: '10px' }} className="text-center"> پرداخت </th>
                <th style={{ fontSize: '10px' }} className="text-center">تعداد اقساط </th>
                <th style={{ fontSize: '10px' }} className="text-center">بازه پرداخت </th>
                <th style={{ fontSize: '10px' }} className="text-center">نوع توافق</th>
                <th style={{ fontSize: '10px' }} className="text-center"> مقدار توافق </th>
                <th style={{ fontSize: '10px' }} className="text-center">عملیات</th>

              </tr>
            </thead>

            <tbody>
              {orderCondition.map((item:any) =>
                <tr className="text-center">
                  <td>{item.productSupplyId}</td>
                  <td>{cottageCode}</td>
                  <td >{item.product.name}</td>
                  <td >{item.quantity}</td>
                  <td >{item.basePrice}</td>
                  <td >{item.paymentMethodId?PaymentStructureEnums.filter(i => i.id === item.paymentMethodId).map(i => i.name):PaymentStructureEnums.filter(i => i.id === 2).map(i => i.name)}</td>
                  <td >{item.installmentOccureCount}</td>
                  <td >{item.installmentPeriod}</td>
                  <td >{AdditionalTypeId.filter(i => i.id === item.additionalTypeId).map(i => i.name)}</td>
                  <td >{item.additionalAmount}</td>
                  <td onClick={() => openModal(item.productSupplyId, item)}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit-2">
                    <path
                      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg></td>
                </tr>
              )}
              <tr></tr>
            </tbody>
          </table>
          : <table
            className="table table-bordered table-hover table-striped  mt-2  mb-4">
            <thead>
              <tr style={{ fontSize: '10px' }}>

                <th style={{ fontSize: '10px' }} className="text-center">  عرضه</th>
                <th style={{ fontSize: '10px' }} className="text-center" >  کوتاژ</th>
                <th style={{ fontSize: '10px' }} className="text-center"> کالا</th>
                <th style={{ fontSize: '10px' }} className="text-center"> وزن خرید</th>
                <th style={{ fontSize: '10px' }} className="text-center"> فی</th>
                <th style={{ fontSize: '10px' }} className="text-center">عملیات</th>


              </tr>
            </thead>

            <tbody>
              {orderCondition.map((item:any) =>
                <tr className="text-center">
                  <td>{item.productSupplyId}</td>
                  <td>{cottageCode}</td>
                  <td >{item.product.name}</td>
                  <td >{item.quantity}</td>
                  <td >{item.basePrice}</td>
                  <td onClick={() => openModal(item.productSupplyId, item)}> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-edit-2">
                    <path
                      d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                  </svg></td>

                </tr>
              )}
              <tr></tr>
            </tbody>
          </table>}

        <OrderProductSupplyConditionEdit closeModal={closeModal} modalIsOpen={modalIsOpen} id={id} Detail={detail} order={Order} />
      </div>
    )
  }
  else {
    return(
    <div className="table-responsive p-2">

      <table
        className="table table-bordered table-hover table-striped  mt-2  mb-4">
        <thead>
          <tr style={{ fontSize: '10px' }}>
            <th style={{ fontSize: '10px' }} className="text-center"> کالا</th>
            <th style={{ fontSize: '10px' }} className="text-center"> وزن خرید</th>
            <th style={{ fontSize: '10px' }} className="text-center"> فی</th>
            <th style={{ fontSize: '10px' }} className="text-center"> پرداخت </th>
          </tr>
        </thead>
        <tbody>
          {orderCondition.map((item:any) =>
            <tr className="text-center">

              <td >{item.product.name}</td>
              <td >{item.quantity}</td>
              <td >{item.basePrice}</td>
              <td >{PaymentStructureEnums.filter(i => i.id === Order.paymentMethodId).map(i => i.name)}</td>
            </tr>
          )}

        </tbody>
      </table>

    </div>
    )
  }
}
export default OrderConditionEdit