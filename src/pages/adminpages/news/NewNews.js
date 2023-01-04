import {useState} from "react";
import {useSelector} from "react-redux";
import {SetNews} from "../../../services/newsService";
import {toast} from "react-toastify";
import Select from "react-select";
import {NavLink,useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";

const NewNews = () => {
    const user=useSelector(state=>state.user);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [active , setActive]=useState(true)
        const navigator=useNavigate();
    const creatorId= user.id
const setNews = {
    news:{
        title,
        message,
        creatorId,
        active
    }
}
const addNews = async ()=>{
        setLoading(true)
   try {
       const {data , status}= await SetNews(setNews)
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
        navigator('/user-news')


    }

} catch (error) {
        console.log(error)
    }
    setLoading(false)
}
const submit=(e)=>{
        e.preventDefault()
        addNews()
}
return(
    <div className='user-progress' >
        <div className='row'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                <h5 >تعریف اعلان جدید</h5>
                <p>در این بخش می توانید اعلان جدید تعریف  کنید.</p>
            </div>
        </div>
        <div className='row d-flex justify-content-center '>
            <div className='widget box shadow col-lg-4'>


                <form className="col" >
                    <div className="n-chk d-flex  mb-4">

                        <div>
                            <label className="mr-2"> فعال  </label>

                            <input type="checkbox" defaultChecked={active}  onChange={e=>setActive(e.checked)} />

                        </div>
                    </div>
                    <div className="form-group mb-4 textOnInput  align-content-between">

                        <label >عنوان</label>
                        <input type="text" className="form-control opacityForInput" placeholder="عنوان اعلان" value={title} onChange={e => setTitle(e.target.value)} />

                    </div>
                    <div className="form-group mb-4 textOnInput">
                        <label >متن</label>
                        <textarea   className="form-control opacityForInput" placeholder="متن اعلان" value={message} onChange={e => setMessage(e.target.value)}  rows='10'/>
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
                            <NavLink to='/user-news' className="btn btn-danger float-right">بازگشت</NavLink>
                        </div>
                    </div>




                </form>
            </div >
        </div >
    </div>

)

}
export default NewNews