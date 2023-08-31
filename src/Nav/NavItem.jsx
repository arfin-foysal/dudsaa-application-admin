import { BiCalendarEvent, BiJoystickButton, BiNotification, BiPoll, BiUser } from "react-icons/bi";
import { MdOutlineDomainVerification } from "react-icons/md";

export const navItem = [


  {
    title: "Member List",
    link: "user-list",
    role: "Admin",
    icon: <BiUser size={18} />,
  },
  {
    title: "Notice List",
    link: "notice-list",
    role: "Admin",
    icon: <BiNotification size={18} />,
  },
  {
    title: "Job List",
    link: "job-list",
    role: "Admin",
    icon: <BiJoystickButton size={18} />,
  },
  {
    title: "Event List",
    link: "event-list",
    role: "Admin",
    icon: <BiCalendarEvent size={18} />,
  },
  {
    title: "E-Voting List",
    link: "e-voting-list",
    role: "Admin",
    icon: <BiPoll size={18} />,

  },
  {
    title: "Donation",
    link: "donation",
    role: "Admin",
    icon: <MdOutlineDomainVerification size={18} />,

  }

  // {
  //   title: "Content Setup",
  //   role: "Admin",
  //   icon: <BiCategory />,
  //   children: [
  //     {
  //       title: "Content List",
  //       link: "content-list",
  //       role: "Admin",
  //       icon: <BiSolidRightArrowAlt />,
  //     },
  //   ],
  // },


];
