import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreditDebit from "../pages/Admin/CreditDebit";
import UsersList from "../pages/Admin/UsersList";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";
import Transactions from "../pages/User/Transactions";
import Transfer from "../pages/User/Transfer";
import { PrivateRoute } from "./PrivateRoute";

export const PublicRoute = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/transfer" element={<Transfer />} />
          <Route exact path="allusers" element={<UsersList />} />
          <Route exact path="/transactions" element={<Transactions />} />
          <Route exact path="/creditanddebit" element={<CreditDebit />} />
        </Route>
      </Routes>
    </Router>
  );
};
