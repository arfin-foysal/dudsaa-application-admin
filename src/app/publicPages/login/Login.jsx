import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo/logo.png";
import { useLoginMutation } from "../../../services/authApi";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { loginSchema } from "../../../validation/loginSchema";
import { toast } from "react-toastify";
import { authToken, authUser, userRole } from "../../../features/authSlice";
import { BsArrowRight } from "react-icons/bs";

const Login = () => {
  const [login, { data, isLoading, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  const formik = useFormik({
    validationSchema: loginSchema,
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const result = await login(values).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.error(error.data.message);
      }
    },
  });

  if (isSuccess) {
    dispatch(authUser(data?.data));
    dispatch(authToken(data?.data?.token));
    dispatch(userRole(data?.data?.user_type));
    // navigate("/dashboard");
    window.location.reload(false);
  }
  return (
    <>
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center my-5  ">
          <div className="col-12 col-md-4 pt-5">
            <div className="card o-hidden  shadow-lg my-5  rounded-4 border border-1 border-primary">
              <div className="card-body p-0 ">
                <div className="row">
                  <div className="col">
                    <div className="p-5">
                      <div>
                        {/* {isLoading && (
                          <div className="text-center">
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                          </div>
                        )} */}
                      </div>
                      <div className="text-center pb-3">
                        <img src={logo} alt="" width={70} />
                      </div>
                      <form className="user" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            name="email"
                            placeholder="Email Address"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.email && formik.touched.email
                                ? "form-control form-control-user is-invalid  shadow"
                                : "form-control form-control-user  shadow"
                            }
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <div className="invalid-feedback">
                              {formik.errors.email}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group pt-2">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            onBlur={formik.handleBlur}
                            className={
                              formik.errors.password && formik.touched.password
                                ? "form-control form-control-user is-invalid  shadow"
                                : "form-control form-control-user shadow"
                            }
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <div className="invalid-feedback">
                              {formik.errors.password}
                            </div>
                          ) : null}
                        </div>
                        <div className="form-group pt-3 text-center">

                          {
                            isLoading ? (
                              <div
                                className="btn btn-primary btn-sm rounded-5 border-dark "
                              >
                                <div className="spinner-border spinner-border-sm mt-1" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div>

                              </div>


                            ) : (<button
                              type="submit"
                              className="btn btn-primary btn-user btn-block btn-sm"
                            >
                              Login <BsArrowRight />
                            </button>)
                          }

                        </div>

                      </form>
                      <hr />
                      <div className="text-center ">
                        <Link
                          className="small text-dark"
                          to="#"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                      {/* <div className="text-center">
                      <Link className="small text-dark" to="/signup">
                        Create an Account!
                      </Link>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
