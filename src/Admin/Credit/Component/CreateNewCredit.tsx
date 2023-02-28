import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
  useReducer,
} from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { validatAlpha, validatNumber } from "../../../Utils/validitionParams";
import { Field, Form, Formik } from "formik";
import Select from "react-select";
import {
  creditReducer,
  CreditState,
} from "../../../store/Slice/credit/CreditSlice";
import { submitCreateCredit, units } from "../Service/CreditService";
import MultiSelect from './../../../Utils/MultiSelect';

const CreateNewCredit: React.FC = () => {
  const [state, dispatch] = useReducer(creditReducer, CreditState);
  const navigate = useNavigate();

  return (
    <div className="user-progress">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 m-2">
          <h5>تعریف گروه اعتباری</h5>
          <p>در این بخش می توانید گروه اعتباری جدید تعریف کنید</p>
        </div>
      </div>
      <div className="row d-flex justify-content-center ">
        <div className=" col-md-8 col-xs-12 m-2">
          <Formik
            initialValues={{
              id: null,
              name: "",
              value: "",
              priceUnitId: 0,
              comment: "",
            }}
            enableReinitialize={true}
            onSubmit={(values: any) => {
              // same shape as initial values
              submitCreateCredit({ values, navigate, dispatch });
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
              <Form>
                <div className="n-chk d-flex  mb-4">
                  <div></div>
                </div>

                <div className="form-group mb-4 textOnInput">
                  <div className="form-row">
                    <div className="col-4 ">
                      <label> نام </label>
                      <Field
                        validate={validatAlpha}
                        name="name"
                        type="text"
                        className="form-control opacityForInput"
                      />
                      {errors.name && touched.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </div>

                    <div className="col-4">
                      <label>میزان اعتبار</label>
                      <Field
                        validate={validatNumber}
                        name="value"
                        type="text"
                        className="form-control opacityForInput"
                      />
                      {errors.value && touched.value && (
                        <div className="text-danger">
                          {String(errors.value)}
                        </div>
                      )}
                    </div>

                    <div className="col-4 ">
                      <label>واحد</label>

                      <Field
                        name="priceUnitId"
                        id="singleSelectCustom"
                        placeholder="واحد"
                        isMulti={false}
                        component={MultiSelect}
                        options={units()}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="form-group mb-4 textOnInput"
                  style={{ position: "relative" }}
                ></div>
                <div className="form-group mb-4 textOnInput">
                  <label>توضیحات</label>

                  <Field
                    name="comment"
                    as="textarea"
                    className="form-control opacityForInput "
                    rows="4"
                    placeholder="توضیحات تکمیلی"
                  />
                  {errors.comment && touched.comment && (
                    <div className="text-danger">{errors.comment}</div>
                  )}
                </div>

                <div className="row justify-content-between">
                  <div className="col-6  ">
                    <button
                      type="submit"
                      disabled={state.loading}
                      className="btn btn-success float-right"
                    >
                      ثبت
                      <ClipLoader
                        loading={state.loading}
                        color="#ffff"
                        size={15}
                      />
                    </button>{" "}
                  </div>
                  <div className="col-6  ">
                    <NavLink to="/admin/Credits" className="btn btn-danger ">
                      بازگشت
                    </NavLink>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default CreateNewCredit;
