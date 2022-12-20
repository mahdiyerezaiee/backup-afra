import {useState, useRef, useEffect} from "react";
import {addOrder} from "../../services/orderService";
import Select from "react-select";
import {NavLink, useNavigate} from "react-router-dom";
import {MeasureUnitSample} from "../../Enums/MeasureUnitSample";
import SimpleReactValidator from "simple-react-validator";
import {GetProducts} from "../../services/productService";
import {GetAllProductWithSearch} from "../../services/productSupplyService";
import {PaymentStatusEnums} from "../../Enums/PaymentStatus";
import {GetAllUsers, GetDataWithSearch} from "../../services/userService";
import {PaymentStructureEnums} from "../../Enums/PaymentStructureEnums";
import {GetAllOrganisation} from "../../services/organisationService";
import QueryString from "qs";
import {toast} from "react-toastify";
import {GetGroupsForEntity} from "../../services/GroupService";
import Modal from 'react-modal';
import {OrderStatus} from "../../Enums/OrderStatusEnums";

const customStyles = {
    content: {
height:"50%",
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
const AddOrder = () => {
    const [products, setProducts] = useState([]);
    const [productSupply, setProductSupply] = useState([]);
    const [customerId, setCustomerId] = useState(0)
    const [orderStatusId, setOrderStatusId] = useState(0)
    const [comment, setComment] = useState('')
    const [paymentStatusId, setPaymentStatusId] = useState(0)
    const [paymentMethodId, setPaymentMethodId] = useState(0)
    const [productId, setProductId] = useState(0)
    const [measureUnitId, setMeasureUnitId] = useState(0)
    const [quantity, setQuantity] = useState(0)

    const [productBasePrice, setProductBasePrice] = useState(0)
    const [users, setUsers] = useState([])
    const [organizations, setOrganizations] = useState([])

    useEffect(() => {
        getUser();
        getOrganizations()

    }, [])
    const getUser = async () => {

        let configs = {

            headers: {'Content-Type': 'application/json'},
            params: {
                RoleIds: [2],
                PageNumber: 0,
                PageSize: 100000000
            }
            ,
            paramsSerializer: params => {

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
        let newUsers = users.map(o => ({...o, Oname: null}))

        for (let i = 0; i < newUsers.length; i++) {
            if (newUsers[i].organizationId > 0) {
                newUsers[i].Oname = organizations.filter(item => item.id === newUsers[i].organizationId).map(item => item.name)[0]
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
    }
    const navigate = useNavigate()

    const SubmitOrder = async (e) => {
        e.preventDefault()
        try {
            const {data, status} = await addOrder(order)
if (data.result.success === true){
    toast.success(data.result.message + `شناسه سفارش ${data.result.orderId }`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
    });
    navigate("/orderList")
}
    if (data.result.success === false){
    toast.error(data.result.message , {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined
    });}

        } catch (e) {
            console.log(e)
        }
    }
    const validator = useRef(new SimpleReactValidator({
        validators: {
            alpha: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[A-Z آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]*$/i,) && params.indexOf(val) === -1;
                }
            },
            numeric: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[u0660-u0669]+$/,) && params.indexOf(val) === -1;
                }
            },
        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد",

            email: 'ایمیل صحیح نیست',
            alpha: 'حتما از حروف استفاده کنید',
            numeric: 'حتما از عداد استفاده کنید'
        }
        , element: message => <p style={{color: 'red'}}>{message}</p>
    }));

    const Mesures = () => {
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
            const {data, status} = await GetProducts();
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

    const productCombo = () => {
        if (products) {
            return (products.map(data => ({label: data.name, value: data.id})))
        } else {
            return null
        }
    }

    const PaymentStatus = () => {
        return (PaymentStatusEnums.map(data => ({label: data.name, value: data.id})))
    }
const statusOrder = () => {
        return (OrderStatus.map(data => ({label: data.name, value: data.id})))
    }


    return (

        <div className='row d-flex justify-content-center '>
            <div className='widget box shadow col-md-6 col-xs-12'>

                <form className="col-8">
                    <div className="n-chk d-flex  mb-4">

                    </div>

                    <div className="form-group mb-4 textOnInput ">
                        <div className='form-row'>
                            <div className="col-6 selectIndex" style={{zIndex: '3'}}>
                                <label>مشتری</label>

                                <Select
                                    placeholder="مشتری"
                                    options={customerComb()}
                                    onChange={e => {
                                        setCustomerId(e.value)
                                        validator.current.showMessageFor("required");

                                    }}
                                />
                                {customerId === 0 ? <p style={{color: 'red'}}>لطفا این فیلد را پر کنید</p> : null}

                            </div>

                            <div className="col-6 mb-4 selectIndex" style={{zIndex: '3'}}>

                                <label>نام کالا</label>

                                {productId === 0 ? (
                                    <>
                                        <Select placeholder='کالا'
                                                className='opacityForInput border-danger'
                                                options={productCombo()}
                                                onChange={e => {
                                                    setProductId(e.value)
                                                    validator.current.showMessageFor("required");
                                                    setMeasureUnitId(products.filter(i => i.id === e.value).map(i => i.measureUnitId))

                                                }}
                                        />
                                        <p style={{color: 'red'}}>لطفا این فیلد را پر کنید</p>

                                    </>
                                ) : (<Select placeholder='کالا'
                                             className='opacityForInput '
                                             options={productCombo()}
                                             onChange={e => {
                                                 setProductId(e.value)
                                                 setMeasureUnitId(products.filter(i => i.id === e.value).map(i => i.measureUnitId))


                                                 validator.current.showMessageFor("required");

                                             }}
                                />)}

                            </div>



                            <div className="col-6" style={{marginBottom: "3rem", zIndex: '2'}}>
                                <label>نحوه پرداخت</label>
                                <Select

                                      placeholder='نحوه پرداخت'
                                      options={paymentM()}
                                      onChange={e => {
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
                                        onChange={e => {
                                            setPaymentStatusId(e.value)
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-6">

                                <label>واحد</label>
                                <input className="form-control opacityForInput  mb-4" disabled={true} value={Mesures()}/>
                            </div>
                            <div className="col-6">

                                <label>مقدار</label>
                                <input type="text" className="form-control opacityForInput  mb-4" value={quantity}
                                       onChange={e => {
                                           setQuantity(e.target.value)
                                           validator.current.showMessageFor("required");
                                       }}/>
                                {validator.current.message("required", quantity, "required|numeric")}


                            </div>
                            <div className="col-6">

                                <label>فی</label>
                                <input type="text" className="form-control opacityForInput  mb-4"
                                       value={productBasePrice} onChange={e => {
                                    setProductBasePrice(e.target.value)
                                    validator.current.showMessageFor("required");

                                }}/>
                                {validator.current.message("required", productBasePrice, "required|numeric")}


                            </div>
                            <div className=" form-group mb-4 textOnInput col-6 selectIndex" style={{marginBottom: "3rem", zIndex: '1'}}>
                                <label>وضعیت سفارش</label>
                                <Select
maxMenuHeight="200px"
                                    placeholder='نحوه پرداخت'
                                    options={statusOrder()}
                                    onChange={e => {
                                        setOrderStatusId(e.value)
                                    }}
                                />


                            </div>

                            <div className="col-12">

                                <label>توضیحات</label>
                                <textarea type="text" className="form-control opacityForInput  mb-4"
                                       value={comment} onChange={e => {
                                    setComment(e.target.value)

                                }}/>


                            </div>

                        </div>
                    </div>


                    <div className="form-group">
                        <div className="form-check pl-0">
                            <div className="custom-control custom-checkbox checkbox-info">

                            </div>
                        </div>
                    </div>
                    <div className='row justify-content-between'>
                        <div className='col-6 '>
                            <button  className="btn btn-success float-left " onClick={SubmitOrder}>تایید
                            </button>
                        </div>
                        <div className='col-6 '>
                            <NavLink to='/orderList' className="btn btn-danger float-right">بازگشت</NavLink>
                        </div>
                    </div>


                </form>

            </div>
        </div>
    )
}
export default AddOrder