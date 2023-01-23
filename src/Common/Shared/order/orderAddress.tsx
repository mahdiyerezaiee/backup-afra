import { useSelector } from "react-redux";
import { getExtraData } from '../../../services/extraService';
import { useEffect, useState, useMemo } from "react";
import ShippingSelected from "../Common/shippingSelected";
import { GetAllProductSupply } from "../../../services/productSupplyService";
import { GetAddress } from '../../../services/addressService';
import { DeleteOrderDetail, editOrder } from "../../../services/orderService";
import { toast } from "react-toastify";
import FinancialConfirmation from "./FinancialConfirmation";
import { GetProductSupplyConditions } from '../../../services/ProductSupplyConditionService';
import AddAdressCustomerForOrder from '../Common/addAdressCustomerForOrder';
import ExcelFileUploader from '../../../Utils/ExcelFileUploader';
import { PaymentStructureEnums } from '../../Enums/PaymentStructureEnums';
import TakhsisTable from "../Form/TakhsisTable";
import SelectColumnFilter from "../Form/ColumnFilter";
import FadeLoader from "react-spinners/FadeLoader";
import ModalGroupWork from "../Common/ModalGroupWork";
import Modal from 'react-modal';
import { RootState } from "../../../store";


const file = require("../../../Admin/Order/Component/addressFile.xlsx")

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
interface Props {

    details: any, shipping: any, orderWeight: number, TakhsisWeight: number, getOrder: any, order: any
}

