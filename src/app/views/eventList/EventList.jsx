import React, { useCallback, useMemo, useState } from "react";
import PageTopHeader from '../../components/PageTopHeader';
import MaterialReactTable from "material-react-table";
import Loader from "../../components/Loader";
import { FaEdit } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { tableColor } from "../../../utils/Theme";
import MenuModal from "./EventModal";
import { useGetEventQuery, useGetJobQuery } from "../../../services/resourceApi";
import moment from "moment";
import { BiImage } from "react-icons/bi";
import { Link } from "react-router-dom";
const EventList = () => {
  const res = useGetEventQuery();
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
        accessorKey: "venue",
        header: "Venue",
        size: "300",
      },
      {
        accessorFn: (row) =>
          row?.event_date
          && (
            <>
              {moment(row.event_date).format("MMMM Do YYYY")} <br />
       
            </>
          ),

        id: "event_date",
        header: "Event Date",
        size: 10,
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
      <PageTopHeader title="Event List" />
      <div className="card border shadow-lg ">
        <div className="card-header d-flex justify-content-between ">
          <div>Event List</div>
          <div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleShow();
                handelClickValue("Add New Event");
                setSize("lg")
              }}
            >
              <FiPlusCircle size={16} /> Add New Event
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
                      handelClickValue("Update Event");
                      setParam(row?.row?.original);
                      setSize("lg")
                    }}
                  >
                    <FaEdit size={16} /> Edit
                  </button>
                  <Link
                    to={`/dashboard/admin/event-photo/${row?.row?.original?.id}`}
                    className="px-2 mx-1 d-flex align-items-center btn btn-primary btn-sm"
                    onClick={() => {
                      handleShow();
                      handelClickValue("Update Event");
                      setParam(row?.row?.original);
                      setSize("lg")
                    }}
                  >
                    <BiImage size={16} /> Photo
                  </Link>
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

export default EventList