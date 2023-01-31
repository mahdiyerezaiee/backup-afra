import {useSelector} from "react-redux";
import {useState, useEffect, useCallback} from "react";
import {GetAllNewsForAdmin, GetAllNewsForUsers, SetNews} from "../../../services/newsService";
import {toast} from "react-toastify";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {Field, Form, Formik} from "formik";
import {validateRequired} from "../../../Utils/validitionParams";
import { RootState } from "../../../store";

const EditNews:React.FC = () => {
    const user = useSelector((state:RootState) => state.user);
    const params = useParams()
    const navigate = useNavigate()
    const [newss, setNewss] = useState([])
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

    const [active, setActive] = useState(true)
    const creatorId = user.id



        const getNewsAdmin =useCallback(async  () => {
            try {
                const {data, status} = await GetAllNewsForUsers()

                    setMessage( data.result.news.values.filter((item:any) => item.id == params.id).map((item:any)  => item.message)[0])


                    setTitle( data.result.news.values.filter((item:any)  => item.id == params.id).map((item:any)  => item.title)[0])


            } catch (err) {
                console.log(err)
            }


        },[])



useEffect(()=>{

    getNewsAdmin()

},[])


    const setNews = {
        news: {
            id: params.id,
            title,
            message,
            creatorId,
            active,
            createDate:new Date()
        }
    }

    const addNews = async () => {
        setLoading(true)
        try {
            const {data, status} = await SetNews(setNews)
            if (data.success === 200) {
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
        navigate('/admin/user-news')
setLoading(false)
    }
    const submit = () => {
        addNews()
    }
    return (
        <div className='user-progress'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5>ویرایش اعلان</h5>
                    <p>در این بخش می توانید اعلان های خود را ویرایش کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className=' box  col-lg-4'>

                    <Formik
                        initialValues={{
                            id: params.id,
                            title,
                            message,
                            creatorId,
                            active,
                            createDate:new Date()
                        }}
                        enableReinitialize={true}
                        onSubmit={values => {
                            // same shape as initial values
                            submit()
                        }}>
                        {({ errors, touched, validateField, validateForm,setFieldValue ,handleChange,values}) => (



                            <Form  className="col" >

                                <div className="n-chk d-flex  mb-4">

                                    <div>
                                        <label className="mr-2"> فعال  </label>

                                        <input type="checkbox" defaultChecked={active}  onChange={(e:any)=>setActive(e.checked)} />

                                    </div>
                                </div>
                                <div className="form-group mb-4 textOnInput  align-content-between">

                                    <label >عنوان</label>
                                    <Field  validate={validateRequired} name="title" type="text" className="form-control opacityForInput" placeholder="عنوان اعلان" value={title} onChange={(e:any) => setTitle(e.target.value)} />
                                    {errors.title && touched.title && <div className="text-danger">{errors.title}</div>}

                                </div>
                                <div className="form-group mb-4 textOnInput">
                                    <label >متن</label>
                                    <Field  validate={validateRequired} name="message"   as="textarea"  className="form-control opacityForInput" placeholder="متن اعلان" value={message} onChange={(e:any) => setMessage(e.target.value)}  rows='10'/>
                                    {errors.message && touched.message && <div className="text-danger">{errors.message}</div>}

                                </div>
                                <div className='row'>
                                    <div className='col-6 '>
                                        <button disabled={loading} type="submit" className="btn btn-success float-left"  >تایید  <ClipLoader

                                            loading={loading}
                                            color="#ffff"
                                            size={15}
                                        /></button>
                                    </div>
                                    <div className='col-6 '>
                                        <NavLink to='/admin/user-news' className="btn btn-danger float-right">بازگشت</NavLink>
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
export default EditNews