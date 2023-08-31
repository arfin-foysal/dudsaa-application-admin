import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUserCreateOrUpdateMutation } from "../../../services/userApi";
const UpdateUser = ({ handleClose, paramValue }) => {
    console.log(paramValue)
    const [userCreateOrUpdate, res] = useUserCreateOrUpdateMutation();
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            'id':paramValue?.id,
            'name': paramValue?.name,
            'email': paramValue?.email,
            'contact_no': paramValue?.contact_no,
            'gender': paramValue.gender,
            'date_of_birth': paramValue?.date_of_birth,
            'batch_no': paramValue?.batch_no,
            'user_type': paramValue?.user_type,
            'image': paramValue?.image,
            'status': paramValue?.status,
            'is_active': paramValue?.is_active,
        },

        onSubmit: async (values, { resetForm }) => {
            let formData = new FormData();
            formData.append('id',values.id)
            formData.append('name', values.name);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('contact_no', values.contact_no);
            formData.append('gender', values.gender);
            formData.append('user_type', values.user_type);
            formData.append('date_of_birth', values.date_of_birth);
            formData.append('batch_no', values.batch_no);
            formData.append('image', values.image);
            formData.append('status', values.status);
            formData.append('is_active', values.is_active ? 1 : 0);
            resetForm()
            try {
                const result = await userCreateOrUpdate(formData).unwrap();
                toast.success(result.message);

            } catch (error) {
                toast.warn(error.data.message);
            }
        },
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
                        <label className="col-12 col-form-label">Name<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter name"
                                type="text"
                                className="form-control"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                required
                            />
                        </div>
                    </div>
    
                    <div className="form-group col-12 my-1">
                        <label className="col-12 col-form-label">Email<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter email"
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                required

                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Contact No<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Contact no"
                                type="number"
                                className="form-control"
                                name="contact_no"
                                onChange={formik.handleChange}
                                value={formik.values.contact_no}
                                required

                            />
                        </div>
                    </div>


                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Gender<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="gender"
                                onChange={formik.handleChange}
                                value={formik.values.gender}

                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">User Type</label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="user_type"
                                onChange={formik.handleChange}
                                value={formik.values.user_type}
                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                <option value="Member">Member</option>
                                <option value="Admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Status</label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="status"
                                onChange={formik.handleChange}
                                value={formik.values.status}
                            >
                                <option value="" disabled selected hidden> --Select-- </option>
                                <option value="Pending">Pending</option>
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                                <option value="On-Hold">On-Hold</option>
                            </select>
                        </div>
                    </div>
           
                   
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Date Of Birth</label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Date Of Birth"
                                type="date"
                                className="form-control"
                                name="date_of_birth"
                                onChange={formik.handleChange}
                                value={formik.values.date_of_birth}

                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Batch No:<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Batch No"
                                type="text"
                                className="form-control"
                                name="batch_no"
                                onChange={formik.handleChange}
                                value={formik.values.batch_no}
                                required

                            />
                        </div>
                    </div>
                    
            
                    <div className="form-group  col-12 my-1">
                        <label className="col-12 col-form-label">Image</label>
                        <div className="col-12">
                            <input
                                className="form-control"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("image", e.currentTarget.files[0]);

                                }}
                            />
                        </div>
                    </div>
                    <div className="form-group row col-12 my-2 ">
                        <label className="col-6 col-form-label">Is Active</label>
                        <div className="col-6">
                            <div className="form-check form-switch mt-2">
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"

                                    name="is_active"
                                    onChange={formik.handleChange}
                                    value={formik.values.is_active}
                                    checked={formik.values.is_active}
                                />
                            </div>
                        </div>
                    </div>
                    

                </div>
                <Modal.Footer>

                    <button
                    type="button"
                        className="btn btn-dark me-2 btn-sm" onClick={handleClose}>
                        Close
                    </button>

                    <button type="submit" className="btn btn-success btn-sm">
                        Submit
                    </button>

                </Modal.Footer>
            </form>
        </div>
    );
};

export default UpdateUser;
