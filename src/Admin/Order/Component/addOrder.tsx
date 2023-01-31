import {useState, useRef, useEffect} from "react";
import {addOrder} from "../../../services/orderService";
import Select from "react-select";
import {NavLink, useNavigate} from "react-router-dom";
import {MeasureUnitSample} from "../../../Common/Enums/MeasureUnitSample";
import {GetAllProducts, GetProducts} from "../../../services/productService";
import {PaymentStatusEnums} from "../../../Common/Enums/PaymentStatus";
import {GetAllUsers, GetDataWithSearch} from "../../../services/userService";
import {PaymentStructureEnums} from "../../../Common/Enums/PaymentStructureEnums";
import {GetAllOrganisation} from "../../../services/organisationService";
import QueryString from "qs";
import {toast} from "react-toastify";
import {OrderStatus} from "../../../Common/Enums/OrderStatusEnums";
import {ClipLoader} from "react-spinners";
import {Field, Form, Formik} from "formik";
import {validateRequired, validatNumber} from "../../../Utils/validitionParams";
import {GetCompanyChild} from "../../../services/companiesService";

const AddOrder:React.FC = () => {
    const [products, setProducts] = useState([]);
    const [customerId, setCustomerId] = useState(0)
    const [orderStatusId, setOrderStatusId] = useState(0)
    const [comment, setComment] = useState('')
    const [paymentStatusId, setPaymentStatusId] = useState(0)
    const [paymentMethodId, setPaymentMethodId] = useState(0)
    const [productId, setProductId] = useState(0)
    const [measureUnitId, setMeasureUnitId] = useState<any>(0)
    const [quantity, setQuantity] = useState(0)
    const [loading, setLoading] = useState(false);

    const [productBasePrice, setProductBasePrice] = useState(0)
    const [users, setUsers] = useState([])
    const [organizations, setOrganizations] = useState([])
    let [companyId, SetcompanyId] = useState()
    let [companyName, SetCompanyName] = useState()
    const [userCompanies, setUserCompanies] = useState([])
    const getCompanies = async () => {
        try {
            const { data, status } = await GetCompanyChild()
            setUserCompanies(data.result.companies)
            SetcompanyId(data.result.companies[0].id)
            SetCompanyName(data.result.companies[0].name)


        } catch (error) {

        }

    }

    useEffect(() => {
        getUser();
        getOrganizations()
        getCompanies()
    }, [])

    const getUser = async () => {

        let configs = {

            headers: {'Content-Type': 'application/json'},
            params: {
                RoleIds: 2,
                PageNumber: 0,
                PageSize: 100000000
            }
            ,
            paramsSerializer: (params:any) => {

                return QueryString.stringify(params)
            }
        };
        try {
            const {data, status} = await GetDataWithSearch(configs)

            if (status === 200) {
                setUsers(data.result.users.values)
            }
        } catch (error) {

            console.log(error);
        }
    }
    const getOrganizations = async () => {

        try {
            const {data, status} = await GetAllOrganisation()
            if (status === 200) {
                setOrganizations(data.result.organizationLists.values)
            }
        } catch (error) {
            console.log(error);
        }
    }
    const mergeNames = () => {
        let newUsers = users.map((o:any) => ({...o, Oname: null}))

        for (let i = 0; i < newUsers.length; i++) {
            if (newUsers[i].organizationId > 0) {
                newUsers[i].Oname = organizations.filter((item:any) => item.id === newUsers[i].organizationId).map((item:any) => item.name)[0]
            }

        }
        return newUsers}
    let data = mergeNames()

    const customerComb = () => {
        return (data.map(item => ({
            value: item.id,
            label: (item.firstName ? item.firstName : "") + ` ` + (item.Oname ? item.Oname : "") + ` ` + (item.lastName ? item.lastName : "")
        })))
    }
    const order = {
        customerId,
        orderStatusId:Number(orderStatusId),
        paymentStatusId,
        paymentMethodId,
        comment,
        "createDate": new Date(),
        productId,
        measureUnitId: measureUnitId && measureUnitId[0],
        quantity:Number(quantity),
        productSupplyId:null,
        productSupplyConditionId:null,
        productBasePrice:Number(productBasePrice),
        companyId,companyName
    }

    const navigate = useNavigate()
    const SubmitOrder = async () => {
        setLoading(true)
        try {
            const {data, status} = await addOrder(order)
if (data.success === true){
    toast.success((' سفارش با موفقیت ثب شد' ), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
    });
    navigate("/admin/orderList")
}
  
setLoading(false)
        } catch (e) {
            console.log(e)
        }

    }
    const Mesures:any = () => {
        if (measureUnitId && measureUnitId > 0) {
            return (MeasureUnitSample.filter(i => i.id === measureUnitId[0]).map(data => (data.name)));

        } else {
            return null
        }
    }
    const paymentM = () => {
        return (PaymentStructureEnums.map(data => ({label: data.name, value: data.id})))

    }
    const getProdcutForCombo = async () => {

        try {
            const {data, status} = await GetAllProducts();
            if (status === 200) {
                setProducts(data.result.products.values)


            }
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        getProdcutForCombo()
    }, [])

    const productCombo:any = () => {
        if (products) {
            return (products.map((data:any) => ({label: data.name, value: data.id})))
        } else {
            return null
        }
    }

    const PaymentStatus = () => {
        return (PaymentStatusEnums.map((data:any) => ({label: data.name, value: data.id})))
    }
