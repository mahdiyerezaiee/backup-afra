import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import {GetProducts, getEditProduct, GetAllProducts} from '../../../services/productService';
import { GetProductWareHouses } from '../../../services/prodcutWarehouse';
import { PaymentStructureEnums } from '../../../Common/Enums/PaymentStructureEnums'
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { SetProductSupply } from '../../../services/productSupplyService';
import { toast } from 'react-toastify';
import { useRef } from "react";
import {ClipLoader} from "react-spinners";
import {Field, Form, Formik} from "formik";
import {validatAlpha, validatNumber} from "../../../Utils/validitionParams";



const AddProductSupplyToSalesBoard:React.FC = () => {
    const [, forceUpdate] = useState();

    const navigate = useNavigate();
    const [Productwarehouse, setProductwarehouse] = useState<any>([]);
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState<any>('');
    const [name, setName] = useState('');
    let customerg = [];
    const [price, setPrice] = useState<any>('');
    const [comment, setComment] = useState('');
    const [productId, setProductId] = useState<any>('');
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


    const getProdcutForCombo = async () => {

        try {
            const { data, status } = await GetAllProducts();
            if (status === 200) {
                setProducts(data.result.products.values)


            }
        }
        catch (error) {
            console.log(error)

        }
    }

    const Prodcutware = async (id:any) => {

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
    const ProductMeasure = async (id:any) => {
        const { data, status } = await getEditProduct(id);
        if (status === 200) {

            setmeasureUnitId(data.result.product.measureUnitId)
        }

    }
    const productCombo:any = () => {
        if(products){
        return (products.map((data:any) => ({ label: data.name, value: data.id })))}
        else{return null}
    }
    const wareCombo = () => {
if(Productwarehouse && Productwarehouse.length>0){
        return (Productwarehouse.filter((data:any) => data.id !== 0).map((data:any) => ({ label: data.wareHouseName, value: data.id })))}
else{
    return null
}
    }
    const paymentMethod = () => {
        return (PaymentStructureEnums.map(data => ({ label: data.name, value: data.id })))
    }

    const handleChangeExpire = (value:any) => {

        //تغییرات روی تاریخ رو اینجا اعمال کنید
        if (value instanceof DateObject) {
            setendDate(value.toDate())

        }
    }
   

        let att:any;
        if (valuecheck1 === '' && valuecheck2 === '' && valuecheck3 === '') {
            att = null;
        }
        else {
            att = `1002:${valuecheck1},${valuecheck2},${valuecheck3}`
        }
        const handelSubmit = async () => {
            setLoading(true)

            const getwareId = () => {
                return Productwarehouse.filter((data:any) => data.id !== 0).map((data:any) => data.id)[0]
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

                        navigate('/admin/productSupply')

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
                        <Formik
                            initialValues={{

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
                            }}
                            enableReinitialize={true}
                            onSubmit={values => {
                                // same shape as initial values
                                handelSubmit()
                            }}>
                            {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (



                                <Form >
                            <div className="n-chk d-flex  mb-4">

                                <div>
                                    <label className="mr-2"> فعال  </label>

                                    <input type="checkbox" defaultChecked={active} onChange={(e:any) => setActive(e.checked)} />

                                </div>


                            </div>
                            <div className="form-group mb-3 textOnInput ">
                                <div className='form-row'>

                                    <div className="col-6">
                                    <label>نام کالا</label>

                                        {productId === 0 ? (
                                            <>
                                                <Select placeholder='کالا'
                                                    className='opacityForInput border-danger'
                                                    options={productCombo()}
                                                    onChange={(e:any) => {
                                                        setProductId(e.value)
                                                        Prodcutware(e.value)

                                                    }}
                                                />
                                                <p style={{ color: 'red' }}>لطفا این فیلد را پر کنید</p>

                                            </>
                                        ) : (<Select placeholder='کالا'
                                            className='opacityForInput '
                                            options={productCombo()}
                                            onChange={(e:any) => {
                                                setProductId(e.value)
                                                Prodcutware(e.value)
                                                ProductMeasure(e.value)

                                            }}
                                        />)}


                                    </div>

                                    <div className="col-6 ">
                                    <label>انبار</label>

                                        <Select
                                            placeholder='انبار'
                                            options={wareCombo()}
                                            // value={wareCombo()}
                                            onChange={(e:any) => {
                                                setproductWareHouseId(e.value)

                                            }}
                                        />

                                    </div>

                                </div>

                            </div>

                            <div className="form-group mb-4 textOnInput">
                                <div className='form-row'>
                                    <div className='col-12 mb-4'>
                                    <label > شناسه عرضه</label>
                                        <Field  validate={validatAlpha} name="name" type="text" className="form-control opacityForInput" value={name} onChange={(e:any) => {
                                            setName(e.target.value)

                                        }} />
                                        {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}

                                    </div>
                                    <div className="col-6">
                                        <label >شماره کوتاژ</label>
                                        <Field  validate={validatNumber} name="cottageCode" type="text" className="form-control opacityForInput" value={cottageCode} onChange={(e:any)  => {
                                            setcottageCode(e.target.value)

                                        }} />
                                        {errors.cottageCode && touched.cottageCode && <div className="text-danger">{errors.name}</div>}

                                    </div>
                                    <div className="col-6">
                                        <label >مقدار عرضه</label>
                                        <Field  validate={validatNumber} name="quantity"  type="text" className="form-control opacityForInput" value={formatter.format(quantity)}
                                            onChange={(e:any)  => {
                                                setQuantity(Number(e.target.value.replaceAll("," ,"")))

                                            }} />
                                        {errors.quantity && touched.quantity && <div className="text-danger">{String(errors.quantity)}</div>}
                                    </div>

                                </div></div>
                            <div className="form-group mb-4 textOnInput  ">
                                <div className='form-row'>

                                    <div className="col-6">
                                        <label >قیمت</label>
                                        <Field  validate={validatNumber} name="price" type="text" className="form-control opacityForInput" value={formatter.format(price)}
                                            onChange={(e:any)  => {
                                                setPrice(Number(e.target.value.replaceAll(",","")))

                                            }} />
                                        {errors.price && touched.price && <div className="text-danger">{String(errors.price)}</div>}

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


                                    </div>
                                </div></div>
                            <div className="form-group mb-4 textOnInput" style={{ position: 'relative' }}>


                            </div>
                            <div className="form-group mb-4 textOnInput">
                                <label >توضیحات</label>

                               <Field  validate={validatNumber} name="comment"  as="textarea" className="form-control opacityForInput " rows='4' placeholder='توضیحات تکمیلی' value={comment} onChange={(e:any)  => {
                                    setComment(e.target.value)

                                }} />
                                {errors.comment && touched.comment && <div className="text-danger">{errors.comment}</div>}

                            </div>



                            <div className='row justify-content-between'>
                                <div className='col-lg-6 col-sm-12  '>
                                    <button type="submit" disabled={loading} className="btn btn-success float-left"  >ثبت<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>                                </div>
                                <div className='col-lg-6 col-sm-12 '>
                                    <NavLink to='/admin/productSupply' className="btn btn-danger float-right">بازگشت</NavLink>
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

export default AddProductSupplyToSalesBoard

