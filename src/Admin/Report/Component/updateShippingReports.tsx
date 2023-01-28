import { useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { UpdateShippingReport, UpdateAllShippingReport } from "../../../services/outScopeService";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import Select from 'react-select'
import { GetAllShippingCompanies } from '../../../services/ShippingService';
import { toast } from 'react-toastify';
import InputMask from "../../../Utils/InputMask";
import MyTableBazargah from '../../../Common/Shared/Form/MyTableBazargah';
import { ExportToExcel } from "../../../Common/Shared/Common/ExportToExcel";
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { RadioButton } from "../../../Utils/RadioButton";



const UpdateShippingReports: React.FC = () => {

    const [startDate, SetStartDate] = useState('')
    const [endDate, SetEndDate] = useState('')
    const [selectedRows, setSelectedRows] = useState([])
    const [companies, setCompanies] = useState([])
    const [shippingCompanyId, setshippingCompanyId] = useState(0)
    const [disable, setDisable] = useState(false)
    let [loading, setLoading] = useState(false);
    let [clicked, setClicked] = useState(false);
    const [report, setReport] = useState([])
    const[updateCompaniesStatus,SetUpdateCompaniesStatus]=useState(false)
    const [reportMethod, SetReportMethod] = useState('3days')
    let color = "#0c4088"

    const navigator = useNavigate();
    const getBulkJob = (selected: any) => {
        if (selected === 2) {
            enableSelectedItem()
        }
        if (selected === 3) {
            copySelectedItem()
        } if (selected === 4) {
            DeleteSelectedItem()
        }
        if (selected === 5) {
            disableSelectedItem()
        }
    }

    const DeleteSelectedItem = async () => {

    }
    const copySelectedItem = async () => {



    }
    const enableSelectedItem = async () => {


    }
    const disableSelectedItem = async () => {


    }



    const getShippingCompany = async () => {
        try {
            const { data, status } = await GetAllShippingCompanies();

            setCompanies(data.result.shippingCompanies.values)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getShippingCompany()

    }, [])

    console.log(report);

    const handelStartDate = (value: any) => {
        if (value === null) {
            SetStartDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            SetStartDate(new Date(value.toDate().setHours(3, 30, 0, 0)).toJSON())
        }
    }
    const handelEndDate = (value: any) => {
        if (value === null) {
            SetEndDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            SetEndDate(new Date(value.toDate().setHours(3, 30, 0, 0)).toJSON())
        }
    }

    const handelSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        let body: any;
        if (reportMethod === '3days') {
            body = { startDate: null, endDate: null, shippingCompanyId: null,updateCompaniesStatus }
        }
        else {
            body = {
                startDate, endDate, shippingCompanyId,updateCompaniesStatus
            }
        }
        try {

            const { data, status } = await UpdateAllShippingReport(body)

            if (status === 200) {
                toast.success("اطلاعات با موفقیت بروز رسانی شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });

                setReport(data.result.report)
                setDisable(true)
                setLoading(false)
                setClicked(true)


            }

        } catch (error) {
            setLoading(false)
        }



    }
    const RadioChanger = (e: any) => {

        SetReportMethod(e.target.value)

    }

    const columns = useMemo(() => [
        { Header: 'companyCode', accessor: 'companyCode' },
        { Header: 'barDel', accessor: 'barDel' },
        { Header: 'barDate', accessor: 'barDate' },
        { Header: 'bar_n', accessor: 'bar_n' },
        { Header: 'bar_n_s', accessor: 'bar_n_s' },
        { Header: 'dTel', accessor: 'dTel' },
        { Header: 'wH1', accessor: 'wH1' },
        { Header: 'many1', accessor: 'buyerUniqueId' },
        { Header: 'netT', accessor: 'netT' },
        { Header: 'kaCode', accessor: 'kaCode' },
        { Header: 'kra1', accessor: 'kra1' },
        { Header: 'kra2', accessor: 'kra2' },
        { Header: 'ghComp', accessor: 'ghComp' },
        { Header: 'tambar', accessor: 'tambar' },
        { Header: 'dName', accessor: 'dName' },
        { Header: 'dFam', accessor: 'dFam' },
        { Header: 'tplk', accessor: 'tplk' },
        { Header: 'barTime', accessor: 'barTime' },
        { Header: 'plName', accessor: 'plName' },
        { Header: 'tsp', accessor: 'tsp' },
        { Header: 'ka_E_Code', accessor: 'ka_E_Code' },
        { Header: 'tarGetName', accessor: 'tarGetName' },
        { Header: 'ghErtebat', accessor: 'ghErtebat' },
        { Header: 'kaGrp', accessor: 'kaGrp' },
        { Header: 'barAdd', accessor: 'barAdd' },
        { Header: 'grpName', accessor: 'grpName' },
        {
            Header: 'ثبت', accessor: (d: any) => {

                let condition = (d.storedInDb ? 'ثبت شده' : 'ثبت نشده')
                return (`${condition}`)

            }, Cell: (row: any) => ((row.row.original.storedInDb) ? 'ثبت شده' : 'ثبت نشده')
        },



    ], []);

    const shippingCompanySelect = () => {
        return (companies.map((data: any) => ({ label: data.name, value: data.id })))
    }
    const data = report
    const handelFrom = () => {
        setClicked(false)
    }

    if (!clicked) {




        if (loading === false) {

            return (<div className='user-progress col-12 ' >
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                        <h5 >درخواست اطلاعات </h5>
                        <p>در این بخش می توانید اطلاعات ارسال  را از باربری دریافت کنید.</p>
                    </div>
                </div>
                <div className='  '>
                    <div className='  col-8 '>
                        <div className=" ">
                            <div className="m-3">
                                <RadioButton
                                    changed={RadioChanger}
                                    id='1'
                                    isSelected={reportMethod === '3days'}
                                    label='سه روز اخیر'
                                    value='3days'
                                />
                            </div>
                            <div className="m-3">
                                <RadioButton
                                    changed={RadioChanger}
                                    id='2'
                                    isSelected={reportMethod === 'byDate'}
                                    label='انتخاب تاریخ'
                                    value='byDate'
                                />
                            </div>

                        </div>
                    </div>
                    <div className="row">

                        <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 ">


                        </div >
                        <div className="col-lg-10 col-md-10 col-sm-10 col-xs-2 ">

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <form className="form form-group ml-4" >
                                    <div className="row  ">
                                        <div className="col-lg-4 col-md-4 col-sm-11  form-input mb-4">
                                            <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}> نام باربری </label>

                                            <Select

                                                isDisabled={reportMethod === 'byDate' ? false : true}

                                                placeholder="شرکت باربری"
                                                options={shippingCompanySelect()}
                                                maxMenuHeight={150}
                                                onChange={(e: any) => {
                                                    setshippingCompanyId(e.value)
                                                    setDisable(false)

                                                }}
                                            />

                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 ml-4 ">


                                            <label className="form-check-label">

                                                <input disabled={reportMethod === 'byDate' ? false : true} type="checkbox" checked={updateCompaniesStatus} onChange={(e:any)=>SetUpdateCompaniesStatus(e.target.checked)} className="form-check-input"  />
                                                بروز رسانی اطلاعات شرکت های باربری
                                            </label>
                                        </div>

                                    </div>
                                    <div className="row  ">
                                        <div className="col-4 mb-4  " style={{ position: 'relative' }} >
                                            <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>از تاریخ </label>
                                            <div className='form-group '>
                                                <DatePicker
                                                    calendar={persian}
                                                    disabled={reportMethod === 'byDate' ? false : true}

                                                    locale={persian_fa}
                                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                    value={startDate}
                                                    onChange={handelStartDate}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-4 mb-4 " >
                                            <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}> تا تاریخ</label>
                                            <div className='form-group '>
                                                <DatePicker
                                                    disabled={reportMethod === 'byDate' ? false : true}
                                                    calendar={persian}

                                                    locale={persian_fa}
                                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                                    value={endDate}
                                                    onChange={handelEndDate}
                                                />

                                            </div>


                                        </div>
                                    </div>

                                </form>




                            </div>

                        </div>

                    </div>
                    <div className='row justify-content-center mt-4 mb-1'>

                        <div className='mr-2'>
                            <NavLink to='/admin' className="btn btn-danger float-left">بازگشت</NavLink>
                        </div>
                        <div className=' ml-4'>
                            <button type="submit" disabled={disable} className="btn btn-success float-right " onClick={handelSubmit}>تایید</button>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>

                    </div>
                </div>
            </div>

            )
        }
        else {
            return (
                <div >
                    <div style={{ position: 'fixed', top: '40%', left: '40%' }}>
                        <p>دریافت اطلاعات ...</p>
                        <FadeLoader loading={loading} color={color} />
                    </div>
                </div>)
        }
    }
    else {
        if (report) {
            const dataForExcel = data.map((item: any) => ({
                'companyCode': item.companyCode,
                'barDel': item.barDel,
                'barDate': item.barDate,
                'bar_n': item.bar_n,
                'bar_n_s': item.bar_n_s,
                'havNum': item.havNum,
                'dTel': item.dTel,
                'wH1': item.wH1,
                'wH2': item.wH2,
                'netT': item.netT,
                'kaCode': item.kaCode,
                'kra1': item.kra1,
                'kra2': item.kra2,
                'pish': item.pish,
                'barArzesh': item.barArzesh,
                'daryafti': item.daryafti,
                'ghComp': item.ghComp,
                'comp': item.comp,
                'ghPaia': item.ghPaia,
                'paia': item.paia,
                'afzode': item.afzode,
                'barBim': item.barBim,
                'barBimAfzode': item.barBimAfzode,
                'tambar': item.tambar,
                'bor': item.bor,
                'dName': item.dName,
                'dFam': item.dFam,
                'tplk': item.tplk,
                'barTime': item.barTime,
                'plName': item.plName,
                'hazTakh': item.hazTakh,
                'bargiriMab': item.bargiriMab,
                'azA2': item.azA2,
                'bus': item.bus,
                'ka_E_Code': item.ka_E_Code,
                'tarGetName': item.tarGetName,
                'mbkhaal': item.mbkhaal,
                'ghErtebat': item.ghErtebat,
                'kaGrp': item.kaGrp,
                'barAdd': item.barAdd,
                'grpName': item.grpName,
                'storedInDb': (item.storedInDb === true ? 'ثبت شده' : 'ثبت نشده'),

            }))

            return (
                <div className=" statbox widget-content widget-content-area ">
                    <div>
                        <button className="btn btn-primary m-3" onClick={handelFrom} >تغییر تاریخ</button>


                        <MyTableBazargah columns={columns} data={data} getData={(rows: any) => setSelectedRows(rows)} rowProps={(row: any) => ({

                            style: {
                                backgroundColor: row.values.ثبت === 'ثبت شده' ? 'lightgreen' : '#ff00003b',

                                cursor: "pointer"
                            }
                        })} bulkJob={getBulkJob} />



                    </div>
                    <div className="d-flex justify-content-end">
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
export default UpdateShippingReports