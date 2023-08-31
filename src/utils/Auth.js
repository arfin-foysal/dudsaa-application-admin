import Cookies from "js-cookie";
const role = JSON.parse(localStorage.getItem("dudsaa_user_role"));
const token= Cookies.get("dudsaa_token");

export const authUserToken = token ? token : "";
export const authUser = role ? role : "";

