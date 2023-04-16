import { useEffect } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";
// import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  // const { anyUser } = useAuth();
  // // const uid = props.currentUserUID;
  // // const currentUser = props.currentUser;
  const location = useLocation();
  // const ownersList = props.ownersList;
  // const customersList = props.customersList;
  // const allowedRole = props.allowedRole;
  // // console.log(ownersList);
  // const user = anyUser
  // let userId;
  // if (anyUser) {
  //   userId = anyUser.uid;
  //   console.log("userId", userId);
  // } else {
  //   console.warn("User is null or undefined");
  // }
  // // console.log("UIDDDD", uid);
  // let user = "";
  // if (allowedRole === "owner") {
  //   user = ownersList.find((owner) => owner.uid === userId);
  // } else if (allowedRole === "customer") {
  //   user = customersList.find((customer) => customer.uid === userId);
  // }

  // if (!user) {
  //   console.log("USER: ", user);
  //   console.log("CHILDREN", children);
  //   console.log("In protected Route. User not logged in. going to home page");
  //   return <Navigate to="/" />;
  // }
  console.log("In protected Route. User logged in: ", user);
  // console.log("current user role", anyUser.role);

  return user /*.role === allowedRole*/ ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;

// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children, user }) => {
//   if (!user) {
//     console.log("USER: ", user);
//     console.log("CHILDREN", children);
//     console.log("In protected Route. User not logged in. going to home page");
//     return <Navigate to="/" />;
//   }
//   console.log("In protected Route. User logged in: ", user);
//   return children;
// };

// export default ProtectedRoute;
