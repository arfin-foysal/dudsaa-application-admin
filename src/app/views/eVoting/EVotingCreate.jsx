import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";

import { usePollSaveOrUpdateMutation } from "../../../services/resourceApi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidMinusCircle } from "react-icons/bi";
import { useState } from 'react';
const EVotingCreate = ({ handleClose }) => {
    const [option, setOption] = useState([])
    const [pollSaveOrUpdate, res] = usePollSaveOrUpdateMutation();
    const formik = useFormik({
        initialValues: {
            'title': '',
            'description': '',
            'end_date': '',
            'status': "Active",
            'is_active': true,
            'option': '',
        },
        onSubmit: async (values, { resetForm }) => {
            resetForm()
            const optionData = JSON.stringify(option)
            const data = {
                ...values,
                option: optionData
            }
            try {
                const result = await pollSaveOrUpdate(data).unwrap();
                toast.success(result.message);
            } catch (error) {
                toast.warn(error.data.message);
            }
            setOption([])
        },
    });

    if (res.isSuccess) {
        handleClose();
    }

    const handelAdd = (e) => {

        if (formik.values.option === '') {
            toast.warn("Option is required")
            return
        }

        e.preventDefault()
        setOption([...option, formik.values.option])
        formik.values.option = ''
    }

    const handelDelete = (e) => {
        setOption(option.filter((item, index) => index !== e))
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
                        <label className="col-12 col-form-label">End Date<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <input
                                placeholder="Enter end date"
                                type="date"
                                className="form-control"
                                name="end_date"
                                onChange={formik.handleChange}
                                value={formik.values.end_date}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Description</label>
                        <div className="col-12">
                            <textarea
                                placeholder="Enter Description"
                                type="text"
                                className="form-control"
                                name="description"
                                rows={1}
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </div>
                    </div>
                    <div className="form-group col-6 my-1">
                        <label className="col-12 col-form-label">Status<span className=" text-danger">*</span></label>
                        <div className="col-12">
                            <select
                                className="form-control"
                                name="status"
                                onChange={formik.handleChange}
                                value={formik.values.status}
                                required
                            >
                                <option value="Active">Active</option>
                                <option value="Pending">Pending</option>
                                <option value="On-Hold">On-Hold</option>
                            </select>
                        </div>
                    </div>
                    <div className="row shadow-lg my-2 border">
                        <div className="form-group col-10 my-2">
                            <label className="col-12 col-form-label">Option <span className=" text-danger">*</span></label>
                            <div className="col-12">
                                <input
                                    placeholder="Enter title"
                                    type="text"
                                    className="form-control"
                                    name="option"
                                    onChange={formik.handleChange}
                                    value={formik.values.option}

                                />
                            </div>
                        </div>

                        <div className="form-group col-2 my-1">
                            <label className="col-12 col-form-label">Action</label>
                            <div className="col-12 mt-2">
                                <span
                                    type="button"
                                    onClick={handelAdd}
                                >
                                    <BsFillPlusCircleFill size={20}
                                        color="green"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="my-4">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Option</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {option?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item}</td>

                                            <td>
                                                <span
                                                    type="button"
                                                    onClick={() => handelDelete(index)}
                                                >
                                                    <BiSolidMinusCircle color="red" size={24} />
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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

export default EVotingCreate;
