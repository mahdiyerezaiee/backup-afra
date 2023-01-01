
import './style.css';
import {GetAllOrganisation, GetAllOrganisationCode} from "../services/organisationService";
import {GetAddress} from "../services/addressService";
import {GetOrder, GetOrderDetails} from "../services/orderService";
import {MeasureUnitSample} from "../Enums/MeasureUnitSample";
import {useEffect, useState , createRef} from "react";
import Pdf from "react-to-pdf";
import {useNavigate, useParams} from "react-router-dom";




const InvoiceCreator = ({orderId , closeModal ,customerId}) => {

    const ref = createRef()
const params = useParams()
    const [order, setOrder] = useState({});
    const [customer, SetCustomer] = useState({});
    const [orderDetail, setOrderDetail] = useState([])
    const navigate = useNavigate();

    const [organizations, SetOrganisations] = useState([]);

    const [Address, SetAddress] = useState([]);

    const options = {
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        precision:1,
        hotfixes:'1'
    };
    const handelNavigate = (e) => {
        e.preventDefault()
        navigate(-1)
    }
    const getOrder = async () => {
        try {
            const { data, status } = await GetOrder(params.id)
            setOrder(data.result.order)
            SetCustomer(data.result.order.customer)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
        function adjustZoom() {
            var   documentWidth= window.innerWidth;
            var   documentHeight= window.innerHeight;
            var zoomHeight = documentHeight / (31.7 * 35.795276);
            var zoomWidth= documentWidth / (31.7 * 35.795276);
            var zoomLevel = Math.min(zoomHeight ,zoomWidth);
            // stop zooming when book fits page
            if (zoomLevel >= 1) return;
            document.getElementsByClassName('a4')[0].style.transform= "scale(" + zoomLevel + ")";


        }



        adjustZoom();
        window.addEventListener("resize", adjustZoom);
    },[order.length > 0])

    const GetOrderDetail = async () => {
        try {

            const { data, status } = await GetOrderDetails(params.id);
            if (status === 200) {
                setOrderDetail(data.result.orderDetails)
            }

        } catch (error) {
            console.log(error);
        }

    }
    const getOrganization = async () => {
        try {
            const {data, status} = await GetAllOrganisation();
            if (status === 200) {

                SetOrganisations(data.result.organizationLists.values)
            }

        } catch (error) {
            console.log(error);
        }
    }




    useEffect(()=>{
        const getAddress=async()=>{
            try {

                const {data,status}=await GetAddress(1,order.customerId)
                SetAddress(data.result.addresses)
            } catch (error) {
                console.log(error);
            }

        }
        getOrder()
        GetOrderDetail()
        getOrganization()
        getAddress()

    },[params.id])
useEffect(()=>{
    const getAddress=async()=>{
        try {

            const {data,status}=await GetAddress(1,order.customerId)
            SetAddress(data.result.addresses)
        } catch (error) {
            console.log(error);
        }

    }


    getAddress()
},[order])

    const Fullname=()=>{

        let fName =customer.firstName;
        let lName = customer.lastName;
        let OName;
        let fullname ;
        if (customer.organizationId !==null) {

            OName = organizations.filter(item => item.id === customer.organizationId).map(item => item.name)
            fullname= `${OName ? OName : ''}`;
        
        }
        else{
            fullname= `${fName ? fName : ''} ${lName ? lName : ''}`;
        
        }
   
        
        return (fullname)


    }
    const Code=()=>{
        let Ncode = customer.nationalCode;
        let OName;
        let code=''
        if (customer.organizationId !== null) {

            OName = organizations.filter(item => item.id ===customer.organizationId).map(item => item.nationalId)
          return( code = `${OName ? OName : ''}`)
        }
        else{
           return( code = `${Ncode ? Ncode : ''} ${OName ? OName : ''}`)

        }
       


    }
    var formatter = new Intl.NumberFormat('fa-IR', {

        maximumFractionDigits: 0,
        minimumFractionDigits: 0, });

    return (
        <>
        <div id="body" className='a4  rounded-5'  >



            <div  ref={ref} className=" page" >

                <div style={{ textAlign: 'end', marginLeft: '3.5%', fontSize: 'small', lineHeight: '1%', marginTop: '5%' }}>

                    <p > تاریخ {""}:{""} {new Date(order.createDate).toLocaleDateString('fa-IR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}</p>
                    <p className="pt-2"> شماره سریال {""}:{""}  {order.id}</p>
                </div>

                <h5 className="text-center ">پیش فاکتور</h5>
                <div className="containBox  ">
                    <div className="coloredBox">
                        <p>مشخصات فروشنده</p>

                    </div>
                    <div className="small  info-border p-1">
                        <div className="row">
                            <div className="col-6">
                                <p>نام شخص حقیقی/حقوقی {""}:{""} شرکت روغنکشی نوید خلیج فارس
                                </p>
                            </div>
                            <div className="col-3">
                                <p>شماره اقتصادی {""}:{""} 411145758678 </p>

                            </div>
                            <div className="col-3">
                                <p>شماره ثبت/شماره ملی{""}:{""}  10102197112</p>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p>نشانی {""}:{""} بلوارآفریقا - کوچه گلخانه پلاک 14 </p>
                            </div>
                            <div className="col-3">
                                <p>کد پستی ده رقمی {""}:{""} 1915873145 </p>

                            </div>
                            <div className="col-3">
                                <p>شماره تلفن/نمابر {""}:{""} 0212852/22042519</p>

                            </div>

                        </div>
                    </div>
                    <div className="coloredBox">
                        <p>مشخصات خریدار</p>
                    </div>
                    <div className="small info-border p-1">
                        <div className="row">
                            <div className="col-6">
                                <p>نام شخص حقیقی/حقوقی {""}:{""}  {Fullname() }</p>
                            </div>
                            <div className="col-3">
                                <p>شماره اقتصادی {""}:{""} {organizations.filter(item => item.id ===customer.organizationId).map(item => item.registrationNumber)}</p>

                            </div>
                            <div className="col-3">
                                <p>شماره ثبت/شماره ملی{""}:{""}  {Code()}</p>

                            </div>

                        </div>
                        <div className="row">
                            <div className="col-6">
                                <p>نشانی {""}:{""} { Address.length !==0? Address[0].fullAddress :''}</p>
                            </div>
                            <div className="col-3">
                                <p>  کد پستی ده رقمی {""}:{""}   {Address.length !==0?Address[0].postalCode: ''}</p>

                            </div>
                            <div className="col-3">
                                <p> شماره تلفن/نمابر {""}:{""}  {customer.userName}</p>

                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="EmptycoloredBox"></div>
                        <div className="w-100">

                            <table
                                className="w-100 table table-bordered  text-sm-center small h-auto " style={{width:"100%"}}>
                                <thead>
                                <tr>
                                    <td>ردیف</td>
                                    <td>شرح کالا یا خدمات</td>
                                    <td>تعداد/مقدار</td>
                                    <td>واحد</td>
                                    <td>مبلغ واحد(ریال)</td>
                                    <td>مبلغ کل(ریال)</td>
                                    <td>مالیات ارزش افزوده</td>
                                    <td>مبلغ پس از تاثیر عوامل(ریال)</td>
                                    <td>مبلغ تخفیف(ریال)</td>
                                    <td>عوارض ارزش افزوده</td>
                                    <td>جمع مبلغ کل بعلاوه مالیات و عوارض</td>
                                </tr>
                                </thead>
                                <tbody>
                                {orderDetail.map(item=>
                                    <tr>
                                        <td>{orderDetail.length}</td>
                                        <td>{item.product.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{MeasureUnitSample.filter(i=> i.id === order.measureUnitId).map(i=> i.name)}</td>
                                        <td>{formatter.format(item.price / item.quantity)}</td>
                                        <td>{formatter.format(item.price)}</td>
                                        <td>0</td>
                                        <td>{formatter.format(item.priceIncludingTax)}</td>
                                        <td>0</td>
                                        <td>0</td>
                                        <td>{formatter.format(item.priceIncludingTax)}</td>

                                    </tr>
                                )}
                                <tr className='border'>
                                    <td colspan="8"> جمع</td>
                                    <td>{order.orderDiscount}</td>
                                    <td>{order.orderTax}</td>
                                    <td>{formatter.format(order.orderFinalizedPrice)}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5 mb-5 " style={{ lineHeight: '30%' }}>
                    <p> لطفا وجه پیش فاکتور فوق را به شماره حساب بانک شهر 1001001300991 و شبا IR930610000001001001300991 یا
                        شماره حساب بانک</p>
                    <p>کشاورزی 995251962 و شبا IR150160000000000995251962 واریز نمایید.</p>
                </div>
                <div style={{ marginTop: '100px', marginLeft: '2.5%', marginRight: '2.5%' }}  >
                    <div className="row   small "  >
                        <div className="col-6" style={{ border: ' 1px solid black' }}>
                            <div className="row">
                                <div className="col-6 ">
                                    شرایط یا نحوه فروش
                                </div>
                                <div className="col-3">
                                    نسیه</div>
                                <div className="col-3">
                                    نقدی</div>
                            </div>
                        </div>
                    </div>
                    <div >
                        <div className="row small" >
                            <div className="col-6" >
                                <div className="row">
                                    <div className="col-2    " style={{ border: ' 1px solid black' }}>
                                        توضیحات {""}:{""}
                                    </div>
                                    <div className="col-10 " style={{ border: ' 1px solid black' }}>
                                        {order.comment? order.comment:   <p>{"       "}</p>
                                        }
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row small" style={{ border: ' 1px solid black' }}>
                        <div className="col-6 " style={{ border: ' 1px solid black' }}>

                        </div>
                        <div className="col-3 ">
                            <p>مهر و امضا فروشنده </p>



                        </div>
                        <div className="col-3 ">
                            <p> مهر و امضای خریدار</p>
                        </div>
                    </div>






                </div>


            </div>
            <div className="row">
            <button onClick={handelNavigate}
                    className="btn btn-danger col-lg-6  float-right mb-2 ">بازگشت</button>
            <Pdf targetRef={ref} filename="code-example.pdf" options={options} y={-1} scale={1} >
                {({toPdf}) =><> <button  onClick={function (){
                    document.getElementsByClassName('a4')[0].style.transform= "scale(1 )";

                    toPdf()
                    setOrder([])
                    closeModal()

                }} className="btn btn-info  float-left  col-lg-6  mb-2  float-left" >دریافت فایل
                    پی دی اف </button>

                    <br/>

<h4 className='col-12 text-danger w-75 text-center mb-4'>مشتری گرامی : لطفا پس از دانلود فایل پیش فاکتور ، اقدام به  چاپ آن نمایید ، سپس بوسیله مهر و امضا  لازمه پیش فاکتور را را تایید نموده  و در آخر تصویر اسکن شده آن  را از بخش آپلود فایل برای ما ارسال نمایید </h4>


                    </>
                    
                    }
                    
            </Pdf>
            </div>
        </div>
        </>
    )

}


export default InvoiceCreator


{/* <p>پرداخت {""}:{""}  نسیه یک ماهه - بارگیری منوط به ارائه کد یکتا می باشد - فروش فقط و فقط از طریق سیستم بازارگاه . ارسال هرگونه کالا خارج از سیستم بازارگاه غیر ممکن می باشد - بارگیری 10روز کاری بعد از دریافت چک . بارگیری از کارخانه روغنکشی نوید خلیج فارس استان خوزستان .</p> */}