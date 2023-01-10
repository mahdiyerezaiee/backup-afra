import { useSelector } from "react-redux";
import {
    GetDataWithSearchOrder,
    GetOrder,
    GetOrderDetails, HasOverDuePaymentsByAttachments
} from "../../../services/orderService";
import { useEffect, useState, useRef } from "react";
import { useMemo } from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { OrderStatus } from "../../../Common/Enums/OrderStatusEnums";
import { PaymentStructureEnums } from "../../../Common/Enums/PaymentStructureEnums";
import { ShippingStatusEnums } from "../../../Common/Enums/ShippingStatusEnums";
import { GetAllOrganisationCode, GetAllOrganisation } from "../../../services/organisationService";
import ModalGroupWork from "../../../Common/Shared/Common/ModalGroupWork";
import { ExportToExcel } from '../../../Common/Shared/Common/ExportToExcel';
import MyTableClick from "../../../Common/Shared/Form/MyTableClickable";
import AdvancedSearch from "../../../Common/Shared/Common/AdvancedSearch";
import Select from "react-select";
import QueryString from 'qs';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Modal from 'react-modal';
import AddAdressCustomerForOrder from "../../../Common/Shared/Common/addAdressCustomerForOrder";
import { GetAddress } from "../../../services/addressService";
import OrderEditList from "./orderEditList";
import { PaymentStatusEnums } from "../../../Common/Enums/PaymentStatus";
import { toast } from "react-toastify";
import { OverDueEnum } from "../../../Common/Enums/overDueEnum";
import { GetCompanyChild } from './../../../services/companiesService';
import { GetOrderDetailsAdmin } from './../../../services/orderService';


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

