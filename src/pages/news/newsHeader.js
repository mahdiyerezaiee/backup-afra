import {useEffect, useState} from "react";
import {GetAllNewsForUsers} from "../../services/newsService";
import {NavLink, useNavigate} from "react-router-dom";

const NewsHeader = () => {
    const navigate = useNavigate()

    const [guessNews , setGuessNews]= useState([])
    const getNews =async () => {
        try {
            const {data , status}=await GetAllNewsForUsers();
            setGuessNews(data.result.news.values)
        }catch (err){
            console.log(err)
        }

    }
    useEffect(()=>{
        getNews()
    },[])
    const clickHandler = (id) => {
      navigate(`news/${id}`)
    }
    return(
        <div>

            <div className="">
                {guessNews?guessNews.slice(0, 5).map(item=>
                    <div className="dropdown-item"  key={item.id} >

                    <div className="media-body" key={item.id}>

                        <div className="data-info" id={item.id} onClick={()=>clickHandler(item.id)}>
                            <section className="mb-0 mt-0">
                                <div role="menu" className="collapsed" data-toggle="collapse"
                                     data-target={`#iconAccordion${item.id}`} aria-expanded="true" aria-controls="iconAccordionOne">
                                    <div className="accordion-icon">
                                                                      </div>
                                    <span> اطلاعیه شماره: <b>{item.id}</b>
                                        <br/>تاریخ:<b>{new Date(item.createDate).toLocaleDateString("fa-IR")}</b> </span>

                                </div>
                            </section>
                        </div>




                    </div>
                    </div>

                ):""}
            </div>

            <NavLink className='text-primary float-right' to='/newsList'>مشاهده همه({guessNews?guessNews.length:0}) </NavLink>


        </div>
    )
}
export default NewsHeader