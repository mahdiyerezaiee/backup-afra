import Modal from 'react-modal';
import {  GetShoppingContractWithCompany } from "../../services/ShippingService";
import { useEffect, useState } from "react";
import Select from "react-select";
import { SyncWithSender } from '../../services/outScopeService';
import { toast } from 'react-toastify';
import { GetAllShippingCompanies } from './../../services/ShippingService';
import { editOrder } from './../../services/orderService';

const customStyles = {
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

}
const ShippingSelected = ({ modalIsOpen, closeModal, orderDetailId, Order }) => {
    const [shippingCompany, setShippingCompanys] = useState([]);
    const [shippingCompanyId, setShippingCompanysId] = useState(0);
    const [shippingContract, setShippingContract] = useState([]);
    const [shippingContractId, setShippingContractId] = useState(0);
    const getShippingCompany = async () => {
        try {
            const { data, status } = await GetAllShippingCompanies();

            setShippingCompanys(data.result.shippingCompanies.values)

        } catch (error) {
            console.log(error);
        }
    }
    const getShippingContractCompany = async (id) => {
        try {
            const { data, status } = await GetShoppingContractWithCompany(id);

            setShippingContract(data.result.shippingContracts.values)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getShippingCompany()
    }, [])

    const shippingCompanySelect = () => {
        return (shippingCompany.map(data => ({ label: data.name, value: data.id })))
    }
    const shippingContractSelect = () => {
        if (shippingContract !== null) {
            return (shippingContract.map(data => ({ label: data.contractNumber, value: data.id })))
        }

    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        const body = {
            orderDetailId,
            shippingContractId,
            "byPassContractLimit": false
        }
        const { data, status } = await SyncWithSender(body)
        if (status === 200 && data.result.success === true) {
                
                    toast.success('حواله با موفقیت صادر شد', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    });
                    let Orders;
                    if (Order) {
                        Orders = Order
                    }
                    const bodyOrder = {
                        "order": { ...Orders, orderStatusId: 9,customer:null, locked:false}
                    }
                    closeModal()

                    const response = await editOrder(bodyOrder)

                    window.location.reload()
                }
            
            else {

                toast.error(data.result.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined
                });
            }
            closeModal()}
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Selected Option"
            ariaHideApp={false}>
            <div style={{ height: '15rem', width: '20rem' }}>
                <h6>ارسال درخواست</h6>
                <p>در ااین بخش میتونید اطلاعات سفارش را برای باربری ارسال نمایید</p>
                <div className="form-group mt-4 textOnInput ">
                    <div className='form-row mb-4'>
                        <div className="col-12 selectIndex">

                            <label>شرکت باربری</label>
                            <Select

                                placeholder="شرکت باربری"
                                options={shippingCompanySelect()}
                                maxMenuHeight='150px'
                                onChange={(e) => {
                                    setShippingCompanysId(e.value)
                                    getShippingContractCompany(Number(e.value))
                                }} />
                        </div>

                    </div>
                    <div className="form-group mb-3 textOnInput">
                        <div className='form-row mb-3'>
                            <div className="col-12 mb-4">

                                <label>قراداد باربری</label>
                                <Select
                                    placeholder="قراداد باربری"
                                    options={shippingContractSelect()}
                                    maxMenuHeight='150px'

                                    onChange={(e) => {
                                        setShippingContractId(e.value)
                                    }} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row '>
                    <div className='col-6'>
                        <button type="submit" onClick={handelSubmit} className="btn btn-primary float-left" >ارسال</button>
                    </div>
                    <div className='col-6'>
                        <button type="submit" onClick={() => closeModal()} className="btn btn-danger float-right" >بازگشت</button>
                    </div>
                </div>
            </div>

        </Modal>
    )
}
export default ShippingSelected