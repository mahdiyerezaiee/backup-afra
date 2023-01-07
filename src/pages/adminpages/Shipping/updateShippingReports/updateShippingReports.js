import { useEffect, useState,useMemo } from "react";
import { NavLink } from "react-router-dom";
import { UpdateShippingReport, UpdateShippingReportByDate } from "../../../../services/outScopeService";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import Select from 'react-select'
import { GetAllShippingCompanies } from './../../../../services/ShippingService';
import { toast } from 'react-toastify';
import InputMask from "../../../../Utils/InputMask";
import MyTableBazargah from '../../../../Common/Shared/Form/MyTableBazargah';
import { ExportToExcel } from "../../../../Common/Shared/Common/ExportToExcel";



const UpdateShippingReports = () => {

    const [startDate, SetStartDate] = useState('')
    const [endDate, SetEndDate] = useState('')
    const[selectedRows,setSelectedRows]=useState([])
    const [companies, setCompanies] = useState([])
    const [CompanyId, setCompanyId] = useState(0)
    const[disable,setDisable]=useState(false)
    let [loading, setLoading] = useState(false);
    let [clicked, setClicked] = useState(false);
    const[report,setReport]=useState([])
    let color = "#0c4088"

    const navigator = useNavigate();
    const getBulkJob=(selected)=>{
        if(selected===2){
            enableSelectedItem()
        }
        if(selected===3){
            copySelectedItem()
        }if(selected===4){
            DeleteSelectedItem()
        }
        if(selected===5){
            disableSelectedItem()
        }
    }

    const DeleteSelectedItem=async()=>{

    }
    const copySelectedItem=async()=>{



    }
    const enableSelectedItem=async()=>{


    }
    const disableSelectedItem=async()=>{


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

    const handelSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const body = {
            startDate, endDate, CompanyId
        }
        try {

            const{data,status}=await UpdateShippingReportByDate(body)

            if (status===200) {
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

        }



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
        { Header: 'netT', accessor: 'netT'},
        { Header: 'kaCode', accessor: 'kaCode' },
        { Header: 'kra1', accessor: 'kra1' },
        { Header: 'kra2', accessor: 'kra2' },
        { Header: 'ghComp', accessor: 'ghComp'},
        { Header: 'tambar', accessor: 'tambar'},
        { Header: 'dName', accessor: 'dName'},
        { Header: 'dFam', accessor: 'dFam'},
        { Header: 'tplk', accessor: 'tplk'},
        { Header: 'barTime', accessor: 'barTime'},
        { Header: 'plName', accessor: 'plName'},
        { Header: 'tsp', accessor: 'tsp'},
        { Header: 'ka_E_Code', accessor: 'ka_E_Code'},
        { Header: 'tarGetName', accessor: 'tarGetName'},
        { Header: 'ghErtebat', accessor: 'ghErtebat'},
        { Header: 'kaGrp', accessor: 'kaGrp'},
        { Header: 'barAdd', accessor: 'barAdd'},
        { Header: 'grpName', accessor: 'grpName'},
        { Header: 'ثبت', accessor:d=>{

            let condition=(d.storedInDb?'ثبت شده':'ثبت نشده')
            return(`${condition}`)

        },Cell:row=>((row.row.original.storedInDb)?'ثبت شده':'ثبت نشده')},

   

    ]);

    const shippingCompanySelect = () => {
        return (companies.map(data => ({ label: data.name, value: data.id })))
    }
const data=useMemo(()=>report)
const handelFrom=()=>{
    setClicked(false)
}

if(!clicked){
    if (loading===false) {
        return (
            <div className='user-progress ' >
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                        <h5 >درخواست اطلاعات </h5>
                        <p>در این بخش می توانید اطلاعات ارسال  را از باربری دریافت کنید.</p>
                    </div>
                </div>
                <div className='row d-flex justify-content-center '>
                    <div className='statbox widget-content widget-content-area'>

                        <form className="form form-group">
                            <div className="col mb-4  " style={{ position: 'relative' }}>
                                <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}> از تاریخ</label>
                                <InputMask className=" start form-control opacityForInput  mb-4"  placeholder="تاریخ" value={startDate} onChange={e => { SetStartDate(e.target.value)
                                    setDisable(false)} } />
                            </div>
                            <div className="col mb-4 " >
                                <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}> تا تاریخ</label>

                                <InputMask className=" end form-control opacityForInput  mb-4"  placeholder="تاریخ" value={endDate} onChange={e => {SetEndDate(e.target.value)
                                    setDisable(false) }}  />


                            </div>
                            <div className="col  form-input mb-4">
                                <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}> نام باربری </label>

                                <Select
                                    placeholder="شرکت باربری"
                                    options={shippingCompanySelect()}
                                    maxMenuHeight='150px'
                                    onChange={(e) => {
                                        setCompanyId(e.value)
                                        setDisable(false)

                                    }}
                                />

                            </div>
                            <div className='row justify-content-between mt-5 mb-1'>

                                <div className='col-6 '>
                                    <NavLink to='orderList' className="btn btn-danger float-left">بازگشت</NavLink>
                                </div>
                                <div className='col-6 '>
                                    <button type="submit" disabled={disable} className="btn btn-success float-right " onClick={handelSubmit}>تایید</button>
                                </div>
                            </div>
                        </form>

                    </div>

                </div>
            </div>
        )
    }
    else {
        return(
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
    const dataForExcel = data.map(item => ({
        'companyCode': item.companyCode,
        'barDel': item.barDel,
        'barDate': item.barDate,
        'bar_n': item.bar_n,
        'bar_n_s': item.bar_n_s,
        'havNum':item.havNum,
        'dTel': item.dTel,
        'wH1': item.wH1,
        'wH2': item.wH2,
        'netT': item.netT,
        'kaCode':item.kaCode,
        'kra1': item.kra1,
        'kra2':item.kra2,
        'pish': item.pish,
        'barArzesh': item.barArzesh,
        'daryafti': item.daryafti,
        'ghComp': item.ghComp,
        'comp': item.comp,
        'ghPaia':item.ghPaia,
        'paia': item.paia,
        'afzode': item.afzode,
        'barBim': item.barBim,
        'barBimAfzode': item.barBimAfzode,
        'tambar': item.tambar,
        'bor':item.bor,
        'dName': item.dName,
        'dFam': item.dFam,
        'tplk': item.tplk,
        'barTime': item.barTime,
        'plName':item.plName,
        'hazTakh': item.hazTakh,
        'bargiriMab': item.bargiriMab,
        'azA2': item.azA2,
        'bus': item.bus,
        'ka_E_Code': item.ka_E_Code,
        'tarGetName':item.tarGetName,
        'mbkhaal': item.mbkhaal,
        'ghErtebat': item.ghErtebat,
        'kaGrp': item.kaGrp,
        'barAdd': item.barAdd,
        'grpName': item.grpName,
        'storedInDb':(item.storedInDb===true?'ثبت شده':'ثبت نشده'),

    }))

    return (
    <div className=" statbox widget-content widget-content-area ">
        <div>
            <button className="btn btn-primary m-3" onClick={handelFrom} >تغییر تاریخ</button>


            <MyTableBazargah columns={columns} data={data} getData={rows=>setSelectedRows(rows)}   rowProps={row => ({

                style: {
                    backgroundColor: row.values.ثبت === 'ثبت شده'? 'lightgreen': '#ff00003b',

                    cursor: "pointer"
                }
            })} bulkJob={getBulkJob}/>


            {/*<ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />*/}
        </div>
        <div className="d-flex justify-content-end">
            <ExportToExcel apiData={dataForExcel} fileName='لیست گزارش' />
        </div>
    </div>

)}else {
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
export default UpdateShippingReports