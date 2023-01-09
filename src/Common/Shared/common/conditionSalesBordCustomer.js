import React, { useEffect, useState } from "react";
import { GetGroupsForEntity, GetGroupWithCompany } from "../../../services/GroupService";
import { PaymentStructureEnums } from "../../Enums/PaymentStructureEnums";
import { GetProductSupplyConditionsCustomer } from "../../../services/ProductSupplyConditionService";
import { Link } from 'react-router-dom';
import { GetCompanyChild } from './../../../services/companiesService';

const ConditionSalesBordCustomer = ({ productSupplyConditions, handelClick, closeModal }) => {


    const [customerg, setCustomerg] = useState([])
    const [Condition, setCondition] = useState([])
    const GetCustomerGroup = async () => {
        const response = await GetCompanyChild();
        let companies = response.data.result.companies
        let arr = []
        let finalArr=[]
        for (let i = 0; i < companies.length; i++) {

            const { data, status } = await GetGroupWithCompany(1, companies[i].id);

            if(data.result.groups.length>0)
            {
               arr.push(data.result.groups)
            }


        }

        finalArr=Array.prototype.concat.apply([], arr);

        setCustomerg(finalArr);
    }
    const GetCondition = async () => {
       try {
        const { data, status } = await GetProductSupplyConditionsCustomer(productSupplyConditions);
        if (data.success===true) {
            setCondition(data.result.productSupplyConditions.values);
        }
       } catch (error) {
        
       } 
    }
    useEffect(() => {
        GetCustomerGroup();
        GetCondition()
    }, [productSupplyConditions])
    const CustomerG = () => {
        let customer = [...customerg, { id: null, name: 'عمومی' }]
        return (customer.map(data => ({
            label: data.name,
            value: data.id
        })))

    }
    const PaymentId = (id) => {
        return (PaymentStructureEnums.filter(item => item.id === id).map(data => data.name))

    }



    return (
        <div className="table-responsive p-2">
            <div className="d-block clearfix mb-2" onClick={closeModal}><svg
                xmlns="http://www.w3.org/2000/svg"
                width="24" height="24"
                viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x close"
                data-dismiss="alert"><line x1="18" y1="6"
                    x2="6"
                    y2="18"></line><line
                        x1="6" y1="6" x2="18" y2="18"></line></svg></div>
            <h5 className="text-center mb-3">لطفا یکی از شرایط ذیل را برای ثبت سفارش انتخاب کنید :</h5>
            <table
                className="table table-bordered  table-striped  mt-2  mb-4">
                <thead>
                    <tr style={{ fontSize: '10px' }}>

                        <th style={{ fontSize: '10px' }} className="text-center">ردیف</th>
                        <th style={{ fontSize: '10px' }} className="text-center">نوع پرداخت</th>
                        <th style={{ fontSize: '10px' }} className="text-center">تعداد اقساط</th>
                        <th style={{ fontSize: '10px' }} className="text-center">بازه</th>
                        <th style={{ fontSize: '10px' }} className="text-center">فی</th>

                        <th style={{ fontSize: '10px' }} className="text-center">گروه مشتریان</th>
                        <th style={{ fontSize: '10px' }} className="text-center">توضیحات</th>
                        <th style={{ fontSize: '10px' }} className="text-center">عملیات</th>
                    </tr>
                </thead>
                <tbody>
                    {Condition ? Condition.map((contact, index) =>

                        <tr className='text-center'>
                            <td>{index + 1}</td>

                            <td>
                                <p className="mb-0">{PaymentId(contact.paymentMethodId)}</p>
                            </td>

                            <td>{contact.paymentMethodId === 4 ? contact.installmentOccureCount : "-"}</td>
                            <td>{contact.paymentMethodId === 4 ? contact.installmentPeriod : "-"}</td>


                            <td>{contact.price}</td>
                            <td>{CustomerG().filter(i => i.value === contact.customerGroupId).map(contacts => contacts.label)}</td>

                            <td title={contact.comment}>{contact.comment ? contact.comment.substring(0, 10) + "..." : ""}</td>

                            <td className="text-center">
                                <ul className="table-controls">

                                    <li><Link className="btn btn-success" data-toggle="tooltip" data-placement="top"
                                        onClick={() => handelClick(productSupplyConditions, contact.id)} >
                                        ثبت درخواست                           </Link></li>

                                </ul>
                            </td>
                        </tr>
                    ) : <tr className="text-center "><td colSpan='7' className="text-danger">این عرضه برای شما قابل درخواست نمی باشد</td></tr>}

                </tbody>
            </table>
        </div>

    )
}
export default ConditionSalesBordCustomer