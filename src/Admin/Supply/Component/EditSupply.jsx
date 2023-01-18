import React, { useState, useEffect, useRef } from 'react'
import { GetAllProducts } from '../../../services/productService';
import { GetAllWareHouses } from '../../../services/wareHouseService';
import { MeasureUnitSample } from '../../../Common/Enums/MeasureUnitSample';
import { GetAllSuppliers, GetSupply, SetSupply } from '../../../services/supplyService';
import { SupplyTypesEnums } from '../../../Common/Enums/SupplyTypesEnums';
import { toast } from 'react-toastify';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import Select from 'react-select';
import { ShippingStatusEnums } from "../../../Common/Enums/ShippingStatusEnums";
import {ClipLoader} from "react-spinners";
import {Field, Form, Formik} from "formik";
import {validatAlpha, validatNumber} from "../../../Utils/validitionParams";


const EditeSupply = () => {
    const [productId, setProductId] = useState(0);
    const [measureUnitId, setMeasureUnitId] = useState(0);
    const [cottageCode, setCottageCode] = useState('');
    const [loading, setLoading] = useState(false);

    const [wareHouseId, setWareHouseId] = useState(0);
    const [supplyTypeId, setSupplyTypeId] = useState(0);
    const [supplierId, setSupplierId] = useState(0);
    const [products, SetProducts] = useState([]);
    const [wareHouses, SetWareHouses] = useState([]);
    const [suppliers, SetSuppliers] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [contractNumber, setContractNumber] = useState('');
    const [shippingStatusId, setShippingStatusId] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate();
    const params = useParams();
    const getSupply = async () => {
        try {
            const { data, status } = await GetSupply(params.id)
            setQuantity(data.result.supply.quantity)
            setContractNumber(data.result.supply.contractNumber)
            setComment(data.result.supply.comment)
            setProductId(data.result.supply.productId)
            setMeasureUnitId(data.result.supply.measureUnitId)
            setWareHouseId(data.result.supply.wareHouseId)
            setSupplierId(data.result.supply.supplierId)
            setSupplyTypeId(data.result.supply.supplyTypeId)
            setShippingStatusId(data.result.supply.shippingStatusId)
            setCottageCode(data.result.supply.cottageCode)
        } catch (err) {
            console.log(err)
        }
    }
    const getProducts = async () => {
        try {
            const { data, status } = await GetAllProducts();
            if (status === 200) {
                SetProducts(data.result.products.values)
            }

        } catch (error) {
            console.log(error);
        }
    }
    const getWareHouses = async () => {
        try {

            const { data, status } = await GetAllWareHouses();
            if (status === 200) {
                SetWareHouses(data.result.wareHouses)
            }

        } catch (error) {

        }
    }
    const getSupplier = async () => {
        try {
            const { data, status } = await GetAllSuppliers();
            if (status === 200) {
                SetSuppliers(data.result.suppliers.values)

            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProducts();
        getWareHouses();
        getSupplier();
        getSupply()
    }, [])

    const Mesures = () => {
        return (MeasureUnitSample.map(data => ({ label: data.name, value: data.id })));
    }
    const MesuresD = () => {
        return (MeasureUnitSample.filter(item => item.id === measureUnitId).map(data => ({ label: data.name, value: data.id })));
    }
    const SupplyTypes = () => {
        return (SupplyTypesEnums.map(data => ({ label: data.name, value: data.id })));
    }
    const SupplyTypesD = () => {
        return (SupplyTypesEnums.filter(item => item.id === supplyTypeId).map(data => ({ label: data.name, value: data.id })));
    }
    const inputWarehouses = () => {
        return (wareHouses.map(data => ({ label: data.name, value: data.id })));
    }
    const inputWarehousesD = () => {
        return (wareHouses.filter(item => item.id === wareHouseId).map(data => ({ label: data.name, value: data.id })));
    }
    const inputProductG = () => {
        return (products.map(data => ({ label: data.name, value: data.id })))
    }
    const inputProductGD = () => {
        return (products.filter(item => item.id === productId).map(data => ({ label: data.name, value: data.id })))
    }
    const inputSuppliers = () => {
        return (suppliers.map(data => ({ label: data.name, value: data.id })))
    }
    const inputSuppliersD = () => {
        return (suppliers.filter(item => item.id === supplierId).map(data => ({ label: data.name, value: data.id })))
    }
    const shippingIdD = () => {
        return (ShippingStatusEnums.filter(item => item.id === shippingStatusId).map(data => ({ label: data.name, value: data.id })))
    }
    const shippingId = () => {
        return (ShippingStatusEnums.map(data => ({ label: data.name, value: data.id })))
    }

    const submit = async () => {
        setLoading(true)
        try {
            const supply = {
                "supply": {
                    id: params.id,
                    supplyTypeId,
                    shippingStatusId,
                    supplierId,
                    productId,
                    measureUnitId,
                    quantity,
                    wareHouseId,
                    contractNumber,
                    cottageCode,
                    comment
                }

            }
            const { data, status } = await SetSupply(supply)
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
                navigate('/admin/supply')
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    var formatter = new Intl.NumberFormat('en-US', {


        maximumFractionDigits: 0,
        minimumFractionDigits: 0, });
    return (
        <div className='user-progress ' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >ویرایش تامین </h5>
                    <p>در این بخش می توانید تامین را ویرایش کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-7 col-xs-12'>
                    <Formik
                        initialValues={{
                            id: params.id,
                            supplyTypeId,
                            shippingStatusId,
                            supplierId,
                            productId,
                            measureUnitId,
                            quantity,
                            wareHouseId,
                            contractNumber,
                            cottageCode,
                            comment
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            submit()
                        }}>
                        {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (


                            <Form  className='col'>
                        <div className="n-chk d-flex  mb-4">

                            {/* <div>
                                <label className="mr-2"> فعال  </label>

                                <input type="checkbox" defaultChecked={active} onChange={e => setActive(e.checked)} />

                            </div> */}


                        </div>
                        <div className="form-group  textOnInput ">
                            <div className='form-row mb-4'>

                                <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                    <label>نام کالا</label>

                                    <Select
                                        styles={{
                                            // Fixes the overlapping problem of the component
                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                        }}
                                        value={inputProductGD()} className='opacityForInput border-danger'
                                        options={inputProductG()}
                                        onChange={e => {
                                            setProductId(e.value)


                                        }}
                                    />
                                    {productId === 0 ? <span className="text-danger">یک محصول انتخاب کنید</span> : ''}

                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                <label>واحد</label>

                                    <Select
                                        styles={{
                                            // Fixes the overlapping problem of the component
                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                        }}
                                        value={MesuresD()} className='opacityForInput border-danger'
                                        options={Mesures()}
                                        onChange={e => {
                                            setMeasureUnitId(e.value)


                                        }}
                                    />
                                    {measureUnitId === 0 ? <span className="text-danger">یک واحد انتخاب کنید</span> : ''}

                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                <label>انبار</label>

                                    <Select
                                        styles={{
                                            // Fixes the overlapping problem of the component
                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                        }}
                                        value={inputWarehousesD()}
                                        className='opacityForInput border-danger'
                                        options={inputWarehouses()}
                                        onChange={e => {
                                            setWareHouseId(e.value)


                                        }}
                                    />
                                    {wareHouseId === 0 ? <span className="text-danger">یک انبار انتخاب کنید</span> : ''}

                                </div>
                            </div>
                            <div className="form-group mb-4 textOnInput ">
                                <div className='form-row '>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                    <label>تامین کننده</label>

                                        <Select
                                            styles={{
                                                // Fixes the overlapping problem of the component
                                                menu: provided => ({ ...provided, zIndex: 9999 })
                                            }}
                                            value={inputSuppliersD()} className='opacityForInput border-danger'
                                            options={inputSuppliers()}
                                            onChange={e => {
                                                setSupplierId(e.value)


                                            }}
                                        />
                                        {supplierId === 0 ? <span className="text-danger">یک تامین کننده را انتخاب کنید</span> : ''}

                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                    <label>وضعیت</label>

                                        <Select
                                         styles={{
                                            // Fixes the overlapping problem of the component
                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                          }}
                                            value={shippingIdD()} className='opacityForInput border-danger'
                                            options={shippingId()}
                                            onChange={e => {
                                                setShippingStatusId(e.value)


                                            }}
                                        />
                                        {supplyTypeId === 0 ? <span className="text-danger">یک نوع تامین را انتخاب کنید</span> : ''}

                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                    <label>نوع تامین</label>

                                        <Select
                                         styles={{
                                            // Fixes the overlapping problem of the component
                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                          }}
                                            value={SupplyTypesD()} className='opacityForInput border-danger'
                                            options={SupplyTypes()}
                                            onChange={e => {
                                                setSupplyTypeId(e.value)


                                            }}
                                        />
                                        {supplyTypeId === 0 ? <span className="text-danger">یک نوع تامین را انتخاب کنید</span> : ''}

                                    </div>

                                </div>

                            </div>
                            <div className="form-group mb-4 textOnInput  ">
                                <div className='form-row'>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                        <label >مقدار</label>
                                        <Field  validate={validatNumber} name="quantity" type="text" className=" value form-control opacityForInput" value={formatter.format(quantity)}
                                               onChange={e => {
                                                   setQuantity(e.target.value.replaceAll(",",''))

                                               }} />
                                        {errors.quantity && touched.quantity && <div className="text-danger">{errors.quantity}</div>}

                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                        <label >کد کوتاژ</label>
                                        <Field  validate={validatNumber} name="cottageCode" className="form-control opacityForInput" value={cottageCode}
                                               onChange={e => {
                                                   setCottageCode(e.target.value)

                                               }} />
                                        {errors.cottageCode && touched.cottageCode && <div className="text-danger">{errors.cottageCode}</div>}

                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                        <label >شماره قرارداد</label>
                                        <Field  validate={validatNumber} name="contractNumber" type="text" className="form-control opacityForInput" value={contractNumber}
                                               onChange={e => {
                                                   setContractNumber(e.target.value)

                                               }} />
                                    </div>
                                    {errors.contractNumber && touched.contractNumber && <div className="text-danger">{errors.contractNumber}</div>}

                                </div></div>
                            <div className="form-group mb-4 textOnInput">
                                <label >توضیحات</label>

                                <Field  validate={validatAlpha} name="comment"   as="textarea" className="form-control opacityForInput " rows='4' placeholder='توضیحات تکمیلی' value={comment} onChange={e => {
                                    setComment(e.target.value)
                                }} />
                                {errors.comment && touched.comment && <div className="text-danger">{errors.comment}</div>}

                            </div>

                        </div>
                        <div className="form-group">
                            <div className="form-check pl-0">
                                <div className="custom-control custom-checkbox checkbox-info">

                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-between'>
                            <div className='col-lg-6 col-md-6 col-sm-11  '>

                                  <button disabled={productId === 0 || wareHouseId === 0 || supplierId === 0 || measureUnitId === 0 || supplyTypeId === 0 ? true : false} type="submit" className="btn btn-success float-left " >تایید<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>


                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-11  '>
                                <NavLink to='/admin/supply' className="btn btn-danger float-right">بازگشت</NavLink>
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

export default EditeSupply