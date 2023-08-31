import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDeleteEventPhotoDeleteMutation, useEventPhotoSaveOrUpdateMutation, useGetEventPhotoListQuery, } from "../../../services/resourceApi";
import { useRef } from "react";
import { useState } from "react";
import PreviewImage from "../../components/PreviewImage";
import { useParams } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import { confirmHandel } from "../../../utils/Alert";
const EventPhoto = () => {
  const { id } = useParams()
  const fileRef = useRef(null)
  const [previewImage, setPreviewImage] = useState();

  function handelImage(e) {
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }
  const [eventPhotoSaveOrUpdate] = useEventPhotoSaveOrUpdateMutation();
  const [deleteEventPhotoDelete] = useDeleteEventPhotoDeleteMutation()
  const res = useGetEventPhotoListQuery(id);
  const { data, isSuccess, isFetching } = res;
  const formik = useFormik({
    initialValues: {
      'event_id': id,
      'image': '',
      'is_active': true,
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('event_id', id);
      formData.append('image', values.image);
      formData.append('is_active', values.is_active ? 1 : 0);

      try {
        const result = await eventPhotoSaveOrUpdate(formData).unwrap();
        resetForm();
        toast.success(result.message);
      } catch (error) {
        toast.warn(error.data.message);
      }
    },
  });

  return (
    <div>
      <form
        className="form-sample"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
      >
        <div className="row">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-12 ">

              <div className="text-center my-4">
                <h4 className="mb-3">Event Photo</h4>

                <h5 className="mb-3">{data?.data?.event_name}</h5>
                <hr />
              </div>
              <div className="form-group row col-12 my-1">
                {/* <label className="col-12 col-form-label">Logo</label> */}
                <div className="col-12">
                  <input
                    ref={fileRef}
                    hidden
                    className="form-control"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      formik.setFieldValue("image", e.currentTarget.files[0]);
                      handelImage(e);
                    }}
                  />
                </div>
              </div>

              <table className="table table-bordered text-center">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>
                      Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>
                        {formik.values.image &&
                          <PreviewImage previewImage={previewImage} />
                        }
                      </div>

                    </td>
                    <td >
                      <div className="mt-3 text-center">
                        <button
                          type="button"
                          className="btn btn-dark btn-sm  "
                          onClick={() => {
                            fileRef.current.click();
                          }}
                        >
                          Choose a Image ...
                        </button>
                        <button type="submit" className="btn btn-success btn-sm ms-1">
                          Upload
                        </button>
                      </div>

                    </td>
                  </tr>
                </tbody>
              </table>

              <div>
                <div className="col-md-12 col-12 ">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className=" d-flex flex-md-wrap justify-content-center justify-content-md-start ">
                          {isFetching && <div>Loading...</div>}
                          {
                            isSuccess && data?.data?.event?.map((item, index) => (
                              <div key={index} className="m-2 ">
                                <img
                                  className="py-2
                                      border border-2
                                      "
                                  src={`${import.meta.env.VITE_ASSET_HOST_URL}${item?.image}`}
                                  width="100"
                                  height="100"

                                  alt="Preview Image"
                                />
                                <div className="text-center ">
                                  <BiTrash size={20} className="pointer" color="red"
                                    onClick={() => {
                                      confirmHandel(
                                        "error",
                                        "Delete",
                                        "#FF0000",
                                        item.id,
                                        deleteEventPhotoDelete,
                                      )
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EventPhoto;
