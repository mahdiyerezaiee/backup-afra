import {useEffect, useState} from "react";
import {GetAllNewsForUsers} from "../../services/newsService";

const News = () => {
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
    return(
        <div style={{height: "330px" , overflowY:"auto"}} >

                <div id="iconsAccordion" className="accordion-icons" >
                    {guessNews.map(item=>

                            <div className="card" key={item.id}>

                        <div className="card-header" id={item.id}>
                        <section className="mb-0 mt-0">
                            <div role="menu" className="collapsed" data-toggle="collapse"
                                 data-target={`#iconAccordion${item.id}`} aria-expanded="true" aria-controls="iconAccordionOne">
                                <div className="accordion-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                         className="feather feather-bell">
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                    </svg>                                </div>
                            <span> اطلاعیه شماره: <b>{item.id}&nbsp;&nbsp;&nbsp;</b>  عنوان:    <b>{item.title}&nbsp;&nbsp;&nbsp;</b></span>
                                <span  className="float-right">تاریخ :{new  Date(item.createDate).toLocaleDateString('fa-IR')}</span><div className="icons">
                            </div>
                            </div>
                        </section>
                    </div>

                    <div id={`iconAccordion${item.id}`}className="collapse" aria-labelledby={item.id} data-parent="#iconsAccordion">
                        <div className="card-body">

                            {item.message}
                        </div>
                    </div>


                </div>

                        )}

            </div>



        </div>
    )
}
export default News