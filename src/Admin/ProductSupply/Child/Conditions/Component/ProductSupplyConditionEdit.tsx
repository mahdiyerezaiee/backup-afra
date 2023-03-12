import Select from "react-select";
import React, { useEffect, useState } from "react";
import { GetGroupsForEntity } from "../../../../../services/GroupService";
import { PaymentStructureEnums } from "../../../../../Common/Enums/PaymentStructureEnums";
import { AdditionalTypeId } from "../../../../../Common/Enums/AdditionalTypeIdEnums";
import Modal from 'react-modal';
import ProductSupplyConditionReadOnly from "./ProductSupplyConditionRead";
import {ClipLoader} from "react-spinners";
import { GetCompanyChild } from '../../../../../services/companiesService';
import { GetGroupWithCompany } from '../../../../../services/GroupService';

interface Props{
    loading:any, paymentMethodId:any,companyId:any, setSpecial:any, customStyles:any, handleEditFormSubmit:any, setcustomerGroupId:any, setpaymentMethodId:any, setadditionalTypeId:any, editFormData:any, handleEditFormChange:any, handleCancelClick:any, index:any ,handelDeletData:any
}
const ProductSupplyConditionEdit:React.FC<Props> = ({ loading, paymentMethodId, setSpecial, customStyles, handleEditFormSubmit, setcustomerGroupId, setpaymentMethodId, setadditionalTypeId, editFormData, handleEditFormChange, handleCancelClick, index,companyId,handelDeletData }) => {
    const [customerg, setCustomerg] = useState([])
    const [cu, SetCu] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(true);
    const GetCustomerGroup = async () => {
      
      

            const { data, status } = await GetGroupWithCompany(1, companyId);

          setCustomerg(data.result.groups)
    }
    useEffect(() => {
        GetCustomerGroup();
        valueSetter()

    }, [editFormData])
    const valueSetter=()=>{
    setcustomerGroupId(editFormData.customerGroupId)
    setadditionalTypeId(editFormData.additionalTypeId)

setpaymentMethodId(editFormData.paymentMethodId)
    }
    
    const CustomerG = () => {
        let customer = [...customerg, { id: null, name: 'عمومی' }]
        return (customer.map(data => ({
            label: data.name,
            value: data.id
        })))

    }
    const CustomerGId = (id:any) => {
        let customer = [...customerg, { id: null, name: 'عمومی' }]
        return (customer.filter(item => item.id === id).map(data => ({
            label: data.name,
            value: data.id
        })))

    }

    const paymentMethod:any = () => {
        return (PaymentStructureEnums.map(data => ({ label: data.name, value: data.id })))
    }
    const PaymentId = (id:any) => {
        return (PaymentStructureEnums.filter(item => item.id === id).map(data => ({
            label: data.name,
            id: data.id
        })))

    }
    const additionalTypeIdS = () => {
        return (AdditionalTypeId.map(data => ({
            label: data.name,
            value: data.id
        })))

    }

    const additionalType = (id:any) => {
        return (AdditionalTypeId.filter(item => item.id === id).map(data => ({
            label: data.name,
            value: data.id
        })))

    }
    const openModal = async () => {
        setIsOpen(true);
    }
    var formatter = new Intl.NumberFormat('en-US', {


        maximumFractionDigits: 0,
        minimumFractionDigits: 0, });
    return (

        <div >

            <div className=" col-7  my-2 p-1" key={editFormData.id}>


                <div className='d-block mb-4 ' onClick={openModal}>

                    {/*<a data-title="نمایش و ویرایش" className=" btn bg-info"> &nbsp;شرط  شماره {index }&nbsp;عرضه  </a>*/}
                </div>

                <Modal isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Selected Option"
                    ariaHideApp={false}>
                    <div >
                        <div className="card-body p-0">

                            <div className="form-row">
                                <div className="n-chk d-flex  mb-4">

                                    <div>
                                        <label className="mr-2 text-danger"> شرایط خاص </label>

                                        <input type="checkbox" defaultChecked={editFormData.special}
                                            onChange={e => setSpecial(e.target.checked)}
                                        />

                                    </div>


                                </div>

                            </div>

                            <div className="form-row">
                                <div className="  form-group col-md-6 col-xs-12 textOnInput  ">

                                    <label>نوع پرداخت</label>


                                    <Select
                                        defaultValue={PaymentId(editFormData.paymentMethodId)}
                                        placeholder="نوع پرداخت"
                                        options={paymentMethod()}
                                        onChange={(e:any) => {setpaymentMethodId(e.value)
                                            handelDeletData()
                                            editFormData.installmentOccureCount=null
                                            editFormData.installmentPeriod=null
                                            editFormData.additionalAmount=null
                                            editFormData.minSellableAmount=null
                                            editFormData.comment=null
                                        }}
                                        menuShouldScrollIntoView ={false}
                                    />

                                </div>

                                <div className="  form-group col-md-6 col-xs-12 textOnInput  "
                                    style={{ zIndex: '4' }}>

                                    <label>نوع افزایش</label>


                                    <Select

                                        placeholder=' نوع افزایش'
                                        defaultValue={additionalType(editFormData.additionalTypeId)}
                                        menuShouldScrollIntoView ={false}
                                        options={additionalTypeIdS()}
                                        onChange={(e:any) => setadditionalTypeId(e.value)}

                                    />


                                </div>

                            </div>

                            {paymentMethodId === 4 ?
                                <div className='form-row'>
                                    <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                        <label>تعداد اقساط</label>
                                        <input name="installmentOccureCount" type="number"
                                            className="form-control opacityForInput"
                                            defaultValue={editFormData.installmentOccureCount}
                                            onChange={handleEditFormChange}
                                        />
                                    </div>

                                    <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                        <label>بازه پرداخت</label>
                                        <input type="number" className="form-control opacityForInput"
                                            name="installmentPeriod" defaultValue={editFormData.installmentPeriod}
                                            onChange={handleEditFormChange}
                                        />

                                    </div>


                                </div>
                                :
                                ''
                            }
                            <div className='form-row'>
                                <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                    <label>مقدار افزایش</label>
                                    <input type="number" className="form-control opacityForInput"
                                        name="additionalAmount" defaultValue={editFormData.additionalAmount}
                                        onChange={handleEditFormChange}
                                    />
                                </div>

                                <div className="form-group col-md-6 col-xs-12 textOnInput   "
                                    style={{ zIndex: '3' }}>
                                    <label>گروه مشتریان</label>
                                    {cu === 0 ?
                                        <Select
                                            menuShouldScrollIntoView ={false}
                                            value={CustomerGId(editFormData.customerGroupId)}
                                            options={CustomerG()}
                                            onChange={function (e:any) {
                                                setcustomerGroupId(e.value)
                                                SetCu(e.value)
                                            }}

                                        />
                                        :
                                        <Select

                                            menuShouldScrollIntoView ={false}
                                            options={CustomerG()}
                                            onChange={(e:any) => setcustomerGroupId(e.value)}

                                        />

                                    }



                                </div>
                            </div>
                            <div className="form-row">
                                <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                    <label>حداقل سفارش</label>
                                    <input type="text" className="form-control opacityForInput"
                                        name="minSellableAmount"
                                        defaultValue={ formatter.format(editFormData.minSellableAmount)}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                    <label>حداکثر سفارش</label>
                                    <input type="text" className="form-control opacityForInput"
                                        name="maxSellableAmount" defaultValue={formatter.format(editFormData.maxSellableAmount)}
                                        onChange={handleEditFormChange}
                                    />
                                </div>

                            </div>


                            <div className="form-group mb-1 textOnInput ">
                                <label>توضیحات</label>

                                <textarea  className="form-control opacityForInput " rows={4}
                                    placeholder='توضیحات تکمیلی' name="comment"
                                    defaultValue={editFormData.comment}
                                    onChange={handleEditFormChange}
                                />

                            </div>
                            <div className="row">
                                <span className=" col-6 float-left"></span>
                            </div>
                            <div className='row '>

                                <div className='col-6 '>
                                    <button disabled={loading} className="btn btn-success float-left "
                                        onClick={handleEditFormSubmit} >تایید
                                        <ClipLoader

                                            loading={loading}
                                            color="#ffff"
                                            size={15}
                                        /></button>
                                </div>
                                <div className='col-6 '>
                                    <button className="btn btn-danger float-right "
                                        onClick={handleCancelClick}>انصراف
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
                </Modal>

            </div>

        </div>

    );
};

export default ProductSupplyConditionEdit;