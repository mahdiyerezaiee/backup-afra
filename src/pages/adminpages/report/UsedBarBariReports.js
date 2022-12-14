import React, { useState, useMemo } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";
import { NavLink } from 'react-router-dom';


import FadeLoader from 'react-spinners/FadeLoader'
import MyTableBazargah  from "../../../components/form/MyTableBazargah";
import {GetUsedBarBariReports} from "../../../services/reportService";
import {ExportToExcel} from "../../../components/common/ExportToExcel";


const UsedBarBariReport = () => {
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
            setStartDate(value.toDate().toJSON())
        }
    }
    const handelEndDate = (value) => {
        if (value === null) {
            setEndDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setEndDate(value.toDate().toJSON())
        }
    }
    const handelSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const { data, status } = await GetUsedBarBariReports(StartDate, EndDate);
            if (status === 200) {

                SetResponse(data.result.barBariUsedReports);
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
        style: 'currency',
        currency: 'IRR',
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,


    });
    let formater = new Intl.NumberFormat('fa-IR', {


    });

    const columns = useMemo(() => [
        { Header: 'کد باربری', accessor: 'companyCode' },
        {Header:'تاریخ بارنامه',accessor:'barDate'},
        { Header: 'شماره بارنامه', accessor: 'bar_n' },
        { Header: 'شماره سریال بارنامه', accessor: 'bar_n_s' },
        { Header: 'شماره تلفن راننده', accessor: 'dTel'},
        { Header: 'وزن بارنامه', accessor: 'netT'},
        { Header: 'کد تخصیص بازارگاه', accessor: 'kaCode' },
        { Header: 'کرایه بار', accessor: 'kra2' },
        { Header: 'نام راننده', accessor: 'dName' },
        { Header: 'فامیلی راننده', accessor: 'dFam' },
        { Header: 'پلاک', accessor: 'tplk' },
        { Header: ' ساعت بارنامه', accessor: 'barTime'},
        { Header: ' شناسه یا کد ملی تحویل گیرنده', accessor: 'ka_E_Code' },
        { Header: 'نام تحویل گیرنده', accessor: 'tarGetName' },
        { Header: ' شماره قرارداد', accessor: 'ghErtebat' },
        { Header: 'آدرس بارنامه', accessor: 'barAdd'},]);
    const data = useMemo(() => Response);;
    console.log(data)

    if (!clicked) {
        if(!loading){
            return (
                <div className='user-progress' >
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                            <h5 >درخواست اطلاعات </h5>
                            <p>در این بخش می توانید گزارش بارگیری دریافت کنید.</p>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center '>
                        <div className='widget box shadow col-4'>


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
                                </div>
                                <div className='row justify-content-between'>
                                    <div className='col-6 '>
                                        <button type="submit" disabled={disable} className="btn btn-success float-left " onClick={handelSubmit} >تایید</button>
                                    </div>
                                    <div className='col-6 '>
                                        <NavLink to='/dashboard' className="btn btn-danger float-right">بازگشت</NavLink>
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

    'تاریخ بارنامه': item.barDate,
    'شماره بارنامه': item.bar_n,
    'شماره سریال بارنامه': item.bar_n_s,
    'شماره تلفن راننده': item.dTel,
    'وزن بارنامه': item.netT,
    'کد تخصیص بازارگاه':item.kaCode,
    'کرایه بار':item.kra2,
    'کد باربری': item.companyCode,
    'نا راننده': item.dName,
    'فامیلی راننده': item.dFam,
    'پلاک': item.tplk,
    'ساعت بارنامه': item.barTime,
    'شناسه یا کد ملی تحویل گیرنده': item.ka_E_Code,
    'نام تحویل گیرنده':item.tarGetName,
    'شماه قرارداد': item.ghErtebat,
    'آدرس بارنامه': item.barAdd,


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

export default UsedBarBariReport