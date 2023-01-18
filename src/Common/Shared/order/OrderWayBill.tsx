import { MeasureUnitSample } from "../../Enums/MeasureUnitSample";
import { DeliveryMethods } from "../../Enums/DeliveryMethodsEnums";
import FadeLoader from "react-spinners/FadeLoader";
import { ExportToExcel } from "../Common/ExportToExcel";
import { useState, useEffect } from "react";
import ExtraShipping from "./ExtraShipping";
import { DeleteShipping, GetShippingCompany, GetShoppingContract } from "../../../services/ShippingService";
import { useSelector } from 'react-redux';
import Modal  from 'react-modal';
import { toast } from 'react-toastify';
import { RootState } from "../../../store";

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
};

interface Props{
    loading:any, Shipping:any, dataForExcel:any
}
const OrderWayBill:React.FC<Props> = ({ loading, Shipping, dataForExcel }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<any>(0);
    const [completData, setCompleteData] = useState([])
    const [modalOpen, setIsModalOpen] = useState(false);
    const[IdDelete,setIdDelete]=useState(0)
    
    const roles = useSelector((state:RootState) => state.roles)
    const openModal = (id:any) => {
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
    const findeTakhsis = (id:any) => {

        const row:any = document.getElementById(`${id}`);
        const ClassNames:any =document.getElementsByClassName(`findeTakhsis`)
        console.log(ClassNames.length !== 0)
        if (ClassNames.length !== 0){
            ClassNames.item(".findeTakhsis").classList.remove(`findeTakhsis`)
        }
        row.classList.remove("findeTakhsis")

    row.scrollIntoView({behavior: "smooth", block:"center"});

        row.classList.add("findeTakhsis")

    }
    const openModalDelet = (id:any) => {
        setIsModalOpen(true);
        setIdDelete(id)

    }
    const closeModalDelet = () => {
        setIsModalOpen(false);
    }
    const deletHandler = async () => {
        try {
            const { data, status } = await DeleteShipping(IdDelete)
            if (status=== 200) {
                toast.success("حواله با موفقیت حذف شد", {
                    position: "top-right",
                    closeOnClick: true
                });
                closeModalDelet()
            } 
        } catch (err) {
            console.log(err)
            closeModalDelet()

        }
    }
    let color = "#0c4088"
    const getShippingTotal = async () => {
        let shippingContratctArr = []
        let finalArr:any = []
        if (Shipping && Shipping) {

            for (let i = 0; i < Shipping.length; i++) {

                if (Shipping[i].shippingContractId) {
                    const { data, status } = await GetShoppingContract(Shipping[i].shippingContractId)

                    let contratcs = data.result.shippingContract
                    const rename = (({ id: contractId, ...contratcs }:any) => ({ contractId, ...contratcs }))
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

                    const rename = (({ id: companyId, ...company }:any) => ({ companyId, ...company }))
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
    if (Shipping) {
        return (<div>

            <div className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark  mt-4 p-2 "  >
            {/* <Modal
                        isOpen={modalOpen}
                        onRequestClose={closeModalDelet}
                        style={customStyles}
                        contentLabel="Selected Option"
                        ariaHideApp={false}

                    >
                        <div className="text-center">
                            <div className="d-block clearfix mb-2 " onClick={closeModalDelet}><svg
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


                            <p > آیا مطمئنید  حواله {Shipping.filter(item => item.id === IdDelete).map(item => item.id)}   </p>
                            <p>حذف شود ؟ </p>




                            <button className="btn btn-danger " onClick={deletHandler}>حذف
                            </button>

                        </div>
                    </Modal> */}
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
                                    {/* <th hidden={roles.includes(7) || roles.includes(8) ? false : true}>عملیات</th> */}


                                </tr>
                            </thead>
                            <tbody className="text-center" id="havaleTable">
                                {Shipping ? Shipping.map((item:any) =>

                                    <tr key={item.id} id={item.orderDetailId} onClick={()=>findeTakhsis(item.orderDetailId)}>
                                        <td  >{item.id}</td>
                                        <td>{item.orderId ? item.orderId : "--"}</td>
                                        <td >{item.orderDetailId ? item.orderDetailId : "--"}</td>
                                        <td >{MeasureUnitSample.filter(i => i.id === item.measureUnitId).map(item => item.name)}</td>
                                        <td>{item.plannedQuantity}</td>
                                        <td >{item.shippedQuantity}</td>
                                        <td >{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                        <td>{DeliveryMethods.filter(i => i.id === item.deliveryMethodId).map(i => i.name)}</td>
                                        <td >{item.shippingContractCode ? item.shippingContractCode : '--'}</td>
                                        <td >{item.shippingCompanyName ? item.shippingCompanyName : '--'}</td>
                                        <td> <svg display={item.extId ? '' : 'none'} onClick={() => openModal(item.extId)} xmlns="http://www.w3.org/2000/svg" width='25' height='25' viewBox="0 0 256 256"><rect
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

                                        {/* <td hidden={roles.includes(7) || roles.includes(8) ? false : true}>
                                            <button onClick={() => openModalDelet(item.id)} className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="حذف">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                    viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-trash-2">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path
                                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                    <line x1="14" y1="11" x2="14" y2="17"></line>

                                                </svg>
                                            </button>
                                        </td> */}
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
        </div>)
    } else {
        return (<div>
            <div className="form-group mb-4 textOnInput col-lg-12 rounded border text-center border-dark  mt-4 p-2 ">
                <label>اطلاعات حواله </label>
                <span className="text-center" >حواله ای موجود نیست</span>

            </div>   </div>
        )
    }

}
export default OrderWayBill