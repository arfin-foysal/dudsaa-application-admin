import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./UserModal";
import { useGetUserListQuery } from "../../../services/userApi";
import { BsEye, BsLock } from "react-icons/bs";
const UserList = () => {
  const res = useGetUserListQuery();
  const { data, isSuccess, isFetching, isError } = res;
  const [clickValue, setClickValue] = useState(null);
  const [param, setParam] = useState(null);
  const [size,setSize]=useState("lg")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handelClickValue = useCallback((value) => {
    setClickValue(value);
  }, []);

  const columns = useMemo(
    () => [  
        {
          accessorKey: "name", 
          header: "Name",
        },
        {
          accessorKey: "batch_no", 
          header: "Batch No",
        },
        {
          accessorKey: "email", 
          header: "Email",
        },
        {
          accessorKey: "contact_no", 
          header: "Phone",
      },      {
        accessorFn: (row) =>
          row?.is_active === true ? (
            <>
              <span className="badge bg-success">Active</span>
            </>
          ) : (
            <span className="badge bg-warning">Inactive</span>
          ),

        id: "is_active",
        header: "Is Active",
        size:"10"
      },
    ],
    []
  );

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
      <PageTopHeader title="Member List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Member List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Member");
                setSize("md")
              }}
            >
              <FiPlusCircle size={16} /> Add New Member
            </button>
          </div>
        </div>

        <div className="card-body p-0">
          <MaterialReactTable
            columns={columns}
            data={isSuccess ? data?.data : []}
            enableRowActions
            enableColumnActions
  
            positionActionsColumn="last"
            muiTopToolbarProps={{
              style: {
                backgroundColor: tableColor ? tableColor : "#0675F8",
              },
            }}
            // enablePagination="true"
            renderRowActions={(row, index) => (
              <>
                <div className="d-flex">
            
                    <button
                      title=""
                      className="px-2 mx-1 d-flex align-items-center btn btn-primary btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Member Details");
                        setParam(row?.row?.original?.id);
                        setSize("xl")
                      }}
                    >
                      <BsEye size={16} /> Details
                  </button>
                    <button
                      title=""
                      className="px-2 mx-1 d-flex align-items-center btn btn-success btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Update Member");
                        setParam(row?.row?.original);
                        setSize("md")
                      }}
                    >
                      <FaEdit size={16} /> Edit
                  </button>
                    <button
                      title=""
                      className="px-2 mx-1 d-flex align-items-center btn btn-warning btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Reset Password");
                        setParam(row?.row?.original);
                        setSize("sm")
                      }}
                    >
                      <BsLock size={16} /> Reset
                  </button>
                  <div>
                  </div>
                </div>
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};

export default UserList