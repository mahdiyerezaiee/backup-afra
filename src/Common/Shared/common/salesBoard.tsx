import { useEffect, useState ,Fragment} from "react";
import { Button } from "react-bootstrap";
import { GetAllProductSupply, GetAllProductSupplyBord } from "../../../services/productSupplyService";
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import { AddTOCart } from "../../../services/cartShoppingService";
import { MeasureUnitSample } from "../../Enums/MeasureUnitSample";

import ModalSubmit from "./modalSubmit";
import { GetGroupById } from "../../../services/GroupService";
import ConditionSalesBordCustomer from "./conditionSalesBordCustomer";
import { Link } from 'react-router-dom';
import { RootState } from "../../../store";

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

const SalesBoardForCustomer:React.FC = () => {
    const user = useSelector((state:RootState) => state.user);
    const userRole = useSelector((state:RootState) => state.roles);
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenCondition, setIsOpenCondition] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [productSupplyCondition, setProductSupplyCondition] = useState<any>( []);

    const [productSupply, setProductSupply] = useState([]);
    const [modalInfo, setModalInfo] = useState([])
    const [quantity, setquantity] = useState(0)
    const [name, setName] = useState([]);
    const [groupInfo, setGroupInfo] = useState([])
    const [productSupplyConditionId, setProductSupplyConditionId] = useState(0);

    const getProductSupply = async () => {
        try {
            const { data, status } = await GetAllProductSupplyBord();

            setProductSupply(data.result.productSupplies.values)

        } catch (error) {
            console.log(error);
        }
        // if (user ) {
        //
        //     try {
        //         const { data, status } = await GetGroupById(user.groupId)
        //             setGroupInfo(data.result.group)
        //
        //
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

    }

    useEffect(() => {
        getProductSupply();
            }, [user])
    let formatter = new Intl.NumberFormat('fa-IR', {
        style: 'currency',
        currency: 'IRR', maximumFractionDigits: 0, 
        minimumFractionDigits: 0, 
    });

    let formatter2 = new Intl.NumberFormat('fa-IR', {
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    });
    const openModal =  (id:number) => {
        setProductSupplyConditionId(id)

        setIsOpen(true);
    }
    const openModalCondition =  (item:any ,id:number) => {
        setProductSupplyCondition(item)
        setProductSupplyConditionId(id)
        if (id === productSupplyConditionId){
            setIsOpenCondition(!modalIsOpenCondition);

        }
    }
    const closeModal = () => {
        setIsOpen(false);
        // setProductSupplyConditionId(null)

    }
    const closeModalCobdition = () => {
        setIsOpenCondition(false);
    }
    const handelClick = (id:any, productSupplyConditionId:number) => {
        setProductSupplyConditionId(productSupplyConditionId)
        openModal(id)
    }

    const addToCart = {

        customerId: user.id,
        productId:productSupplyCondition.length !==0 ? productSupplyCondition.product.id:0,
        measureUnitId: productSupplyCondition.measureUnitId,
        quantity,
        productSupplyId: productSupplyCondition.id,
        productSupplyConditionId: productSupplyConditionId === 0 ? null : productSupplyConditionId,

    }

    const submitHandler = async (e:any) => {
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

    if (productSupply !== null) {

        return (<div className=''>
            <div className=" statbox widget-content widget-content-area" >
                <div className="row " >
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2 " >
                    <h4 className="text-center" style={{color:'#027f00'}}>
                        کالای قابل عرضه به گروه مشتریان (
                       عمومی
                        {/*{!groupInfo    ?  "عمومی" : groupInfo && groupInfo.name}*/}
                        )
                    </h4>
                    </div>
                </div>
                <div className="   ">
                    <div className="table-responsive overflow-hidden" >
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Selected Option"
                            ariaHideApp={false}

                        >
                            <ModalSubmit  loading={loading} productSupplyConditionId={productSupplyConditionId} formatter={formatter} modalInfo={productSupplyCondition} closeModal={closeModal}  quantity={quantity} submitHandler={submitHandler}
                                setquantity={setquantity} />
                        </Modal>
                        {/*<Modal*/}
                        {/*    isOpen={modalIsOpenCondition}*/}
                        {/*    onRequestClose={closeModalCobdition}*/}
                        {/*    style={customStyles}*/}
                        {/*    contentLabel="Selected Option"*/}
                        {/*    ariaHideApp={false}*/}

                        {/*>*/}

                        {/*</Modal>*/}

                        <table className="table mb-4 SalesBoard " >
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th className="text-center">شماره کوتاژ</th>
                                    <th className="text-center">محصول</th>
                                    <th className="text-center">قیمت</th>
                                    <th className="text-center">واحد</th>
                                    <th className="text-center">مقدار عرضه</th>
                                    <th className="text-center">توضیحات</th>

                                    <th className="text-center">تاریخ شروع</th>
                                    <th className="text-center">تاریخ پایان</th>
                                    
                                     <th className="text-center">باقی مانده</th>
                                    <th className="text-center">عملیات</th>
                                </tr>
                            </thead>
                            <tbody >
                                {productSupply && productSupply.slice(0, showMore? productSupply.length : 5).map((item:any , index:number) =>
                                    <Fragment key={index + "_frag"}>

                                    <tr key={item.id}>
                                        <td className="text-center">{item.id}</td>
                                        <td className="text-center">{item.cottageCode}</td>
                                        <td className="text-center">{item.product.name}</td>
                                        <td className="text-center">{formatter.format(item.price)}</td>
                                        <td className="text-center">{MeasureUnitSample.filter(e => e.id === item.product.measureUnitId).map(e => e.name)}</td>
                                        <td className="text-center">{formatter2.format(item.quantity)}</td>
                                        <td className="text-center">{item.comment.substring(0, 40)} {item.comment ? "..." : ''} </td>
                                        <td className="text-center">{new Date(item.createDate).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                        <td className="text-center">{new Date(item.endDate).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td> 
                                        <td className="text-center">{formatter2.format(item.remainedQuantity)}</td>
                                        <td className="text-center">{item.productSupplyConditions.length === 0 ? (<button className="btn btn-success" disabled={userRole[0] === 1 ? true : false} onClick={() => openModal(item)}>ثبت درخواست
                                            </button>) : (<button  className=" btn btn-success" disabled={userRole[0] === 1 ? true : false} onClick={() => openModalCondition(item , item.id)}>شرایط پرداخت</button>)}</td>


                                    </tr>

                                                {modalIsOpenCondition === true && productSupplyConditionId === item.id?
                                                    <tr >
                                                        <td colSpan={17}   className="fadeInt   m-3    " >
                                                    <ConditionSalesBordCustomer  closeModal={closeModalCobdition} productSupplyConditions={productSupplyCondition} handelClick={handelClick} />
                                                        </td>

                                                    </tr>
                                                            :null
                                                }


                                    </Fragment>
                                )}
                            </tbody>
                        </table>


                        {productSupply && productSupply.length <= 5 ? null:  <Link to='#'
                            className=" bold d-block text-buttonColor   cursor-pointer m-auto text-center text-danger text-m"
                            onClick={() => setShowMore(!showMore)}
                            style={{fontSize:'medium', fontWeight:'bold'}}
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
export default SalesBoardForCustomer