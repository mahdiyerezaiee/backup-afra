import React, { useState } from 'react'
import { EntityTypes } from '../../../Common/Enums/EntityTypesEnums';
import { AttributeControlTypes } from '../../../Common/Enums/AttributeControlTypesEnums';
import Select from 'react-select';
import { NavLink } from 'react-router-dom';
import { SetAttribute } from '../../../services/attributeService';
import { toast } from 'react-toastify';

const AttributeCreator = () => {
    const [name, setName] = useState('');
    const [entityTypeId, setEntityTypeId] = useState(0);
    const [controlTypeId, setControlTypeId] = useState(0);
    const [controlTypeValue, setControlTypeValue] = useState('')

    const entityTypes = () => {
        return (EntityTypes.map(data => ({ label: data.name, value: data.id })));
    }
    const Attributes = () => {
        return (AttributeControlTypes.map(data => ({ label: data.name, value: data.id })))
    }
    const body = {
        attribute: {
            name,
            entityTypeId,
            controlTypeId,
            controlTypeValue
        }
    }
    const submit = async (event) => {
        event.preventDefault();
        try {

            const { data, status } = await SetAttribute(body);
            if (status === 200) {
                toast.success('ویژگی جدید ایجاد شد',
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    })
            }

        } catch (error) {
           
        }


    }
    return (
        <div className='user-progress' >
            <div className='row'>
                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2'>
                    <h5 >تعریف ویژگی</h5>
                    <p>در این بخش می توانید ویژگی جدید برای فرم ها  تعریف  کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-8'>
                    <form className='form  '>
                        <div className="form-group mb-4 textOnInput  ">

                            <label >نام ویژگی</label>
                            <input type="text" className="form-control opacityForInput" value={name} onChange={e => setName(e.target.value)} />

                        </div>
                        <div className="form-group mb-4 textOnInput  ">


                            <Select className='form-input opacityForInput' placeholder='انتخاب فرم'
                                options={entityTypes()}
                                onChange={e => setEntityTypeId(e.value)} />
                        </div>
                        <div className="form-group mb-4 textOnInput  ">


                            <Select className='form-input ' placeholder='انتخاب ویژگی'
                                options={Attributes()}
                                onChange={e => setControlTypeId(e.value)} />

                        </div>
                        <div className="form-group mb-4 textOnInput  ">

                            <label >مقدار</label>
                            <input type="text" className="form-control opacityForInput" value={controlTypeValue} onChange={e => setControlTypeValue(e.target.value)} />

                        </div>
                        <div className='row'>
                            <div className='col-lg-6 '>
                                <button type="submit" className="btn btn-success float-left" onClick={submit} >تایید</button>
                            </div>
                            <div className='col-lg-6 '>
                                <NavLink to='/admin' className="btn btn-danger float-right">بازگشت</NavLink>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AttributeCreator