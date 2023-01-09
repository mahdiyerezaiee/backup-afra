import React, { useState, useEffect, useRef } from 'react'
import { GetAllProducts } from '../../../services/productService';
import { GetAllWareHouses } from '../../../services/wareHouseService';
import { MeasureUnitSample } from '../../../Common/Enums/MeasureUnitSample';
import { GetAllSuppliers, SetSupply } from '../../../services/supplyService';
import { SupplyTypesEnums } from '../../../Common/Enums/SupplyTypesEnums';
import { toast } from 'react-toastify';
import { useNavigate, NavLink } from 'react-router-dom';
import Select from 'react-select';

import SimpleReactValidator from "simple-react-validator";
import {ClipLoader} from "react-spinners";


const NewSupply = () => {
    const [productId, setProductId] = useState(0);
    const [measureUnitId, setMeasureUnitId] = useState(0);
    const [cottageCode, setCottageCode] = useState('');
    const [wareHouseId, setWareHouseId] = useState(0);
    const [supplyTypeId, setSupplyTypeId] = useState(0);
    const [supplierId, setSupplierId] = useState(0);
    const [products, SetProducts] = useState([]);
    const [wareHouses, SetWareHouses] = useState([]);
    const [suppliers, SetSuppliers] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [contractNumber, setContractNumber] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const { data, status } = await GetAllProducts();

            SetProducts(data.result.products.values)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProducts();
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
                    return validator.helpers.testRegex(val, /^[u0660-u0669]+$/,) && params.indexOf(val) === -1;
                }
            },
        },
        messages: {
            required: "پرکردن این فیلد الزامی می باشد",

            alpha: 'حتما از حروف استفاده کنید',
            numeric: 'حتما از عداد استفاده کنید'
        }
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));
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
        getWareHouses();
        getSupplier();
    }, [])
    
    const Mesures = () => {
        return (MeasureUnitSample.map(data => ({ label: data.name, value: data.id })));
    }
    const SupplyTypes = () => {
        return (SupplyTypesEnums.map(data => ({ label: data.name, value: data.id })));
    }
    const inputWarehouses = () => {
        return (wareHouses.map(data => ({ label: data.name, value: data.id })));
    }
    const inputProductG = () => {
        if(products){
        return (products.map(data => ({ label: data.name, value: data.id }))) }
        else{
           return null
        }
    }
    const inputSuppliers = () => {
        if(suppliers){
        return (suppliers.map(data => ({ label: data.name, value: data.id })))}
        else{
            return null
        }
    }

    const submit = async (event) => {
        setLoading(true)

        event.preventDefault();
        try {
            const supply = {
                "supply": {

                    supplyTypeId,
                    shippingStatusId: 2,
                    supplierId,
                    productId,
                    measureUnitId,
                    quantity:Number(quantity && quantity.replaceAll("," , "")),
                    wareHouseId,
                    contractNumber,
                    comment,
                    cottageCode,
                  
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
                    <h5 >تعریف تامین </h5>
                    <p>در این بخش می توانید تامین جدید تعریف کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-lg-6 col-md-8 col-xs-12'>
                    <form  className='col'>
                        <div className="n-chk d-flex  mb-4">
                        </div>
                        <div className="form-group  textOnInput ">
                            <div className='form-row mb-4'>
                               

                                <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                <label>نام کالا</label>
                                    <Select placeholder='انتخاب'
                                        className='opacityForInput border-danger '
                                        options={inputProductG()}
                                        styles={{
                                            // Fixes the overlapping problem of the component
                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                          }}
                                        onChange={e => {
                                            setProductId(e.value)
                                            validator.current.showMessageFor("required");
                                        }}
                                    />
                                    {productId === 0 ? <span className="text-danger">یک محصول انتخاب کنید</span> : ''}

                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                    <label>واحد</label>

                                    <Select placeholder='انتخاب '
                                       styles={{
                                        // Fixes the overlapping problem of the component
                                        menu: provided => ({ ...provided, zIndex: 9999 })
                                      }}
                                        className='opacityForInput border-danger'
                                        options={Mesures()}
                                        onChange={e => {
                                            setMeasureUnitId(e.value)

                                            validator.current.showMessageFor("required");

                                        }}
                                    />
                                    {measureUnitId === 0 ? <span className="text-danger">یک واحد انتخاب کنید</span> : ''}

                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-11 mb-3">
                                    <label> انبار</label>

                                    <Select placeholder='انتخاب '
                                       styles={{
                                        // Fixes the overlapping problem of the component
                                        menu: provided => ({ ...provided, zIndex: 9999 })
                                      }}
                                        className='opacityForInput border-danger'
                                        options={inputWarehouses()}
                                        onChange={e => {
                                            setWareHouseId(e.value)

                                            validator.current.showMessageFor("required");

                                        }}
                                    />
                                    {wareHouseId === 0 ? <span className="text-danger">یک انبار انتخاب کنید</span> : ''}

                                </div>
                            </div>
                            <div className="form-group mb-4 textOnInput ">
                                <div className='form-row '>
                                    <div className="col-lg-6 col-md-6 col-sm-11 mb-3">
                                        <label>تامین کننده</label>
                                        <Select placeholder='انتخاب '
                                            className='opacityForInput border-danger'
                                            styles={{
                                                // Fixes the overlapping problem of the component
                                                menu: provided => ({ ...provided, zIndex: 9999 })
                                              }}
                                            options={inputSuppliers()}
                                            onChange={e => {
                                                setSupplierId(e.value)

                                                validator.current.showMessageFor("required");

                                            }}
                                        />
                                        {supplierId === 0 ? <span className="text-danger">یک تامین کننده را انتخاب کنید</span> : ''}

                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-11 mb-3">
                                    <label>نوع تامین</label>

                                        <Select placeholder='انتخاب'
                                           styles={{
                                            // Fixes the overlapping problem of the component
                                            menu: provided => ({ ...provided, zIndex: 9999 })
                                          }}
                                            className='opacityForInput border-danger'
                                            options={SupplyTypes()}
                                            onChange={e => {
                                                setSupplyTypeId(e.value)

                                                validator.current.showMessageFor("required");

                                            }}
                                        />
                                        {supplyTypeId === 0 ? <span className="text-danger">یک نوع تامین را انتخاب کنید</span> : ''}

                                    </div>

                                </div>

                            </div>
                            <div className="form-group mb-4 textOnInput  ">
                                <div className='form-row'>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3 mb-">
                                        <label >مقدار</label>
                                        <input type="text" className=" value form-control opacityForInput" value={formatter.format(quantity)}
                                            onChange={e => {
                                                setQuantity(e.target.value.replaceAll("," ,""))
                                                validator.current.showMessageFor("required");

                                            }} />
                                        {validator.current.message("required", quantity, "required")}
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3 ">
                                        <label >کد کوتاژ</label>
                                        <input type="text" className="form-control opacityForInput" value={cottageCode}
                                            onChange={e => {
                                                 setCottageCode(e.target.value)
                                                validator.current.showMessageFor("required");

                                            }} />
                                        {validator.current.message("required", quantity, "required|numeric")}
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-11 mb-3 ">
                                        <label >شماره قرارداد</label>
                                        <input type="text" className="form-control opacityForInput" value={contractNumber}
                                            onChange={e => {
                                                setContractNumber(e.target.value)
                                                validator.current.showMessageFor("required");

                                            }} />
                                        {validator.current.message("required", contractNumber, "required|numeric")}
                                    </div>

                                </div></div>
                            <div className="form-group mb-4 textOnInput">
                                <label >توضیحات</label>

                                <textarea type="textarea" className="form-control opacityForInput " rows='4' placeholder='توضیحات تکمیلی' value={comment} onChange={e => {
                                    setComment(e.target.value)
                                    validator.current.showMessageFor("required");
                                }} />
                                {validator.current.message("required", comment, "required")}

                            </div>

                        </div>
                        <div className="form-group">
                            <div className="form-check pl-0">
                                <div className="custom-control custom-checkbox checkbox-info">

                                </div>
                            </div>
                        </div>
                        <div className='row justify-content-between'>
                            <div className='col-lg-6 col-md-6 col-sm-11 '>
                                {validator.current.allValid()
                                    ? <button disabled={productId === 0 || wareHouseId === 0 || supplierId === 0 || measureUnitId === 0 || supplyTypeId === 0 ? true : false} type="submit" className="btn btn-success float-left " onClick={submit}>تایید<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>
                                    : <button disabled={true} type="submit" className="btn btn-success float-left " onClick={submit}>تایید<ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>  }

                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-11 '>
                                <NavLink to='/admin/supply' className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default NewSupply