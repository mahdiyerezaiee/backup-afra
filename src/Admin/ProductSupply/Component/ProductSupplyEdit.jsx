import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import Select from 'react-select';
import {GetProducts, getEditProduct} from '../../../services/productService';
import {GetProductWareHouses} from '../../../services/prodcutWarehouse';
import DatePicker, {DateObject} from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import {GetAllProductSupply, SetProductSupply} from '../../../services/productSupplyService';
import {toast} from 'react-toastify';
import {useRef} from "react";
import SimpleReactValidator from "simple-react-validator";
import ProductSupplyCondition from "../Child/Conditions/Component/ProductSupplyCondition";
import {ClipLoader} from "react-spinners";


const ProductSupplyEdit = () => {
    const params = useParams()
    const [, forceUpdate] = useState();

    const navigate = useNavigate();
    const [Productwarehouse, setProductwarehouse] = useState([]);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [comment, setComment] = useState('');
    const [productId, setProductId] = useState('');
    const [productIdItem, setProductIdItem] = useState(0);
    const [measureUnitId, setmeasureUnitId] = useState(0);
    const [productWareHouseId, setproductWareHouseId] = useState(0);
    const [endDate, setendDate] = useState(new Date())
    const [warHouseName, setWarHouseName] = useState('');
    const [warHouseId, setWarHouseId] = useState(0);
    const[createDate,setCreateDate]=useState(new Date());
    const [active, setActive] = useState(true);
    const [cottageCode, setcottageCode] = useState('');
    const [loading, setLoading] = useState(false);

    const getProductSupply = async () => {
        try {
            const {data, status} = await GetAllProductSupply(params.id)
            setPrice(data.result.productSupply.price)
            setName(data.result.productSupply.name)
            setcottageCode(data.result.productSupply.cottageCode)
            setQuantity(data.result.productSupply.quantity)
            setComment(data.result.productSupply.comment)
            setActive(data.result.productSupply.active)
            setendDate(new Date(data.result.productSupply.endDate))
            setProductId(data.result.productSupply.productId)
            setProductIdItem(data.result.productSupply.productId)
            setComment(data.result.productSupply.comment)
            setCreateDate(data.result.productSupply.createDate)
            setWarHouseName( data.result.productSupply.wareHouse.wareHouseName)
            setWarHouseId(data.result.productSupply.wareHouse.wareHouseId)
            setproductWareHouseId(data.result.productSupply.productWareHouseId)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {

        getProductSupply()
    }, [])
    const validator = useRef(new SimpleReactValidator({
        validators: {
            alpha: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[A-Z آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]*$/i,) && params.indexOf(val) === -1;
                }
            },
            numeric: {

                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[u06F0-u06F9]+$/,) && params.indexOf(val) === -1 && val > 0;

                }
            },
        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد",

            email: 'ایمیل صحیح نیست',
            alpha: 'حتما از حروف استفاده کنید',
            numeric: 'حتما از اعداد استفاده کنید'
        }
        , element: message => <p style={{color: 'red'}}>{message}</p>
    }));
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
    const Prodcutware = async (id) => {

        try {
            const {data, status} = await GetProductWareHouses(id);
            if (status === 200) {

                setProductwarehouse(data.result.productWareHouses);


            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getProdcutForCombo();


    }, [])
    useEffect(()=>{
        Prodcutware(productId)
        ProductMeasure()


    },[productId])
    const ProductMeasure = async (id) => {
        const {data, status} = await getEditProduct(productValue[0].id);
        if (status === 200) {

            setmeasureUnitId(data.result.product.measureUnitId)
        }

    }

    const productCombo = () => {
        return (products.map(data => ({label: data.name, value: data.id})))
    }
    const product = () => {
        return (products.filter(item => item.id === productId).map(data => ({label: data.name, id: data.id})))
    }
    let productValue=product()

    const wareCombo = () => {

        return (Productwarehouse.filter(data => data.id !== 0).map(data => ({
            label: data.wareHouseName,
            value: data.id
        })))
    }
    const WareHouse = () => {
        return (Productwarehouse.filter(data => data.id === productWareHouseId).map(data => ({
            label: data.wareHouseName,
            id: data.wareHouseId
        })))

    }


    const handleChangeExpire = (value) => {

        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setendDate(value.add(270,'minute').toDate())
            validator.current.showMessageFor("required");

        }
    }



    const handelSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const getwareId = () => {
            return Productwarehouse.filter(data => data.id !== 0).map(data => data.id)[0]
        }

        const body = {
            "productSupply": {
                id: params.id,
                productId,
                productWareHouseId,
                createDate,
                cottageCode,
                endDate,
                measureUnitId,
                quantity,
                active,
                comment,
                name,
                price,
                


            },
            "product": null
            ,
            "wareHouse": null
        }

        try {
            if (validator.current.allValid()) {

                const {data, status} = await SetProductSupply(body)
                if (status === 200) {
                    toast.success("اطلاعات با موفقیت ثبت شد", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    });

                    navigate(-1)

                }
            } else {

                validator.current.showMessages();

                forceUpdate(1);
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
        }

    }
    const handelNavigate = (e) => {
        e.preventDefault()
        navigate(-1)
    }
    var formatter = new Intl.NumberFormat('en-US', {


        maximumFractionDigits: 0,
        minimumFractionDigits: 0, });

    return (
        <div className='user-progress'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5>ویرایش عرضه شماره {params.id}</h5>
                    <p>در این بخش می توانید عرضه را ویرایش کنید</p>

                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-6 col-xs-12'>
                    <form>
                        <div className="form-group mt-1 mb-3 textOnInput ">
                            <div className='form-row'>

                                <div className="col-md-6 col-xs-12 mb-4">
                                    <label> نام کالا</label>

                                    {productId === 0 ? (
                                        <>
                                            <Select
                                                value={product()}
                                                // placeholder='کالا'
                                                className='opacityForInput border-danger'
                                                options={productCombo()}
                                                onChange={e => {
                                                    setProductId(e.value)
                                                    Prodcutware(e.value)
                                                    validator.current.showMessageFor("required");

                                                }}
                                            />
                                            <p style={{color: 'red'}}>لطفا این فیلد را پر کنید</p>

                                        </>
                                    ) : (<Select
                                        value={product()}

                                        className='opacityForInput '
                                        options={productCombo()}
                                        onChange={e => {
                                            setProductId(e.value)
                                            Prodcutware(e.value)
                                            ProductMeasure(productValue[0].id)
                                            validator.current.showMessageFor("required");

                                        }}
                                    />)}


                                </div>

                                <div className="col-md-6 col-xs-12  mb-4">
                                    <label>انبار</label>
                                    <Select

                                        value={{label:warHouseName,value:warHouseId}}
                                        options={wareCombo()}
                                        defaultValue={WareHouse()}
                                        placeholder="انبار"

                                        onChange={e => {
                                            setproductWareHouseId(e.value)

                                            validator.current.showMessageFor("required");

                                        }}
                                    />

                                </div>



                            </div>

                        </div>

                        <div className="form-group mb-4 textOnInput">
                            <div className='form-row'>
                                <div className='col-12 mb-4'>
                                    <label > شناسه عرضه</label>
                                    <input type="text" className="form-control opacityForInput" value={name} onChange={e => {
                                        setName(e.target.value)
                                        validator.current.showMessageFor("required");

                                    }} />
                                    {validator.current.message("required", name, "required")}
                                </div>
                                <div className="col-md-6 col-xs-12 mb-3">
                                    <label>شماره کوتاژ</label>
                                    <input type="text" className="form-control opacityForInput" value={cottageCode}
                                           onChange={e => {
                                               setcottageCode(e.target.value)
                                               validator.current.showMessageFor("required");

                                           }}/>
                                    {validator.current.message("required", cottageCode, "required|numeric")}

                                </div>
                                <div className="col-md-6 col-xs-12">
                                    <label>مقدار عرضه</label>
                                    <input type="text" className="form-control opacityForInput" value={formatter.format(quantity) }
                                           onChange={e => {
                                               setQuantity(Number(e.target.value.replaceAll(",",'')))
                                               validator.current.showMessageFor("required");

                                           }}/>
                                    {validator.current.message("required", quantity, "required|numeric")}
                                </div>

                            </div>
                        </div>
                        <div className="form-group mb-1 textOnInput  ">
                            <div className='form-row'>

                                <div className="col-md-6 col-sm-6 ">
                                    <label>قیمت</label>
                                    <input type="text" className="form-control opacityForInput" value={formatter.format(price)}
                                           onChange={e => {
                                               setPrice(e.target.value.replaceAll(",",""))
                                               validator.current.showMessageFor("required");

                                           }}/>
                                    {validator.current.message("required", price, "required|numeric")}
                                </div>
                                <div className=" col-lg-6 col-sm-6 ">
                                    <div className=" mb-2 " style={{position: 'relative'}}>
                                        <label style={{
                                            position: 'absolute',
                                            zIndex: '1',
                                            top: '-15px',
                                            right: '10px',
                                            background: 'white',
                                            padding: '0 8px'
                                        }}>تاریخ اعتبار</label>
                                        <div className='form-group '>
                                            <DatePicker
                                                calendar={persian}

                                                locale={persian_fa}
                                                style={{height: '45.39px', width: '100%', textAlign: 'center'}}
                                                value={endDate}
                                                onChange={handleChangeExpire}
                                            />

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>


                        <div className="form-group mb-4 textOnInput ">
                            <label>توضیحات</label>

                            <textarea type="textarea" className="form-control opacityForInput " rows='4'
                                      placeholder='توضیحات تکمیلی' value={comment} onChange={e => {
                                setComment(e.target.value)

                            }}/>

                        </div>
                        <div className='form-group mb-4 textOnInput'>
                            <label>شرایط پرداخت</label>
                            <ProductSupplyCondition quantity={quantity} />
                        </div>

                        <div className='row '>



                            <div className='col-lg-6 col-sm-12 '>
                                <button type="submit" disabled={loading} className="btn btn-success float-left" onClick={handelSubmit} >ثبت<ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                            </div>
                            <div className='col-lg-6 col-sm-12 '>
                                <button onClick={handelNavigate}
                                        className="btn btn-danger float-right">بازگشت</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>

        </div>
    )
}
export default ProductSupplyEdit

