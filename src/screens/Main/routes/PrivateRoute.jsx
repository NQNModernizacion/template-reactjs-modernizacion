import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../../context";

const PrivateRoute = ({ children, rol }) => {
  const { actions } = useContext(UserContext);

  if (actions.hasRole(rol)) {
    return (
      <>
        <h5>Private Route</h5>
        <div>{children ? children : <Outlet />}</div>
      </>
    );
  } else {
    return <Navigate to="/404"/>;
  }
};

export default PrivateRoute;
