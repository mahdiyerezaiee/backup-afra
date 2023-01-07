import react, {Fragment, useEffect, useState, useRef} from "react";
import {useNavigate, NavLink, useParams} from "react-router-dom";

import {toast} from 'react-toastify';

import SimpleReactValidator from 'simple-react-validator';

import {GetAllShippingCompanies, GetShoppingContract, SetShippingCompany, SetShoppingContract} from "../../../../services/ShippingService";
import {MeasureUnitSample} from "../../../../Enums/MeasureUnitSample";
import Select from "react-select";
import {getEditProduct} from "../../../../services/productService";
import {ClipLoader} from "react-spinners";


const EditShippingContract = () => {
    const params = useParams()
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [contractNumber, setContractNumber] = useState('')
    const[shippingCompany,SetShippingCompany]=useState([]);
    const[shippingCompanyId,setshippingCompanyId]=useState(0)
    const [measureUnitId, setMeasureUnitId] = useState(0)
    const [contract,setContract]=useState([])
    const [quantity, setQuantity] = useState(0)
    const [createDate, setCreateDate] = useState('')


    const ShippingContract = async () => {
        try {
            const {data, status} = await GetShoppingContract(params.id);
            setContract(data.result.shippingContract);
            setContractNumber(data.result.shippingContract.contractNumber)
            setMeasureUnitId(data.result.shippingContract.measureUnitId);
            setshippingCompanyId(data.result.shippingContract.shippingCompanyId)
            setQuantity(data.result.shippingContract.quantity);
            setCreateDate(data.result.shippingContract.createDate)
        } catch (error) {
            console.log(error);
        }

      
    }

const getBarbaris=async()=>{
        try {
            const{data,status}=await GetAllShippingCompanies();
            if (status===200) {
                SetShippingCompany(data.result.shippingCompanies.values)
            }
        } catch (error) {
            console.log(error);
        }
    }
   
useEffect(()=>{
    ShippingContract()
    getBarbaris()
},[])
const ShoppingContract = 
{shippingContract:{
    id:Number(params.id),
    contractNumber,
    shippingCompanyId,
    measureUnitId,
    quantity,
    createDate,


}};
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
        return (MeasureUnitSample.map(data => ({label: data.name, value: data.id})));
    }
    const barbari=()=>{
        return(shippingCompany.map(data=>({label:data.name,value:data.id}))
        );
    }
    const submit = async (event) => {
        setLoading(true)
        event.preventDefault();
        try {
            const {data, status} = await SetShoppingContract(ShoppingContract);
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
                navigate('/admin/ShippingContract')

            }


        } catch (error) {
            console.log(error);
        }
setLoading(false)

    };
    let MeasureId = MeasureUnitSample.filter(item => item.id === measureUnitId).map(item => item.name)
    let MEASURE = MeasureId[0]
    let compnayId=shippingCompany.filter(item=>item.id===shippingCompanyId).map(item=>item.name)
    let COMPANY=compnayId[0]

    return (

        <div className='user-progress'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5>تعریف قرارداد باربری</h5>
                    <p>در این بخش می توانید قرارداد باربری جدید تعریف کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-md-4 col-xs-12'>


                    <form className="col-lg-8">

                        <div className="form-group mb-4 textOnInput  align-content-between">

                            <label>شماره قرارداد</label>
                            <input type="text" className="form-control opacityForInput" placeholder="شماره قرارداد "
                                   value={contractNumber} onChange={e => {
                                setContractNumber(e.target.value)
                                validator.current.showMessageFor("required");

                            }}/>
                            {validator.current.message("required", contractNumber, "required")}

                        </div>

                        <div className="form-group mb-4 textOnInput">
                            <label>مقدار</label>
                            <input type="text" className="form-control opacityForInput" value={quantity}
                                   onChange={e => {
                                       setQuantity(e.target.value)
                                       validator.current.showMessageFor("required");

                                   }}/>
                            {validator.current.message("required", quantity, "required|numeric")}

                        </div>
                        <div className="form-group mb-4 textOnInput">

                            <div className='form-row'>
                                <div className="col-12">

                                    <label>واحد</label>
                                    <Select
                                        placeholder={validator.current.showMessageFor("required") ? "Normal text placeholder" :
                                            <span className="text-danger">خالی است </span>}
                                        value={{ label: MEASURE, id: measureUnitId }}
                                        options={Mesures()}
                                        onChange={e => {
                                            setMeasureUnitId(e.value)
                                            validator.current.showMessageFor("required");

                                        }}
                                    />
                                    {validator.current.message("required", Mesures, "required")}


                                </div>

                            </div>
                            <div className='form-row mt-4'>
                                <div className="col-12">

                                    <label>باربری</label>
                                    <Select
                                        placeholder={validator.current.showMessageFor("required") ? "Normal text placeholder" :
                                            <span className="text-danger">خالی است </span>}
                                        value={{ label: COMPANY, id: shippingCompanyId }}
                                        options={barbari()}
                                        onChange={e => {
                                            setshippingCompanyId(e.value)
                                            validator.current.showMessageFor("required");

                                        }}
                                    />
                                    {validator.current.message("required", Mesures, "required")}


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
                            <div className='col-lg-6 '>
                                <button disabled={loading} type="submit" className="btn btn-success float-left " onClick={submit}>تایید <ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                            </div>
                            <div className='col-lg-6 '>
                                <NavLink to='ShippingContract'
                                         className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    );
}
export default EditShippingContract