const OrderList = () => {
    const location = useLocation();

    const [PageNumber, setPageNumber] = useState(getPage().PageNumber ? getPage().PageNumber : 0)
    const [PageSize, setPageSize] = useState(getPage().PageSize ? getPage().PageSize : 10)

    const [orderId, setOrderId] = useState(0)
    let FilnalArr = [];
    const roles = useSelector(state => state.roles)
    const Navigate = useNavigate()
    const [selectedRows, setSelectedRows] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [getOrders, SetGetOrders] = useState(false);
    const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
    const [idEdit, setIdEdit] = useState(0);
    const [stateSuccess, SetStateSuccess] = useState(0)
    const [stateError, SetStateError] = useState(0)
    const [open, SetOpen] = useState(false);
    const [overDue, SetoverDue] = useState(location.state ? true : getDefault().overDue);
    const [address, SetAddress] = useState({ active: false, id: 0 });
    let Detail = [];
    const [totalCount, setTotalCount] = useState(0);
    const [ShippingInformation, SetShippingInformation] = useState([]);
    const [organizations, SetOrganisations] = useState([]);
    const [ShoppingCartInformation, SetShoppingCartInformation] = useState([]);
    const [userName, setUserName] = useState(getDefault().userName)
    const [StartDate, setStartDate] = useState(getDefault().StartDate)
    const [EndDate, setEndDate] = useState(getDefault().EndDate)
    const [ExtId, setExtId] = useState(getDefault().ExtId ? getDefault().ExtId : null)
    const [nationalCode, setNationalCode] = useState(getDefault().nationalCode)
    const [organizationNationalId, setOrganizationNationalId] = useState(getDefault().organizationNationalId)
    const [orderStatusIds, setOrderStatusIds] = useState(getDefault().orderStatusIds)
    const [paymentMethodIds, setPaymentMethodIds] = useState(getDefault().paymentMethodIds)
    const [paymentStatusIds, setPaymentStatusId] = useState(getDefault().paymentStatusIds)
    const [shippingStatusIds, setShippingStatusIds] = useState(getDefault().shippingStatusIds)
    const [order, setOrder] = useState([])
    const[companyId,setCompanyId]=useState(getDefault().companyId?getDefault().companyId:null)
    const [DetailAddress, setDetailAddress] = useState([]);
    const[companies,setCompanies]=useState([])
    const [OrderDetailExtId, setOrderDetailExtId] = useState(getDefault().OrderDetailExtId)
    const [Id, setId] = useState(getDefault().Id ? getDefault().Id : null)
    let SortColumn=null
    let SortingDirectionId=null

    const param = { PageSize, PageNumber }

    function getPage() {
        let items = JSON.parse(sessionStorage.getItem(`param${window.location.pathname}`));
        return items ? items : ''


    }
    const bindAdress = async (arr) => {
        if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                try {
                    const { data, status } = await GetAddress(11, arr[i].id)
                    let detail = Detail.filter(item => item.id === arr[i].id)[0]
                    let address = data.result.addresses;
                    const finallAddres = address.map(item =>
                    ({
                        fullAddress: item.fullAddress,
                        postalCode: item.postalCode,
                        receiverTel: item.receiverTel,
                        receiverMobile: item.receiverMobile,
                        receiverName: item.receiverName,
                    }))[0]
                    let obj = { ...detail, ...finallAddres }
                    FilnalArr.push(obj)
                    setDetailAddress(FilnalArr)

                } catch (e) {
                    console.log(e)
                }

            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                try {
                    const { data, status } = await GetAddress(10, arr[i].orderId)
                    let detail = Detail.filter(item => item.orderId === arr[i].orderId)[0]
                    let address = data.result.addresses;
                    const finallAddres = address.map(item =>
                    ({
                        fullAddress: item.fullAddress,
                        postalCode: item.postalCode,
                        receiverTel: item.receiverTel,
                        receiverMobile: item.receiverMobile,
                        receiverName: item.receiverName,
                    }))[0]
                    let obj = { ...detail, ...finallAddres }
                    FilnalArr.push(obj)
                    setDetailAddress(FilnalArr)

                } catch (e) {
                    console.log(e)
                }

            }
        }
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const openModalEdit = (id) => {
        setIdEdit(id)
        setIsOpenEdit(true);
    }
    const closeModalEdit = () => {
        setIsOpenEdit(false);
    }
    const handelStartDate = (value) => {
        if (value === null) {
            setStartDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setStartDate(new Date(value.toDate().setHours(3, 30, 0, 0)))



        }
    }

    const handelEndDate = (value) => {
        if (value === null) {
            setEndDate('')
        }
        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setEndDate(new Date(value.toDate().setHours(3, 30, 0, 0)))
        }
    }
    const close = () => {
        SetOpen(false);
    }
    const shippingId = () => {
        return (ShippingStatusEnums.map(data => ({ label: data.name, value: data.id })))
    }
    const PaymentStatus = () => {
        return (PaymentStatusEnums.map(data => ({ label: data.name, value: data.id })))
    }
    const OrderStatusID = () => {
        return (OrderStatus.map(data => ({ label: data.name, value: data.id })))
    }
    const paymentMethodIDs = () => {
        return (PaymentStructureEnums.map(data => ({ label: data.name, value: data.id })))
    }
    const OverDue = () => {
        return (OverDueEnum.map(data => ({ label: data.name, value: data.value })))
    }
    let arrayOfSelectedData = [];
    const getSelectedData = (data) => {
        arrayOfSelectedData = data.map(item => item.original);
        return (arrayOfSelectedData)
    }
    const CompaniesIDs = () => {
        return (companies.map(data => ({ label: data.name, value: data.id })))
    }
    const getBulkJob = (selected) => {
        if (selected === 2) {
            enableSelectedItem()
        }
        if (selected === 3) {
            copySelectedItem()
        }
        if (selected === 4) {
            DeleteSelectedItem()
        }
        if (selected === 5) {
            disableSelectedItem()
        }
    }
    const DeleteSelectedItem = async () => { }
    const copySelectedItem = async () => {
        const arrayOfData = getSelectedData(selectedRows);
        const copyData = arrayOfData.map(item => {
            return { ...item, id: 0, active: true, createDate: new Date() }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload = {
                    'organization': copyData[i]
                }
                const { data, status } = await setOrder(copyData[i])
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
        const copyData = arrayOfData.map(item => {
            return { ...item, active: true }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload = {
                    'order': copyData[i]
                }
                const { data, status } = await setOrder(copyData[i])
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
        const copyData = arrayOfData.map(item => {
            return { ...item, active: false }
        })

        let successCount = 0;
        let errorCount = 0;
        for (let i = 0; i < copyData.length; i++) {


            try {

                let payload = {
                    'order': copyData[i]
                }
                const { data, status } = await setOrder(copyData[i])
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
    const params = {
        organizationNationalId,
        overDue,
        paymentStatusIds,
        Id,
        ExtId,
        paymentMethodIds,
        shippingStatusIds,
        nationalCode,
        userName,
        orderStatusIds,
        StartDate,
        EndDate,
        OrderDetailExtId,IsAdmin:true,
        companyId
    }
    function getDefault() {
        let items = JSON.parse(sessionStorage.getItem(`params${window.location.pathname}`));
        return items ? items : ''
    }

    const getDataBySearch = async () => {
        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
                Id: Number(Id),IsAdmin:true,
                UserName: userName,
                OrderStatusIds: orderStatusIds ? orderStatusIds.map(item => item.value) : [],
                StartDate
                , EndDate
                , ExtId: Number(ExtId),
                AttachmentsOverDue: overDue,
                paymentStatusIds: paymentStatusIds ? paymentStatusIds.map(item => item.value) : [],
                PaymentMethodIds: paymentMethodIds ? paymentMethodIds.map(item => item.value) : [],
                ShippingStatusIds: shippingStatusIds ? shippingStatusIds.map(item => item.value) : [],
                NationalCode: nationalCode,
                OrganizationNationalId:organizationNationalId,
                OrderDetailExtId,
                PageNumber: 0,
                PageSize,
                companyId,
                SortColumn,
                SortingDirectionId

            }
            ,
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }
        };

        try {
            const { data, status } = await GetDataWithSearchOrder(config);
            if (status === 200) {
                SetAddress({ active: false })
                setOrder(data.result.orderList.values);
                setTotalCount(data.result.orderList.totalCount)
                setPageNumber(0)
                sessionStorage.setItem(`params${window.location.pathname}`, JSON.stringify(params));
                sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));
            
            }
            

        } catch (err) {
            console.log(err)
        }

    }
    const getDataByPage = async () => {
        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
                Id: Number(Id),
                UserName: userName,
                OrderStatusIds: orderStatusIds ? orderStatusIds.map(item => item.value) : [],
                StartDate
                , EndDate
                , ExtId: Number(ExtId),
                AttachmentsOverDue: overDue,
                paymentStatusIds: paymentStatusIds ? paymentStatusIds.map(item => item.value) : [],
                PaymentMethodIds: paymentMethodIds ? paymentMethodIds.map(item => item.value) : [],
                ShippingStatusIds: shippingStatusIds ? shippingStatusIds.map(item => item.value) : [],
                NationalCode: nationalCode,
                OrganizationNationalId:organizationNationalId,
                companyId,
                OrderDetailExtId,
                PageNumber,
                PageSize,  SortColumn,
                SortingDirectionId,IsAdmin:true

            }
            ,
            paramsSerializer: params => {
                return QueryString.stringify(params)
            }
        };

        try {
            const { data, status } = await GetDataWithSearchOrder(config);
            if (status === 200) {
                SetAddress({ active: false })
                setOrder(data.result.orderList.values);
                sessionStorage.setItem(`param${window.location.pathname}`, JSON.stringify(param));

            }

        } catch (err) {
            console.log(err)
        }

    }
    const onHeaderClick = () => {
        return {

            onClick: (e) => {
                var siblings=[];
                
               


                // console.log(e.target);
                // siblings = e.target.parentNode.getElementsByTagName('th');
                // console.log(siblings);
                // for(let i = 0;i<siblings.length;i++){
                //     siblings[i].innerText = siblings[i].innerText.replace('🔼', '').replace('🔽', '');
                // }

                switch (e.target.innerText.replace('🔼', '').replace('🔽', '')) {

                    case 'شماره سفارش':

                        if (e.target.children[0].innerText === '') {
                            SortColumn='id'
                            SortingDirectionId=1
                            e.target.children[0].innerText = '🔼'
                            getDataBySearch()
                        }

                        else if (e.target.children[0].innerText === '🔼') {
                            console.log('hiiii');
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

                    case 'مبلغ-ریال':

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
                    case 'وضعیت سفارش':


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
                    case 'وضعیت پرداخت':


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
                    case 'وضعیت ارسال':

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
    const GetOrders = async () => {
        if (getOrders){
            sessionStorage.clear()

        }
        let config = {
            headers: { 'Content-Type': 'application/json' },
            params: {
                Id: Number(Id),
                UserName: userName,
                OrderStatusIds: orderStatusIds ? orderStatusIds.map(item => item.value) : [],
                StartDate
                , EndDate
                , ExtId: Number(ExtId),
                paymentStatusIds: paymentStatusIds ? paymentStatusIds.map(item => item.value) : [],
                AttachmentsOverDue: overDue,
                PaymentMethodIds: paymentMethodIds ? paymentMethodIds.map(item => item.value) : [],
                ShippingStatusIds: shippingStatusIds ? shippingStatusIds.map(item => item.value) : [],
                NationalCode: nationalCode,
                OrganizationNationalId:organizationNationalId,
                IsAdmin:true,
                OrderDetailExtId,
                PageNumber,
                PageSize
            }
            ,
            paramsSerializer: params => { return QueryString.stringify(params) }


        };
        try {
            const { data, status } = await GetDataWithSearchOrder(config);
            if (status === 200) {
                SetGetOrders(false)
                setOrder(data.result.orderList.values);
                setTotalCount(data.result.orderList.totalCount)

            }
        } catch (err) {
            console.log(err)
        }
    }
    const getOrganization = async () => {
        try {
            const { data, status } = await GetAllOrganisation();
            if (status === 200) { SetOrganisations(data.result.organizationLists.values) }
        } catch (error) {
            console.log(error);
        }
    }
    const getCompany=async()=>{
try {
    const{data,status}=await GetCompanyChild()
    if(status===200){
        setCompanies(data.result.companies)
    }
    
} catch (error) {
    console.log(error);
}

    }
    var formatter = new Intl.NumberFormat('fa-IR', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
    useEffect(() => {
        GetOrders()
        getOrganization()
        getCompany()
    }, [getOrders])


   
    const columns = useMemo(() => [

        {
            Header: 'شماره سفارش', accessor: 'id',
        },
        ,
        {
            Header: 'تاریخ', accessor: 'CreateDate'
            , Cell: row => {

                return (new Date(row.row.original.createDate).toLocaleDateString('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                }))
            }

        },
        {
            Header: 'خریدار', accessor: d => {
                let OName = organizations.filter(item => item.id === d.customer.organizationId).map(item => item.name)

                return (` ${d.customer.firstName} ,    ${d.customer.lastName} ,`)
            }
            , Cell: row => {
                let fName = row.row.original.customer.firstName;
                let lName = row.row.original.customer.lastName;
                let OName;
                if (row.row.original.customer.organizationId > 0) {

                    OName = organizations.filter(item => item.id === row.row.original.customer.organizationId).map(item => item.name)
                }
                let fullname = `${fName ? fName : '--'} ${lName ? lName : ''} `;
                return (fullname)
            }
        }, {
            Header: 'کد ملی', accessor: d => {
                let Ncode = d.customer.nationalCode;
                let OName = organizations.filter(item => item.id === d.customer.organizationId).map(item => item.nationalId)
                return (`${Ncode}`)

            }, Cell: row => {
                let Ncode = row.row.original.customer.nationalCode;
                let OName;
                if (row.row.original.customer.organizationId > 0) {

                    OName = organizations.filter(item => item.id === row.row.original.customer.organizationId).map(item => item.nationalId)
                }
                let code = `${Ncode ? Ncode : '--'} `
                return (code)
            }
        }, {
            Header: 'سازمان', accessor: d => {
                let OName = organizations.filter(item => item.id === d.customer.organizationId).map(item => item.name)

                return (` ${d.OName} `)
            }
            , Cell: row => {

                let OName;
                if (row.row.original.customer.organizationId > 0) {

                    OName = organizations.filter(item => item.id === row.row.original.customer.organizationId).map(item => item.name)
                }
                let fullname = `${OName ? OName : '--'}  `;
                return (fullname)
            }
        }, {
            Header: 'شناسه ملی', accessor: d => {
                let Ncode = d.customer.nationalCode;
                let OName = organizations.filter(item => item.id === d.customer.organizationId).map(item => item.nationalId)
                return (`${OName}`)

            }, Cell: row => {
                let Ncode = row.row.original.customer.nationalCode;
                let OName;
                if (row.row.original.customer.organizationId > 0) {

                    OName = organizations.filter(item => item.id === row.row.original.customer.organizationId).map(item => item.nationalId)
                }
                let code = ` ${OName ? OName : '--'}`
                return (code)
            }
        }, {
            Header: 'نحوه پرداخت', accessor: 'paymentMethodId', Cell: row => {
                return (PaymentStructureEnums.filter(item => item.id === row.row.original.paymentMethodId).map(item => item.name))
            }
        },
        { Header: 'شماره همراه', accessor: 'customer.userName' },
        ,
        {
            Header: 'وضعیت ارسال', accessor: 'shippingStatusId', Cell: row => {
                return (ShippingStatusEnums.filter(item => item.id === row.row.original.shippingStatusId).map(item => item.name))
            }
        },
        {
            Header: 'وضعیت سفارش', accessor: 'orderStatusId', Cell: row => {
                return (OrderStatus.filter(item => item.id === row.row.original.orderStatusId).map(item => item.name))
            }
        }
        ,

        {
            Header: 'وضعیت پرداخت', accessor: 'paymentStatusId', Cell: row => {
                return (PaymentStatusEnums.filter(item => item.id === row.row.original.paymentStatusId).map(item => item.name))
            }
        },
        {
            Header: 'مبلغ-ریال',
            accessor: 'orderFinalizedPrice',
            Cell: row => (formatter.format(row.row.original.orderFinalizedPrice))
        },
        {
            Header: 'مشاهده جزییات ', accessor: '', Cell: row => (<div>
                <Link className="border-0 bg-transparent non-hover edit-btn"  to={`/admin/orderDetail/${row.row.original.id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width='25' height='25' viewBox="0 0 256 256"><rect
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
                            strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>
                </Link>
            </div>
            )
        },

        {
            Header: 'عملیات', accessor: '', Cell: row => (

                roles.includes(2) ? '' : <div className=" btn-group">

                    <button className="border-0 bg-transparent non-hover edit-btn" data-toggle="tooltip"
                        data-placement="top" data-title="ویرایش"
                        onClick={function () {
                            openModalEdit(row.row.original.id)
                            SetAddress({ active: address.active === false ? false : false })
                        }}
                        disabled={roles.includes(8)?false:true}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-edit-2">
                            <path
                                d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </button>


                </div>

            )
        }])


    const data = useMemo(() => order);
    const formatTrProps = (state = {}) => {
        if (modalIsOpenEdit === false) {
            return {
                onClick: async (e) => {
                    e.preventDefault()
                    setDetailAddress([])
                    setOrderId(state.original.id)
                    try {
                        const { data, status } = await GetOrderDetailsAdmin(state.original.id)
                        SetAddress({ active: address.active === false ? true : false, id: state.id })
                        if (status === 200) {
                            Detail = data.result.orderDetails
                            await bindAdress(Detail)
                        }
                    } catch (err) {
                        console.log(err)
                    }
                    try {
                        const { data, status } = await GetOrder(state.original.id)
                        SetAddress({ active: address.active === false ? true : false, id: state.id })
                        if (status === 200) {
                            let xd = data.result.order.extraData
                            SetShoppingCartInformation(data.result.order)
                            if (xd === null) {
                                SetShippingInformation([])

                            } else {
                                SetShippingInformation(JSON.parse(xd.data))
                            }
                        }
                    } catch (err) {
                        console.log(err)
                    }
                },
            }
        }
    }
    const handelSearchFieldClear = () => {
        SetGetOrders(true)
        GetOrders()

        setOrderStatusIds([])
        SetAddress({ active: false })
        setUserName('')
        setId('')
        setNationalCode('')
        setStartDate('')
        setEndDate('')
        setExtId('')
        setOrderDetailExtId('')
        setPaymentStatusId([])
        setPaymentMethodIds([])
        setShippingStatusIds([])
        setOrganizationNationalId('')
        SetoverDue(null)
        setCompanyId(null)
        sessionStorage.clear()

        setPageNumber(0)
    }
    if (order) {
        const dataForExcel = data.map(item => ({
            'شمراه فاکتور': item.id,
            'خریدار': item.customer.firstName,
            'شماره همراه': item.customer.userName,
            'شماره ملی': item.customer.nationalCode,
            'نوع پرداخت': item.paymentMethodId === 2 ? 'نقدی' : 'نسیه',
            'وضعیت تخصیص': (ShippingStatusEnums.filter(data => data.id === item.shippingStatusId).map(data => data.name)[0]),
            'وضعیت سفارش': (OrderStatus.filter(data => data.id === item.orderStatusId).map(item => item.name)[0]),
            'تاریخ': (new Date(item.createDate).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            })),
            'مبلغ': item.orderTotal
        }))
        return (<div className="rounded">
            <OrderEditList id={idEdit} closeModal={closeModalEdit} modalIsOpen={modalIsOpenEdit} />
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12  '>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Selected Option"
                ariaHideApp={false}>
                <AddAdressCustomerForOrder closeModal={closeModal} />
            </Modal>
            <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2  rounded">
                <AdvancedSearch>
                    <br />
                    <form className='form-row textOnInput'>
                        <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                            <label className="date-piker-form" >از تاریخ </label>
                            <div className='form-group  '>
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                    value={StartDate}
                                    onChange={handelStartDate}
                                />

                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                            <label className="date-piker-form"  >تا تاریخ </label>
                            <div className='form-group  '>
                                <DatePicker
                                    calendar={persian}
                                    locale={persian_fa}
                                    style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                    value={EndDate}
                                    onChange={handelEndDate}
                                />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                            <label>شماره سفارش</label>
                            <input className="form-control opacityForInput  mb-4" type="text" placeholder="سفارش"
                                value={Id} onChange={e => setId(e.target.value)} /></div>
                        <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                            <label> کد ملی</label>
                            <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد ملی"
                                maxLength="11" value={nationalCode}
                                onChange={e => setNationalCode(e.target.value)} /></div>
                        <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                            <label> شناسه ملی</label>
                            <input className="form-control opacityForInput  mb-4" type="text" placeholder="شناسه ملی"
                                maxLength="11" value={organizationNationalId}
                                onChange={e => setOrganizationNationalId(e.target.value)} /></div>
                        <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                            <label> شناسه خرید بازارگاه</label>

                            <input className="form-control opacityForInput  mb-4" type="text"
                                placeholder="شناسه خرید"
                                value={ExtId} onChange={e => setExtId(e.target.value)} />
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                            <label> کد تخصیص</label>

                            <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد تصیص"
                                value={OrderDetailExtId} onChange={e => setOrderDetailExtId(e.target.value)} />
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                            style={{ marginBottom: "3rem" }}>
                            <div className=" form-control-sm">
                                <label>وضعیت سفارش</label>

                                <Select
                                    value={orderStatusIds}
                                    placeholder='وضعیت سفارش'
                                    options={OrderStatusID()}
                                    isMulti
                                    isClearable={true}
                                    onChange={e => {
                                        setOrderStatusIds(e)
                                    }} />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                            style={{ marginBottom: "3rem" }}>
                            <div className=" form-control-sm">
                                <label>وضعیت ارسال </label>

                                <Select
                                    value={shippingStatusIds}
                                    placeholder='وضعیت تخصیص'
                                    options={shippingId()}
                                    isMulti
                                    isClearable={true}
                                    onChange={e => {
                                        setShippingStatusIds(e)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                            style={{ marginBottom: "3rem" }}>
                            <div className=" form-control-sm">
                                <label>وضعیت پرداخت </label>

                                <Select
                                    value={paymentStatusIds}
                                    placeholder='وضعیت پرداخت'
                                    options={PaymentStatus()}
                                    isMulti
                                    isClearable={true}
                                    onChange={e => {
                                        setPaymentStatusId(e)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group selectIndex"
                            style={{ marginBottom: "3rem" }}>
                            <div className=" form-control-sm">
                                <label> وضعیت سررسید </label>
                                {overDue && overDue === null ?
                                    <Select

                                        options={OverDue()}
                                        onChange={e => {
                                            SetoverDue(e.value)
                                        }}
                                    /> : <Select
                                        value={OverDue().filter(i => i.value === overDue).map(i => i)}

                                        placeholder=' وضعیت سررسید '
                                        options={OverDue()}
                                        onChange={e => {
                                            SetoverDue(e.value)
                                        }}
                                    />}

                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                            style={{ marginBottom: "3rem" }}>
                            <div className=" form-control-sm">
                                <label> نحوه پرداخت </label>

                                <Select
                                    value={paymentMethodIds}
                                    placeholder=' پرداخت '
                                    options={paymentMethodIDs()}
                                    isMulti
                                    isClearable={true}
                                    onChange={e => {
                                        setPaymentMethodIds(e)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                            style={{ marginBottom: "3rem" }}>
                            <div className=" form-control-sm">
                                <label> نام شرکت </label>

                                {companyId && companyId === null ?
                                    <Select

                                        options={CompaniesIDs()}
                                        onChange={e => {
                                            setCompanyId(e.value)
                                        }}
                                    /> : <Select
                                        value={CompaniesIDs().filter(i => i.value === companyId).map(i => i)}

                                        placeholder='نام شرکت'
                                        options={CompaniesIDs()}
                                        onChange={e => {
                                            setCompanyId(e.value)
                                            console.log(e);

                                        }}
                                    />}
                            </div>
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
                        </div>
                    </div>
                </AdvancedSearch>
            </div>
            {getDefault().organizationNationalId  ||getDefault().overDue || getDefault().EndDate || getDefault().ExtId || getDefault().Id || getDefault().OrderDetailExtId || getDefault().StartDate || getDefault().orderStatusIds || getDefault().paymentMethodIds || getDefault().shippingStatusIds || getDefault().userName || getDefault().paymentStatusIds ?
                <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{ fontSize: "15px" }}>نمایش اطلاعات بر اساس فیلتر  </span> : null}
            <div className=" statbox widget-content widget-content-area rounded">
                <div>

                    <MyTableClick columns={columns} data={data} getData={rows => setSelectedRows(rows)}
                        bulkJob={getBulkJob} formatRowProps={(state) => formatTrProps(state)}
                        show={address}
                        address={ShippingInformation}
                        ShippingCartInformation={ShoppingCartInformation}
                        setPageSize={setPageSize}
                        PageSize={PageSize}
                        total={totalCount}
                        getDataBySearch={getDataByPage}
                        setPageNumber={setPageNumber}
                        PageNumber={PageNumber}
                        Detail={DetailAddress}
                        clickableHeader={onHeaderClick}

                    />
                    <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />
                </div>
                <div className="d-flex justify-content-end">
                    <ExportToExcel apiData={dataForExcel} fileName='لیست سفارشات' />
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <div className='user-progress'>
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    </div>
                </div>
                <div className=" statbox widget-content widget-content-area mb-1 mt-1 p-2  rounded">
                    <AdvancedSearch>
                        <br />
                        <form className='form-row textOnInput'>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                                <label className="date-piker-form"  >از تاریخ </label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}

                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={StartDate}
                                        onChange={handelStartDate}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">

                                <label className="date-piker-form"  >تا تاریخ </label>
                                <div className='form-group  '>
                                    <DatePicker
                                        calendar={persian}

                                        locale={persian_fa}
                                        style={{ height: '45.39px', width: '100%', textAlign: 'center' }}
                                        value={EndDate}
                                        onChange={handelEndDate}
                                    />

                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label>شماره سفارش</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="سفارش"
                                    value={Id} onChange={e => setId(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label> کد ملی</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد ملی"
                                    maxLength="11" value={nationalCode}
                                    onChange={e => setNationalCode(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label> شناسه ملی</label>
                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="شناسه ملی"
                                       maxLength="11" value={organizationNationalId}
                                       onChange={e => setOrganizationNationalId(e.target.value)} /></div>

                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label> شناسه خرید بازارگاه</label>

                                <input className="form-control opacityForInput  mb-4" type="text"
                                    placeholder="شناسه خرید"
                                    value={ExtId} onChange={e => setExtId(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-1">
                                <label> کد تخصیص</label>

                                <input className="form-control opacityForInput  mb-4" type="text" placeholder="کد تصیص"
                                    value={OrderDetailExtId} onChange={e => setOrderDetailExtId(e.target.value)} />
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12   mb-3 textOnInput form-group selectIndex"
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>وضعیت سفارش</label>

                                    <Select

                                        value={orderStatusIds}
                                        placeholder='وضعیت سفارش'
                                        options={OrderStatusID()}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {
                                            setOrderStatusIds(e)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12   mb-3 textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>وضعیت ارسال </label>

                                    <Select
                                        value={shippingStatusIds}
                                        placeholder='وضعیت تخصیص'
                                        options={shippingId()}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            setShippingStatusIds(e)

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label>وضعیت پرداخت </label>

                                    <Select
                                        value={paymentStatusIds}
                                        placeholder='وضعیت پرداخت'
                                        options={PaymentStatus()}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            setPaymentStatusId(e)

                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label> وضعیت سررسید </label>

                                    {overDue && overDue === null ?
                                        <Select
                                            placeholder=' وضعیت سررسید '
                                            options={OverDue()}
                                            isMulti={true}
                                            onChange={e => {
                                                SetoverDue(e.value)
                                            }}
                                        /> : <Select
                                            value={OverDue().filter(i => i.value === overDue).map(i => i)}
                                            placeholder=' وضعیت سررسید '
                                            options={OverDue()}
                                            onChange={e => {
                                                SetoverDue(e.value)
                                            }}
                                        />}
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12  mb-3  textOnInput form-group selectIndex"
                                style={{ marginBottom: "3rem" }}>
                                <div className=" form-control-sm">
                                    <label> نحوه پرداخت </label>

                                    <Select
                                        value={paymentMethodIds}
                                        placeholder=' پرداخت '
                                        options={paymentMethodIDs()}
                                        isMulti

                                        isClearable={true}
                                        onChange={e => {

                                            setPaymentMethodIds(e)

                                        }}
                                    />
                                </div>

                            </div>
                            <div className="col-lg-2 col-md-4  col-sm-12    textOnInput form-group "
                            style={{ marginBottom: "3rem" }}>
                            <div className=" form-control-sm">
                                <label> نام شرکت </label>

                                {companyId && companyId === null ?
                                    <Select

                                        options={CompaniesIDs()}
                                        onChange={e => {
                                            setCompanyId(e.value)
                                        }}
                                    /> : <Select
                                        value={CompaniesIDs().filter(i => i.value === companyId).map(i => i)}

                                        placeholder='نام شرکت'
                                        options={CompaniesIDs()}
                                        onChange={e => {
                                            setCompanyId(e.value)
                                            console.log(e);

                                        }}
                                    />}
                            </div>
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
                    </AdvancedSearch>
                </div>
                {getDefault().organizationNationalId ||getDefault().overDue || getDefault().EndDate || getDefault().ExtId || getDefault().Id || getDefault().OrderDetailExtId || getDefault().StartDate || getDefault().orderStatusIds || getDefault().paymentMethodIds || getDefault().shippingStatusIds || getDefault().userName || getDefault().paymentStatusIds ?
                    <span className="d-block p-3 text-center w-100 bg-light-primary  " style={{ fontSize: "15px" }}>نمایش اطلاعات بر اساس فیلتر  </span> : null}

                <div className=" statbox widget-content widget-content-area">
                    <div>
                        <div className='text-center mt-5'>
                            <h5>اطلاعاتی جهت نمایش موجود نیست</h5>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
export default OrderList