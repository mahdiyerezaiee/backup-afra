import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './style.css';
import AddresForm from './AddresForm';
import PersonIdetity from './PersonIdetity';
import { Link, Routes,Route } from 'react-router-dom';


const IdentityPannel = () => {
    return (
        <div className='user-progress'>
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تکمیل اطلاعات کاربری</h5>
                    <p>در این بخش می توانید وضعیت حساب کاربری خود را مشاهده کنید.</p>
                </div>
            </div>
            <div className='boxrow'>
                <Link to='/personidentity'  className='col-lg-2 col-md-2 col-sm-2 col-xs-2 m-auto widget box shadow' >
                    <div className='text-center'>

                        
                            <div className='card-title text-left'>
                                <span className='heading'>1.تکمیل مشخصات کاربری </span>
                                {/* span baraye response server */}
                                {/* <span className='status'>تست ریسپانس</span> */}
                            </div>
                        



                    </div>
                    </Link>
                <Link to='/addresform' className='col-lg-2 col-md-2 col-sm-2 col-xs-2 m-auto widget box shadow' >
                    
                
                    <div className='text-center'>

                    

                   
                            <div className='card-title text-left'>
                                <span className='heading'> 2.ثبت آدرس </span>
                                   {/* span baraye response server */}
                                {/* <span className='status'>تست ریسپانس</span> */}
                            </div>
                       


                    </div>
                  
                 </Link>
               
                 <Link to='/personBankAccount' className='col-lg-2 col-md-2 col-sm-2 col-xs-2 m-auto widget box shadow' >
                    
                
                    <div className='text-center'>

                    

                   
                            <div className='card-title text-left'>
                                <span className='heading'> 3.ثبت شماره حساب </span>
                                   {/* span baraye response server */}
                                {/* <span className='status'>تست ریسپانس</span> */}
                            </div>
                       


                    </div>
                  
                 </Link>
               <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2 m-auto widget box shadow' >
                    <div className='card-title text-left'>


                    </div>
                </div>
            </div>
          
        </div>
    );
}

export default IdentityPannel;