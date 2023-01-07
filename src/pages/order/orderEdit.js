import {editOrder, GetOrder, GetOrderDetails} from "../../services/orderService";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import {OrderStatus} from "../../Common/Enums/OrderStatusEnums";
import {toast} from "react-toastify";
import {GetProductSupplyConditions} from "../../services/ProductSupplyConditionService";
import OrderConditionEdit from "./OrderConditionEdit";
import {ClipLoader} from "react-spinners";

const customStyles = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '30px',
        border: '2px ridge black'
    }

}
const OrderEdit = ({id, modalIsOpen, closeModal}) => {
    let FilnalArr = [];

    const [order, setOrder] = useState([])
    const [OrderDetail, setOrderDetail] = useState([])
    const [paymentMethodId, setPaymentMethodId] = useState(0)
    const [shippingStatusId, setShippingStatusId] = useState(0)
    const [orderStatusId, setOrderStatusId] = useState(0)
    const [orderFinalizedPrice, setOrderFinalizedPrice] = useState(0)
    const [productSupplyId, setProductSupplyId] = useState(0)
    const [orderCondition, setOrderCondition] = useState([])
    const [comment, setComment] = useState(null);
    const [loading, setLoading] = useState(false);

   
    const getOrder = async () => {
        try {
            const {data, status} = await GetOrder(id)
            setOrder(data.result.order)
            setOrderFinalizedPrice(data.result.order.orderFinalizedPrice)
            setOrderStatusId(data.result.order.orderStatusId)
            setShippingStatusId(data.result.order.shippingStatusId)
            setPaymentMethodId(data.result.order.paymentMethodId)
            setOrderCondition([])
            setComment(data.result.order.comment)
        } catch (err) {
            console.log(err)
        }
    }
    const getOrderDetail = async () => {
        try {
            const {data, status} = await GetOrderDetails(id)
            let Order = data.result.orderDetails
            setOrderDetail(data.result.orderDetails)
            setProductSupplyId(data.result.orderDetails[0].productSupplyId)
            let ids = data.result.orderDetails.map(item=>item.productSupplyId)


            let productSupplyConditionIds = data.result.orderDetails.map(item=>item.productSupplyConditionId)
            console.log(ids);
            console.log(productSupplyConditionIds);
            if (productSupplyConditionIds.length>0) {
                let conditions=[];
                for (let i = 0; i < ids.length; i++) {
                    if(productSupplyConditionIds[i]!==null){
                        const {data,status} = await GetProductSupplyConditions(ids[i]);
                        let condition=data.result.productSupplyConditions.values

                        const element = condition.filter(item=>item.id===productSupplyConditionIds[i])[0]



                        conditions.push(element)
                    }
                    else{
                        const noData={conditionId:null}
                        conditions.push(noData)
                    }
                }

                console.log(conditions);
                for (let i = 0; i < Order.length; i++) {


                    //   let ff = conditions.filter(item => item.id === Order[i].productSupplyConditionId)
                    //   console.log(ff);
                    const merged = conditions.map(item =>
                        ({
                            conditionId:item.id,
                            installmentOccureCount: item.installmentOccureCount,
                            installmentPeriod: item.installmentPeriod,
                            paymentMethodId: item.paymentMethodId,
                            additionalAmount: item.additionalAmount,
                            additionalTypeId: item.additionalTypeId,


                        }))


                    let obj ={...Order[i],...merged[i]}

                    FilnalArr.push(obj)
                }
                setOrderCondition(FilnalArr)
            }
            else {
                setOrderCondition(Order)
            }
        } catch (err) {
            console.log(err)
        }
    }

   
let conditionOrder=[];
if(orderCondition.length>0){
conditionOrder=orderCondition
}
    const OrderStatusID = () => {
        return (OrderStatus.map(data => ({label: data.name, value: data.id})))
    }
    const OrderStatusId = (id) => {
        return (OrderStatus.filter(item => item.id === orderStatusId).map(data => ({label: data.name, value: data.id})))
    }
    useEffect(() => {
        getOrder()
        getOrderDetail()

    }, [id])
    const handleEditFormSubmit = async () => {
    setLoading(true)
        const datas = {
            "order": {
                id,
                "customerId": order.customerId,
                orderStatusId:4,
                'paymentStatusId': order.paymentStatusId,
                paymentMethodId: order.paymentMethodId,
                shippingStatusId: order.shippingStatusId,
                "orderTotal": order.orderTotal,
                "orderTax": order.orderTax,
                "orderDiscount": order.orderDiscount,
                orderFinalizedPrice: order.orderFinalizedPrice,
                "createDate": order.createDate,
                "extId": order.extId,
                "paid": false,
                comment,
                "customer": null,
                "extraData": null
            }
        }
        try {
            const {data, staus} = await editOrder(datas)

            if (data.success === true) {
                toast.success("ویرایش با موفقعیت انجام شد", {
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
            closeModal()
            setLoading(false)

        }
        catch (e) {

            console.log(e)
        }
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
            <div>
                <div className="card-body p-0" style={{ width: '45rem'}}>
                    <div>
                        <h5>ویرایش پیش فاکتور</h5>
                        <p>دراین بخش می توانید پیش فاکتور را ویرایش یا تایید کنید  .</p>
                    </div>
                    <div className="mt-1">
                        <OrderConditionEdit orderCondition={conditionOrder} getOrderDetail={getOrderDetail} Order={order} productSupply={productSupplyId}/>
                        <div className="form-group mb-4 textOnInput">
                            <label >توضیحات</label>

                            <textarea type="textarea" className="form-control opacityForInput " rows='4' placeholder='توضیحات تکمیلی' value={comment} onChange={e => {
                                setComment(e.target.value)
                            }} />

                        </div>
                    </div>
                    <div className='row mt-3'>

                        <div className='col-6 '>
                            <button className="btn btn-success float-left "
                                  disabled={loading}  onClick={handleEditFormSubmit}>تایید

                                <ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                        </div>
                        <div className='col-6 '>

                        </div>
                    </div>
                </div>
            </div>


        </Modal>


    )

}
export default OrderEdit