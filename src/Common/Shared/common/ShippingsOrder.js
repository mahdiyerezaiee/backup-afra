import { GetShoppingContracts, GetShoppings,GetShoppingsAdmin } from "../../../services/ShippingService";
import { useEffect, useState } from "react";
import { MeasureUnitSample } from "../../Enums/MeasureUnitSample";
import { DeliveryMethods } from "../../Enums/DeliveryMethodsEnums";
import { useSelector } from 'react-redux';

const ShippingsOrder = ({ id }) => {
    const [Shipping, SetShipping] = useState([])
    const [ShippingContracts, SetShippingContracts] = useState([])
    const roles=useSelector(state=>state.roles)
    const GetShipping = async () => {
        try {
            const { data, status } = await GetShoppings(id)
            if (data.result.shippings.values !== null) {
                SetShipping(data.result.shippings.values)
            }
            else {
                SetShipping(null)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const GetShippingAdmin = async () => {
        try {
            const { data, status } = await GetShoppingsAdmin(id)
            if (data.result.shippings.values !== null) {
                SetShipping(data.result.shippings.values)
            }
            else {
                SetShipping(null)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const ShippingContract = async () => {
        try {
            const { data, status } = await GetShoppingContracts()
            SetShippingContracts(data.result.shippingContracts.values)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if(roles.includes(2)){
        GetShipping()
        ShippingContract()}
        else{
            GetShippingAdmin()
            ShippingContract()
        }

    }, [id])


    if (Shipping !== null) {
        return (
            <div className="w-85  table table-responsive   ">

                <table className="  w-100 " >

                    <thead style={{ color: 'white' }}>
                        <tr>
                            <th bgcolor='#247881'>  #</th>
                            <th bgcolor='#247881'> شناسه سفارش</th>
                            <th bgcolor='#247881'>شناسه جزییات سفارش</th>
                            <th bgcolor='#247881'> واحد</th>
                            <th bgcolor="#247881"> مقدار </th>
                            <th bgcolor="#247881">تاریخ قرارداد</th>
                            <th bgcolor="#247881">نحوه ارسال</th>
                            <th bgcolor="#247881">شماره قرارداد</th>


                        </tr>
                    </thead>
                    <tbody className='table table-stripped' >
                        {Shipping.map(item =>
                            <tr key={item.id}>
                                <td >{item.id}</td>
                                <td >{item.orderId?item.orderId:"--"}</td>
                                <td >{item.orderDetailId?item.orderDetailId:"--"}</td>
                                <td >{MeasureUnitSample.filter(i => i.id === item.measureUnitId).map(item => item.name)}</td>
                                <td >{item.quantity}</td>
                                <td >{new Date(item.shippingDate).toLocaleDateString('fa-IR')}</td>
                                <td >{DeliveryMethods.filter(i => i.id === item.deliveryMethodId).map(i => i.name)}</td>
                                <td >{item.shippingContractId === null ? '' : ShippingContracts.filter(i => i.id === item.shippingContractId).map(i => i.contractNumber)}</td>


                            </tr>
                        )}
                    </tbody>


                </table>
            </div>)
    } 
    
    
    else {
       return(<div></div>)
    }

}
export default ShippingsOrder