const OrderAddress: React.FC<Props> = ({ details, shipping, orderWeight, TakhsisWeight, getOrder, order }) => {
    const roles = useSelector((state: RootState) => state.roles)
    const [orderCondition, setOrderCondition] = useState<any>([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [FilterData, setFilterData] = useState<any>([])
    const [IsOpen, SetIsOpen] = useState(false);
    const [open, SetOpen] = useState(false);
    const [modalOpen, setIsModalOpen] = useState(false);
    const [IdDelete, setIdDelete] = useState(0)
    const [measureUnitId, setmeasureUnitId] = useState(0)
    const [orderDetailId, setorderDetailId] = useState([]);
    const [completeDdata, SetCompletedData] = useState([])
    const [productSupplyId, setProductSupplyId] = useState(0)
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [stateError, SetStateError] = useState(0)

    const [isOpenAddress, setIsOpenAddress] = useState(false)
    const [modalIsOpenUploadExcel, setIsOpenUploadExcel] = useState(false);
    let [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([])
    const getSelectedData = (data: any) => {
        let arrayOfSelectedData = [];

        arrayOfSelectedData = data.map((item: any) => item.original);
        return (arrayOfSelectedData)
    }
    const getBulkJob = (selected: any) => {
        const arrayOfData = getSelectedData(selectedRows);

        setorderDetailId(arrayOfData)

        openModal(arrayOfData)




    }
    const openModalDelet = (id: any) => {
        setIsModalOpen(true);
        setIdDelete(id)

    }
    const closeModalDelet = () => {
        setIsModalOpen(false);
    }
    const deletHandler = async () => {
        // const body={
        //     "orderDetailId":IdDelete
        // }
        try {
            const { data, status } = await DeleteOrderDetail(IdDelete)
            if (status === 200) {
                toast.success("جزییات با موفقیت حذف شد", {
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
    const selectedFunc = () => {
        const arrayOfData = getSelectedData(selectedRows);
        console.log(selectedRows)
        setorderDetailId(arrayOfData)

        openModal(arrayOfData)
    }
    const [cottageCode, setcottageCode] = useState('');

    const getSupplyCode = async () => {

        try {
            const { data, status } = await GetAllProductSupply(details[0].productSupplyId)
            setcottageCode(data.result.productSupply.cottageCode)

        } catch (e) {
            console.log(e)
        }

    }

    const getOrderDetailCondition = async () => {
        let Arr = [];


        try {

            let Order = details


            let ids = details.map((item: any) => item.productSupplyId)


            let productSupplyConditionIds = details.map((item: any) => item.productSupplyConditionId)

            if (productSupplyConditionIds.length > 0) {
                let conditions = [];
                for (let i = 0; i < ids.length; i++) {
                    if (productSupplyConditionIds[i] !== null) {
                        const { data, status } = await GetProductSupplyConditions(ids[i]);
                        let condition = data.result.productSupplyConditions.values

                        const element = condition.filter((item: any) => item.id === productSupplyConditionIds[i])[0]



                        conditions.push(element)
                    }
                    else {
                        const noData = { conditionId: null }
                        conditions.push(noData)
                    }
                }

                for (let i = 0; i < Order.length; i++) {


                    const merged = conditions.map((item: any) =>
                    ({
                        conditionId: item.id,
                        installmentOccureCount: item.installmentOccureCount,
                        installmentPeriod: item.installmentPeriod,
                        paymentMethodId: item.paymentMethodId,
                        additionalAmount: item.additionalAmount,
                        additionalTypeId: item.additionalTypeId,


                    }))


                    let obj = { ...Order[i], ...merged[i] }

                    Arr.push(obj)
                }


                setOrderCondition(Arr)
            }
            else {
                setOrderCondition(Order)
            }
        } catch (err) {
            console.log(err)
        }
    }
    let condition: any = [...orderCondition]

    console.log(condition);

    const openModal = (id: any) => {
        setorderDetailId(id)
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const openModalFinancialConfirmation = () => {

        SetIsOpen(true);
    }
    const closeModalFinancialConfirmation = () => {
        getOrder()
        SetIsOpen(false);
    }
    const closeModalAddress = () => {

        setIsOpenAddress(false);
    }
    const openModalAddress = (id: any, measureId: any) => {
        setorderDetailId(id)
        setmeasureUnitId(measureId)
        setIsOpenAddress(true);
    }
    const openModalExcelAddress = (id: any) => {
        setorderDetailId(id)
        setIsOpenUploadExcel(true);
    }
    const closeModalIsOpenUploadExcel = () => {
        setIsOpenUploadExcel(false)
    }
    const getDetails = async () => {

        let finalArr: any = [];
        try {
            setLoading(true)
           if (typeof(details)!==undefined) {
                for (let i = 0; i < details.length; i++) {

                    const { data, status } = await getExtraData(Number(details[i].extId), 1)
                    const response = await GetAddress(11, Number(details[i].id))

                    let addresses = response.data.result.addresses[0]

                    if (addresses) {

                        const rename = (({ id: AddressId, ...addresses }: any) => ({ AddressId, ...addresses }))

                        addresses = rename(addresses)

                    }

                    let extraData = (data.result.extraData)
                    if (extraData) {
                        let extraD = JSON.parse(data.result.extraData.data)

                        const rename = (({ Id: extraDataId, ...extraD }: any) => ({ extraDataId, ...extraD }))
                        let newExtraData = rename(extraD)

                        let newArr = { ...details[i], ...newExtraData, ...addresses }
                        newArr = { ...newArr, hasShipp: false }
                        finalArr.push(newArr)
                    }
                    else {

                        let newArr = { ...details[i] }
                        finalArr.push(newArr)
                    }

                }
                SetCompletedData(finalArr)
                setFilterData(finalArr.filter((item: any) => item.extId !== null))
                setLoading(false)
            }

        } catch (error) {
            setLoading(false)

        }

    }
    const close = () => {
        SetOpen(false);
    }

    var formatter = new Intl.NumberFormat('fa-IR', {

        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
    useEffect(() => {
        getDetails()
        // getSupplyCode()
        getOrderDetailCondition()

    }, [getOrder])

    const columns = useMemo(() => [
        { Header: '#', accessor: 'id', disableFilters: true },
        { Header: 'نام تحویل گیرنده', accessor: 'receiverName', disableFilters: true },
        { Header: 'کد ملی', accessor: 'ReceiverId', disableFilters: true },
        {
            Header: 'آدرس', accessor: 'fullAddress', Cell: (rows: any) => {

                return (
                    <p title={rows.row.original.fullAddress}>{rows.row.original.fullAddress.substring(0, 20)}</p>
                )


            }, disableFilters: true
        },
        { Header: 'شماره هماهنگی', accessor: 'receiverTel', disableFilters: true },
        { Header: 'کد پستی', accessor: 'postalCode', disableFilters: true },
        { Header: 'قیمت پایه', accessor: 'basePrice', Filter: SelectColumnFilter },
        { Header: 'وزن', accessor: 'quantity', disableFilters: true },
        {
            Header: 'قیمت تمام شده', accessor: 'price', Cell: (rows: any) => {
                return (
                    formatter.format(rows.row.original.price)
                )
            }, disableFilters: true
        },
        {
            Header: 'بازه پرداخت', accessor: '', Cell: (rows: any) => {
                return (condition.filter((x: any) => x.id === rows.row.original.id).paymentMethodId === 4 ? condition.filter((x: any) => x.id === rows.row.original.id).map((y: any) => `${y.installmentOccureCount} قسط ${y.installmentPeriod} روزه`) : '--')

            }, disableFilters: true
        },
        { Header: 'شناسه تخصیص', accessor: 'AllocationId', disableFilters: true },
        { Header: 'شناسه یکتا', accessor: 'ReceiverUniqueId', disableFilters: true },
        {
            Header: 'تریلی', accessor: 'ShipTruckTypet', Cell: (rows: any) => {
                if (rows.row.original.ShipTruckTypet === 1) {

                    return ('بله')
                }
                else {
                    return ('خیر')
                }

            }, disableFilters: true
        },
        {
            Header: 'عملیات', accessor: '  ', Cell: (rows: any) => {



                if (roles.includes(7) || roles.includes(5) || roles.includes(8)) {
                    return (
                        <div>
                            <button onClick={() => openModal(rows.row.original.id)} className="btn btn-sm btn-primary ml-1 mr-1"
                                disabled={rows.row.original.shippingId !== null ? true : false}

                            >صدور حواله
                            </button>
                            <button disabled={rows.row.original.shippingId !== null ? true : false} onClick={() => openModalDelet(rows.row.original.id)} className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip" data-placement="top" title="حذف">
                                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20}
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
                        </div>

                    )
                }


                else { return (null) }
            }


            , disableFilters: true,
        }
    ], [])

    const data = useMemo(() => FilterData, [FilterData])



    if (loading) {
        return (
            <div className="loadingAddress" >
                <div className="boxloadingAddress">
                    <p>دریافت اطلاعات ...</p>
                    <FadeLoader loading={loading} color={"#ccc"} />
                </div>
            </div>)
        setLoading(false)
    } else if (loading === false && typeof (details) !== undefined) {
        return (
            <div>
                <ShippingSelected modalIsOpen={modalIsOpen} closeModal={closeModal} orderDetailId={orderDetailId} Order={order} />
                <FinancialConfirmation id={order.id} modalIsOpen={IsOpen} closeModal={closeModalFinancialConfirmation} />

                <div className="form-group mb-4 textOnInput col-lg-12 rounded border  border-dark mt-4   ">
                    <label>جزییات سفارش </label>

                    {condition && condition.filter((x: any) => x.extId === null).length > 0 ?
                        (<div className="form-group   textOnInput col-lg-12 rounded border  border-dark   " style={{ marginTop: '4rem' }}>
                            <label> فاقد تخصیص </label>

                            <div className=" p-2 table-responsive" style={{ overflowX: "auto" }}>

                                <table className="table    table-striped  mt-2  mb-4">
                                    <thead className='text-center'>
                                        <tr className="">
                                            <th> #</th>
                                            <th> کالا</th>
                                            <th>قیمت پایه</th>
                                            <th>وزن مانده </th>
                                            <th> ارزش کالا</th>
                                            <th> عرضه</th>
                                            <th>نحوه پرداخت</th>
                                            <th>بازه پرداخت</th>
                                            <th>کوتاژ</th>
                                            <th> تاریخ</th>
                                            <th>عملیات</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {condition.filter((x: any) => x.extId === null).map((item: any) =>
                                            <tr key={item.id}>

                                                <td className="text-center">{item.id}</td>
                                                <td className="text-center">{item.product.name}</td>
                                                <td className="text-center">{item.basePrice}</td>
                                                <td className="text-center">{formatter.format(item.quantity)}</td>
                                                <td className="text-center">{formatter.format(item.price)}</td>
                                                <td className="text-center">{item.productSupplyId ? item.productSupplyId : '--'}</td>
                                                <td className="text-center">{item.paymentMethodId ? PaymentStructureEnums.filter(x => x.id === item.paymentMethodId).map(q => q.name) : '--'}</td>
                                                <td className="text-center">{item.paymentMethodId === 4 ? `${item.installmentOccureCount} قسط ${item.installmentPeriod} روزه` : '--'}</td>
                                                <td className="text-center">{cottageCode ? cottageCode : '--'}</td>
                                                <td className="text-center">{new Date(item.createDate).toLocaleDateString('fa-IR')}</td>
                                                <td className="text-center m-1"><button hidden={(orderWeight <= TakhsisWeight) ? true : false} onClick={() => openModalAddress(item.id, item.measureUnitId)} className=" border-0 bg-success " title="افزودن آدرس" >
                                                    <svg style={{ color: 'white' }} width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                        className="bi bi-plus-circle" viewBox="0 0 17 16">
                                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                        <path
                                                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                    </svg>

                                                </button>

                                                    <button className={order.orderStatusId === 8 ? "bg-primary m-1 border-0 " : "bg-success m-1 border-0 "} disabled={(orderWeight <= TakhsisWeight) ? true : false} onClick={() => openModalExcelAddress(item.id)} title='افزودن آدرس با اکسل'>

                                                        <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-explicit" viewBox="0 0 16 16"> <path d="M6.826 10.88H10.5V12h-5V4.002h5v1.12H6.826V7.4h3.457v1.073H6.826v2.408Z" /> <path d="M2.5 0A2.5 2.5 0 0 0 0 2.5v11A2.5 2.5 0 0 0 2.5 16h11a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 13.5 0h-11ZM1 2.5A1.5 1.5 0 0 1 2.5 1h11A1.5 1.5 0 0 1 15 2.5v11a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-11Z" /> </svg>
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>) : ''}
                    {completeDdata && completeDdata.filter((x: any) => x.extId !== null).length > 0 ?
                        (<div className="form-group mb-4  textOnInput col-lg-12 rounded border  border-dark    " style={{ marginTop: '3rem' }}>
                            <Modal
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


                                    <p > آیا مطمئنید  جزییات {data.filter((item: any) => item.id === IdDelete).map((item: any) => item.id)}   </p>
                                    <p>حذف شود ؟ </p>




                                    <button className="btn btn-danger " onClick={deletHandler}>حذف
                                    </button>

                                </div>
                            </Modal>
                            <label >  تخصیص یافته </label>

                            <TakhsisTable columns={columns} data={data} getData={(rows: any) => setSelectedRows(rows)}
                                bulkJob={getBulkJob} />
                            <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

                        </div>) : ''}
                    <div className=" text-end  p-2" style={{ textAlign: 'left' }}>

                        {roles.includes(7) || roles.includes(5) || roles.includes(8) ? <button className="btn-success m-1 btn " hidden={order.orderStatusId === 8 ? false : true} onClick={openModalFinancialConfirmation}>تایید مالی</button> : null}
                    </div>

                </div>

                <AddAdressCustomerForOrder isOpenAddress={isOpenAddress} closeModal={closeModalAddress} orderDetailId={orderDetailId} orderMeasuerId={measureUnitId} />
                <ExcelFileUploader modalIsOpen={modalIsOpenUploadExcel} closeModal={closeModalIsOpenUploadExcel}
                    EntityId={orderDetailId} EntityTypesId={11}
                    comment={'لطفا فایل اکسل مطابق نمونه اطلاعات ارسال را بارگزاری کنید'} />
            </div>
        )
    }
    else {
        return (
            <div className=" statbox widget-content widget-content-area">
                <div>
                    <div className='text-center mt-5'>
                        <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                    </div>
                </div>
            </div>

        )
    }
}
export default OrderAddress