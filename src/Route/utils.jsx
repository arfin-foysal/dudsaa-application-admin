import { authUser, authUserToken } from "../utils/Auth";

export const user = {
    name: "Arfin Foysal -> Software Engineer (PhP,Laravel,NodeJs,React,ExpressJs)",
    role: authUser ? authUser : "all",
    token: authUserToken ? authUserToken : "",
}

// 'Developer','Admin','Member'
const routes = [
   
  
    {
        path: '/dashboard/admin',
        role: 'Admin'
    },
    {
        path: '/dashboard/member',
        role: 'Member'
    },
    {
        path: '/dashboard/developer',
        role: 'Developer'
    },
  
// this is default route
    {
        path: '/login',
        role: 'all'
    }
// this is default route
]

export const getPath = () => {
    const route = routes.find(r => r.role === user.role);
    return route.path
}