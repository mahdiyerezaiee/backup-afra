

interface Props{

    children:any
}
const AdvancedSearch:React.FC<Props> = ({children}) => {
    console.log(children);
    

    return(
         <div id="iconsAccordion" className="accordion-icons">
                                    <section className="mb-0 mt-0">
                                    <div data-toggle="collapse" data-target="#iconAccordion100" aria-expanded="true" aria-controls="iconAccordionOne" role="menu" className=" mb-4  pt-1  " >
                                   
                                    <form className='form-row textOnInput mt-5'>
                                    {children && children[0].props.children.length > 6 ? 
 children && children[0].props.children.slice(0,5).map((i:any)=> i) : null}



{ children && children[0].props.children.length > 6 ? <div className="col-lg-2 col-md-4  col-sm-12  ">{children && children[1]}</div>  : null}

                                    </form>
 
                                        <div className="icons d-inline float-right">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round"
                                                 className="feather feather-chevron-down">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg>
                                          
                                            </div></div>  
                                    </section>
                                    <div id="iconAccordion100" className="collapse show m-4"  data-parent="#iconsAccordion">
                                        {children}
                                    </div>
                                </div>
  
  
    )
  }
  export default AdvancedSearch