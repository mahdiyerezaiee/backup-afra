import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import { GetProducts, getEditProduct } from '../../../../services/productService';
import { GetProductWareHouses } from '../../../../services/prodcutWarehouse';
import { PaymentStructureEnums } from '../../../../Enums/PaymentStructureEnums'
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { SetProductSupply } from '../../../../services/productSupplyService';
import { toast } from 'react-toastify';
import { useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import {ClipLoader} from "react-spinners";



const AddProductSupplyToSalesBoard = () => {
    const [, forceUpdate] = useState();

    const navigate = useNavigate();
    const [Productwarehouse, setProductwarehouse] = useState([]);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [name, setName] = useState('');
    let customerg = [];
    const [price, setPrice] = useState('');
    const [comment, setComment] = useState('');
    const [productId, setProductId] = useState('');
    const [measureUnitId, setmeasureUnitId] = useState(0);
    const [productWareHouseId, setproductWareHouseId] = useState(0);
    const [endDate, setendDate] = useState(new Date())
    const [active, setActive] = useState(true);
    const [cottageCode, setcottageCode] = useState('');
    const [valuecheck1, setvaluechek1] = useState('');
    const [valuecheck2, setvaluechek2] = useState('');
    const [valuecheck3, setvaluechek3] = useState('');
    const [loading, setLoading] = useState(false);


    const GetCustomerGroup = async () => {


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
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));
    const getProdcutForCombo = async () => {

        try {
            const { data, status } = await GetProducts();
            if (status === 200) {
                setProducts(data.result.products.values)


            }
        }
        catch (error) {
            console.log(error)

        }
    }

    const Prodcutware = async (id) => {

        try {
            const { data, status } = await GetProductWareHouses(id);
            if (status === 200) {

                setProductwarehouse(data.result.productWareHouses);





            }
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {

        getProdcutForCombo();
        GetCustomerGroup();
    }, [])
    const ProductMeasure = async (id) => {
        const { data, status } = await getEditProduct(id);
        if (status === 200) {

            setmeasureUnitId(data.result.product.measureUnitId)
        }

    }
    const productCombo = () => {
        if(products){
        return (products.map(data => ({ label: data.name, value: data.id })))}
        else{return null}
    }
    const wareCombo = () => {
if(Productwarehouse && Productwarehouse.length>0){
        return (Productwarehouse.filter(data => data.id !== 0).map(data => ({ label: data.wareHouseName, value: data.id })))}
else{
    return null
}
    }
    const paymentMethod = () => {
        return (PaymentStructureEnums.map(data => ({ label: data.name, value: data.id })))
    }

    const handleChangeExpire = (value) => {

        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setendDate(value.toDate())
            validator.current.showMessageFor("required");

        }
    }
   

        let att;
        if (valuecheck1 === '' && valuecheck2 === '' && valuecheck3 === '') {
            att = null;
        }
        else {
            att = `1002:${valuecheck1},${valuecheck2},${valuecheck3}`
        }
        const handelSubmit = async (event) => {
            setLoading(true)

            event.preventDefault();
            const getwareId = () => {
                return Productwarehouse.filter(data => data.id !== 0).map(data => data.id)[0]
            }
            const body = {
                "productSupply": {

                    productId,
                    productWareHouseId,
                    name,
                    createDate: new Date(),
                    cottageCode,
                    endDate,
                    measureUnitId,
                    quantity,
                    active,
                    comment,
                    price,
                    maxSellableAmount: null,
                    usedAttributes: att,
                    installmentStartDate: new Date(),
                    installmentOccureCount: 0,
                    installmentPeriod: 0

                },
                "product": null
                ,
                "wareHouse": null
            }
          
            try {
                if (validator.current.allValid()) {

                    const { data, status } = await SetProductSupply(body)
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

                        navigate('/productSupply')

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
    var formatter = new Intl.NumberFormat('en-US', {


        maximumFractionDigits: 0,
        minimumFractionDigits: 0, });
        return (
            <div className='user-progress' >
                <div className='row'>
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                        <h5>تعریف عرضه</h5>
                        <p>در این بخش می توانید عرضه جدید تعریف کنید</p>
                    </div>
                </div>
                <div className='row d-flex justify-content-center '>
                    <div className='widget box shadow col-md-6 col-xs-12'>
                        <form >
                            <div className="n-chk d-flex  mb-4">

                                <div>
                                    <label className="mr-2"> فعال  </label>

                                    <input type="checkbox" defaultChecked={active} onChange={e => setActive(e.checked)} />

                                </div>


                            </div>
                            <div className="form-group mb-3 textOnInput selectIndex">
                                <div className='form-row'>

                                    <div className="col-6">
                                    <label>نام کالا</label>

                                        {productId === 0 ? (
                                            <>
                                                <Select placeholder='کالا'
                                                    className='opacityForInput border-danger'
                                                    options={productCombo()}
                                                    onChange={e => {
                                                        setProductId(e.value)
                                                        Prodcutware(e.value)
                                                        validator.current.showMessageFor("required");

                                                    }}
                                                />
                                                <p style={{ color: 'red' }}>لطفا این فیلد را پر کنید</p>

                                            </>
                                        ) : (<Select placeholder='کالا'
                                            className='opacityForInput '
                                            options={productCombo()}
                                            onChange={e => {
                                                setProductId(e.value)
                                                Prodcutware(e.value)
                                                ProductMeasure(e.value)
                                                validator.current.showMessageFor("required");

                                            }}
                                        />)}


                                    </div>

                                    <div className="col-6 selectIndex">
                                    <label>انبار</label>

                                        <Select
                                            placeholder='انبار'
                                            options={wareCombo()}
                                            // value={wareCombo()}
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
                                    <div className="col-6">
                                        <label >شماره کوتاژ</label>
                                        <input type="text" className="form-control opacityForInput" value={cottageCode} onChange={e => {
                                            setcottageCode(e.target.value)
                                            validator.current.showMessageFor("required");

                                        }} />
                                        {validator.current.message("required", cottageCode, "required|numeric")}

                                    </div>
                                    <div className="col-6">
                                        <label >مقدار عرضه</label>
                                        <input type="text" className="form-control opacityForInput" value={formatter.format(quantity)}
                                            onChange={e => {
                                                setQuantity(Number(e.target.value.replaceAll("," ,"")))
                                                validator.current.showMessageFor("required");

                                            }} />
                                        {validator.current.message("required", quantity, "required|numeric")}
                                    </div>

                                </div></div>
                            <div className="form-group mb-4 textOnInput  ">
                                <div className='form-row'>

                                    <div className="col-6">
                                        <label >قیمت</label>
                                        <input type="text" className="form-control opacityForInput" value={formatter.format(price)}
                                            onChange={e => {
                                                setPrice(Number(e.target.value.replaceAll(",","")))
                                                validator.current.showMessageFor("required");

                                            }} />
                                        {validator.current.message("required", price, "required|numeric")}
                                    </div>

                                        <div className="col-6">
                                            <label style={{ position: 'absolute', zIndex: '1', top: '-15px', right: '10px', background: 'white', padding: '0 8px' }}>تاریخ اعتبار</label>

                                            <DatePicker
                                                calendar={persian}

                                                locale={persian_fa}
                                                style={{ height: '45.39px', width: '100%', textAlign: 'center', }}
                                                value={endDate}
                                                onChange={
                                                    handleChangeExpire
                                                } />
                                            {validator.current.message("required", endDate, "required")}


                                    </div>
                                </div></div>
                            <div className="form-group mb-4 textOnInput" style={{ position: 'relative' }}>


                            </div>
                            <div className="form-group mb-4 textOnInput">
                                <label >توضیحات</label>

                                <textarea type="textarea" className="form-control opacityForInput " rows='4' placeholder='توضیحات تکمیلی' value={comment} onChange={e => {
                                    setComment(e.target.value)

                                }} />

                            </div>



                            <div className='row justify-content-between'>
                                <div className='col-6 '>
                                    <button type="submit" disabled={loading} className="btn btn-success float-left" onClick={handelSubmit} >ثبت<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>                                </div>
                                <div className='col-6 '>
                                    <NavLink to='/productSupply' className="btn btn-danger float-right">بازگشت</NavLink>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        )

}

export default AddProductSupplyToSalesBoard

