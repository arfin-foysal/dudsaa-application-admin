import React, { useCallback, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import Loader from "../../components/Loader";
import { FiPlusCircle } from "react-icons/fi";
import MenuModal from "./EVotingModal";
import { useGetPollQuery } from "../../../services/resourceApi";
const EVotingList = () => {
  const res = useGetPollQuery();
  const { data, isSuccess, isFetching, isError } = res;
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [size, setSize] = useState("lg")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);


  return (
    <>
      {isFetching && <Loader />}
      <MenuModal
        show={show}
        handleClose={handleClose}
        clickValue={clickValue}
        paramValue={param}
        size={size}
      />
      <PageTopHeader title="Poll List" />

      <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-12 ">

          <div className="text-center my-4">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Poll");
                setSize("lg")
              }}
            >
              <FiPlusCircle size={16} /> Poll Create
            </button>
          </div>

          {isSuccess && (
            <div className="table-responsive shadow rounded">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Poll Name</th>
                    <th scope="col">Poll Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.title}</td>
                    
                      {item?.status === "Active" && (
                        <td>
                          <span className="badge bg-success">
                            {item?.status}
                          </span>
                        </td>
                      )}

                      {item?.status === "Pending" && (

                        <td>
                          <span className="badge bg-warning">
                            {item?.status}
                          </span>
                        </td>
                      )}
                      {item?.status === "On-Hold" && (

                        <td>
                          <span className="badge bg-danger">
                            {item?.status}
                          </span>
                        </td>
                      )}

                      <td>
                        <button

                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            handleShow();
                            handelClickValue("Update Poll");
                            setParam(item);
                            setSize("lg")
                          }}
                        >
                          Edit
                        </button>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          )}
        </div>
      </div>

    </>
  );
};

export default EVotingList