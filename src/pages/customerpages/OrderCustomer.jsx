import React, { useState, useEffect, useMemo } from 'react'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { GetAddress } from './../../services/addressService';
import { DateObject } from 'react-multi-date-picker';
import { ShippingStatusEnums } from './../../Enums/ShippingStatusEnums';
import { OrderStatus } from './../../Enums/OrderStatusEnums';
import { PaymentStructureEnums } from './../../Enums/PaymentStructureEnums';
import QueryString from 'qs';
import {
  
  GetCustomerOrders,
  GetDataWithSearchOrder,
  GetOrder,
  GetOrderDetails
} from '../../services/orderService';
import { GetAllOrganisationCode } from './../../services/organisationService';
import  Modal  from 'react-modal';
import AddAdressCustomerForOrder from './../../components/common/addAdressCustomerForOrder';
import MyTableClick from './../../components/form/MyTableClickable';
import ModalGroupWork from './../../components/common/ModalGroupWork';
import { ExportToExcel } from './../../components/common/ExportToExcel';
import InvoiceCreator from "../../utils/invoiceCreator";
import ImageFileUploader from "../../utils/ImageFileUploader";
import TableOrderCustomer from './../../components/form/TableOrderCustomer';

const customStyles = {
  content: {
    position:'fixed',
    inset: '-50px',
    backgroundColor:'transparent',
    height:'100%',
    overflow:'none',

  }

}
const OrderCustomer = () => {

  const [PageNumber, setPageNumber] = useState(0)
  const [PageSize, setPageSize] = useState(10)
  const [orderId, setOrderId] = useState(0)
  let FilnalArr = [];
  const roles = useSelector(state => state.userRole)
  const Navigate = useNavigate()
  const [selectedRows, setSelectedRows] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenEdit, setIsOpenEdit] = useState(false);
  const [modalIsOpenUpload, setIsOpenUpload] = useState(false);

  const [idEdit, setIdEdit] = useState(0);
  const [stateSuccess, SetStateSuccess] = useState(0)
  const [stateError, SetStateError] = useState(0)
  const [open, SetOpen] = useState(false);
  const [address, SetAddress] = useState({ active: false, id: 0 });
  let Detail = [];
  const [totalCount , setTotalCount]=useState(0) ;

  const [ShippingInformation, SetShippingInformation] = useState([]);
  const [organizations, SetOrganisations] = useState([]);
  const [ShoppingCartInformation, SetShoppingCartInformation] = useState([]);
  const [userName, setUserName] = useState("")
  const [StartDate, setStartDate] = useState("")
  const [EndDate, setEndDate] = useState("")
  const [ExtId, setExtId] = useState("")
  const [nationalCode, setNationalCode] = useState("")
  const [orderStatusIds, setOrderStatusIds] = useState([])
  const [paymentMethodIds, setPaymentMethodIds] = useState([])
  const [shippingStatusIds, setShippingStatusIds] = useState([])
  const [order, setOrder] = useState([])
  const [DetailAddress, setDetailAddress] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const[entity,setEntity]=useState(0)



  
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
    }
    else {
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





  const openModal = () => {

    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const openModalEdit = (id) => {
    let ids=id
    setIdEdit(ids)
    setIsOpenEdit(true);
  }
  console.log(idEdit)
  const closeModalEdit = () => {
    setIsOpenEdit(false);
  }
  const handelStartDate = (value) => {
    if (value === null) {
      setStartDate('')

    }
    //تغییرات روی تاریخ رو اینجا اعمال کنید
    if (value instanceof DateObject) {
      setStartDate(value.toDate())


    }
  }

  const handelEndDate = (value) => {
    if (value === null) {
      setEndDate('')

    }
    //تغییرات روی تاریخ رو اینجا اعمال کنید
    if (value instanceof DateObject) {
      setEndDate(value.toDate())


    }
  }

  const close = () => {
    SetOpen(false);
  }
  const openModalForUpload=()=>{

    setIsOpenUpload(true)
    console.log(entity);
  }
  const closeModalForUpload=()=>{
    setIsOpenUpload(false)
  }
  const shippingId = () => {
    return (ShippingStatusEnums.map(data => ({ label: data.name, value: data.id })))
  }
  const OrderStatusID = () => {
    return (OrderStatus.map(data => ({ label: data.name, value: data.id })))
  }
  const paymentMethodIDs = () => {
    return (PaymentStructureEnums.map(data => ({ label: data.name, value: data.id })))
  }
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
    }
    if (selected === 4) {
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

  const getDataBySearch = async () => {
    let config = {

      headers: { 'Content-Type': 'application/json' },
      params: {
        UserName: userName,
        OrderStatusIds: orderStatusIds.map(item => item.value),
        StartDate
        , EndDate
        , ExtId,
        PaymentMethodIds: paymentMethodIds.map(item => item.value),
        ShippingStatusIds: shippingStatusIds.map(item => item.value),
        NationalCode: nationalCode,
        PageNumber,
        PageSize,


      }
      ,
      paramsSerializer: params => {

        return QueryString.stringify(params)
      }


    };

    try {
      const { data, status } = await GetDataWithSearchOrder(config);
      if (status === 200) {
        setOrder(data.result.orderList.values);
      }

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    GetOrders()
    getOrganization()
  }, [])
  const GetOrders = async () => {

    try {
     
        let userName = localStorage.getItem("mobile")
        const { data, status } = await GetCustomerOrders(userName)
        setOrder(data.result.orderList.values)
      setTotalCount(data.result.orderList.totalCount)

      }
      

    catch (err) {
      console.log(err)
    }

  }
  const getOrganization = async () => {
    try {
      const { data, status } = await GetAllOrganisationCode();
      if (status === 200) {

        SetOrganisations(data.result.organizationLists.values)
      }

    } catch (error) {
      console.log(error);
    }
  }
  var formatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0, 
    minimumFractionDigits: 0, });

  const showOrder = (id) => {
    Navigate(`/cuoDetail/${id}`)
  }
  const getDataByPage = async () => {
    let userName = localStorage.getItem("mobile")

    let config = {

      headers: {'Content-Type': 'application/json'},
      params: {
userName,
        PageNumber,
        PageSize,


      }
      ,
      paramsSerializer: params => {

        return QueryString.stringify(params)
      }


    };

    try {
      const {data, status} = await GetDataWithSearchOrder(config);
      if (status === 200) {
        SetAddress({active: false})
        setOrder(data.result.orderList.values);
      }

    } catch (err) {
      console.log(err)
    }

  }
  const columns = useMemo(() => [

    { Header: 'شماره سفارش', accessor: 'id' },
    ,
    {
      Header: 'تاریخ', accessor: d => {
        let date = new Date(d.createDate).toLocaleDateString('fa-IR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
        return (`${date}`)
      }, Cell: row => {

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

        return (` ${d.customer.firstName} ,    ${d.customer.lastName} , ${OName}`)
      }
      , Cell: row => {
        let fName = row.row.original.customer.firstName;
        let lName = row.row.original.customer.lastName;
        let OName;
        if (row.row.original.customer.organizationId > 0) {

          OName = organizations.filter(item => item.id === row.row.original.customer.organizationId).map(item => item.name)
        }
        let fullname = `${fName ? fName : ''} ${lName ? lName : ''} ${OName ? OName : ''}`;
        return (fullname)
      }
    },
    { Header: 'شماره همراه', accessor: 'customer.userName' },
    {
      Header: 'شماره / شناسه ملی', accessor: d => {
        let Ncode = d.customer.nationalCode;
        let OName = organizations.filter(item => item.id === d.customer.organizationId).map(item => item.nationalId)
        return (`${Ncode}`, `${OName}`)

      }, Cell: row => {
        let Ncode = row.row.original.customer.nationalCode;
        let OName;
        if (row.row.original.customer.organizationId > 0) {

          OName = organizations.filter(item => item.id === row.row.original.customer.organizationId).map(item => item.nationalId)
        }
        let code = `${Ncode ? Ncode : ''} ${OName ? OName : ''}`
        return (code)
      }
    },
    // {
    //   Header: 'پرداخت', accessor: 'paymentMethodId', Cell: row => {
    //     return (PaymentStructureEnums.filter(item => item.id === row.row.original.paymentMethodId).map(item => item.name))
    //   }
    // },
    {
      Header: 'وضعیت تخصیص', accessor: 'shippingStatusId', Cell: row => {
        return (ShippingStatusEnums.filter(item => item.id === row.row.original.shippingStatusId).map(item => item.name))
      }
    },
    {
      Header: 'وضعیت سفارش', accessor: 'orderStatusId', Cell: row => {
        return (OrderStatus.filter(item => item.id === row.row.original.orderStatusId).map(item => item.name))
      }
    },
     {
      Header: 'نوع پرداخت', accessor: 'paymentMethodId', Cell: row => {
          return (PaymentStructureEnums.filter(item => item.id === row.row.original.paymentMethodId).map(item => item.name))
      }
  }
    , {
      Header: 'مبلغ-ریال',
      accessor: 'orderFinalizedPrice',
      Cell: row => (formatter.format(row.row.original.orderFinalizedPrice))
    },
    {
      Header: 'مشاهده جزییات ', accessor: '', Cell: row => (
        <span onClick={() => showOrder(row.row.original.id)}>
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
        </span>
      )
    },

   ])


  const data = useMemo(() => order);
  
  

   
 
  const formatTrProps = (state = {}) => {
    if (modalIsOpenEdit === false) {
      return {
        onClick: async () => {
setDetailAddress([])
          setOrderId(state.original.id)
          try {
            const { data, status } = await GetOrderDetails(state.original.id)
            SetAddress({ active: address.active === false ? true : false, id: state.id })

            if (status === 200) {
              Detail = data.result.orderDetails
              setOrderDetail(Detail)
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

if(order){
  const dataForExcel = data.map(item => ({
    'شمراه فاکتور': item.id,
    'خریدار': item.customer.firstName,
    'شماره همراه': item.customer.userName,
    'شماره ملی': item.customer.nationalCode,
    'نوع پرداخت': item.paymentMethodId === 2 ? 'نقدی' : 'نسیه',
    'وضعیت ارسال': (ShippingStatusEnums.filter(data => data.id === item.shippingStatusId).map(data => data.name)[0]),
    'تخصیص': (OrderStatus.filter(data => data.id === item.orderStatusId).map(item => item.name)[0]),
    'تاریخ': (new Date(item.createDate).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })),
    'مبلغ': item.orderTotal
  }))
  return (
  <div>

    <div className='row'>
      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>

      </div>
    </div>
    <Modal
      isOpen={modalIsOpenEdit}
      onRequestClose={closeModalEdit}
      style={customStyles}
      contentLabel="Selected Option"
      ariaHideApp={false}

    >
   <InvoiceCreator orderId={idEdit} closeModal={closeModalEdit}/>
    </Modal>
    <ImageFileUploader modalIsOpen={modalIsOpenUpload} closeModal={closeModalForUpload} EntityId={entity} EntityTypesId={10} comment={"مشتری عزیز لطفا عکس پیش فاکتور تایید شده خود را بگذارید (پیش فاکتور حتما باید همراه با مهر و امضا شخص خریدار باشد)"}/>


    <div className=" statbox widget-content widget-content-area">
      <div>

      <TableOrderCustomer columns={columns} data={data} getData={rows => setSelectedRows(rows)}
          bulkJob={getBulkJob} formatRowProps={(state) => formatTrProps(state)} show={address}
          setPageSize={setPageSize}
          PageSize={PageSize}
          getDataBySearch={getDataByPage}
          setPageNumber={setPageNumber}
          PageNumber={PageNumber}
          Detail={DetailAddress}
                      total={totalCount}
        />

        <ModalGroupWork open={open} close={close} success={stateSuccess} error={stateError} />
      </div>
      <div className="d-flex justify-content-end">
        <ExportToExcel apiData={dataForExcel} fileName='لیست سفارشات' />
      </div>
    </div>
  </div>
  )
}
  
else{
  return(
    <div className='text-center mt-5'>
      <h5>شما هیچ سفارشی ندارید</h5>
    </div>
  )
}

}
export default OrderCustomer