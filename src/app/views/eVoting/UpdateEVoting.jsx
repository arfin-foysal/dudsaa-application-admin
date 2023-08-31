import { useFormik } from "formik";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDeletePollOptionMutation, usePollSaveOrUpdateMutation } from "../../../services/resourceApi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiEdit, BiMinusCircle, BiTrash, BiUpload } from "react-icons/bi";
import { useState } from 'react';
import { confirmHandel } from './../../../utils/Alert';
const UpdateEVoting = ({ handleClose, paramValue }) => {
    const [updateState, setUpdateState] = useState(false)
    const [option, setOption] = useState(paramValue?.options && paramValue?.options)
    const [pollSaveOrUpdate, res] = usePollSaveOrUpdateMutation();
    const [deletePollOption] = useDeletePollOptionMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            'id': paramValue?.id,
            'title': paramValue?.title,
            'description': paramValue?.description,
            'end_date': paramValue?.end_date?.slice(0, 10),
            'status': paramValue?.status,
            'is_active': paramValue?.is_active,
            'option': '',
        },
        onSubmit: async (values, { resetForm }) => {
            resetForm()
            const optionData = JSON.stringify(option)
            const data = {
                id: values.id,
                title: values.title,
                description: values.description,
                end_date: values.end_date,
                status: values.status,
                is_active: values.is_active,
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
        setOption([...option, {
            option: formik.values.option,
        }])
        formik.values.option = ''

    }

    function optionRemove(id) {
        setOption(option.filter((item) => item.id !== id))
    }

    function OptionEdit({ current }) {
        const [edit, setEdit] = useState(current.option
        )
        const submitKeyDown = (e) => {
            if (e.key !== 'Enter') return
            if (!edit.trim()) return
            handelOptionEdit(current.id)
        }

        const handelOptionEdit = async (id) => {

            setOption(option.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        option: edit,
                    }
                }
                return item
            }
            ))
            setUpdateState(false)

        }
        return (
            <tr className="tag-item">
                <td> <input type="text" className="tags-input form-control" placeholder="Type something"
                    name='edit'
                    value={edit}
                    onChange={(e) => setEdit(e.target.value)}
                    onKeyDown={submitKeyDown}
                /></td>
                <td>
                    <span
                        className="badge bg-primary text-white"
                    >
                        {current?.votes}
                    </span>
                </td>

                <td  >
                    <span className="pointer mt-5" onClick={() => setUpdateState(false)}> <BiMinusCircle color='red' size={20} /></span>
                    <span className="pointer" onClick={() => handelOptionEdit(current.id)}> <BiUpload color='green' size={20} /></span>
                </td>
            </tr>
        )
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
                                defaultValue={paramValue?.end_date?.slice(0, 10)}
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
                                        <th>Vote</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {option?.map((item, index) => (
                                        updateState === item.id ? <OptionEdit current={item} key={index} /> :
                                            <tr key={index}>

                                                <td>{item?.option}</td>
                                                <td>
                                                    <span
                                                        className="badge bg-primary text-white"
                                                    >
                                                        {item?.votes}
                                                    </span>
                                                </td>
                                                <td>  <span
                                                    type="button"
                                                    className="pointer mx-1"
                                                    onClick={() => setUpdateState(item.id)}
                                                >
                                                    <BiEdit color="green" size={20} />
                                                </span>
                                                    <span className=" pointer"
                                                        onClick={() => {
                                                            confirmHandel(
                                                                "error",
                                                                "Delete",
                                                                "#FF0000",
                                                                item.id,
                                                                deletePollOption,

                                                            ), optionRemove(item.id)
                                                        }
                                                        }><BiTrash  color='red' size={18} />  </span>
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

export default UpdateEVoting;
