
import './style.css';
import { GetAllOrganisation, GetAllOrganisationCode, GetOrganisationById } from "../services/organisationService";
import { GetAddress } from "../services/addressService";
import { GetOrder, GetOrderDetails } from "../services/orderService";
import { MeasureUnitSample } from "../Common/Enums/MeasureUnitSample";
import { useEffect, useState, createRef } from "react";
import Pdf from "react-to-pdf";
import { useNavigate, useParams } from "react-router-dom";
import { GetOrderDetailsAdmin } from './../services/orderService';
import { useSelector } from "react-redux";
import { RootState } from '../store';
import { CompaniesEnums } from './../Common/Enums/CompaniesDetailsEnums';


const InvoiceCreatorForAdmin = ({ closeModal }) => {
    const roles = useSelector((state) => state.roles)

    const ref = createRef()
    const params = useParams()
    const [order, setOrder] = useState({});
    const [companyId, setCompanyId] = useState(1);
    const [customer, SetCustomer] = useState({});
    const [orderDetail, setOrderDetail] = useState([])
    const [SellerData, SetSellerData] = useState([])
    const navigate = useNavigate();

    const [organizations, SetOrganisations] = useState([]);

    const [Address, SetAddress] = useState([]);
    const [SellerAddress, SetSellerAddress] = useState([])

    const options = {
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        precision: 1,
        hotfixes: '1'
    };

    useEffect(() => {

        getOrder()
        GetOrderDetail()

    }, [])
    const handelNavigate = (e) => {

        e.preventDefault()
        if (roles[0] <= 2) {
            navigate(-1)

            return null
        } else {
            navigate(-1)
            document.getElementsByClassName('main-Layout')[0].style.overflow = "auto"
        }


    }
    const getOrder = async () => {
        try {
            const { data, status } = await GetOrder(params.id)
            setOrder(data.result.order)

            SetCustomer(data.result.order.customer)

            SetSellerData(CompaniesEnums)
            setCompanyId(data.result.order.companyId)
            const response=await GetAddress(23,data.result.order.companyId)
            if(response.status===200){
                SetSellerAddress(response.data.result.addresses)
            }
            getAddress(data.result.order.customerId)
            if (data.result.order.customer.organizationId) {
                getOrganization(data.result.order.customer.organizationId)

            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        function adjustZoom() {
            var documentWidth = window.innerWidth;
            var documentHeight = window.innerHeight;
            var zoomHeight = documentHeight / (31.7 * 35.795276);
            var zoomWidth = documentWidth / (31.7 * 35.795276);
            var zoomLevel = Math.min(zoomHeight, zoomWidth);
            // stop zooming when book fits page
            if (zoomLevel >= 1) return;
            if (roles.every(i => i >= 2)) {
                document.getElementsByClassName('page')[0].style.width = "auto";
                document.getElementsByClassName('page')[0].style.height = "auto";
                document.getElementsByClassName('a4')[0].style.transform = "scale(1)";

            } else {
                document.getElementsByClassName('a4')[0].style.transform = "scale(" + zoomLevel + ")";

            }





        }
        if (!window.location.pathname.includes("/client/invoice/")) {
            document.getElementsByClassName("main-Layout")[0].scrollTo(0, 0);
        }
        adjustZoom();
        window.addEventListener("resize", adjustZoom);

    }, [order.length > 0])

    const GetOrderDetail = async () => {
        try {

            const { data, status } = await GetOrderDetailsAdmin(params.id);
            if (status === 200) {
                setOrderDetail(data.result.orderDetails)
            }

        } catch (error) {
            console.log(error);
        }

    }
    const getOrganization = async (organizationId) => {
        try {
            const { data, status } = await GetOrganisationById(organizationId)
            if (status === 200) {

                SetOrganisations(data.result.organizationLists.values)
            }

        } catch (error) {
            console.log(error);
        }
    }

    const getAddress = async (id) => {
        try {

            const { data, status } = await GetAddress(1, id)
            SetAddress(data.result.addresses)
        } catch (error) {
            console.log(error);
        }

    }



    const Fullname = () => {

        let fName = customer.firstName;
        let lName = customer.lastName;
        let OName;
        let fullname;
        if (customer.organizationId !== null) {

            OName = organizations.filter(item => item.id === customer.organizationId).map(item => item.name)
            fullname = `${OName ? OName : ''}`;

        }
        else {
            fullname = `${fName ? fName : ''} ${lName ? lName : ''}`;

        }


        return (fullname)


    }
    const Code = () => {
        let Ncode = customer.nationalCode;
        let OName;
        let code = ''
        if (customer.organizationId !== null) {

            OName = organizations.filter(item => item.id === customer.organizationId).map(item => item.nationalId)
            return (code = `${OName ? OName : ''}`)
        }
        else {
            return (code = `${Ncode ? Ncode : ''} ${OName ? OName : ''}`)

        }



    }
    var formatter = new Intl.NumberFormat('fa-IR', {

        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });





    console.log(SellerData.filter(item => item.id === companyId).map(i => i.accountNumbers));


    return (
        <>
            <div id="body" className='a4  rounded-5'  >



                <div ref={ref} className=" page" >

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
                                    <p>نام شخص حقیقی/حقوقی {""}:{""} {SellerData.length !== 0 ? SellerData.filter(item => item.id === companyId).map(i => i.name)[0] : ''}
                                    </p>
                                </div>
                                <div className="col-3">
                                    <p>شماره اقتصادی {""}:{""} {SellerData.length !== 0 ? SellerData.filter(item => item.id === companyId).map(i => i.economicCode)[0] : ''} </p>

                                </div>
                                <div className="col-3">
                                    <p>شماره ثبت/شماره ملی{""}:{""}  {SellerData.length !== 0 ? SellerData.filter(item => item.id === companyId).map(i => i.CopmanyNationalId)[0] : ''}</p>

                                </div>

                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p>نشانی {""}:{""} {SellerAddress.length !== 0 ? SellerAddress[0].fullAddress : ''}</p>
                                </div>
                                <div className="col-3">
                                    <p>کد پستی ده رقمی {""}:{""} {SellerAddress.length !== 0 ? SellerAddress[0].postalCode : ''} </p>

                                </div>
                                <div className="col-3">
                                    <p>شماره تلفن/نمابر {""}:{""} {SellerAddress.length !== 0 ? SellerAddress[0].receiverTel : ''}</p>

                                </div>

                            </div>
                        </div>
                        <div className="coloredBox">
                            <p>مشخصات خریدار</p>
                        </div>
                        <div className="small info-border p-1">
                            <div className="row">
                                <div className="col-6">
                                    <p>نام شخص حقیقی/حقوقی {""}:{""}  {Fullname()}</p>
                                </div>
                                <div className="col-3">
                                    <p>شماره اقتصادی {""}:{""} {organizations.filter(item => item.id === customer.organizationId).map(item => item.registrationNumber)}</p>

                                </div>
                                <div className="col-3">
                                    <p>شماره ثبت/شماره ملی{""}:{""}  {Code()}</p>

                                </div>

                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p>نشانی {""}:{""} {Address.length !== 0 ? Address[0].fullAddress : ''}</p>
                                </div>
                                <div className="col-3">
                                    <p>  کد پستی ده رقمی {""}:{""}   {Address.length !== 0 ? Address[0].postalCode : ''}</p>

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
                                    className="w-100  table-bordered  text-sm-center small h-auto " style={{ width: "100%" }}>
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
                                        {orderDetail.map(item =>
                                            <tr>
                                                <td>{orderDetail.length}</td>
                                                <td>{item.product.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{MeasureUnitSample.filter(i => i.id === order.measureUnitId).map(i => i.name)}</td>
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
                    <div className="text-center mt-4  " style={{ lineHeight: '30%'}}>
                        {SellerData.length !== 0 ? <h6 className='mb-2 text-dark'>لطفا وجه پیش فاکتور فوق را نزد یکی از بانک های ذیل واریز نمایید   </h6> : ''}
                        {SellerData.length !== 0 && SellerData.filter(item => item.id === companyId).map(i => i.accountNumbers)[0].length > 0 ?
                            <div className='' style={{marginLeft:'20%',marginRight:'20%' }}>

                                <table  className=''>
                                    <thead>
                                        <tr>
                                            <th className='bg-dark'>نام بانک</th>
                                            <th className='bg-dark'>شماره حساب</th>
                                            <th className='bg-dark'>شماره شبا</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {SellerData.filter(item => item.id === companyId).map(i => i.accountNumbers)[0].map(item =>
                                            <tr>
                                                <td>{item.bankName}</td>
                                                <td>{item.accountNumber}</td>
                                                <td>{item.IR}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        : ''

                        }
                    </div>
                    <div className="end-part-invoice" style={{ marginTop: '100px', marginLeft: '2.5%', marginRight: '2.5%' }}  >
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
                                            {order.comment ? order.comment : <p>{"       "}</p>
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
                        className="btn btn-danger col-lg-5   mb-2 ">بازگشت</button>
                    <div className="col-lg-2" />
                    <Pdf targetRef={ref} filename="code-example.pdf" options={options} y={-1} scale={1} >
                        {({ toPdf }) => <> <button onClick={function () {
                            document.getElementsByClassName('a4')[0].style.transform = "scale(1 )";
                            document.getElementsByClassName('page')[0].style.width = "29.7cm";
                            document.getElementsByClassName('page')[0].style.height = "21cm";


                            toPdf()
                            setOrder([])
                            closeModal()

                        }} className="btn btn-info  float-left  col-lg-5  mb-2  " >دریافت فایل
                            پی دی اف </button>

                            <br />

                            <h4 className='col-12 text-danger w-75 text-center mb-4'>مشتری گرامی : لطفا پس از دانلود فایل پیش فاکتور ، اقدام به  چاپ آن نمایید ، سپس بوسیله مهر و امضا  لازمه پیش فاکتور را را تایید نموده  و در آخر تصویر اسکن شده آن  را از بخش آپلود فایل برای ما ارسال نمایید </h4>


                        </>

                        }

                    </Pdf>
                </div>
            </div>
        </>
    )

}


export default InvoiceCreatorForAdmin


{/* <p>پرداخت {""}:{""}  نسیه یک ماهه - بارگیری منوط به ارائه کد یکتا می باشد - فروش فقط و فقط از طریق سیستم بازارگاه . ارسال هرگونه کالا خارج از سیستم بازارگاه غیر ممکن می باشد - بارگیری 10روز کاری بعد از دریافت چک . بارگیری از کارخانه روغنکشی نوید خلیج فارس استان خوزستان .</p> */ }