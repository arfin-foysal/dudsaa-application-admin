import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit} from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./JobModal";
import { useGetJobQuery } from "../../../services/resourceApi";
const JobList = () => {
  const res = useGetJobQuery();
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
      //index
      {
        accessorFn: (row, index, column) => index + 1,
        header: "SL",
        size: "10",
        
    },

        {
          accessorKey: "title", 
          header: "Title",
          size: "300",
      },
      {
        accessorKey: "company_name",
        header: "Company Name",
        size: "300",
      },
      
      {
        accessorKey: "position",
        header: "Position",
        size: "300",
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
      <PageTopHeader title="Job List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Job List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Job");
                setSize("xl")
              }}
            >
              <FiPlusCircle size={16} /> Add New Job
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
                      className="px-2 mx-1 d-flex align-items-center btn btn-success btn-sm"
                      onClick={() => {
                        handleShow();
                        handelClickValue("Update Job");
                        setParam(row?.row?.original);
                        setSize("xl")
                      }}
                    >
                      <FaEdit size={16} /> Edit
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

export default JobList