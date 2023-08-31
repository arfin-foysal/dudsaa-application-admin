import React from "react";
import { BiJoystickButton, BiUser } from "react-icons/bi";
import TopBox from "./TopBox";
import { MdEvent, MdOutlineNotificationsNone } from "react-icons/md";
import { useGetDashboardQuery } from "../../../services/resourceApi";
import BloodList from "./BloodList";

const DashboardHomePage = () => {
  const res = useGetDashboardQuery();
  const { data, isSuccess, isFetching, isError } = res;
  return (
    <>
      <div className="row">
        <TopBox
          name="ToTal Member"
          // color="blue"
          icon={<BiUser color="blue" size={25} />}
          item={data?.data?.total_member}
          // des="In this month"
        />
        <TopBox
          name="Total Job"
          // color="red"
          icon={<BiJoystickButton color="red" size={25} />}
          item={data?.data?.total_job}
          // des="In this month"
        />
        <TopBox
          name="Total Notice"
          // color="#FFCC00"
          icon={<MdOutlineNotificationsNone color="#FFCC00" size={25} />}
          item={data?.data?.total_notice}
          // des="In this month"
        />
        <TopBox
          name="Total Event"
          // color="green"
          icon={<MdEvent color="green" size={25} />}
          item={data?.data?.total_event}
          // des="&#2547; In this month"
        />
      </div>

      <div className="row">
        <div className="col-md-12 my-2">
          <div className="card shadow border-0">
            <div className="card-header bg-primary text-white fw-bolder">Blood Requests</div>
            <div className="card-body table-responsive p-0 ">
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>SL</th>
                    <th>Blood Group</th>
                    <th>Name</th>
                    <th>Contact No:</th>
                    <th>Units</th>
                    <th>Hospital</th>
                    <th>Needed Date</th> 
                  </tr>
                </thead>
                <tbody>
                  <BloodList
                    isFetching={isFetching}
                    isSuccess={isSuccess}
                    isError={isError}
                    data={data?.data?.blood_request}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default  DashboardHomePage;
