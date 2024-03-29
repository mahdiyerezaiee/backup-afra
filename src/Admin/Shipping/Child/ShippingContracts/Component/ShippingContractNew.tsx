import react, {Fragment, useEffect, useState, useRef} from "react";
import {useNavigate, NavLink} from "react-router-dom";
import {toast} from 'react-toastify';
import {GetAllShippingCompanies, SetShippingCompany, SetShoppingContract} from "../../../../../services/ShippingService";
import {MeasureUnitSample} from "../../../../../Common/Enums/MeasureUnitSample";
import Select from "react-select";
import {ClipLoader} from "react-spinners";
import {Field, Form, Formik} from "formik";
import {validatNumber} from "../../../../../Utils/validitionParams";
import {formatter} from "../../../../../Utils/Formatter";


const NewShippingContract :React.FC= () => {
    const navigate = useNavigate();
    const [contractNumber, setContractNumber] = useState('')
const[shippingCompany,SetShippingCompany]=useState([]);
const[shippingCompanyId,SetshippingCompanyId]=useState<any>();
    const [measureUnitId, setMeasureUnitId] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [loading, setLoading] = useState(false);

    const ShippingContract = 
    {shippingContract:{
    
        contractNumber,
        shippingCompanyId,
        measureUnitId,
        quantity,
        createDate: new Date(),


    }};

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
        getBarbaris();
    },[])
    const Barbaries=()=>{
        return(shippingCompany.map((data:any)=>({label:data.name,value:data.id})))
    }
    const Mesures = () => {
        return (MeasureUnitSample.map((data:any) => ({label: data.name, value: data.id})));
    }
    const submit = async () => {
        setLoading(true)
        try {
            const {data, status} = await SetShoppingContract(ShippingContract);
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


    return (

        <div className='user-progress'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5>تعریف قرارداد باربری</h5>
                    <p>در این بخش می توانید قرارداد باربری جدید تعریف کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='   col-md-8 col-lg-8 col-sm-12 m-2'>

                    <Formik
                        initialValues={{
                            contractNumber,
                            shippingCompanyId,
                            measureUnitId,
                            quantity,
                            createDate: new Date(),
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            submit()
                        }}>
                        {({errors, touched, validateField, validateForm, setFieldValue, handleChange, values}) => (


                            <Form className="row">

                                <div className=" col-lg-6 col-sm-12 form-group mb-4 textOnInput  align-content-between">

                                    <label>شماره قرارداد</label>
                                    <Field validate={validatNumber} name="contractNumber" type="text"
                                           className="form-control opacityForInput" placeholder="شماره قرارداد"
                                           value={contractNumber} onChange={(e: any) => {
                                        setContractNumber(e.target.value)

                                    }}/>
                                    {errors.contractNumber && touched.contractNumber &&
                                        <div className="text-danger">{errors.contractNumber}</div>}

                                </div>

                                <div className="col-lg-6 col-sm-12 form-group mb-4 textOnInput">
                                    <label>مقدار</label>
                                    <Field validate={validatNumber} name="quantity" type="text"
                                           className="form-control opacityForInput" value={formatter.format(quantity)}
                                           onChange={(e: any) => {
                                               setQuantity(e.target.value.replaceAll(",", ""))

                                           }}/>
                                    {errors.quantity && touched.quantity &&
                                        <div className="text-danger">{errors.quantity}</div>}

                                </div>
                                <div className=" col-lg-6 col-sm-12 form-group mb-4 textOnInput">


                                    <label>واحد</label>
                                    <Select
                                        menuShouldScrollIntoView={false}
                                        placeholder="واحد"

                                        options={Mesures()}
                                        onChange={(e: any) => {
                                            setMeasureUnitId(e.value)

                                        }}
                                    />


                                </div>
                                <div className='col-lg-6 col-sm-12 form-group mb-4 textOnInput'>

                                    <label>باربری</label>
                                    <Select
                                        menuShouldScrollIntoView={false}
                                        placeholder="باربری"

                                        options={Barbaries()}
                                        onChange={(e: any) => {
                                            SetshippingCompanyId(Number(e.value))

                                        }}
                                    />


                                </div>

                                <div className='col-6 '>
                                    <button disabled={loading} type="submit"
                                            className="btn btn-success float-right ">تایید <ClipLoader

                                        loading={loading}
                                        color="#ffff"
                                        size={15}
                                    /></button>
                                </div>
                                <div className='col-6  '>
                                    <NavLink to='/admin/ShippingContract'
                                             className="btn btn-danger ">بازگشت</NavLink>
                                </div>


                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>

    );
}
export default NewShippingContract