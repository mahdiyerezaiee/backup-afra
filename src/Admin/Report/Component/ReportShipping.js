import {useMemo, useState} from "react";
import {GetOrdersReports, GetShippingReports} from "../../../services/reportService";
import {useEffect} from "react";
import {getExtraData} from "../../../services/extraService";
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import { NavLink } from 'react-router-dom';
import FadeLoader from 'react-spinners/FadeLoader'
import MyTableBazargah  from "../../../Common/Shared/Form/MyTableBazargah";
import {ExportToExcel} from "../../../Common/Shared/Common/ExportToExcel";
import persian_fa from "react-date-object/locales/persian_fa";

const ReportShipping = () => {

    const [Unshipped, setUnshipped] = useState('');
    const [HasShippingContract, setHasShippingContract] = useState('');
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [Response, SetResponse] = useState([]);
    const [clicked, SetClicked] = useState(false)
    const[selectedRows,setSelectedRows]=useState([])

    const[show,SetShow]=useState(false);
    const[disable,setDisable]=useState(false);

    const[open,SetOpen]=useState(false);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#0c4088");
    const close = () => {
        SetOpen(false);
    }
    let arrayOfSelectedData=[];
    const getSelectedData=(data)=>{

        arrayOfSelectedData= data.map(item=>item.original);


        return(arrayOfSelectedData)

    }
    const getBulkJob=(selected)=>{

    }



    const handelStartDate = (value) => {
        if (value === null) {
            setStartDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setStartDate(new Date(value.toDate().setHours(3,30,0,0)).toJSON())
        }
    }
    const handelEndDate = (value) => {
        if (value === null) {
            setEndDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setEndDate(new Date(value.toDate().setHours(3,30,0,0)).toJSON())
        }
    }
    const handelSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {

            const { data, status } = await GetShippingReports(StartDate, EndDate, Unshipped ? Unshipped: false,HasShippingContract?HasShippingContract:false);
            if (status === 200) {

                SetResponse(data.result.shippingReport);
                SetClicked(true);
                setLoading(false)
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handelFrom=()=>{
        SetClicked(false)
    }
    let formatter = new Intl.NumberFormat('fa-IR', {

        maximumFractionDigits: 0,
        minimumFractionDigits: 0,


    });
    let formater = new Intl.NumberFormat('fa-IR', {


    });

    const columns = useMemo(() => [
        { Header: 'شناسه جزییات سفارش', accessor: 'orderDetailId' },
        {Header:'شناسه بازارگاه',accessor:'orderExtId' },
        { Header: 'شناسه قرارداد باربری', accessor: 'shippingContractCode' },
        { Header: 'وزن', accessor: 'plannedQuantity' ,Cell:row => row.row.original.plannedQuantity? row.row.original.plannedQuantity :" --" },
        { Header: 'تریلی', accessor: 'deliveryMethodId',Cell:row =>
    (
        row.row.original.deliveryMethodId===5?'بله':'خیر'
    )
        },
        { Header: 'نام تحویل گیرند', accessor: 'receiverName',Cell:row => row.row.original.receiverName? row.row.original.receiverName :"" },
        { Header: 'آدرس تحویل گیرنده', accessor: 'receiverAddress',Cell:row => row.row.original.receiverAddress? row.row.original.receiverAddress :"" },
        { Header: 'کدپستی', accessor: 'receiverPostalCode' ,Cell:row => row.row.original.receiverPostalCode? row.row.original.receiverPostalCode :"" },
        { Header: 'تلفن دریافت کننده', accessor: 'receiverMobile' ,Cell:row => row.row.original.receiverMobile? row.row.original.receiverMobile :"" },
        { Header: 'کدیکتای جهاد ', accessor: 'jahadYektaCode' },
        { Header: 'شناسه ملی/کد ملی تحویل گیرنده ', accessor: ''}
    ]);
    const data = useMemo(() => Response);;

    if (!clicked) {
        if(!loading){
            return (
                <div className='user-progress' >
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                            <h5 >درخواست اطلاعات </h5>
                            <p>در این بخش می توانید گزارش حواله ها دریافت کنید.</p>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center '>
                        <div className='widget box shadow col-lg-4 col-sm-12'>


                            <form >
                                <div className='row'>
                                    <div className=" col ">
                                        <div className=" mb-4 " style={{ position: 'relative' }}>
                                            <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>از تاریخ </label>
                                            <div className='form-group '>
                                                <DatePicker
                                                    calendar={persian}

                                                    locale={persian_fa}
                                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                    value={StartDate}
                                                    onChange={handelStartDate}
                                                />

                                            </div>
                                        </div>
                                        {show? <p  style={{color:'red'}}> شروع تاریخ از 1401/4/1 است</p>:null}
                                    </div>
                                    <div className=" col ">
                                        <div className=" mb-4 " style={{ position: 'relative' }}>
                                            <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>تا تاریخ </label>
                                            <div className='form-group '>
                                                <DatePicker

                                                    calendar={persian}

                                                    locale={persian_fa}
                                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                    value={EndDate}
                                                    onChange={handelEndDate}
                                                />

                                            </div></div>

                                    </div>
                                    <div className=" col-12 ">
                                    <div className=" row ">

                                        <div className="col-6 n-chk d-flex  mb-4">

                                                <input type="checkbox" checked={Unshipped} onClick={e=>setUnshipped(e.target.checked)}/>
                                            <label >حمل شده </label>

                                            </div>
                                        <div className=" col-6 n-chk d-flex  mb-4">
                                                <input type="checkbox" checked={HasShippingContract} onClick={e=>setHasShippingContract(e.target.checked)}/>
                                            <label >قرارداد باربری دارد </label>

                                            </div>

                                    </div>
                                    </div>
                                </div>
                                <div className='row justify-content-between'>
                                    <div className='col-6 '>
                                        <button type="submit" disabled={disable} className="btn btn-success float-left " onClick={handelSubmit} >تایید</button>
                                    </div>
                                    <div className='col-6 '>
                                        <NavLink to='/admin' className="btn btn-danger float-right">بازگشت</NavLink>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            )
        }
        else{
            return(
                <div style={{position:'fixed',top:'40%',left:'40%'}}>
                    <p>دریافت اطلاعات ...</p>
                    <FadeLoader loading={loading} color={color}/>
                </div>
            )

        }
    }

    else {
        if (Response && Response.length >0){
            const dataForExcel = Response.map(item => ({
                'شناسه سفارش': item.orderId,
                'شناسه انبار': item.wareHouseId,
                'نام انبار': item.wareHouseName,
                'شناسه محصول': item.productId,
                'نام محصول': item.productName,
                'شناسه عرضه':item.productSupplyId,
                'نام عرضه':item.productSupplyName,
                'شناسه بازارگاه': item.kharidId,
                'شناسه تخصیص': item.allocationId,
                'مقدار': item.quantity,
                'واحد': item.measureUnitId,
                'تاریخ':new Date(item.createDate).toLocaleDateString("fa-IR"),
                'قیمت واحد': item.itemPrice,
                'قیمت سفارش': item.orderPrice,
                'نام کاربر': item.customerName,
                'شناسه ملی کار بر': item.customerNationalCode,
                'نام سازمان': item.organizationName,
                'شناسه ملی سازمان': item.organizationNationalId,
                'شماره ثبت سازمان': item.organizationRegistrationNumber,
            }))
            return (
                <div className=" statbox widget-content widget-content-area ">
                    <div>
                        <button className="btn btn-primary m-3" onClick={handelFrom} >تغییر تاریخ</button>

                        <MyTableBazargah columns={columns} data={data} getData={rows=>setSelectedRows(rows)}   bulkJob={getBulkJob}/>
                        {/*<ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />*/}
                    </div>
                    <div className="d-flex justify-content-end m-2">
                        <ExportToExcel apiData={dataForExcel} fileName='لیست گزارش' />
                    </div>
                </div>

            )
        }else {
            return(
                <div className=" statbox widget-content widget-content-area rounded">
                    <button className="btn btn-primary m-3" onClick={handelFrom} >تغییر تاریخ</button>

                    <div className='text-center mt-5'>
                        <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                    </div>
                </div>
            )
        }


}
}
export default ReportShipping