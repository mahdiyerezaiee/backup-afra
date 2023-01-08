import { NavLink, useParams,useNavigate } from "react-router-dom";
import {  getEditProduct, SetProduct } from "../../../services/productService";
import { useEffect, useState } from "react";
import { useRef } from "react";
import SimpleReactValidator from "simple-react-validator";
import { toast } from "react-toastify";
import Select from "react-select";
import { MeasureUnitSample } from "../../../Common/Enums/MeasureUnitSample";
import { GetAllWareHouses } from "../../../services/wareHouseService";
import { GetProductWareHouses } from "../../../services/prodcutWarehouse";
import { GetAttribute, SetAttributeValues } from "../../../services/attributeService";
import { GetAttributeValues } from '../../../services/attributeService';
import ProductWareHouseEdit from "../../../Common/Shared/Common/productWareHouseEdit";
import {GetGroupsForEntity} from "../../../services/GroupService";
import {ClipLoader} from "react-spinners";

const EditProduct = () => {
    const params = useParams()
    const [, forceUpdate] = useState();
    const id = params.id
    const [active, setActive] = useState()
    const [warehouse, setwarehouse] = useState([]);
    const [wareHouse, setWareHouse] = useState([]);
    const [group , setGroup]=useState([])
    const [groupId , setGroupId]=useState(0)
    const navigator=useNavigate();
    const [name, setName] = useState('')
    const [englishName, setEnglishName] = useState('')
    const [price, setPrice] = useState('')
    const [minSellableAmount, setMinSellableAmount] = useState('')
    const [maxSellableAmount, setMaxSellableAmount] = useState('')
    const [measureUnitId, setMeasureUnitId] = useState('')
    const [productG, setProductG] = useState([])
    const[attributeValue,setattributeValue]=useState({})
    const [isSubmit , setIsSubmit]=useState(false)
    let attvalue;
    const [loading, setLoading] = useState(false);

    const[attValues,setattValues]=useState(0)

    const getProducts = async () => {
        const { data, status } = await getEditProduct(params.id);
        setActive(data.result.product.active);
        setName(data.result.product.name);
        setEnglishName(data.result.product.englishName);
        setPrice(data.result.product.price);
        setMinSellableAmount(data.result.product.minSellableAmount);
        setMaxSellableAmount(data.result.product.maxSellableAmount);
        setMeasureUnitId(data.result.product.measureUnitId);
        setGroupId(data.result.product.groupId)
    }
    const GetProductGroup = async () => {
        const { data, status } = await GetAttribute(1003);
        if (status === 200) {

            const response = data.result.attribute.controlTypeValues;

            const myArray = response.split(",");

            const FormateValue = () => {

                return (myArray.map(data => ({ id: Number(data.slice(0, 1)), value: data.slice(2, 100) })))
            }
            setProductG(FormateValue());}
    }
    const getPoroductWareHouses = async () => {
        const { data, status } = await GetProductWareHouses(params.id)
        setWareHouse(data.result.productWareHouses)}
    useEffect(() => {
        GetGroup()

        getPoroductWareHouses()
        getProducts();
        GetProductGroup();
        }, [])

    const UpdateProduct = {
        id,
        active,
        name,
        englishName,
        price,
        maxSellableAmount,
        minSellableAmount,
        measureUnitId,
        measureUnit:measureUnitId,
        groupId,
    }
    const GetGroup =async () => {
        try {
            const {data , status}= await GetGroupsForEntity(2)
            setGroup(data.result.groups)
        }catch (err){
            console.log(err)
        }
    }
    const updateAttrte=async()=>{

        const body={
            "attributeValues": [
                {
                    id: attributeValue.id,
                    attributeTypeId: 1003,
                    entityId: id,
                    value: `${attValues}`
                }
            ]
        }
        try {
            const{data,status}=await SetAttributeValues(body)

        } catch (error) {
            console.log(error);
        }
    }
    const submit = async (event) => {
        setLoading(true)
        event.preventDefault();

        try {
            if (validator.current.allValid()) {

                const { data, status } = await SetProduct(UpdateProduct);

                await updateAttrte();
                if (status === 200) {
                    setIsSubmit(true)

                    toast.success('تغییرات با موفیت ثبت شد', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    });
                    navigator('/admin/productList')

                }

            } else {

                validator.current.showMessages();

                forceUpdate(1);
            }
            setLoading(false)

        } catch (error) {
            console.log(error);
        }



    };

    const validator = useRef(new SimpleReactValidator({
        validators: {
            alpha: {
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[A-Z آابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]*$/i,) && params.indexOf(val) === -1;}
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

    const WareHouses = async () => {
        try {
            const { data, status } = await GetAllWareHouses();
            if (status === 200) {
                setwarehouse(data.result.wareHouses)
            }
        } catch (error) {
            console.log(error);
        }}
    const GetAttValues=async ()=>{
        try {
            const{data,status}=await GetAttributeValues(1003,id);
            if(status===200){
                attvalue=data.result.attributeValue.value
                setattValues(data.result.attributeValue.value)
                setattributeValue(data.result.attributeValue)
              
            }

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(
        () => {
            WareHouses();
            GetAttValues();
            }, []);
    const Mesures = () => {
        return (MeasureUnitSample.map(data => ({ label: data.name, value: data.id })));
    }
    const inputWarehouses = () => {
        return (warehouse.map(data => ({ label: data.name, value: data.id })));
    }
    let MeasureId = MeasureUnitSample.filter(item => item.id === measureUnitId).map(item => item.name)
    let MEASURE = MeasureId[0]
    let WareHousesItem = wareHouse.filter(item => item.id !== 0).map(item => item.wareHouseName)
    let WAREHOUSESEITEM = WareHousesItem[0]
    let WareHousesId = warehouse.filter(item => item.name === WAREHOUSESEITEM).map(item => item.id)
    let WAREHOUSESEID = WareHousesId[0]

    const inputProductG=()=>{
        return(group.map(data=>({label:data.name,value:data.id})))
    }
    const currentProductG=()=>{
        if (groupId === null){
            setGroupId(0)
        }

        return(group.filter(data=>data.id === groupId).map(item=>({label:item.name,id:item.id})))
    }
    return (
        <div className='user-progress' >
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                <h5 >ویرایش کالا</h5>
                <p>در این بخش می توانیداطلاعات کالا را ویرایش کنید.</p>
            </div>
        </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-8 col-xs-12'>
                    <form>
                        <div className="n-chk d-flex  mb-4">
                            <div>
                                <label className="mr-2"> فعال </label>
                                <input type="checkbox" checked={active} onChange={e => {
                                    setActive(e.target.checked)
                                    validator.current.showMessageFor("required");}}/>
                            </div>
                        </div>
                        <div className="form-group mb-4 textOnInput  align-content-between">
                            <div className='form-row'>
                                <div className="col-lg-6 col-sm-12  mt-3">
                            <label>نام کالا</label>
                            <input type="text" className="form-control opacityForInput" placeholder="کنجاله ، ذرت و..."
                                   value={name} onChange={e => {
                                setName(e.target.value)
                                validator.current.showMessageFor("required");}} />
                            {validator.current.message("required", name, "required|alpha")}
                                </div>
                                <div className="col-lg-6 col-sm-12 mt-3">
                            <label>کد بازارگاه</label>
                            <input type="text" className="form-control opacityForInput" placeholder="... Corn Seed "
                                   value={englishName} onChange={e => {
                                setEnglishName(e.target.value)
                                validator.current.showMessageFor("required");}} />
                            {validator.current.message("required", englishName, "required")}
                                </div>
                        </div>
                        </div>

                        <div className="form-group mb-4 textOnInput">
                            <div className='form-row'>
                                <div className="col-lg-6 col-sm-12 mt-3">
                                    <label>واحد</label>
                                    <Select

                                        value={{ label: MEASURE, id: measureUnitId }}
                                        options={Mesures()}
                                        onChange={e => setMeasureUnitId(e.value)}
                                    />
                                    {measureUnitId === 0 ? (<p className="text-danger"> لطفایک واحد  را انتخاب کنید </p>) : (<p></p>)}
                                </div>

                                <div className="col-lg-6 col-sm-12 mt-3" >
                                    <label>گروه کالا</label>
                                    <Select
                                        placeholder="گروه کالا ..."
                                        options={inputProductG()}
                                        value={currentProductG()}
                                        onChange={e=>setGroupId(e.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row '>
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

                </div>

            </div>
            <ProductWareHouseEdit id={params.id} submit={isSubmit}/>

        </div>
    )
}
export default EditProduct