const statusOrder = () => {
        return (OrderStatus.map((data:any) => ({label: data.name, value: data.id})))
    }
    const companys = () => {
        return (userCompanies.map((item:any) => ({ label: item.name, value: item.id })))

    }
    let defaultValue:any = companys()[0]
    var formatter = new Intl.NumberFormat('en-US', {


        maximumFractionDigits: 0,
        minimumFractionDigits: 0, });
    return (
        <div className='user-progress'>
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                <h5>ویرایش عرضه شماره </h5>
                <p>در این بخش می توانید عرضه را ویرایش کنید</p>

            </div>
        </div>
        <div className='row d-flex justify-content-center '>
            <div className='col-lg-8 col-xs-12 m-2'>
                <Formik
                    initialValues={{
                        customerId,
                        orderStatusId:Number(orderStatusId),
                        paymentStatusId,
                        paymentMethodId,
                        comment,
                        "createDate": new Date(),
                        productId,
                        measureUnitId: measureUnitId && measureUnitId[0],
                        quantity:Number(quantity),
                        productSupplyId:null,
                        productSupplyConditionId:null,
                        productBasePrice:Number(productBasePrice),
                        companyId,companyName
                    }}
                    enableReinitialize={true}
                    onSubmit={values => {
                        // same shape as initial values
                        SubmitOrder()
                    }}>
                    {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (



                        <Form className="">
                    <div className="n-chk d-flex  mb-4">

                    </div>

                    <div className="form-group mb-4 textOnInput ">
                        <div className='form-row'>
                            <div className="col-lg-6 col-md-6 col-sm-11  selectIndex" style={{zIndex: '3'}}>
                                <label>مشتری</label>

                                <Select
                                    placeholder="مشتری"
                                    options={customerComb()}
                                    onChange={(e:any) => {
                                        setCustomerId(e.value)

                                    }}
                                />
                                {customerId === 0 ? <p style={{color: 'red'}}>لطفا این فیلد را پر کنید</p> : null}

                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-11  mb-4 selectIndex" style={{zIndex: '3'}}>

                                <label>نام کالا</label>

                                {productId === 0 ? (
                                    <>
                                        <Select placeholder='کالا'
                                                className='opacityForInput border-danger'
                                                options={productCombo()}
                                                onChange={(e:any) => {
                                                    setProductId(e.value)
                                                    setMeasureUnitId(products.filter((i:any) => i.id === e.value).map((i:any) => i.measureUnitId))

                                                }}
                                        />
                                        <p style={{color: 'red'}}>لطفا این فیلد را پر کنید</p>

                                    </>
                                ) : (<Select placeholder='کالا'
                                             className='opacityForInput '
                                             options={productCombo()}
                                             onChange={(e:any) => {
                                                 setProductId(e.value)
                                                 setMeasureUnitId(products.filter((i:any) => i.id === e.value).map((i:any) => i.measureUnitId))



                                             }}
                                />)}

                            </div>



                            <div className="col-lg-6 col-md-6 col-sm-11 " style={{marginBottom: "3rem", zIndex: '2'}}>
                                <label>نحوه پرداخت</label>
                                <Select

                                      placeholder='نحوه پرداخت'
                                      options={paymentM()}
                                      onChange={(e:any) => {
                                         setPaymentMethodId(e.value)
                                       }}
                                    />


                            </div>

                            <div className="col-lg-6 col-md-6  col-sm-6   selectIndex textOnInput form-group "
                                 style={{marginBottom: "3rem"}}>
                                <div className=" form-control-sm">
                                    <label>وضعیت پرداخت </label>
                                    <Select
                                        placeholder='وضعیت پرداخت'
                                        options={PaymentStatus()}
                                        onChange={(e:any) => {
                                            setPaymentStatusId(e.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-11 ">

                                <label>واحد</label>
                                <input className="form-control opacityForInput  mb-4" disabled={true} value={Mesures()}/>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-11 ">

                                <label>مقدار</label>
                                <Field  validate={validatNumber} name="quantity" type="text" className="  form-control opacityForInput  mb-4" value={formatter.format(quantity)}
                                       onChange={(e:any) => {
                                           setQuantity(e.target.value.replaceAll(",",""))
                                       }}/>
                                {errors.quantity && touched.quantity && <div className="text-danger">{errors.quantity}</div>}

                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-11 ">

                                <label>فی</label>
                                <Field  validate={validatNumber} name="productBasePrice" type="text" className="  form-control opacityForInput  mb-4"
                                       value={formatter.format(productBasePrice)} onChange={(e:any) => {
                                    setProductBasePrice(e.target.value.replaceAll(",",''))

                                }}/>
                                {errors.productBasePrice && touched.productBasePrice && <div className="text-danger">{errors.productBasePrice}</div>}


                            </div>
                            <div className=" form-group mb-4 textOnInput col-lg-6 col-md-6 col-sm-11  " style={{marginBottom: "3rem", zIndex: '1'}}>
                                <label>وضعیت سفارش</label>
                                <Select
                                    maxMenuHeight={200}
                                    placeholder='نحوه پرداخت'
                                    options={statusOrder()}
                                    onChange={(e:any) => {
                                        setOrderStatusId(e.value)
                                    }}
                                />


                            </div>
                            {userCompanies.length>1?
                                <div className="col-12 mb-4  textOnInput">

                                    <label> شرکت</label>
                                    <Select
                                        defaultValue={defaultValue}
                                        placeholder='نام شرکت'
                                        options={companys()}
                                        key={defaultValue}
                                        isClearable={true}
                                        onChange={e => {


                                            SetcompanyId(e.value)
                                            SetCompanyName(e.label)


                                        }

                                        }

                                    />


                                </div>:''}

                            <div className="col-12">

                                <label>توضیحات</label>
                                <Field  validate={validateRequired} name="comment" as="textarea" className="form-control opacityForInput  mb-4"
                                       value={comment} onChange={(e:any) => {
                                    setComment(e.target.value)

                                }}/>
                                {errors.comment && touched.comment && <div className="text-danger">{errors.comment}</div>}

                            </div>

                        </div>
                    </div>


                   
                    <div className='row justify-content-between'>
                        <div className='col-6   '>
                            <button  disabled={loading} className="btn btn-success float-right " >تایید
                                <ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                        </div>
                        <div className='col-6   '>
                            <NavLink to='/admin/orderList' className="btn btn-danger ">بازگشت</NavLink>
                        </div>
                    </div>


                        </Form>
                    )}
                </Formik>
            </div>
        </div>
        </div>
    )
}
export default AddOrder