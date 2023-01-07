import { MeasureUnitSample } from "../../Enums/MeasureUnitSample";
import { DeliveryMethods } from "../../Enums/DeliveryMethodsEnums";
import FadeLoader from "react-spinners/FadeLoader";
import { ExportToExcel } from "../common/ExportToExcel";
import { useState, useEffect } from "react";
import ExtraShipping from "./ExtraShipping";
import { GetShippingCompany, GetShoppingContract } from "../../../services/ShippingService";

const OrderWayBill = ({ loading, Shipping, ShippingContracts, dataForExcel, update }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(0);
    const [completData, setCompleteData] = useState([])
    const openModal = (id) => {
        setId(id)
        setIsOpen(true);
    }
    const closeModal = () => {
        setId(null)
        setIsOpen(false);
    }
    useEffect(() => {
        getShippingTotal()

    }, [])
    let color = "#0c4088"
    const getShippingTotal = async () => {
        let shippingContratctArr = []
        let finalArr = []
        if (Shipping && Shipping) {

            for (let i = 0; i < Shipping.length; i++) {

                if (Shipping[i].shippingContractId) {
                    const { data, status } = await GetShoppingContract(Shipping[i].shippingContractId)

                    let contratcs = data.result.shippingContract
                    const rename = (({ id: contractId, ...contratcs }) => ({ contractId, ...contratcs }))
                    contratcs = rename(contratcs)
                    let newArr = { ...Shipping[i], ...contratcs }
                    shippingContratctArr.push(newArr)



                }
                else {
                    shippingContratctArr.push(...Shipping)
                }

            }

            for (let i = 0; i < shippingContratctArr.length; i++) {
                if (shippingContratctArr[i].shippingCompanyId) {

                    const { data, status } = await GetShippingCompany(shippingContratctArr[i].shippingCompanyId)
                    let company = data.result.shippingCompany

                    const rename = (({ id: companyId, ...company }) => ({ companyId, ...company }))
                    company = rename(company)
                    let newArr = { ...shippingContratctArr[i], ...company }
                    finalArr.push(newArr)
                }
                else {
                    finalArr.push(...Shipping)
                }

            }


            setCompleteData(finalArr)


        }
    }
    if (Shipping){ return (<div>

        <div className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark  mt-4 p-2 "  >
            <label>اطلاعات حواله </label>
            {loading === false ?
                <div className="containerT p-2 ">
                    <table className="table m-1 table-striped  fixed_header  ">
                        <thead className="text-center">
                        <tr>
                            <th >#</th>
                            <th > شناسه سفارش</th>
                            <th>شناسه جزییات سفارش</th>
                            <th > واحد</th>
                            <th>  مقدار حواله</th>
                            <th> مقدار حمل شده</th>
                            <th >تاریخ حواله</th>
                            <th >نحوه ارسال</th>
                            <th >شماره قرارداد</th>
                            <th >نام باربری</th>
                            <th >مشاهده جزییات</th>


                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {Shipping ? Shipping.map(item =>

                            <tr key={item.id}>
                                <td bgcolor= "transparent" >{item.id}</td>
                                <td bgcolor= "transparent">{item.orderId ? item.orderId : "--"}</td>
                                <td bgcolor= "transparent" >{item.orderDetailId ? item.orderDetailId : "--"}</td>
                                <td bgcolor= "transparent">{MeasureUnitSample.filter(i => i.id === item.measureUnitId).map(item => item.name)}</td>
                                <td bgcolor= "transparent">{item.plannedQuantity}</td>
                                <td bgcolor= "transparent">{item.shippedQuantity}</td>
                                <td bgcolor= "transparent">{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                <td bgcolor= "transparent">{DeliveryMethods.filter(i => i.id === item.deliveryMethodId).map(i => i.name)}</td>
                                <td bgcolor= "transparent">{item.contractCode ? item.contractCode : '--'}</td>
                                <td bgcolor= "transparent">{item.companyName ? item.companyName : '--'}</td>
                                <td bgcolor= "transparent"> <svg display={item.extId ? '' : 'none'} onClick={() => openModal(item.extId)} xmlns="http://www.w3.org/2000/svg" width='25' height='25' viewBox="0 0 256 256"><rect
                                    width="256" height="256" fill="none" /><line x1="201.1" y1="127.3" x2="224" y2="166.8"
                                                                                 fill="none" stroke="#000" strokeLinecap="round"
                                                                                 strokeLinejoin="round" strokeWidth="12" /><line
                                    x1="154.2" y1="149.3" x2="161.3" y2="189.6" fill="none" stroke="#000" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="12" /><line x1="101.7" y1="149.2" x2="94.6" y2="189.6"
                                                                                    fill="none" stroke="#000" strokeLinecap="round"
                                                                                    strokeLinejoin="round" strokeWidth="12" /><line
                                    x1="54.8" y1="127.3" x2="31.9" y2="167" fill="none" stroke="#000" strokeLinecap="round"
                                    strokeLinejoin="round" strokeWidth="12" /><path
                                    d="M32,104.9C48.8,125.7,79.6,152,128,152s79.2-26.3,96-47.1" fill="none" stroke="#000"
                                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg></td>


                            </tr>

                        ) : <tr className='text-center'></tr>}

                        </tbody>

                    </table>

                </div> :
                <div className="text-center m-auto" >
                    <p>دریافت اطلاعات ...</p>
                    <FadeLoader style={{ position: 'absolute', top: '50%', left: '50%' }} loading={loading} color={color} />
                </div>
            }
            <ExtraShipping id={id} modalIsOpen={modalIsOpen} closeModal={closeModal} />
            <div className=" text-end  p-2" style={{ textAlign: 'left' }}>

                <ExportToExcel apiData={dataForExcel} fileName='لیست بارنامه' />
                {/* <button className="btn-primary m-1 btn " onClick={update}>بروزرسانی</button> */}
            </div>
        </div>
    </div>)} else {
        return (<div>
            <div className="form-group mb-4 textOnInput col-lg-12 rounded border text-center border-dark  mt-4 p-2 ">
                <label>اطلاعات حواله </label>
<span className="text-center" >حواله ای موجود نیست</span>

        </div>   </div>
            )
    }

}
export default OrderWayBill