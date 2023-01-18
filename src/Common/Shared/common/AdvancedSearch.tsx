

interface Props{

    children:any
}
const AdvancedSearch:React.FC<Props> = ({children}) => {
    return(
  
                                <div id="iconsAccordion" className="accordion-icons">
                                    <section className="mb-0 mt-0">
                                    <div data-toggle="collapse"
                                         data-target="#iconAccordion100" aria-expanded="true" aria-controls="iconAccordionOne" role="menu" className=" mb-4  pt-1  " >
  
  
                                        {/* <h5 className=" mt-1 mr-2 d-inline float-left">جستجوی پیشرفته</h5> */}
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" className="feather feather-search toggle-search p-1 float-left">
                                            <circle cx="11" cy="11" r="8"></circle>
                                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                        </svg> */}
                                        {/* <div className="icons d-inline float-right">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                 strokeLinecap="round" strokeLinejoin="round"
                                                 className="feather feather-chevron-down">
                                                <polyline points="6 9 12 15 18 9"></polyline>
                                            </svg></div>*/}</div> 
                                    </section>
                                    <div id="iconAccordion100" className="collapse show m-4"  data-parent="#iconsAccordion">
                                        {children}
                                    </div>
                                </div>
  
  
    )
  }
  export default AdvancedSearch