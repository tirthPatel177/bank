import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  return user.accessToken !== undefined ? <Outlet /> : <Navigate to="/login" />;
};
