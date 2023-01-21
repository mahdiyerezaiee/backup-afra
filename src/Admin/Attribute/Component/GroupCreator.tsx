import React,{useState} from 'react'
import { EntityTypes } from '../../../Common/Enums/EntityTypesEnums';
import  Select  from 'react-select';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SetGroup } from '../../../services/GroupService';

const GroupCreator:React.FC = () => {
    const [name, setName] = useState('');
    const [entityTypeId, setEntityTypeId] = useState(0);
    const entityTypes = () => {
        return (EntityTypes.map(data => ({ label: data.name, value: data.id })));
    }

    const body={
        group:{
            id:0,
            entityTypeId,
            name
        }
    }
    const submit = async (event:any) => {
        event.preventDefault();
        try {

            const { data, status } = await SetGroup(body);
            if (status === 200) {
                toast.success('گروه جدید ایجاد شد',
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
                    <h5 >تعریف گروه</h5>
                    <p>در این بخش می توانید گروه جدید برای فرم ها  تعریف  کنید.</p>
                </div>
            </div>
            <div className='row d-flex justify-content-center '>
                <div className='widget box shadow col-8'>
                    <form className='form  '>
                        <div className="form-group mb-4 textOnInput  ">

                            <label >نام گروه</label>
                            <input type="text" className="form-control opacityForInput" value={name} onChange={(e:any) => setName(e.target.value)} />

                        </div>
                        <div className="form-group mb-4 textOnInput  ">


                            <Select className='form-input opacityForInput' placeholder='انتخاب موجودیت'
                                options={entityTypes()}
                                onChange={(e:any) => setEntityTypeId(e.value)} />
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

export default GroupCreator