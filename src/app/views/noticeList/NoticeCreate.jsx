import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useRef } from 'react';
import { useNoticeSaveOrUpdateMutation } from "../../../services/resourceApi";
const NoticeCreate = ({ handleClose }) => {
    const editor = useRef(null);
    const [noticeSaveOrUpdate, res] = useNoticeSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'title': '',
            'body': '',
            'is_active': true,
        },

        onSubmit: async (values, { resetForm }) => {
            resetForm()
            try {
                const result = await noticeSaveOrUpdate(values).unwrap();
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

                    <div className="form-group  col-12 my-1">
                        <label className="col-12 col-form-label">Body</label>
                        <JoditEditor
                            ref={editor}
                            value={formik.values.body}
                            tabIndex={1}
                            onChange={(newContent) => {
                                formik.setFieldValue("body", newContent);
                            }}
                        />
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

export default NoticeCreate;
