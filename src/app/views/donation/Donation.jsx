import { useFormik } from "formik";
import { Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { useRef } from 'react';
import { useDonationSaveOrUpdateMutation, useGetDonationQuery } from "../../../services/resourceApi";
import PageTopHeader from "../../components/PageTopHeader";

const Donation = () => {
  const editor = useRef(null);
  const [donationSaveOrUpdate] = useDonationSaveOrUpdateMutation();
  const res = useGetDonationQuery();
  const { data} = res;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      'id': data?.data?.id,
      'title': data?.data?.title,
      'details': data?.data?.details,
    },

    onSubmit: async (values, { resetForm }) => {
      resetForm()
      try {
        const result = await donationSaveOrUpdate(values).unwrap();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);

      }
    },
  });

  return (
    <div>
      <PageTopHeader title="Donation" />
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
            <label className="col-12 col-form-label">Details</label>
            <JoditEditor
              ref={editor}
              value={formik.values.details}
              tabIndex={1}
              onChange={(newContent) => {
                formik.setFieldValue("details", newContent);
              }}
              defaultValue={data?.data?.details}
            />
          </div>

          <div className=" text-end mt-4">
          <button className="btn btn-dark me-2 btn-sm" >
            Close
          </button>

          <button type="submit" className="btn btn-success btn-sm">
            Submit
          </button>
         </div>
        </div>
      </form>
    </div>
  );
};

export default Donation;
