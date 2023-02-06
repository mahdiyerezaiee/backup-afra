import React, { useState, useMemo } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";
import { NavLink } from 'react-router-dom';


import FadeLoader from 'react-spinners/FadeLoader'
import MyTableBazargah from "../../../Common/Shared/Form/MyTableBazargah";
import { GetUsedBarBariReports } from "../../../services/reportService";
import { ExportToExcel } from "../../../Common/Shared/Common/ExportToExcel";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import Select from 'react-select';
import { GetUsedBarBariReportsCompanies } from './../../../services/reportService';


const UsedBarBariReport: React.FC = () => {

    const companies = useSelector((state: RootState) => state.companies)
    const [StartDate, setStartDate] = useState('');
    const [EndDate, setEndDate] = useState('');
    const [Response, SetResponse] = useState([]);
    const [clicked, SetClicked] = useState(false)
    const [selectedRows, setSelectedRows] = useState([])
    const [companyId, SetCompanyId] = useState<any>()
    const [show, SetShow] = useState(false);
    const [disable, setDisable] = useState(false);
    const [OnlyShipping, setOnlyShipping] = useState(false)
    const [open, SetOpen] = useState(false);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#0c4088");
    const close = () => {
        SetOpen(false);
    }
    let arrayOfSelectedData = [];
    const getSelectedData = (data: any) => {

        arrayOfSelectedData = data.map((item: any) => item.original);


        return (arrayOfSelectedData)

    }
    const getBulkJob = (selected: any) => {

    }



    const handelStartDate = (value: any) => {
        if (value === null) {
            setStartDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setStartDate(new Date(value.toDate().setHours(3, 30, 0, 0)).toJSON())
        }
    }
    const handelEndDate = (value: any) => {
        if (value === null) {
            setEndDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setEndDate(new Date(value.toDate().setHours(3, 30, 0, 0)).toJSON())

        }
    }
    const handelSubmit = async (event: any) => {
        setLoading(true)
        event.preventDefault();
        if (companies.length === 1) {
            try {
                const { data, status } = await GetUsedBarBariReportsCompanies(StartDate, EndDate, companies[0].id,OnlyShipping);
                if (status === 200) {

                    SetResponse(data.result.barBariUsedReports);
                    SetClicked(true);
                    setLoading(false)
                }
            } catch (error) {
                console.log(error);
            }
        }
        else {

            if (companyId) {
                try {
                    const { data, status } = await GetUsedBarBariReportsCompanies(StartDate, EndDate, companyId,OnlyShipping);
                    if (status === 200) {

                        SetResponse(data.result.barBariUsedReports);
                        SetClicked(true);
                        setLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                    setLoading(false)

                }

            }
            else {
                try {
                    const { data, status } = await GetUsedBarBariReportsCompanies(StartDate, EndDate, companies[0].id,OnlyShipping);
                    if (status === 200) {

                        SetResponse(data.result.barBariUsedReports);
                        SetClicked(true);
                        setLoading(false)
                    }
                } catch (error) {
                    console.log(error);
                    setLoading(false)

                }
            }

        }
    }
    const handelFrom = () => {
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
    const CompaniesIDs = () => {
        return (companies.map(data => ({ label: data.name, value: data.id })))
    }
    const columns = useMemo(() => [
        { Header: 'کد باربری', accessor: 'companyCode' },
        { Header: 'تاریخ بارنامه', accessor: 'barDate' },
        { Header: 'شماره بارنامه', accessor: 'bar_n' },
        { Header: 'شماره سریال بارنامه', accessor: 'bar_n_s' },
        { Header: 'شماره تلفن راننده', accessor: 'dTel' },
        { Header: 'وزن بارنامه', accessor: 'netT' },
        { Header: 'کد تخصیص بازارگاه', accessor: 'kaCode' },
        { Header: 'کرایه بار', accessor: 'kra2' },
        { Header: 'نام راننده', accessor: 'dName' },
        { Header: 'فامیلی راننده', accessor: 'dFam' },
        { Header: 'پلاک', accessor: 'tplk' },
        { Header: ' ساعت بارنامه', accessor: 'barTime' },
        { Header: ' شناسه یا کد ملی تحویل گیرنده', accessor: 'ka_E_Code' },
        { Header: 'نام تحویل گیرنده', accessor: 'tarGetName' },
        { Header: ' شماره قرارداد', accessor: 'ghErtebat' },
        { Header: 'آدرس بارنامه', accessor: 'barAdd' },], []);
    let defaultValue: any = CompaniesIDs()[0]

    const data:any = useMemo(() => Response, [Response]);;
    console.log(data)

    if (!clicked) {
        if (!loading) {
            return (
                <div className='user-progress' >
                    <div className='row'>
                        <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                            <h5 > گزارش بارنامه های صادر شده</h5>
                            <p>در این بخش می توانید  گزارش بارنامه های صادر شده را دریافت کنید.</p>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center '>
                        <div className=' col-lg-6 col-sm-12 m-2'>


                            <form  className='row'>


                                {companies.length > 1 ?
                                    <div className="col-lg-6 mb-4  form-group textOnInput">

                                        <label> شرکت</label>
                                        <Select
                                            defaultValue={defaultValue}
                                            placeholder='نام شرکت'
                                            options={CompaniesIDs()}
                                            key={defaultValue}
                                            isClearable={true}
                                            onChange={(e: any) => {


                                                SetCompanyId(e.value)


                                            }

                                            }

                                        />


                                    </div> : ''}
                                    <div className="col-lg-6 col-md-6 col-sm-12  mb-4 form-group">


<label className="form-check-label">

    <input type="checkbox" checked={OnlyShipping} className="form-check-input" onChange={(e: any) => setOnlyShipping(e.target.checked)} />
    فقط بارنامه هایی که بر مبنای حواله حمل صادر شده اند  را نمایش بده
</label>
</div>
                                <div className=' col-12 form-row'>
                                    
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
                                        {show ? <p style={{ color: 'red' }}> شروع تاریخ از 1401/4/1 است</p> : null}
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
                                <div className='col-12'>
                                <div className='row justify-content-between'>
                                    <div className='col-6 '>
                                        <button type="submit" disabled={disable} className="btn btn-success float-right " onClick={handelSubmit} >تایید</button>
                                    </div>
                                    <div className='col-6 '>
                                        <NavLink to='/admin' className="btn btn-danger ">بازگشت</NavLink>
                                    </div>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            )
        }
        else {
            return (
                <div style={{ position: 'fixed', top: '40%', left: '40%' }}>
                    <p>دریافت اطلاعات ...</p>
                    <FadeLoader loading={loading} color={color} />
                </div>
            )

        }
    }

    else {
        if (Response && Response.length > 0) {
            const dataForExcel = Response.map((item: any) => ({

                'تاریخ بارنامه': item.barDate,
                'شماره بارنامه': item.bar_n,
                'شماره سریال بارنامه': item.bar_n_s,
                'شماره تلفن راننده': item.dTel,
                'وزن بارنامه': item.netT,
                'کد تخصیص بازارگاه': item.kaCode,
                'کرایه بار': item.kra2,
                'کد باربری': item.companyCode,
                'نا راننده': item.dName,
                'فامیلی راننده': item.dFam,
                'پلاک': item.tplk,
                'ساعت بارنامه': item.barTime,
                'شناسه یا کد ملی تحویل گیرنده': item.ka_E_Code,
                'نام تحویل گیرنده': item.tarGetName,
                'شماه قرارداد': item.ghErtebat,
                'آدرس بارنامه': item.barAdd,


            }))
            return (
                <div className=" statbox widget-content widget-content-area ">
                    <div>
                        <button className="btn btn-primary m-3" onClick={handelFrom} >تغییر تاریخ</button>

                        <MyTableBazargah columns={columns} data={data} getData={(rows: any) => setSelectedRows(rows)} bulkJob={getBulkJob} />
                        {/*<ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />*/}
                    </div>
                    <div className="d-flex justify-content-end m-2">
                        <ExportToExcel apiData={dataForExcel} fileName='لیست گزارش' />
                    </div>
                </div>

            )
        } else {
            return (
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