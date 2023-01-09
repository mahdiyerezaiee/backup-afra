import {useSelector} from "react-redux";
import {useState, useEffect, useCallback} from "react";
import {GetAllNewsForAdmin, GetAllNewsForUsers, SetNews} from "../../../services/newsService";
import {toast} from "react-toastify";
import {Navigate, NavLink, useNavigate, useParams} from "react-router-dom";
import {ClipLoader} from "react-spinners";

const EditNews = () => {
    const user = useSelector(state => state.user);
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

                    setMessage( data.result.news.values.filter(item => item.id == params.id).map(item => item.message)[0])


                    setTitle( data.result.news.values.filter(item => item.id == params.id).map(item => item.title)[0])


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
    const submit = (e) => {
        e.preventDefault()
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
                <div className='widget box shadow col-lg-4'>


                    <form className="col">
                        <div className="n-chk d-flex  mb-4">

                            <div>
                                <label className="mr-2"> فعال </label>

                                <input type="checkbox" defaultChecked={active} onChange={e => setActive(e.checked)}/>

                            </div>
                        </div>
                        <div className="form-group mb-4 textOnInput  align-content-between">

                            <label>عنوان</label>
                            <input type="text" className="form-control opacityForInput"
                                   value={title} onChange={e => setTitle(e.target.value)}/>

                        </div>
                        <div className="form-group mb-4 textOnInput">
                            <label>متن</label>
                            <textarea className="form-control opacityForInput"  value={message}
                                      onChange={e => setMessage(e.target.value)} rows="10"/>
                        </div>
                        <div className='row'>
                            <div className='col-lg-6 '>
                                <button disabled={loading} type="submit" className="btn btn-success float-left" onClick={submit} >تایید  <ClipLoader

                                    loading={loading}
                                    color="#ffff"
                                    size={15}
                                /></button>
                            </div>
                            <div className='col-lg-6 '>
                                <NavLink to='/admin/user-news' className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>


                    </form>
                </div>
            </div>
        </div>

    )

}
export default EditNews