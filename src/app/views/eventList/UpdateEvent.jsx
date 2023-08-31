import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEventSaveOrUpdateMutation } from "../../../services/resourceApi";

const UpdateEvent = ({ handleClose,paramValue }) => {
    const [eventSaveOrUpdate, res] = useEventSaveOrUpdateMutation();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'id':paramValue.id,
            'title': paramValue.title,
            'description': paramValue.description,
            'venue': paramValue.venue,
            'event_date': paramValue.event_date?.slice(0, 10),
            'banner_image':paramValue.banner_image,
            'is_active': true,
        },
        onSubmit: async (values, { resetForm }) => {
            const formData = new FormData();
            formData.append('id',values.id)
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('venue', values.venue);
            formData.append('event_date', values.event_date);
            formData.append('banner_image', values.banner_image);
            formData.append('is_active', values.is_active ? 1 : 0);
            try {
                const result = await eventSaveOrUpdate(formData).unwrap();
                resetForm();
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
                            Description

                        </label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter Description"
                                type="text"
                                className="form-control"
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                    </div>

                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Venue<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Venue"
                                type="text"
                                className="form-control"
                                name="venue"
                                onChange={formik.handleChange}
                                value={formik.values.venue}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Event Date<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter Event Date"
                                type="date"
                                className="form-control"
                                name="event_date"
                                onChange={formik.handleChange}
                                value={formik.values.event_date}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group  col-6 my-1">
                        <label className="col-12 col-form-label">Banner Image</label>
                        <div className="col-12">
                            <input
                                className="form-control"
                                name="banner_image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("banner_image", e.currentTarget.files[0]);
                                }}
                            />
                        </div>
                    </div>

                    <div className="form-group row col-6 my-2 mt-5 ">
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
export default UpdateEvent;
