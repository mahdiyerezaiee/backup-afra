import React, { useReducer, useState } from 'react'
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import { Attributes, entityTypes, submitAttribute } from '../Service/AttributeCreatorService';
 const AttributeCreator:React.FC = () => {
 
    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف ویژگی</h5>
                    <p>در این بخش می توانید ویژگی جدید برای فرم ها  تعریف  کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='  col-md-8 col-lg-8 col-sm-12 m-2'>
                    <form className='form row ' onSubmit={submitAttribute}>
                        <div className=" col-md-6 col-sm-12 form-group mb-4 textOnInput  ">

                            <label >نام ویژگی</label>
                            <input type="text"  name="name" className="form-control opacityForInput" 
                             />

                        </div>
                        <div className=" col-md-6 col-sm-12 form-group mb-4 textOnInput  ">


                            <Select name="entityTypeId" className='form-input opacityForInput' placeholder='انتخاب فرم'
                                options={entityTypes()}
                                />
                        </div>
                        <div className=" col-md-6 col-sm-12 form-group mb-4 textOnInput  ">


                            <Select name="controlTypeId" className='form-input ' placeholder='انتخاب ویژگی'
                                options={Attributes()}
                                />

                        </div>
                        <div className="col-md-6 col-sm-12 form-group mb-4 textOnInput  ">

                            <label >مقدار</label>
                            <input type="text" name="controlTypeValue" className="form-control opacityForInput" 
                            />

                        </div>
                        <div className='col-6  '>
                                <button type="submit" className="btn btn-success float-right"  >تایید</button>
                                </div>
                                <div className='col-6  '>

                                <NavLink to='/admin' className="btn btn-danger  ">بازگشت</NavLink>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AttributeCreator