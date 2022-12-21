import Select from "react-select";
import React, { useEffect, useState } from "react";
import { GetGroupsForEntity } from "../../../../../services/GroupService";
import { PaymentStructureEnums } from "../../../../../Enums/PaymentStructureEnums";
import { AdditionalTypeId } from "../../../../../Enums/AdditionalTypeIdEnums";
import Modal from 'react-modal';
import ProductSupplyConditionReadOnly from "./ProductSupplyConditionRead";
import {ClipLoader} from "react-spinners";

const ProductSupplyConditionEdit = ({ loading, paymentMethodId, setSpecial, customStyles, handleEditFormSubmit, setcustomerGroupId, setpaymentMethodId, setadditionalTypeId, editFormData, handleEditFormChange, handleCancelClick, index }) => {
    const [customerg, setCustomerg] = useState([])
    const [cu, SetCu] = useState(0)
    const [modalIsOpen, setIsOpen] = useState(true);
    const GetCustomerGroup = async () => {
        const { data, status } = await GetGroupsForEntity(1);
        if (status === 200) {
            setCustomerg(data.result.groups);
        }
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
    const CustomerGId = (id) => {
        let customer = [...customerg, { id: null, name: 'عمومی' }]
        return (customer.filter(item => item.id === id).map(data => ({
            label: data.name,
            value: data.id
        })))

    }

    const paymentMethod = () => {
        return (PaymentStructureEnums.map(data => ({ label: data.name, value: data.id })))
    }
    const PaymentId = (id) => {
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

    const additionalType = (id) => {
        return (AdditionalTypeId.filter(item => item.id === id).map(data => ({
            label: data.name,
            value: data.id
        })))

    }
    const openModal = async (id) => {
        setIsOpen(true);
    }
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
                                <div className="  form-group col-md-6 col-xs-12 textOnInput  selectIndex">

                                    <label>نوع پرداخت</label>


                                    <Select
                                        defaultValue={PaymentId(editFormData.paymentMethodId)}
                                        placeholder="نوع پرداخت"
                                        options={paymentMethod()}
                                        onChange={e => setpaymentMethodId(e.value)}

                                    />

                                </div>

                                <div className="  form-group col-md-6 col-xs-12 textOnInput  selectIndex"
                                    style={{ zIndex: '4' }}>

                                    <label>نوع افزایش</label>


                                    <Select
                                        placeholder=' نوع افزایش'
                                        defaultValue={additionalType(editFormData.additionalTypeId)}

                                        options={additionalTypeIdS()}
                                        onChange={e => setadditionalTypeId(e.value)}

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

                                <div className="form-group col-md-6 col-xs-12 textOnInput selectIndex  "
                                    style={{ zIndex: '3' }}>
                                    <label>گروه مشتریان</label>
                                    {cu === 0 ?
                                        <Select
                                            value={CustomerGId(editFormData.customerGroupId)}
                                            options={CustomerG()}
                                            onChange={function (e) {
                                                setcustomerGroupId(e.value)
                                                SetCu(e.value)
                                            }}

                                        />
                                        :
                                        <Select


                                            options={CustomerG()}
                                            onChange={e => setcustomerGroupId(e.value)}

                                        />

                                    }



                                </div>
                            </div>
                            <div className="form-row">
                                <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                    <label>حداقل سفارش</label>
                                    <input type="text" className="form-control opacityForInput"
                                        name="minSellableAmount"
                                        defaultValue={editFormData.minSellableAmount}
                                        onChange={handleEditFormChange}
                                    />
                                </div>
                                <div className=" form-group col-md-6 col-xs-12 textOnInput">
                                    <label>حداکثر سفارش</label>
                                    <input type="text" className="form-control opacityForInput"
                                        name="maxSellableAmount" defaultValue={editFormData.maxSellableAmount}
                                        onChange={handleEditFormChange}
                                    />
                                </div>

                            </div>


                            <div className="form-group mb-1 textOnInput ">
                                <label>توضیحات</label>

                                <textarea type="textarea" className="form-control opacityForInput " rows='4'
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