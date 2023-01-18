import Select from "react-select";
import {GetAddress, GetAllProvince, SetAddress} from "../../../services/addressService";
import {toast} from "react-toastify";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate , useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {Field, Form, Formik} from "formik";
import {validateRequired, validatmin10, validatMobail, validatNumber} from "../../../Utils/validitionParams";

const EditAddress = () => {
    const params =useParams()
    const user=useSelector(state=>state.user);
    const navigate=useNavigate()
    const [province, setProvince] = useState([]);
    const[provinceId,setProvinceId]=useState(0);
    const [fullAddress, setFulAddress] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [receiverTel, setreceiverTel] = useState('');
    const [receiverMobile, setreceiverMobile] = useState('');
    const[ostanId,setOstanId]=useState(0);
    const GetAddresUser= async ()=>{
        const {data , status} = await GetAddress(1, user.id )
        let address = data.result.addresses.filter(i=> i.id === Number(params.id))[0]
        setFulAddress(address.fullAddress)
        setpostalCode(address.postalCode)
        setreceiverMobile(address.receiverMobile)
        setreceiverTel(address.receiverTel)
        setProvinceId(address.provinceId)
    }
    console.log(provinceId)

    const getProvince = async () => {

        const { data, status } = await GetAllProvince();
        setProvince(data.result.provinces);

    }
    useEffect(() => {
            GetAddresUser()
            getProvince();

        }, []);
    const Allcities = province.filter(data => data.parentId !== null);
    const cities =Allcities.filter(data=>data.parentId===ostanId)
    const ostan = province.filter(data => data.parentId === null);
    const ProvincerenderList = () => {
        return (ostan.map(data => ({ label: data.name, value: data.id })))
    }
    const Provincerender = () => {
        return (ostan.filter(data => data.id === Number(provinceId)).map(data => ({ label: data.name, value: data.id })))
    }

    const CitiesrenderList = () => {
        return (cities.map(data => ({ label: data.name, value: data.id })))
    }
    const body={
        address:{
            id:0,
            provinceId,
            fullAddress,
            postalCode,receiverTel,receiverMobile
        },
        entityTypeId:1,
        entityId:Number( localStorage.getItem('connect'))
    }
    const backHandel=(e)=>{
        e.preventDefault()

        navigate(-1)
    }
    const addressSetHandler =async () => {
        try {

            const {data,status}=await SetAddress(body);
            if(status===200){
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
            }

        } catch (error) {
            console.log(error)
        }



    }
  return(
      <div className="">
          <div className='row d-flex justify-content-center col-12'>

              <div className='widget box shadow col-md-6 col-xs-12'>


                  <Formik
                      initialValues={{
                          id:0,
                          provinceId,
                          fullAddress,
                          postalCode,receiverTel,receiverMobile
                      }}
                      enableReinitialize={true}
                      onSubmit={values => {
                          // same shape as initial values
                          addressSetHandler()
                      }}>
                      {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (



                          <Form >

                      <div className="form-group mb-4 textOnInput">
                          <label>آدرس</label>
                          <Field  validate={validateRequired} name="fullAddress" type="text" className="form-control opacityForInput" placeholder="تهران ، اسلام شهر و ...." value={fullAddress}  onChange={e=> {
                              setFulAddress(e.target.value)

                          }}/>
                          {errors.fullAddress && touched.fullAddress && <div className="text-danger">{errors.fullAddress}</div>}

                      </div>

                      <div className="form-row mb-4 textOnInput">
                          <div className="form-group col-md-4">
                              <label >تلفن </label>
                              <Field  validate={validatNumber} name="receiverTel" type="text" className="form-control" id="inputCity"  value={receiverTel}  onChange={e=> {
                                  setreceiverTel(e.target.value)

                              }}/>
                              {errors.receiverTel && touched.receiverTel && <div className="text-danger">{errors.receiverTel}</div>}

                          </div>

                          <div className="form-group col-md-4">

                              <label > موبایل</label>
                              <Field  validate={validatMobail} name="receiverMobile"  type="text" className="form-control" id="inputZip"  value={receiverMobile}  onChange={e=> {
                                  setreceiverMobile(e.target.value)

                              }} />
                              {errors.receiverMobile && touched.receiverMobile && <div className="text-danger">{errors.receiverMobile}</div>}

                          </div>
                          <div className="form-group col-md-4">

                              <label >کد پستی</label>
                              <Field  validate={validatmin10} name="postalCode" type="text" className="form-control" id="inputZip" value={postalCode}  onChange={e=> {
                                  setpostalCode(e.target.value)


                              }} />
                              {errors.postalCode && touched.postalCode && <div className="text-danger">{errors.postalCode}</div>}

                          </div>
                      </div>

                      <div className="form-row  textOnInput">
                          <div className="form-group col-md-6">
                              <label>استان</label>
                              <Select
                                  placeholder='استان'
                                  options={ProvincerenderList()}
                                  onChange={e=>{setOstanId(e.value)
                                  }}
                              />
                              {ostanId ===0 ?<span className="text-danger">استان خود را انتخاب کنید</span> :null }

                          </div>
                          <div className="form-group col-md-6">

                              <label >شهر</label>
                              <Select
                                  placeholder='شهر'
                                  options={CitiesrenderList()}
                                  className='form-group'
                                  onChange={e=>setProvinceId(e.value)}
                              />
                              {provinceId ===0 ?<span className="text-danger">شهر خود را انتخاب کنید</span> :null }

                          </div>


                      </div>
                      <div className='form-row  tesxOnInput'>

                      </div>
                      <div className='form-row  tesxOnInput'>

                      </div>
                      <div className="form-group">
                          <div className="form-check pl-0">
                              <div className="custom-control custom-checkbox checkbox-info">

                              </div>
                          </div>
                      </div>
                      <div className='row justify-content-between mt-4'>
                          <div >
                              <button  type="submit" className="btn btn-success">ذخیره تغییرات</button>
                          </div>
                          <div >
                              <button  onClick={backHandel} className="btn btn-primary">بازگشت</button>
                          </div>
                      </div>




                          </Form>
                      )}
                  </Formik>
              </div >
          </div >

      </div>
  )
}
export default  EditAddress