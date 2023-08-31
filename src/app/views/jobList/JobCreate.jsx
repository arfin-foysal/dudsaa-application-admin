import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useRef } from 'react';
import { useJobSaveOrUpdateMutation, useNoticeSaveOrUpdateMutation } from "../../../services/resourceApi";
const JobCreate = ({ handleClose }) => {
    const editor = useRef(null);
    const [jobSaveOrUpdate, res] = useJobSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'title': '',
            'company_name': '',
            'image': '',
            'position': '',
            'vacancy': '',
            'location': '',
            'job_nature': '',
            'link': '',
            'remuneration': '',
            'description': '',
            'is_active': true,
        },

        onSubmit: async (values, { resetForm }) => {


            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('company_name', values.company_name);
            formData.append('position', values.position);
            formData.append('image', values.image);
            formData.append('location', values.location);
            formData.append('job_nature', values.job_nature);
            formData.append('vacancy', values.vacancy);
            formData.append('link', values.link);
            formData.append('remuneration', values.remuneration);
            formData.append('description', values.description);
            formData.append('is_active', values.is_active ? 1 : 0);

            resetForm()

            try {
                const result = await jobSaveOrUpdate(formData).unwrap();
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

                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Title<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Title"
                                type="text"
                                className="form-control"
                                name="title"
                                onChange={formik.handleChange}
                                value={formik.values.title}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">
                            Company Name
                        </label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Company Name"
                                type="text"
                                className="form-control"
                                name="company_name"
                                onChange={formik.handleChange}
                                value={formik.values.company_name}

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">
                            Position
                        </label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Position"
                                type="text"
                                className="form-control"
                                name="position"
                                onChange={formik.handleChange}
                                value={formik.values.position}

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">
                            Vacancy
                        </label>
                        <div className="col-12">
                            <input
                                placeholder="Enter vacancy"
                                type="number"
                                className="form-control"
                                name="vacancy"
                                onChange={formik.handleChange}
                                value={formik.values.vacancy}

                            />
                        </div>
                    </div>
                    <div className="form-group col-4 my-1">
                        <label className="col-12 col-form-label">
                            Link<span className=" text-danger">*</span>
                        </label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Link"
                                type="text"
                                className="form-control"
                                name="link"
                                onChange={formik.handleChange}
                                value={formik.values.link}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">
                            Remuneration<span className=" text-danger">*</span>
                        </label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Remuneration"
                                type="number"
                                className="form-control"
                                name="remuneration"
                                onChange={formik.handleChange}
                                value={formik.values.remuneration}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">
                            Location<span className=" text-danger">*</span>
                        </label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Remuneration"
                                type="text"
                                className="form-control"
                                name="location"
                                onChange={formik.handleChange}
                                value={formik.values.location}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">
                            Job Nature
                        </label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Remuneration"
                                type="text"
                                className="form-control"
                                name="job_nature"
                                onChange={formik.handleChange}
                                value={formik.values.job_nature}

                            />
                        </div>
                    </div>
                    <div className="form-group  col-6 my-1">
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
                    <div className="form-group  col-12 my-1">
                        <label className="col-12 col-form-label">Description<span className=" text-danger">*</span></label>
                        <JoditEditor
                            ref={editor}
                            value={formik.values.description}
                            tabIndex={1}
                            onChange={(newContent) => {
                                formik.setFieldValue("description", newContent);
                            }}
                            required
                        />
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

                    <button className="btn btn-dark me-2 btn-sm" onClick={handleClose}>
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

export default JobCreate;
