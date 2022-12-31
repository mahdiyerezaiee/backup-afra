import {useParams} from "react-router-dom";
import {useEffect, useState, createRef} from "react";
import {GetOrder, GetOrderDetails} from "../../services/orderService";
import {NavLink} from "react-router-dom";

import {ShippingStatusEnums} from "../../Enums/ShippingStatusEnums";
import {MeasureUnitSample} from "../../Enums/MeasureUnitSample";
import {GetAllOrganisationCode} from "../../services/organisationService";
import {ExportToExcel} from "../../components/common/ExportToExcel";
import Pdf from "react-to-pdf";
import {GetAddress} from "../../services/addressService";
import {GetShoppingContracts, GetShoppings} from "../../services/ShippingService";
import {DeliveryMethods} from "../../Enums/DeliveryMethodsEnums";
import ImagePreviewer from './../../utils/ImagePreviewer';
import { GetAttachments } from "../../services/attachmentService";
import  QueryString  from 'qs';
import ImageFileUploader from './../../utils/ImageFileUploader';



const CustomerOrderDetail = () => {
    const ref = createRef()

    const params = useParams()
    let orderDetail= []
  const [modalIsOpenUpload, setIsOpenUpload] = useState(false);

    const [isOpen, setIsOpen] = useState(false)
    const [image, setImage] = useState({})
    const [order, setOrder] = useState([])
    const [customerDetail, setCustomerDetail] = useState([])
    const [product, setProduct] = useState([])
    const [ShippingInformation, SetShippingInformation] = useState([]);
    const [organization, setOrganization] = useState([]);
    let [DetailAddress, setDetailAddress] = useState([]);
    const [Shipping , SetShipping]=useState([])
    const [attachments, Setattachments] = useState([])
    const [ShippingContracts , SetShippingContracts]=useState([])
    const GetShipping = async () => {
        try {
            const {data , status}= await GetShoppings(params.id)
            SetShipping(data.result.shippings.values)
        }catch (e) {
            console.log(e)
        }
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    const closeModalForUpload=()=>{
        setIsOpenUpload(false)
      }


    const ShippingContract = async() => {
        try {
            const {data , status}= await GetShoppingContracts()
            SetShippingContracts(data.result.shippings.values)
        }catch (e) {
            console.log(e)
        }
    }



    const options = {
        orientation: 'portrait',
        unit: 'px',
        format: 'letter'
    };
    const getOrganizationName = async () => {
        try {
            const {data, status} = await GetAllOrganisationCode();
            if (status === 200) {
                setOrganization(data.result.organizationLists.values)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handelPreview = (item) => {

     
        setImage(item)
       setIsOpen(true)
    }


    let entityId=params.id
 const handelGetAttachment = async () => {
        let config = {

            headers: { 'Content-Type': 'application/json' },
            params: {

                entityTypeId: 10,
                entityId: entityId,
                isAdmin: true


            }
            ,
            paramsSerializer: params => {

                return QueryString.stringify(params)
            }


        };
        try {
            const { data, status } = await GetAttachments(config)
            if (status === 200) {

                Setattachments(data.result.attachments)
            }

        } catch (error) {

            console.log(error);
        }





    }


    const getOrder = async () => {
        try {
            const {data, status} = await GetOrder(params.id)
            setCustomerDetail(data.result.order.customer)
            setOrder(data.result.order)
            SetShippingInformation(JSON.parse(data.result.order.extraData.data))
        } catch (err) {
            console.log(err)
        }
    }
    const bindAdress = async (arr) => {
        let FilnalArr = [];

        if(orderDetail.length>1){
        for (let i = 0; i < orderDetail.length; i++) {
            try {

                const {data, status} = await GetAddress(11, arr[i].id)
                let detail = orderDetail.filter(item => item.id === arr[i].id)[0]
                let address = data.result.addresses;
                const finallAddres = address.map(item =>
                    ({
                        fullAddress: item.fullAddress,
                        postalCode: item.postalCode,
                        receiverTel: item.receiverTel,
                        receiverMobile: item.receiverMobile,
                        receiverName: item.receiverName,


                    }))[0]

                let obj = {...detail, ...finallAddres}
                FilnalArr.push(obj)
                setDetailAddress(FilnalArr)
            } catch (e) {
                console.log(e)
            }

        }
    }
    else{
        for (let i = 0; i < orderDetail.length; i++) {
            try {

                const {data, status} = await GetAddress(10, arr[i].orderId)
                let detail = orderDetail.filter(item => item.orderId === arr[i].orderId)[0]
                let address = data.result.addresses;
                const finallAddres = address.map(item =>
                    ({
                        fullAddress: item.fullAddress,
                        postalCode: item.postalCode,
                        receiverTel: item.receiverTel,
                        receiverMobile: item.receiverMobile,
                        receiverName: item.receiverName,


                    }))[0]

                let obj = {...detail, ...finallAddres}
                FilnalArr.push(obj)
                setDetailAddress(FilnalArr)
            } catch (e) {
                console.log(e)
            }

        }
    }

    }
    const getOrderDetail = async () => {
        try {
            const {data, status} = await GetOrderDetails(params.id)
            if (status === 200){
                orderDetail = data.result.orderDetails

              await bindAdress(orderDetail)

}
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getOrder()
        getOrderDetail()
        GetShipping()
        getOrganizationName();
        ShippingContract()
        handelGetAttachment()


    }, [])




    var formatter = new Intl.NumberFormat('fa-IR', { maximumFractionDigits: 0, 
        minimumFractionDigits: 0, });
    const customerName = () => {
        let fName = customerDetail.firstName;
        let lName = customerDetail.lastName;
        let OName;
        if (customerDetail.organizationId > 0) {

            OName = organization.filter(item => item.id === customerDetail.organizationId).map(item => item.name)
        }
        let fullname = `${fName ? fName : ''} ${lName ? lName : ''} ${OName ? OName : ''}`;
        return (fullname)
    }
    const customerCode = () => {
        let Ncode = customerDetail.nationalCode;
        let OName;
        if (customerDetail.organizationId > 0) {

            OName = organization.filter(item => item.id === customerDetail.organizationId).map(item => item.nationalId)
        }
        let code = `${Ncode ? Ncode : ''} ${OName ? OName : ''}`
        return (code)
    }
    const dataForExcel = ShippingInformation.map(item => ({

        ' نام و نام خانوادگی': item.BuyerName,
        'ادرس': item.BuyerAddress,
        'کد پستی': item.BuyerZip,
        'شماره موبایل': item.BuyerPhone,


        ' نام کالا': item.ProductName,
        'مقدار': item.Qty,
        // 'واحد': sumMeasureUnitId[0],
        'قیمت واحد': product.price,
        'وضعیت': (ShippingStatusEnums.filter(item => item.id === order.shippingStatusId).map(item => item.name)[0]),


        'شماره قرارداد': item.TraceCode,
        'شماره کورتاژ': item.GoodTag,
        'شماره تماس گیرنده': item.ReceiverPhone,
        'نام گیرنده': item.ReceiverName,
        'کد پستی گیرنده': item.ReceiverZip,
        'اردس گیرنده': item.ReceiverAddress,


    }))
    return (
        <div className='user-progress'>
            <div ref={ref}>
                <div className='  col-lg-12 col-md-12 col-sm-12 col-xs-12 p-4 '>


                    < div className="row rounded border  border-dark p-2">
                        <div className='  col-lg-4 col-md-4 col-sm-12 col-xs-12 p-2  '>
                            <p>شماره سفارش : {order.id}</p>
                        </div>
                        <div className='  col-lg-4 col-md-4 col-sm-12 col-xs-12 p-2 '>
                            <p>خریدار : {customerName()}  </p>
                        </div>
                        <div className='  col-lg-4 col-md-4 col-sm-12 col-xs-12 p-2 '>
                            <p>شماره / شناسه ملی خریدار : {customerCode()}</p>
                        </div>
                        <div className='  col-lg-4 col-md-4 col-sm-12 col-xs-12 p-2 '>
                            <p> تاریخ : {new Date(order.createDate).toLocaleDateString('fa-IR')}</p>
                        </div>
                        <div className='  col-lg-4 col-md-4 col-sm-12 col-xs-12 p-2 '>
                            <p>قیمت فاکتور : {formatter.format(order.orderFinalizedPrice)}</p>
                        </div>
                    </div>
                </div>

                <div className=" statbox widget-content widget-content-area text-dark ">

                    <div id="iconsAccordion" className="accordion-icons shadow p-1 m-4 non-hover">
                        <section className="p-1 m-4">
                            <div data-toggle="collapse"
                                 data-target="#iconAccordion3" aria-expanded="true" aria-controls="iconAccordionOne"
                                 role="menu" className=" mb-4 collapsed pt-1 ">


                                <h5 className=" mt-1 mr-2 d-inline "> اطلاعات خریدار </h5>

                                <div className="icons d-inline float-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-chevron-down">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </section>
                        <div id="iconAccordion3" className="collapse m-4 show" aria-labelledby={1}
                             data-parent="#iconsAccordion">

                            <div className="table table-responsive table-bordered">
                                <table className='table mb-0 '>

                                    <thead className='text-center'>
                                    <tr className="">
                                        <th> نام و نام خانوادگی</th>
                                        {/*<th> ادرس</th>*/}


                                        <th>{customerDetail.islegal=== true? "شناسه ملی":"کد ملی"} </th>
                                        <th>شماره موبایل</th>
                                    </tr>
                                    </thead>
                                    {/*{Buyer.map(ShippingInformation =>*/}
                                        <tbody>

                                        <tr className="" >

                                            <td  className="text-center">
                                                {customerName()}
                                            </td>

                                            {/*<td>*/}
                                            {/*    /!*{ShippingInformation.BuyerAddress}*!/*/}
                                            {/*</td>*/}
                                            <td  className="text-center">
                                                {customerDetail.islegal=== true? customerDetail.organizationId : customerDetail.nationalCode }
                                            </td>
                                            <td  className="text-center">
                                                {customerDetail.userName}
                                            </td>


                                        </tr>
                                        </tbody>
                                    {/*)}*/}

                                </table>
                            </div>
                        </div>
                    </div>

                    <div id="iconsAccordion" className="accordion-icons shadow p-1 m-4 non-hover">
                        <section className="p-1 m-4">
                            <div data-toggle="collapse"
                                 data-target="#iconAccordion1" aria-expanded="true" aria-controls="iconAccordionOne"
                                 role="menu" className=" mb-4 collapsed pt-1 ">


                                <h5 className=" mt-1 mr-2 d-inline "> اطلاعات سفارش </h5>

                                <div className="icons d-inline float-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-chevron-down">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </section>
                        <div id="iconAccordion1" className="collapse m-4 show" aria-labelledby={1}
                             data-parent="#iconsAccordion">
                            <div className="table table-responsive table-bordered">
                                <table className='table mb-0  '>
                                    <thead className="text-center">
                                    <tr className=" text-dark ">
                                        <th> نام کالا</th>
                                        <th>مقدار</th>
                                        <th>واحد</th>
                                        <th>قیمت واحد</th>

                                        <th> وضعیت</th>
                                        <th> آدرس</th>
                                        <th> کدپستی</th>
                                        <th> تلفن</th>
                                        <th> موبایل</th>
                                        <th> خریدار</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {DetailAddress.map(item=>
                                        <tr className="" key={item.id}>

                                            <td  className="text-center">{item.product.name}</td  >
                                            <td  className="text-center">{item.quantity}</td>
                                            <td  className="text-center">{MeasureUnitSample.filter(i=>i.id=== item.product.measureUnit ).map(i=>i.name)}</td>
                                            <td  className="text-center">{item.price / item.quantity}</td>
                                            <td  className="text-center">{ShippingStatusEnums.filter(item => item.id === order.shippingStatusId).map(item => item.name)}</td>
                                            <td  className="text-center">{item.fullAddress}</td>
                                            <td  className="text-center">{item.postalCode}</td>
                                            <td  className="text-center">{item.receiverTel}</td>
                                            <td  className="text-center">{item.receiverMobile}</td>
                                            <td  className="text-center">{item.receiverName}</td>
                                        </tr>
                                    )}

                                    </tbody>


                                </table>
                            </div>
                        </div>
                    </div>
                    <div id="iconsAccordion" className="accordion-icons shadow p-1 m-4 non-hover">
                        <section className="p-1 m-4">
                            <div data-toggle="collapse"
                                 data-target="#iconAccordion2" aria-expanded="true" aria-controls="iconAccordionOne"
                                 role="menu" className=" mb-4 collapsed pt-1 ">


                                <h5 className=" mt-1 mr-2 d-inline "> اطلاعات ارسال </h5>

                                <div className="icons d-inline float-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                     strokeLinecap="round" strokeLinejoin="round"
                                                     className="feather feather-chevron-down">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </section>
                        <div id="iconAccordion2" className="collapse m-4 show" aria-labelledby={1}
                             data-parent="#iconsAccordion">
                            <div className="table table-responsive table-bordered">
                                <table className='table mb-0 '>
                                    <thead className="text-center">
                                    <tr className="">
                                        <th>#</th>
                                        <th>شناسه جزییات سفارش</th>

                                        <th>واحد</th>
                                        <th>مقدار </th>
                                        <th>تاریخ قرارداد</th>
                                        <th>نحوه ارسال</th>
                                        <th>شماره قرارداد</th>
                                    </tr>
                                    </thead>
                                    {Shipping?Shipping.map(item =>
                                        <tbody>

                                            <tr   className='text-center' key={item.id}>
                                                <td >{item.id}</td>
                                                <td >{(item.orderDetailId)===null?item.orderId:item.orderDetailId}</td>
                                                <td >{MeasureUnitSample.filter(i=> i.id === item.measureUnitId).map(item=> item.name)}</td>
                                                <td >{item.quantity}</td>
                                                <td >{new  Date(item.shippingDate).toLocaleDateString('fa-IR')}</td>
                                                <td >{DeliveryMethods.filter(i=> i.id === item.deliveryMethodId).map(i=> i.name)}</td>
                                                <td >{item.shippingContractId === null ?'':ShippingContracts.filter(i=> i.id === item.shippingContractId).map(i=> i.contractNumber)}</td>



                                        </tr>
                                        </tbody>
                                    ):<tr  className='text-center'></tr>}


                                </table>

                            </div>
                        </div>
                    </div>
                    {order.extId >0?

                        <div id="iconsAccordion" className="accordion-icons shadow p-1 m-4 non-hover">

                            <section className="p-1 m-4">
                            <div data-toggle="collapse"
                                 data-target="#iconAccordion2" aria-expanded="true" aria-controls="iconAccordionOne"
                                 role="menu" className=" mb-4 collapsed pt-1 ">


                                <h5 className=" mt-1 mr-2 d-inline "> اطلاعات اضافی </h5>

                                <div className="icons d-inline float-right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                     strokeLinecap="round" strokeLinejoin="round"
                                                     className="feather feather-chevron-down">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </div>
                            </div>
                        </section>
                        <div id="iconAccordion2" className="collapse m-4 show" aria-labelledby={1}
                             data-parent="#iconsAccordion">
                            <div className="table table-responsive table-bordered">
                                <table className='table mb-0 '>
                                    <thead className="text-center">
                                    <tr className="">
                                        <th>کد تخصیص</th>
                                        <th>شناسه بازارگاه</th>

                                        <th>وزن خرید</th>
                                        <th>وزن بارنامه شده </th>
                                        <th>وزن بارنامه نشده</th>
                                        <th> شناسه واریز</th>
                                        <th>شماره پیگیری</th>
                                        <th> کد یکتا</th>
                                    </tr>
                                    </thead>

                                    {ShippingInformation.map(item =>
                                        <tbody>

                                        <tr className="text-center" key={item.id}>
                                            <td >
                                                {item.AllocationId}
                                            </td>
                                            <td >
                                                {item.IdKharId}
                                            </td>
                                            <td >
                                                {item.Qty}
                                            </td>  <td >
                                            {item.WBarnameShode}
                                        </td>
                                            <td >
                                                {item.WBarnameNashode}
                                            </td>

                                            <td  >
                                                {item.SellerAcc}
                                            </td>

                                            <td >
                                                {item.TraceCode}
                                            </td>

                                            <td >
                                                {item.BuyerUniqueId}
                                            </td>




                                        </tr>
                                        </tbody>
                                    )}


                                </table>

                            </div>
                        </div>
                    </div>:''}
                    
                    {attachments ?

<div id="iconsAccordion" className="accordion-icons shadow p-1 m-4 non-hover">

    <section className="p-1 m-4">
        <div data-toggle="collapse"
            data-target="#iconAccordion2" aria-expanded="true" aria-controls="iconAccordionOne"
            role="menu" className=" mb-4 collapsed pt-1 ">


            <h5 className=" mt-1 mr-2 d-inline "> فایل های ضمیمه</h5>

            <div className="icons d-inline float-right">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="feather feather-chevron-down">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>
    </section>
    <div id="iconAccordion2" className="collapse m-4 show" aria-labelledby={1}
        data-parent="#iconsAccordion">
        <div className="row">
            {attachments.map(item =>
                <div className="col-lg-2 col-sm-12  ">
                    <img src={`http://10.10.20.4/${item.path}.jpg`} className="img-thumbnail" alt={item.name} onClick={() => handelPreview(item)} />
                </div>
            )}

        </div>
        <div className=" text-right">
        <button className="btn-small btn-primary" onClick={()=>setIsOpenUpload(true)}>
            بارگزاری فایل 
         </button>
    <ImageFileUploader modalIsOpen={modalIsOpenUpload} closeModal={closeModalForUpload} EntityId={params.id} EntityTypesId={10} comment={'لطفا فایل  مورد نظر را بارگزاری کنید.'}/>

        </div>
    </div>
</div> : ''}

<ImagePreviewer modalIsOpen={isOpen} closeModal={closeModal} item={image}  isUser={true}/>

                </div>
            </div>
            <div className="py-5 ">
                <button className="btn btn-danger  float-right m-1 "><NavLink className="text-light"
                                                                               to='/cuolist'>بازگشت</NavLink>
                </button>
                <Pdf targetRef={ref} filename="code-example.pdf" options={options} x={.5} y={.5} scale={0.8}>
                    {({toPdf}) => <button onClick={toPdf} className="btn btn-info  float-right m-1 ">دریافت فایل
                        پی دی اف </button>}
                </Pdf>

                <div className="d-flex justify-content-end m-1">
                    <ExportToExcel apiData={dataForExcel} fileName='لیست سفارشات'/>
                </div>
            </div>

        </div>
    )
}
export default CustomerOrderDetail