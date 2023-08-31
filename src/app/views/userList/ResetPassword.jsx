import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../../services/userApi";
const ResetPassword = ({ handleClose, paramValue }) => {
    const [resetPassword, res] = useResetPasswordMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'id': paramValue?.id,
            'password': '',
        },
            onSubmit: async (values, { resetForm }) => {

                try {
                    console.log(values)
                    const result = await resetPassword(values).unwrap();
                    toast.success(result.message);
                    resetForm()
                } catch (error) {
                    toast.warn(error.data.message);

                }
            }
    });
    if (res.isSuccess) {
        handleClose();
    }

    return (
        <div>
            <form
                className="form-sample"
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data"
            >
                <div className="row">
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Password<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter password"
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                required
                            />
                        </div>
                    </div>
                </div>
                <Modal.Footer>

                    <button
                        type="button"
                        className="btn btn-dark me-2 btn-sm" onClick={handleClose}>
                        Close
                    </button>

                    <button type="submit" className="btn btn-warning btn-sm">
                        Submit
                    </button>

                </Modal.Footer>
            </form>
        </div>
    );
};

export default ResetPassword;
