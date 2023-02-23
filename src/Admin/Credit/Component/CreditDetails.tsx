import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { GetCreditById } from '../../../services/creditService';
import { useEffect } from 'react';
import CustomersCredit from './CustomersCredit';
import OrganizationCredit from './OrganizationCredit';

const CreditDetails: React.FC = () => {
    const params = useParams()
    const [Credit, SetCredit] = useState<any>([])
    const [customers, SetCustomers] = useState([])
    const [organizations, Setorganizations] = useState([])

    const getCredit = async () => {

        try {
            const { data, status } = await GetCreditById(params.id)
            if (status === 200) {
                SetCredit(data.result.credit)
                SetCustomers(data.result.credit.customers)
                Setorganizations(data.result.credit.organizations)
            }
        } catch (error) {

        }

    }
    useEffect(() => {

        getCredit()

    }, [])


    let formatterForMoney = new Intl.NumberFormat('fa-IR', {

        currency: 'IRR'


    });
    return (
        <Fragment>
            <div className='user-progress'>
                <div>

                    <div className=" statbox widget-content widget-content-area text-dark ">
                        <div className=' row col-lg-12 col-md-12 col-sm-12 col-xs-12 p-4 text-dark rounded border' style={{ margin: "0" }}>


                            < div className=" OrderCustomerInfo col-lg-12   border-dark p-2 "  >
                                <div className='  col-lg-12 col-md-4 col-sm-12 col-xs-12 row '>
                                    <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>

                                        <p>شناسه اعتبار : {Credit.id}</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>

                                        <p>نام گروه اعتباری : {Credit.name}</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>

                                        <p>ارزش اعتبار : {formatterForMoney.format(Credit.value)}</p>
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>

                                        <p>توضیحات  : {Credit.comment}</p>
                                    </div>

                                </div>

                                <div className='  col-lg-12 col-md-4 col-sm-12 col-xs-12  '>
                                </div>
                            </div>



                        </div>
                    </div>

                    <div className=" statbox widget-content widget-content-area text-dark mt-4 mb-4 ">
                        <div>
                            <CustomersCredit  data={customers} getData={getCredit} creditId={Credit.id}/>
                        </div>

                    </div>
                    <div className=" statbox widget-content widget-content-area text-dark mt-4 mb-4 ">
                        <div>
                            <OrganizationCredit data={organizations} getData={getCredit} creditId={Credit.id} />
                        </div>

                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default CreditDetails