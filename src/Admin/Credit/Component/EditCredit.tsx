import React, {
  useEffect,
  useReducer,
} from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import {
  validatAlpha,
  validatNumber,
} from "../../../Utils/validitionParams";
import { Field, Form, Formik } from "formik";
import { getCredit, submitCreateCredit, units } from "../Service/CreditService";
import {
  creditReducer,
  CreditState,
} from "../../../store/Slice/credit/CreditSlice";
import { stat } from "fs";
import MultiSelect from "../../../Utils/MultiSelect";

const EditCredit: React.FC = () => {
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(creditReducer, CreditState);
  const { name } = state.body;
  const { priceUnitId } = state.body;
  const { value } = state.body;
  const { comment } = state.body;
  const param = useParams();
  let id = param.id;

  useEffect(() => {
    getCredit({ id, dispatch });
  }, []);

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
              id: param.id,
              name: `${name}`,
              value: `${value}`,
              priceUnitId: priceUnitId,
              comment: `${comment}`,
            }}
            enableReinitialize={true}
            onSubmit={(values: any) => {
              // same shape as initial values
              submitCreateCredit({ values, navigate, dispatch });
              // submit()
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

                      {priceUnitId === 0 ? (
                        <>
                          <Field
                            name="priceUnitId"
                            id="singleSelectCustom"
                            placeholder="واحد"
                            isMulti={false}
                            component={MultiSelect}
                            options={units()}
                          />
                          <p style={{ color: "red" }}>
                            لطفا این فیلد را پر کنید
                          </p>
                        </>
                      ) : (
                        <Field
                          name="priceUnitId"
                          id="singleSelectCustom"
                          placeholder="واحد"
                          isMulti={false}
                          component={MultiSelect}
                          options={units()}
                        />
                      )}
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
                      className="btn btn-success float-right"
                    >
                      ثبت
                      <ClipLoader
                        loading={!state.loading}
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
export default EditCredit;
