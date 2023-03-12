import { useEffect, useState, Fragment } from "react";
import { Button } from "react-bootstrap";
import {
  GetAllProductSupply,
  GetAllProductSupplyBord,
} from "../../../services/productSupplyService";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { AddTOCart } from "../../../services/cartShoppingService";
import { MeasureUnitSample } from "../../Enums/MeasureUnitSample";

import ModalSubmit from "./modalSubmit";
import { GetGroupById } from "../../../services/GroupService";
import ConditionSalesBordCustomer from "./conditionSalesBordCustomer";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";
import { RxDoubleArrowDown } from "react-icons/rx";
import { RxDoubleArrowUp } from "react-icons/rx";

const customStyles = {
  content: {
    inset: "50% auto auto 50%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5%",
    border: "2px ridge black",
  },
};
interface Props {
  setloading: any;
}

const SalesBoardForCustomer: React.FC<Props> = ({ setloading }) => {
  const user = useSelector((state: RootState) => state.user);
  const userRole = useSelector((state: RootState) => state.roles);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenCondition, setIsOpenCondition] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [productSupplyCondition, setProductSupplyCondition] = useState<any>([]);
  const [productSupply, setProductSupply] = useState([]);
  const [modalInfo, setModalInfo] = useState([]);
  const [quantity, setquantity] = useState(0);
  const [name, setName] = useState([]);
  const [groupInfo, setGroupInfo] = useState([]);
  const [productSupplyConditionId, setProductSupplyConditionId] = useState(0);

  const getProductSupply = async () => {
    try {
      const { data, status } = await GetAllProductSupplyBord();
      setProductSupply(data.result.productSupplies.values);

      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   
      getProductSupply();
    
  }, [user]);

  let formatter = new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  let formatter2 = new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  const openModal = (id: any) => {
    setProductSupplyCondition(id);

    setIsOpen(true);
  };
  const openModalCondition = (item: any, id: number) => {
    setProductSupplyCondition(item);
    setProductSupplyConditionId(id);
    if (id === productSupplyConditionId) {
      setIsOpenCondition(!modalIsOpenCondition);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
    // setProductSupplyConditionId(null)
  };
  const closeModalCobdition = () => {
    setIsOpenCondition(false);
  };
  const handelClick = (id: any, productSupplyConditionId: number) => {
    setProductSupplyConditionId(productSupplyConditionId);
    openModal(id);
  };

  const addToCart = {
    customerId: user.id,
    productId:
      productSupplyCondition.length !== 0
        ? productSupplyCondition.product.id
        : 0,
    measureUnitId: productSupplyCondition.measureUnitId,
    quantity,
    productSupplyId: productSupplyCondition.id,
    productSupplyConditionId:
      productSupplyConditionId === 0 ? null : productSupplyConditionId,
  };

  const submitHandler = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const { data, status } = await AddTOCart(addToCart);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (productSupply.length !== 0) {
    return (
      <div className="">
        <div className=" ">
        
          <div className=" tab-content  ">
            <div className="tab-pane fade show active">
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Selected Option"
                ariaHideApp={false}
              >
                <ModalSubmit
                  loading={loading}
                  productSupplyConditionId={productSupplyConditionId}
                  formatter={formatter}
                  modalInfo={productSupplyCondition}
                  closeModal={closeModal}
                  quantity={quantity}
                  submitHandler={submitHandler}
                  setquantity={setquantity}
                />
              </Modal>
              <div className="row mb-30-none justify-content-center">
                {productSupply &&
                  productSupply
                    .slice(0, showMore ? productSupply.length : 5)
                    .map((item: any, index: number) => (
                      <div key={index} className="col-sm-10 col-md-12 m-1">
                        <div className="  auction-item-2 text-center m-auto  ">
                          <div className="auction-content">
                            <div className=" row bid-area">
                              <div
                                className={
                                  modalIsOpenCondition === true &&
                                  productSupplyConditionId === item.id
                                    ? "col-md-10"
                                    : "col-lg-10"
                                }
                              >
                                <div className="row">
                                  <span className="col-lg-4 m-auto p-2">
                                    
                                  <b> عرضه کننده :</b>  {item.companyName}
                                  </span>
                                 
                                  <span
                                    
                                    className="col-lg-4 m-auto p-2"
                                  >
                                    
                                    <b>شناسه عرضه : </b>{" "}
                                    {item.name}
                                  </span>
                                  <span className="col-lg-2 m-auto p-2">
                                    
                                    <b>شماره کوتاژ :</b> {item.cottageCode}
                                  </span>
                                  <span className="col-lg-4 m-auto p-2">
                                    {" "}
                                    <b>محصول : </b>{" "}
                                     {item.productSupplyConditions.length === 0 ?`${item.product.name} فروش نقدی`:item.product.name}
                                    
                                  </span>
                                  <span className=" col-lg-4 m-auto p-2 ">
                                    {" "}
                                    <b>مقدار عرضه :</b> {" "}
                                    {formatter2.format(item.quantity) } {MeasureUnitSample.filter(
                                      (e) => e.id === item.product.measureUnitId
                                    ).map((e) => e.name)}
                                    {" ("}
                                    باقی مانده :{formatter2.format(item.remainedQuantity)}
                                    {" )"}
                                  </span>
                                  <span className="col-lg-2 m-auto p-2">
                                    {" "}
                                    <b>قیمت :</b> {`${formatter.format(item.price) } `}
                                  </span>
                                  
                                  <span className="col-lg-4 m-auto p-2" title={item.comment}>
                                    {" "}
                                    <b>توضیحات :</b> {" "}
                                    {item.comment?item.comment.substring(0, 40):'--'}{" "}
                                    {item.comment ? "..." : "--"}
                                   
                                  </span>
                                  <span className="col-lg-4 m-auto p-2">
                                    {" "}
                                    <b>تاریخ شروع :</b> {" "}
                                    {new Date(
                                      item.createDate
                                    ).toLocaleDateString("fa-IR", {
                                      year: "numeric",
                                      month: "2-digit",
                                      day: "2-digit",
                                    })}
                                  </span>
                                  <span className="col-lg-2 m-auto p-2">
                                    {" "}
                                    <b>تاریخ پایان :</b> 
                                    {` ${new Date(item.endDate).toLocaleDateString(
                                      "fa-IR",
                                      {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                      }
                                      
                                    )}`}
                                  </span>

                                  <span className="col-lg-3 m-auto p-2">
                                    {" "}
                                    
                                  </span>
                                </div>
                              </div>
                              <span className=" text-center  m-auto button-auction">
                                {" "}
                                {item.productSupplyConditions.length === 0 ? (
                                  <button
                                    className="btn btn-success p-3 m-1"
                                    disabled={userRole[0] === 1 ? true : false}
                                    onClick={() => openModal(item)}
                                  >
                                     افزودن به سبد خرید
                                  </button>
                                ) : (
                                  <button
                                  className="btn btn-success p-3 m-1"
                                    disabled={userRole[0] === 1 ? true : false}
                                    onClick={() =>
                                      openModalCondition(item, item.id)
                                    }
                                  >مشاهده شرایط پرداخت
                                  </button>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        {modalIsOpenCondition === true &&
                        productSupplyConditionId === item.id ? (
                          <div className="client-table-condition">
                            <ConditionSalesBordCustomer
                              closeModal={closeModalCobdition}
                              productSupplyConditions={productSupplyCondition}
                              handelClick={handelClick}
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
              </div>

              {productSupply && productSupply.length <= 5 ? null : (
                <div className="">
                  <div className=""> </div>
                  <Link
                    to="#"
                    className=" bold d-block text-buttonColor   cursor-pointer m-auto text-center  text-m"
                    onClick={() => setShowMore(!showMore)}
                    style={{ fontSize: "medium", fontWeight: "bold" }}
                  >
                    {showMore ? (
                      <RxDoubleArrowUp size="2rem" />
                    ) : (
                      <RxDoubleArrowDown size="2rem" />
                    )}
                  </Link>{" "}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="m-5 d-flex justify-content-center ">
        <table className="table bg-light">
          <thead>
            <tr>
              <th className="text-center">تابلوی عرضه</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">
                <h5>در حال حاضر هیچ عرضه فعالی جهت نمایش وجود ندارد</h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
};
export default SalesBoardForCustomer;
