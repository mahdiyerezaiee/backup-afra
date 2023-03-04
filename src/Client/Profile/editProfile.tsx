import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerInfo } from "../../services/customerService";
import { toast } from "react-toastify";
import { GetUserInfo } from "../../services/userService";
import { GetAllProvince, SetAddress } from "../../services/addressService";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import {
  validatAlpha,
  validateEmail,
  validatmin10,
  validatPassword,
} from "../../Utils/validitionParams";
import { RootState } from "../../store";
import { FintotechCheck } from "./../../services/outScopeService";
import { ClipLoader } from "react-spinners";
import {
  DeleteAttachments,
  GetAttachments,
} from "../../services/attachmentService";
import QueryString from "qs";
import { TiPencil } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import ImageFileUploader from "../../Utils/ImageFileUploader";

const attachmetURL = (window as any).globalThis.stie_att;

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const userinfo = useSelector((state: RootState) => state.user);
  const roles = useSelector((state: RootState) => state.roles);
  const [firstName, setfirstName] = useState(userinfo.firstName);
  const [lastName, setlastName] = useState(userinfo.lastName);
  const [nationalCode, setnationalCode] = useState(userinfo.nationalCode);
  const [email, setemail] = useState(userinfo.email);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [attachments, Setattachments] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const togglePassword = (e: any) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handelGetAttachment = async () => {
    let config = {
      headers: { "Content-Type": "application/json" },
      params: {
        entityTypeId: 1,
        entityId: Number(localStorage.getItem("connect")),
        attachmentTypeId: 3,
      },
      paramsSerializer: (params: any) => {
        return QueryString.stringify(params);
      },
    };
    try {
      const { data, status } = await GetAttachments(config);
      if (status === 200) {
        Setattachments(data.result.attachments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const user = {
    id: userinfo.id,
    userName: userinfo.userName,
    email,
    firstName,
    lastName,
    requireInfo: false,
    nationalCode,
    organizationId: userinfo.organizationId,
    password,
    active: true,
    companyId: userinfo.companyId,
  };

  const getCurrentUser = async () => {
    const { data, status } = await GetUserInfo();
    if (status === 200) {
      setfirstName(data.result.customer.firstName);
      setlastName(data.result.customer.lastName);
      setnationalCode(data.result.customer.nationalCode);
      setemail(data.result.customer.email);
    }
  };

  useEffect(() => {
    getCurrentUser();
    handelGetAttachment();
  }, []);
  const openModalUpload = () => {
    setModalOpen(true);
  };

  const HandelDeleteAttachment = async (id: number) => {
    try {
      const { data, status } = await DeleteAttachments(id);
      if (status === 200) {
        toast.success("ویرایش با موفقعیت انجام شد", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }

    window.location.reload();
  };
  const showHandler = () => {
    setShow(!show);
  };
  const handelSetCustomer = async () => {
    setLoading(true);
    try {
      const body = {
        customerId: userinfo.id,
        nationalCode,
      };

      const { data, status } = await FintotechCheck(body);

      if (status === 200) {
        try {
          const { data, status } = await setCustomerInfo(user);
          if (status === 200) {
            toast.success(
              " اطلاعات با موفقیت ثبت شد لطفا منتظر تایید ادمین باشد",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
              }
            );
          }
        } catch (error) {
          console.log(error);
        }
        getCurrentUser();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const backHandel = (e: any) => {
    e.preventDefault();

    navigate(-1);
  };
  const CloseModalUpload = () => {
    setModalOpen(false);
  };
  let newAttachment: any = [];
  newAttachment = attachments.filter(
    (item: any) => item.deleted === false && item.attachmentTypeId === 3
  );
  return (
    <div className="  layout-px-spacing">
      <div className="page-header">
        <div className="page-title">
          <h3>ویرایش اطلاعات</h3>
        </div>
      </div>

      <div className="mt-5 mx-auto p-5 dashboard-widget bg-light rounded row d-flex justify-content-center col-12">
        
        {roles.includes(1) ? (
          <div className="text-center  rounded border-bottom border-danger">
            <h6 className="text-danger ">
              *لطفا جهت استفاده از سایر امکانات سامانه اطلاعات کاربری خود را
              تکمیل کنید*
            </h6>
          </div>
        ) : (
          ""
        )}
        <div className="col-lg-12 mb-4">
                  {newAttachment.length === 0 ? (
                    <div className="text-center ">
                      <img src="/assets/img/avatar.svg" />
                      <button
                        onClick={() => openModalUpload()}
                        className="border-0 bg-transparent non-hover"
                      >
                        <TiPencil size="1.5rem" color="blue" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center user-info">
                      <img
                        src={`${attachmetURL}${newAttachment[0].path}`}
                        className="rounded-circle "
                        alt={`${user.firstName} ${user.lastName}`}
                        style={{ height: "80px", width: "80px" }}
                      />
                      <button
                        onClick={() =>
                          HandelDeleteAttachment(newAttachment[0].id)
                        }
                        className="border-0 bg-transparent non-hover"
                      >
                        <ImCross size="1rem" color="red" title="حذف عکس" />
                      </button>
                    </div>
                  )}
                </div>
        <div className="mt-5 col-md-8 col-xs-12">
          <Formik
            initialValues={{
              id: userinfo.id,
              userName: userinfo.userName,
              email,
              firstName,
              lastName,
              requireInfo: false,
              nationalCode,
              organizationId: null,
              password,
              active: true,
              companyId: userinfo.companyId,
            }}
            enableReinitialize={true}
            onSubmit={(values) => {
              // same shape as initial values
              handelSetCustomer();
            }}
          >
            {({
              errors,
              touched,
              validateField,
              validateForm,
              setFieldValue,
              handleChange,
              values,
            }) => (
              <Form className="row">
                
                <div className="col-lg-6 form-group  mb-4  textOnInput  align-content-between">
                  <label>نام</label>
                  <Field
                    type="text"
                    className="form-control opacityForInput"
                    placeholder="نام"
                    name="firstName"
                    validate={validatAlpha}
                    value={firstName}
                    onChange={(e: any) => {
                      setfirstName(e.target.value);
                    }}
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="text-danger">{errors.firstName}</div>
                  )}
                </div>
                <div className="col-lg-6 form-group mb-4 textOnInput">
                  <label>نام خانوادگی</label>
                  <Field
                    type="text"
                    className="form-control opacityForInput"
                    placeholder="نام خانوادگی"
                    name="lastName"
                    validate={validatAlpha}
                    value={lastName}
                    onChange={(e: any) => setlastName(e.target.value)}
                  />
                </div>
                <div className="col-lg-6 form-group mb-4 textOnInput">
                  <label>کد ملی</label>
                  <Field
                    type="text"
                    className="form-control opacityForInput"
                    placeholder="0070090602"
                    name="nationalCode"
                    validate={validatmin10}
                    value={values.nationalCode}
                    onChange={(e: any) => setnationalCode(e.target.value)}
                  />
                  {errors.nationalCode && touched.nationalCode && (
                    <div className="text-danger">{errors.nationalCode}</div>
                  )}
                </div>

                <div className="col-lg-6 form-group mb-4 textOnInput">
                  <label>ایمیل</label>
                  <Field
                    type="text"
                    className="form-control opacityForInput"
                    placeholder="email@example.com"
                    name="email"
                    validate={validateEmail}
                    value={values.email}
                    onChange={(e: any) => setemail(e.target.value)}
                  />
                  {errors.email && touched.email && (
                    <div className="text-danger">{errors.email}</div>
                  )}
                </div>
                <div className="col-12">
                  <input type="checkbox" checked={show} onClick={showHandler} />{" "}
                  تغییر رمز عبور{" "}
                </div>
                {show === true ? (
                  <div className="col-12">
                    <div className="row">
                      <div
                        className=" col-lg-6 input-group mb-5 mt-4 textOnInputForGrp rounded"
                        hidden={!show}
                      >
                        <label>رمز عبور</label>
                        <Field
                          type={passwordType}
                          className=" form-control opacityForInput"
                          placeholder="*******"
                          validate={validatPassword}
                          name="password"
                        />
                        {errors.password && touched.password && (
                          <div className="text-danger">{errors.password}</div>
                        )}

                        <div className="input-group-append ">
                          <button
                            className=" btn-outline-primary box-shadow-none rounded"
                            onClick={togglePassword}
                            style={{ border: "none" }}
                          >
                            {passwordType === "password" ? (
                              <svg
                                style={{ color: "blue" }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-eye"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                  fill="blue"
                                ></path>
                                <path
                                  d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                  fill="blue"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-eye-slash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      <div
                        className=" input-group col-6 mb-5 mt-4 textOnInputForGrp rounded"
                        hidden={!show}
                      >
                        <label>تکرار مرز عبور</label>
                        <input
                          type={passwordType}
                          className="  form-control opacityForInput"
                          placeholder="*******"
                          value={passwordConfirm}
                          onChange={(e: any) => {
                            setPasswordConfirm(e.target.value);
                          }}
                        />
                        <div className="input-group-append ">
                          <button
                            className=" btn-outline-primary box-shadow-none rounded"
                            onClick={togglePassword}
                            style={{ border: "none", outline: "none" }}
                          >
                            {passwordType === "password" ? (
                              <svg
                                style={{ color: "blue" }}
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="bi bi-eye"
                                viewBox="0 0 16 16"
                              >
                                <path
                                  d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                                  fill="blue"
                                ></path>
                                <path
                                  d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                                  fill="blue"
                                ></path>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-eye-slash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      {password !== passwordConfirm ? (
                        <span className="text-danger ">
                          رمز عبور برابر نیست
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="col-12">
                  <div className="row justify-content-between mt-4">
                    <div>
                      <button type="submit" className="btn btn-success">
                        درخواست بررسی اطلاعات
                      </button>
                      <ClipLoader loading={loading} color="#ffff" size={15} />
                    </div>
                    <div>
                      <button onClick={backHandel} className="btn btn-primary">
                        بازگشت
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <ImageFileUploader
          closeModal={CloseModalUpload}
          modalIsOpen={ModalOpen}
          comment={"بارگزاری عکس پروفایل"}
          EntityTypesId={1}
          EntityId={user.id}
        />
      </div>
    </div>
  );
};
export default EditProfile;
