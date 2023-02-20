import { useState } from "react"


interface Props{

    children:any
}
const AdvancedSearch:React.FC<Props> = ({children}) => {
const [show , setShow] = useState(false)    

    return(
         <div id="iconsAccordion" className="accordion-icons">
                                    <section className="mb-0 mt-0">
                                    <div className=" mb-4  pt-1  " >
                                   
                                    <div className='form-row textOnInput mt-5'>
                                    {children && children[0].props.children.length > 6 ? 
 children && children[0].props.children.slice(0,show?6:5).map((i:any)=> i) : null}
 {show ? null :
 
<div className="col-lg-2">
{ children && children[0].props.children.length > 6 ?  children[1] : null}

</div>}


                                    </div>
 
                                    {children && children[0].props.children.length > 6 ?   <div onClick={()=>setShow(!show)}  data-toggle="collapse" data-target="#iconAccordion100" aria-expanded="true" aria-controls="iconAccordionOne" role="menu" className="icons text-advance d-inline float-right text-primary ml-2">
                                            {/* <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round"
                                                 className="feather feather-chevron-down">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg> */}
                                            <b>  جستجوی پیشرفته</b>
                                          
                                            </div>:null}
                                            </div>  
                                    </section>
                                    <div id="iconAccordion100" className={children && children[0].props.children.length > 6 ? "collapse  m-4":"collapse show  m-4"}  data-parent="#iconsAccordion">
                                    
                                    {children && children[0].props.children.length > 6 ? 
                                    <>
                                    <form className='form-row textOnInput mt-5'>
 {children && children[0].props.children.slice(show?6:5,children[0].props.children.length).map((i:any)=> i) }
 </form>
 { children && children[0].props.children.length > 6 ? children && children[1] : null}</>
 : children}



{/* { children && children[0].props.children.length > 6 ? <div className="col-lg-2 col-md-4  col-sm-12  ">{children && children[1]}</div>  : null} */}

                                        {/* {children} */}
                                    </div>
                                </div>
  
  
    )
  }
  export default AdvancedSearch