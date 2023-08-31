import { Navigate } from "react-router-dom";
import { getPath } from "./utils";
import DashboardHomePage from "../app/views/dashboardHomePage/DashboardHomePage";
import UserList from "../app/views/userList/UserList";
import NoticeList from "../app/views/noticeList/NoticeList";
import EVotingList from "../app/views/eVoting/EVotingList";
import JobList from "../app/views/jobList/JobList";
import EventList from "../app/views/eventList/eventList";
import EventPhoto from "../app/views/eventList/EventPhoto";
import Donation from "../app/views/donation/Donation";




export const privateRoute = [
  {
    path: "*",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },
  {
    path: "/dashboard",
    element: <Navigate replace to={getPath()} />,
    role: "all",
  },
  {
    path: "admin",
    element: <DashboardHomePage />,
    role: "Admin",
  },

  {
    path: "user-list",
    element: <UserList/>,
    role: "Admin",
  },
  {
    path: "notice-list",
    element: <NoticeList/>,
    role: "Admin",
  },
  {
    path: "job-list",
    element: <JobList/>,
    role: "Admin",
  },
  {
    path: "event-list",
    element: <EventList/>,
    role: "Admin",
  },
  {
    path: "admin/event-photo/:id",
    element: <EventPhoto/>,
    role: "Admin",
  },
  {
    path: "e-voting-list",
    element: <EVotingList />,
    role: "Admin",
  },
  {
    path: "donation",
    element: <Donation />,
    role: "Admin",
  }
 
];
