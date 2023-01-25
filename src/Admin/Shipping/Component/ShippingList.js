import {useEffect, useState} from "react";
import {GetShipping, GetShippingCompanies, SetShippingCompany} from "../../../services/ShippingService";

import {useMemo} from "react";
import AdvancedSearch from "../../../Common/Shared/Common/AdvancedSearch";
import MyTable from "../../../Common/Shared/Form/MyTable";
import ModalGroupWork from "../../../Common/Shared/Common/ModalGroupWork";
import {ExportToExcel} from "../../../Common/Shared/Common/ExportToExcel";
import QueryString from "qs";

import {DeliveryMethods} from "../../../Common/Enums/DeliveryMethodsEnums";
import {MeasureUnitSample} from "../../../Common/Enums/MeasureUnitSample";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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

}
const ShippingList = () => {
    const [shipping ,setShipping]= useState([])
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [stateError, SetStateError] = useState(0)
    const [PageNumber, setPageNumber] = useState(getPage().PageNumber ? getPage().PageNumber : 0)
    const [PageSize, setPageSize] = useState(getPage().PageSize ? getPage().PageSize : 10)
    const [OrderId, setOrderId] = useState(getDefault().OrderId?getDefault().OrderId:0)
    const [selectedRows, setSelectedRows] = useState([])
    const [totalCount, setTotalCount] = useState(0);
    const [CreateStartDate, setCreateStartDate] = useState(getDefault().CreateStartDate)
    const [CreateEndtDate, setCreateEndtDate] = useState(getDefault().CreateEndtDate)
    const [CottageCode, setCottageCode] = useState(getDefault().CottageCode)
    const [getOrders, SetGetOrders] = useState(false);

    const [open, SetOpen] = useState(false);
    const params = {
        OrderId,
        CottageCode,
        CreateEndtDate,
        CreateStartDate,
    }
    function getDefault() {
        let items = JSON.parse(sessionStorage.getItem(`params${window.location.pathname}`));
        return items ? items : ''
    }
    const close = () => {
        SetOpen(false);
    }
    const handelStartDate = (value) => {
        if (value === null) {
            setCreateStartDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setCreateStartDate(new Date(value.toDate()))



        }
    }

    const handelEndDate = (value) => {
        if (value === null) {
            setCreateEndtDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setCreateEndtDate(new Date(value.toDate()))
        }
    }
    const getDataBySearch = async () => {
        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
CottageCode,
                OrderId,
                CreateStartDate,
                CreateEndtDate,
                PageNumber: 0,
                PageSize,
                SortColumn,
                SortingDirectionId,
                IsAdmin:true

            }
            ,
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }
        };

        try {
            const { data, status } = await GetShipping(config);
            if (status === 200) {
                setShipping(data.result.shippings.values);
                setTotalCount(data.result.shippings.totalCount)
                setPageNumber(0)

                sessionStorage.setItem(`params${window.location.pathname}`, JSON.stringify(params));

            }


        } catch (err) {
            console.log(err)
        }

    }

    const getDataByPage = async () => {

        let config = {

            headers: { 'Content-Type': 'application/json' },

            params: {
                CottageCode,
                EntityId:OrderId,
                EntityTypeId:10,
                CreateStartDate,
                CreateEndtDate,
                PageNumber,
                PageSize,
                SortColumn,
                SortingDirectionId,
                IsAdmin:true


            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
            const { data, status } = await GetShipping(config)
            if (status === 200) {

                setShipping(data.result.shippings.values)
                sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));

            }
        } catch (error) {
            console.log(error);
        }
    }

    let SortColumn=null
    let SortingDirectionId=null
    const param = { PageSize, PageNumber }
    let arrayOfSelectedData = [];
    const getSelectedData = (data) => {

        arrayOfSelectedData = data.map(item => item.original);


        return (arrayOfSelectedData)

    }
    const getBulkJob = (selected) => {
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
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => { return { ...item, id: 0, active: true, createDate: new Date() } })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {


                const { data, status } = await SetShippingCompany(copyData[i])
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess(successCount += 1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError(errorCount += 1)
            }


        }


    }
    const enableSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => { return { ...item, active: true } })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {


                const { data, status } = await SetShippingCompany(copyData[i])
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess(successCount += 1)
                }


            } catch (error) {
                SetOpen(true)

                SetStateError(errorCount += 1)
            }


        }


    }
    const disableSelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => { return { ...item, active: false } })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload = {
                    'shippingCompany': copyData[i]
                }

                const { data, status } = await SetShippingCompany(copyData[i])
                if (status === 200) {
                    SetOpen(true)

                    SetStateSuccess(successCount += 1)
                }



            } catch (error) {
                SetOpen(true)

                SetStateError(errorCount += 1)
            }


        }


    }
    function getPage() {
        let items = JSON.parse(sessionStorage.getItem(`param${window.location.pathname}`));
        return items ? items : ''


    }
    const onHeaderClick = () => {
        return {

            onClick: (e) => {
                var siblings=[];


                console.log(SortColumn);
                console.log(SortingDirectionId);

                // console.log(e.target);
                // siblings = e.target.parentNode.getElementsByTagName('th');
                // console.log(siblings);
                // for(let i = 0;i<siblings.length;i++){
                //     siblings[i].innerText = siblings[i].innerText.replace('🔼', '').replace('🔽', '');
                // }

                switch (e.target.innerText.replace('🔼', '').replace('🔽', '')) {

                    case 'شناسه سفارش':

                        if (e.target.children[0].innerText === '') {
                            SortColumn='id'
                            SortingDirectionId=1
                            e.target.children[0].innerText = '🔼'
                            getDataBySearch()
                        }

                        else if (e.target.children[0].innerText === '🔼') {
                            SortColumn='id'
                            SortingDirectionId=2
                            e.target.children[0].innerText = '🔽'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔽') {

                            SortColumn=null
                            SortingDirectionId=null
                            e.target.children[0].innerText = ''
                            getDataBySearch()

                        }
                        break;
                    case 'تاریخ':

                        if (e.target.children[0].innerText === '') {
                            SortColumn='CreateDate'
                            SortingDirectionId=1
                            e.target.children[0].innerText = '🔼'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔼') {

                            SortColumn='CreateDate'
                            SortingDirectionId=2
                            e.target.children[0].innerText = '🔽'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔽') {
                            SortColumn=null
                            SortingDirectionId=null
                            e.target.children[0].innerText = ''
                            getDataBySearch()

                        }
                        break;

                    case 'مقداربرنامه ریزی شده':

                        if (e.target.children[0].innerText === '') {
                            SortColumn='OrderFinalizedPrice'
                            SortingDirectionId=1
                            e.target.children[0].innerText = '🔼'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔼') {

                            SortColumn='OrderFinalizedPrice'
                            SortingDirectionId=2
                            e.target.children[0].innerText = '🔽'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔽') {

                            SortColumn=null
                            SortingDirectionId=null
                            e.target.children[0].innerText = ''
                            getDataBySearch()

                        }
                        break;
                    case 'مقدار ارسال شده ':


                        if (e.target.children[0].innerText === '') {
                            SortColumn='OrderStatusId'
                            SortingDirectionId=1
                            e.target.children[0].innerText = '🔼'
                            getDataBySearch()
                        }
                        else if (e.target.children[0].innerText === '🔼') {

                            SortColumn='OrderStatusId'
                            SortingDirectionId=2
                            e.target.children[0].innerText = '🔽'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔽') {

                            SortColumn=null
                            SortingDirectionId=null
                            e.target.children[0].innerText = ''
                            getDataBySearch()

                        }
                        break;
                    case 'وضعیت ارسال':


                        if (e.target.children[0].innerText === '') {
                            SortColumn='PaymentStatusId'
                            SortingDirectionId=1
                            e.target.children[0].innerText = '🔼'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔼') {

                            SortColumn='PaymentStatusId'
                            SortingDirectionId=2
                            e.target.children[0].innerText = '🔽'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔽') {

                            SortColumn=null
                            SortingDirectionId=null
                            e.target.children[0].innerText = ''
                            getDataBySearch()

                        }

                        break;
                    case 'نحوه ارسال':

                        if (e.target.children[0].innerText === '') {
                            SortColumn='ShippingStatusId'
                            SortingDirectionId=1
                            e.target.children[0].innerText = '🔼'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔼') {

                            SortColumn='ShippingStatusId'
                            SortingDirectionId=2
                            e.target.children[0].innerText = '🔽'
                            getDataBySearch()

                        }
                        else if (e.target.children[0].innerText === '🔽') {

                            SortColumn=null
                            SortingDirectionId=null
                            e.target.children[0].innerText = ''
                            getDataBySearch()

                        }
                        break;


                }


            }
        }

    }
    const getShipping = async () => {
        if (getOrders){
            sessionStorage.clear()
        }
        let config = {

            headers: { 'Content-Type': 'application/json' },

            params: {
                CottageCode,
                EntityId:OrderId,
                EntityTypeId:10,
                CreateStartDate,
                CreateEndtDate,
                PageNumber,
                PageSize,
                SortColumn,
                SortingDirectionId,
                IsAdmin:true


            },
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };

        try {
          const {data , status}=await GetShipping(config)
            SetGetOrders(false)

            setShipping(data.result.shippings.values)
          setTotalCount(data.result.shippings.totalCount)

        }catch (e) {
          console.log(e)
      }
    }
    useEffect(()=>{

        getShipping()
    },[getOrders])

    const columns = useMemo(() => [
        { Header: '#', accessor: 'id' },
        { Header: 'شناسه سفارش', accessor: 'orderId' }
        ,{ Header: 'تاریخ', accessor: 'createDate'  , Cell: row => {

                return (new Date(row.row.original.createDate).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }))
            } }
        ,{ Header: 'کد کوتاژ', accessor: 'cottageCode' }
        ,{ Header: 'حواله شده', accessor: 'plannedQuantity' }
        ,{ Header: 'ارسال شده', accessor: 'shippedQuantity' }
        , { Header: 'واحد', accessor: 'measureUnitId', Cell: row => {
                return (MeasureUnitSample.filter(item => item.id === row.row.original.measureUnitId).map(item => item.name))
            }}

        ,{ Header: 'وضعیت ارسال', accessor: 'shipped' , Cell:row => {
            return row.row.original.shipped === true ?"ارسال شده" : "-"
            } }
        ,{ Header: 'تاریخ ارسال', accessor: 'shippingDate'   , Cell: row => {

            if(row.row.original.shippingDate!==null){
                return (new Date(row.row.original.shippingDate).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }))
            }
            else{
                return('--')

            }}}
        ,{ Header: 'نحوه ارسال', accessor: 'deliveryMethodId', Cell: row => {
                return (DeliveryMethods.filter(item => item.id === row.row.original.deliveryMethodId).map(item => item.name))
            }}

        ,{ Header: 'شناسه قرارداد باربری', accessor: 'shippingContractId' }
        ,{Header:'نام شرکت' ,accessor:'companyName'},
        ,{ Header: 'نام باربری', accessor: 'shippingCompanyName' }
        ,{ Header: 'شماره قرارداد', accessor: 'shippingContractCode' }
        ,

    ])
    const data = useMemo(() => shipping);
    const handelSearchFieldClear = () => {
        SetGetOrders(true)
getShipping()
        setCottageCode("")

        setCreateEndtDate('')
        setCreateStartDate('')

        setPageNumber(0)
        setOrderId('')
sessionStorage.clear()
    }
    if (shipping) {
        const dataForExcel = data.map(item => ({

            'شناسه ': item.id,
            'شناسه سفارش': item.orderId,
            'تاریخ': (new Date(item.createDate).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })),
            'کد کوتاژ': item.cottageCode,
            'حواله شده': item.plannedQuantity,
            'ارسال شده':item.shippedQuantity,
            'واحد': (MeasureUnitSample.filter(i => i.id === item.measureUnitId).map(item => item.name))[0],
            'وضعیت ارسال':( item.shipped === true ?"ارسال شده" : "-"),
            'تاریخ ارسال':(new Date(item.shippingDate).toLocaleDateString('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })),
            'نحوه ارسال': (DeliveryMethods.filter(i => i.id === item.deliveryMethodId).map(item => item.name))[0],
            'شناسه قرارداد باربری': item.shippingContractId,
            'نام برباری': item.companyName,
            'شماه قرارداد': item.contractCode,

        }))
        return (
            <div>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 '>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1   rounded">
                    <AdvancedSearch>

                        <form className='form-row  form-group textOnInput'>


 <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                            <label style={{
                                position: 'absolute',
                                zIndex: '1',
                                top: '-15px',
                                right: '10px',
                                background: 'none',
                                padding: '0 8px'
                            }}>از تاریخ </label>
                            <div className='form-group  '>
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                    value={CreateStartDate}
                                    onChange={handelStartDate}
                                />

                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                            <label style={{
                                position: 'absolute',
                                zIndex: '1',
                                top: '-15px',
                                right: '10px',
                                background: 'none',
                                padding: '0 8px'
                            }}>تا تاریخ </label>
                            <div className='form-group  '>
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                    value={CreateEndtDate}
                                    onChange={handelEndDate}
                                />
                            </div>
                        </div>
                          <div className="col-lg-2 col-md-4  col-sm-12    mb-1">

                                <label> شناسه سفارش</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شناسه سفارش" value={OrderId} onChange={e => setOrderId(Number(e.target.value))} />
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label>کد کوتاژ</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="  کد کوتاژ " value={CottageCode} onChange={e => setCottageCode(Number(e.target.value))} />
                            </div>





                        </form>
                        <div className="  filter-btn ">
                            <div className=" row  ">
                                <div className="col-6 ">
                                <button onClick={handelSearchFieldClear}
                                        className="  btn-sm btn-danger ">حذف فیلتر
                                </button>
                            </div>
                            <div className="col-6">
                                <button onClick={getDataBySearch}
                                        className="  btn-sm  btn-primary">جستجو
                                </button>
                            </div>
                        </div></div>
                        <br />
                    </AdvancedSearch>
                </div>
                {getDefault().OrderId || getDefault().CreateEndtDate || getDefault().CreateStartDate || getDefault().CottageCode? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

                <div className=" statbox widget-content widget-content-area">

                    <div>
                        <MyTable columns={columns} data={data} getData={rows => setSelectedRows(rows)} bulkJob={getBulkJob}
                                 total={totalCount}
                                 setPageSize={setPageSize}
                                 PageSize={PageSize}
                                 getDataBySearch={getDataByPage}
                                 setPageNumber={setPageNumber}
                                 PageNumber={PageNumber}
                                 clickableHeader={onHeaderClick}
                        />                        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />

                    </div>
                    <div className="d-flex justify-content-end">
                        <ExportToExcel apiData={dataForExcel} fileName='لیست کالا' />
                    </div>
                </div>
            </div>


        )
    }
    else {
        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>


                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2 my-1   rounded">
                    <AdvancedSearch>

                        <form className='form-row  form-group textOnInput'>


                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                                <label style={{
                                    position: 'absolute',
                                    zIndex: '1',
                                    top: '-15px',
                                    right: '10px',
                                    background: 'none',
                                    padding: '0 8px'
                                }}>از تاریخ </label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={CreateStartDate}
                                        onChange={handelStartDate}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label style={{
                                    position: 'absolute',
                                    zIndex: '1',
                                    top: '-15px',
                                    right: '10px',
                                    background: 'none',
                                    padding: '0 8px'
                                }}>تا تاریخ </label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={CreateEndtDate}
                                        onChange={handelEndDate}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">

                                <label> شناسه سفارش</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شناسه سفارش" value={OrderId} onChange={e => setOrderId(Number(e.target.value))} />
                            </div>

                            <div className="col-lg-2 col-md-4  col-sm-12    mb-1">
                                <label>کد کوتاژ</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="  کد کوتاژ " value={CottageCode} onChange={e => setCottageCode(Number(e.target.value))} />
                            </div>





                        </form>
                        <div className="  filter-btn ">
                            <div className=" row  ">
                                <div className="col-6 ">
                                <button onClick={handelSearchFieldClear}
                                        className="  btn-sm btn-danger ">حذف فیلتر
                                </button>
                            </div>
                            <div className="col-6">
                                <button onClick={getDataBySearch}
                                        className="  btn-sm  btn-primary">جستجو
                                </button>
                            </div>
                        </div> </div>
                        <br />
                    </AdvancedSearch>

                </div>
                {getDefault().OrderId || getDefault().CreateEndtDate || getDefault().CreateStartDate || getDefault().CottageCode ? <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{fontSize:"15px"}}>نمایش اطلاعات بر اساس فیلتر  </span>:null}

                <div className=" statbox widget-content widget-content-area">
                    <div>
                        {/*<button className="btn btn-primary m-3" >تعریف باربری جدید</button>*/}


                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>


                    </div>
                </div>


            </div>
        )
    }
}
export default ShippingList