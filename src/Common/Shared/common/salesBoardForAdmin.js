import { useEffect, useState } from "react";

import { GetAllProductSupply, GetAllProductSupplyBord } from "../../../services/productSupplyService";
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import { AddTOCart } from "../../../services/cartShoppingService";
import { MeasureUnitSample } from "../../Enums/MeasureUnitSample";
import { GetAllProductSupplyBordAdmin } from '../../../services/productSupplyService';

import ModalSubmit from "./modalSubmit";
import { GetGroupsForEntity, GetGroupWithCompany } from '../../../services/GroupService';
import ConditionSalesBordAdmin from "./conditionSalesBordAdmin";
import { Link } from 'react-router-dom';
import { GetCompanyChild } from './../../../services/companiesService';


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

const SalesBoardForAdmin = () => {
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);
    const userRole = useSelector(state => state.roles);
    const [Customerg, setCustomerg] = useState(getDataProductSupply().Customerg ? getDataProductSupply().Customerg : [])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenCondition, setIsOpenCondition] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [productSupply, setProductSupply] = useState(getDataProductSupply().productSupply ? getDataProductSupply().productSupply : []);
    const [modalInfo, setModalInfo] = useState([])
    const [quantity, setquantity] = useState(0)
    const [name, setName] = useState([]);
    const [productSupplyConditionId, setProductSupplyConditionId] = useState(0);
    const d = new Date();
    d.setTime(d.getTime() + (60 * 1000));
    let expires = d.toUTCString();
    const dataProductSupply = {
        expiresAt: expires,
        productSupply,
        Customerg,
    }
    function getDataProductSupply() {
        let items = JSON.parse(sessionStorage.getItem('dataProductSupply'));
        return items ? items : ''


    }
    const GetGroupsOfCustomers = async () => {
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
    const getProductSupply = async () => {


        try {
            const { data, status } = await GetAllProductSupplyBordAdmin();

            setProductSupply(data.result.productSupplies.values)
            dataProductSupply.productSupply = data.result.productSupplies.values
            dataProductSupply.Customerg =Customerg
        } catch (error) {
            console.log(error);
        }
        sessionStorage.setItem('dataProductSupply', JSON.stringify(dataProductSupply));

    }

    useEffect(() => {

        if (getDataProductSupply().expiresAt < new Date().toUTCString()) {

            sessionStorage.removeItem("dataProductSupply")


        }
        if (!getDataProductSupply().expiresAt) {

            GetGroupsOfCustomers()
            getProductSupply();



        }

    }, [])

    console.log(Customerg);
    let formatter = new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR', maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });

    let formatter2 = new Intl.NumberFormat('fa-IR', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
    const getModalInfo = async (id) => {
        const { data, status } = await GetAllProductSupply(id)
        setModalInfo(data.result.productSupply)
        setName(data.result.productSupply.product)
    }
    const handelClick = (id, productSupplyConditionId) => {
        setProductSupplyConditionId(productSupplyConditionId)
        closeModalCobdition()
        openModal(id)
    }

    const openModal = async (id) => {
        await getModalInfo(id)

        setIsOpen(true);
    }
    const openModalCondition = async (id) => {
        await getModalInfo(id)

        setIsOpenCondition(true);
    }
    const closeModal = () => {
        setIsOpen(false);
        setProductSupplyConditionId(null);
    }
    const closeModalCobdition = () => {
        setIsOpenCondition(false);
    }

    const addToCart = {

        customerId: user.id,
        productId: name.id,
        measureUnitId: modalInfo.measureUnitId,
        quantity,
        productSupplyId: modalInfo.id,
        productSupplyConditionId: productSupplyConditionId === 0 ? null : productSupplyConditionId,

    }


    const submitHandler = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const { data, status } = await AddTOCart(addToCart)
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
        setLoading(false)
    }

    let productCondistion;

    if (productSupply !== null) {

        productCondistion = productSupply.map(item => item.productSupplyConditions)
    }
    const groupReturn = (array) => {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {

            if (array[i].length > 0) {


                for (let j = 0; j < array[i].length; j++) {

                    newArray.push(array[i][j])

                }
                for (let c = 0; c < newArray.length; c++) {

                    [...newArray][c].gpName = Customerg.filter(item => item.id === newArray[c].customerGroupId).map((item, index) => { return (`${item.name}`) })
                }
            }
        }
        return newArray
    }


    if (productSupply !== null) {

        return (<div className='user-progress'>
            <div className=" statbox widget-content widget-content-area">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2">
                        <h4 className="text-center" style={{ color: '#027f00' }}>تابلوی عرضه</h4>
                    </div>
                </div>
                <div className="   ">
                    <div className=" w-100 " style={{ overflowX: "auto" }}>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Selected Option"
                            ariaHideApp={false}

                        >
                            <ModalSubmit loading={loading} productSupplyConditionId={productSupplyConditionId} formatter={formatter} modalInfo={modalInfo} closeModal={closeModal} name={name} quantity={quantity} submitHandler={submitHandler}
                                setquantity={setquantity} />
                        </Modal>
                        <Modal
                            isOpen={modalIsOpenCondition}
                            onRequestClose={closeModalCobdition}
                            style={customStyles}
                            contentLabel="Selected Option"
                            ariaHideApp={false}

                        >
                            <ConditionSalesBordAdmin closeModal={closeModalCobdition} productSupplyConditions={modalInfo} handelClick={handelClick} />

                        </Modal>

                        <table className="table mb-4 " >
                            <thead>
                                <tr>
                                    <th className="text-center">شناسه</th>
                                    <th className="text-center">شماره کوتاژ</th>
                                    <th className="text-center">محصول</th>
                                    <th className="text-center">قیمت</th>
                                    <th className="text-center">واحد</th>
                                    <th className="text-center">مقدار عرضه</th>
                                    <th className="text-center">توضیحات</th>
                                    <th className="text-center">گروه مشتری</th>
                                    <th className="text-center">تاریخ شروع</th>
                                    <th className="text-center">تاریخ پایان</th>

                                    <th className="text-center">  درخواستی</th>
                                    <th className="text-center"> مانده</th>
                                    <th className="text-center">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productSupply.slice(0, showMore ? productSupply.length : 5).map((item) =>


                                    <tr key={item.id} className="SalesBoard">
                                        <td className="text-center">{item.id}</td>
                                        <td className="text-center">{item.cottageCode}</td>

                                        <td className="text-center">{item.product.name}</td>
                                        <td className="text-center">{formatter.format(item.price)}</td>
                                        <td className="text-center">{MeasureUnitSample.filter(e => e.id === item.product.measureUnit).map(e => e.name)}</td>
                                        <td className="text-center">{formatter2.format(item.quantity)}</td>
                                        <td className="text-center">{item.comment.substring(0, 40)} {item.comment ? "..." : ''} </td>
                                        <td className="text-center">{groupReturn(productCondistion).filter(data => data.productSupplyId === item.id).map((item => item.gpName)) === null ? "عمومی" : [...new Set(groupReturn(productCondistion).filter(data => data.productSupplyId === item.id).map((item, index) => { return (`${"\xa0\xa0"}   ${item.gpName.length === 0 ? 'عمومی' : item.gpName} `) }))]}</td>
                                        <td className="text-center">{new Date(item.createDate).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                        <td className="text-center">{new Date(item.endDate).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                        <td className="text-center">{formatter2.format(item.orderedQuantity)}</td>
                                        <td className="text-center">{formatter2.format(item.remainedQuantity)}</td>
                                        <td className="text-center">{item.productSupplyConditions.length < 0 ? (<button className="btn btn-success" disabled={userRole[0] === 1 ? true : false} onClick={() => openModal(item.id)}>درخواست
                                        </button>) : (<button className="btn btn-success" disabled={userRole.includes(1) ? true : false} onClick={() => openModalCondition(item.id)}>شرایط پرداخت</button>)}</td>



                                    </tr>

                                )}
                            </tbody>
                        </table>

                        {productSupply.length <= 5 ? null : <Link
                            className=" bold d-block text-buttonColor   cursor-pointer m-auto text-center text-danger text-m"
                            onClick={() => setShowMore(!showMore)}
                            style={{ fontSize: 'medium', fontWeight: 'bold' }}
                        >
                            کلیک برای نمایش {showMore ? "کمتر" : "بیشتر"} ...
                        </Link>}


                    </div>
                </div>
            </div>

        </div>)
    }
    else {
        return <div className="m-5 d-flex justify-content-center">
            <table className="table">
                <thead>
                    <tr >
                        <th className="text-center">
                            تابلوی عرضه
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="text-center"><h5>در حال حاضر هیچ عرضه فعالی جهت نمایش وجود ندارد</h5></td>
                    </tr>
                </tbody>
            </table>
        </div>

    }
}
export default SalesBoardForAdmin