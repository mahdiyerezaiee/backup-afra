import react, { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { SetProduct } from "../../../services/productService";

import { toast } from 'react-toastify';

import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { SetProductWareHouses } from "../../../services/prodcutWarehouse";
import { MeasureUnitSample } from "../../../Enums/MeasureUnitSample";
import { GetAllWareHouses } from "../../../services/wareHouseService";
import { GetAttribute, SetAttributeValues } from "../../../services/attributeService";
import {GetGroupsForEntity} from "../../../services/GroupService";
import {ClipLoader} from "react-spinners";



const NewProduct = () => {
    const navigate = useNavigate();
    const [warehouse, setwarehouse] = useState([]);
    const [active, setActive] = useState(true)
    const [name, setName] = useState('')
    const [englishName, setEnglishName] = useState('')
    const [price, setPrice] = useState(0)
    const [minSellableAmount, setMinSellableAmount] = useState(0)
    const [maxSellableAmount, setMaxSellableAmount] = useState(0)
    const [measureUnitId, setMeasureUnitId] = useState(0)
    const [measureUnit, setMeasureUnit] = useState(0);
    let productId = 0;
    const [group , setGroup]=useState([])
    const [groupId , setGroupId]=useState(0)
    const [wareHouseId, setwareHouseId] = useState(0);
    const [productG, setProductG] = useState([])
    const [attValue, setAttValue] = useState('')
    const [loading, setLoading] = useState(false);

    const GetGroup =async () => {
      try {
          const {data , status}= await GetGroupsForEntity(2)
          setGroup(data.result.groups)
      }catch (err){
          console.log(err)
      }
    }

    const GetProductGroup = async () => {
        const { data, status } = await GetAttribute(1003);
        if (status === 200) {

            const response = data.result.attribute.controlTypeValues;

            const myArray = response.split(",");
            const FormateValue = () => {

                return (myArray.map(data => ({ id: Number(data.slice(0, 1)), value: data.slice(2, 100) })))
            }

            setProductG(FormateValue());
        }

    }

    const product = {
        name,
        englishName,
        price,
        active,
        minSellableAmount,
        maxSellableAmount,
        measureUnitId,
        measureUnit:measureUnitId,
        groupId,

    };
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
        , element: message => <p style={{ color: 'red' }}>{message}</p>
    }));
    const setAttributevalue = async () => {

        const attribute = {
            "attributeValues": [
                {

                    attributeTypeId: 1003,
                    entityId: productId,
                    value: `${attValue}`
                }
            ]
        }

        try {
            const { data, status } = await SetAttributeValues(attribute)
        } catch (error) {
            console.log(error);
        }
    }
    const setproductware = async () => {
        const wareProduct = {
            productWareHouses: [{
                productId,
                wareHouseId,
                wareHouseName: "",
                quantity: 0,
                consumableQuantity: 0,
                reservedQuantity: 0

            }]
        }
        try {
            const { data, status } = await SetProductWareHouses(wareProduct)
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
                navigate('/admin/productList')

            }

        } catch (error) {
            console.log(error)
        }



    }
  
    useEffect(() => {


    GetGroup()
        GetProductGroup();

    }, []);

    const submit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const { data, status } = await SetProduct(product);
            if (status === 200) {
                setLoading(false)
                productId = (data.result.product.id); 
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                navigate('/admin/productList')
                
               }

            await setAttributevalue();
           
        }



        catch (error) {
            console.log(error);
        }



    };

    const Mesures = () => {
        return (MeasureUnitSample.map(data => ({ label: data.name, value: data.id })));
    }
    const inputWarehouses = () => {
        return (warehouse.map(data => ({ label: data.name, value: data.id })));
    }
    const inputProductG = () => {
        return (group.map(data => ({ label: data.name, value: data.id })))
    }
    return (

        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف کالا</h5>
                    <p>در این بخش می توانید کالای جدید تعریف  کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-6 col-xs-12'>


                    <form className="col-8">
                        <div className="n-chk d-flex  mb-4">

                            <div>
                                <label className="mr-2"> فعال </label>

                                <input type="checkbox" defaultChecked={active} onChange={e => {
                                    setActive(e.checked)
                                    validator.current.showMessageFor("required");

                                }}
                                />

                            </div>
                        </div>
                        <div className="form-group mb-4 textOnInput  align-content-between">

                            <label>نام کالا</label>
                            <input type="text" className="form-control opacityForInput" placeholder="کنجاله ، ذرت و..."
                                value={name} onChange={e => {
                                    setName(e.target.value)
                                    validator.current.showMessageFor("required");

                                }} />
                            {validator.current.message("required", name, "required|alpha")}

                        </div>
                        <div className="form-group mb-4 textOnInput">
                            <label>کد بازارگاه</label>
                            <input type="text" className="form-control opacityForInput" placeholder="... Corn Seed "
                                value={englishName} onChange={e => {
                                    setEnglishName(e.target.value)
                                    validator.current.showMessageFor("required");

                                }} />
                            {validator.current.message("required", englishName, "required")}

                        </div>

                        <div className="form-group mb-4 textOnInput">
                            <div className='form-row'>
                                <div className="col-6">

                                    <label>واحد</label>
                                    <Select
                                        placeholder={validator.current.showMessageFor("required") ? "Normal text placeholder" : <span className="text-danger">خالی است </span>}

                                        options={Mesures()}
                                        onChange={e => {
                                            setMeasureUnitId(e.value)
                                            validator.current.showMessageFor("required");

                                        }}
                                    />
                                    {validator.current.message("required", Mesures, "required")}


                                </div>

                                <div className="col-6" >
                                    <label>گروه کالا</label>

                                    <Select
                                        placeholder={validator.current.showMessageFor("required") ? "Normal text placeholder" : <span className="text-danger">خالی است </span>}
                                        options={inputProductG()}
                                        onChange={e => {
                                            setGroupId(e.value)
                                            validator.current.showMessageFor("required");

                                        }}
                                    />
                                    {validator.current.message("required", inputWarehouses, "required")}


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
                                <button type="submit" disabled={loading} className="btn btn-success float-left " onClick={submit}>تایید  <ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                            </div>
                            <div className='col-6 '>
                                <NavLink to='productList' className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>


                    </form>
                </div >
            </div >
        </div>

    );
}
export default NewProduct