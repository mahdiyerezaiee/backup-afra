import React from 'react'
import Modal from 'react-modal';
import { useState } from 'react';

import QueryString from 'qs';
import { GetDataWithSearch } from '../../../services/userService'
import { GetAllOrganisation } from '../../../services/organisationService'
import {AddCreditMember} from '../../../services/creditService'
import { useEffect } from 'react';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import { PriceUnitEnums } from './../../../Common/Enums/PriceUnit';
import { toast } from 'react-toastify';

interface Props {
    modalIsOpen: boolean, closeModal: any, EntityType: number,Credit:any,creditId:any,value:any
}
const customStyles: any = {
    content: {

        inset: '50% auto auto 50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '5%',
        border: '2px ridge black'
    }
};
const AddMemberToCredit: React.FC<Props> = ({ modalIsOpen, closeModal, EntityType,Credit,creditId,value }) => {

    const [members, SetMembers] = useState([])
    const [entityId, setEntityId] = useState(0)
    const [loading, SetLoading] = useState(false)
    const [priceUnitId, SetpriceUnitId] = useState(0)
    const [maxValue, SetmaxValue] = useState(0)
    const [comment, SetComment] = useState('')
    const [active, SetActive] = useState(true)

    var formatter = new Intl.NumberFormat('en-US', {


        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
    const getMembers = async () => {

        if (EntityType === 1) {

            try {


                let configs = {
                    headers: { "Content-Type": "application/json" },
                    params: {
                        RoleIds: 2,
                        PageNumber: 0,
                        PageSize: 100000000,
                    },
                    paramsSerializer: (params: any) => {
                        return QueryString.stringify(params);
                    },
                };

                const { data, status } = await GetDataWithSearch(configs);

                if (status === 200) {
                    SetMembers(data.result.users.values);
                }




            }
            catch (e) {
                console.log(e);

            }
        }
        else {
            try {
                const { data, status } = await GetAllOrganisation()
                if (status === 200) {

                    SetMembers(data.result.organizationLists.values)
                }

            } catch (error) {
                console.log(error);

            }

        }
    }


    useEffect(() => {

        getMembers()
    }, [EntityType])


    const MEmbersToSelect = () => {

        if (EntityType === 1) {
            return (members.map((item: any) => ({ label: `${item.userName} ${item.firstName !== null ? item.firstName : ''} ${item.lastName !== null ? item.lastName : ''}`, value: item.id })))

        }
        else {
            return (members.map((item: any) => ({ label: `${item.name !== null ? item.name : ''} ${item.nationalId ? item.nationalId : ''}`, value: item.id })))
        }

    }
    const Priceunit = () => {
        return (PriceUnitEnums.map((item: any) => ({ label: item.name, value: item.id })))
    }
    const handelSubmit = async () => {
        SetLoading(true)

        try {
            const body = {
                "creditId": creditId,
                "entityTypeId": EntityType,
                entityId,
                priceUnitId,
                maxValue:Number(maxValue),
                active,
                comment

            }


            const{data,status}=await AddCreditMember(body)
            if(status===200){
                closeModal()
                SetLoading(false)
                toast.success("اطلاعات با موفقیت ثبت شد", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
                Credit()



            }

        } catch (error) {
            console.log(error);
            
            closeModal()
            SetLoading(false)
            Credit()
        }


        SetLoading(false)

    }

    return (
        <Modal isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}>



            <div >


                <div>


                    <div  >
                        <div className="card-body p-0 ">

                            <div className="form-row">
                                <div className="n-chk d-flex  mb-3">

                                    <div>
                                        <label className={active?"mr-2 text-success":"mr-2 text-danger"}> فعال</label>

                                        <input type="checkbox" checked={active}
                                            onChange={e => SetActive(e.target.checked)}
                                        />

                                    </div>


                                </div>

                            </div>

                            <div className="form-row mb-3">
                                <div className="  form-group col-md-12 col-xs-12 textOnInput  " >

                                    <label>{EntityType === 1 ? 'مشتری' : 'سازمان'}</label>


                                    <Select
                                        menuShouldScrollIntoView ={false}
                                        options={MEmbersToSelect()}
                                        placeholder="انتخاب عضو"
                                        onChange={(e: any) =>
                                            setEntityId(e.value)
                                        }
                                    />
                                    {entityId === 0 ? (<span className="text-danger"> عضو را انتخاب کنید</span>) : null}

                                </div>



                            </div>


                            <div className='form-row mb-3'>
                                <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                    <label>حداکثر اعتبار </label>
                                    <input type="number" className="form-control opacityForInput" value={formatter.format(maxValue) }
                                        name="additionalAmount" onChange={(e: any) => SetmaxValue(e.target.value.replaceAll(",", ""))}
                                    />
                                    {maxValue === 0 ? (<span className="text-danger">اعتبار را وارد کنید</span>) : null}
                                </div>


                                <div className="form-group col-md-6 col-xs-12 textOnInput   "
                                    style={{ zIndex: '3' }}>
                                    <label> واحد</label>
                                    <Select
                                        menuShouldScrollIntoView ={false}
                                        placeholder=" واحد"
                                        options={Priceunit()}

                                        onChange={(e: any) =>
                                            SetpriceUnitId(e.value)
                                        }
                                    />

                                    {priceUnitId === 0 ? (<span className="text-danger">نوع پرداخت را وارد کنید</span>) : null}

                                </div>
                            </div>


                            <div className="form-group  textOnInput ">
                                <label>توضیحات</label>

                                <textarea className="form-control opacityForInput " rows={4}
                                    placeholder='توضیحات تکمیلی' name="comment" value={comment} onChange={(e: any) => SetComment(e.target.value)} />

                            </div>
                            <div className='row '>

                                <div className='col-6 '>
                                    <button className="btn btn-success float-left " onClick={handelSubmit} disabled={maxValue>value?true:false}
                                    >تایید
                                        <ClipLoader

                                            loading={loading}
                                            color="#ffff"
                                            size={15}
                                        /></button>
                                </div>
                                <div className='col-6 '>
                                    <button className="btn btn-danger float-right "
                                        onClick={closeModal}>بازگشت
                                    </button>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>

            </div>
        </Modal>
    )
}

export default AddMemberToCredit