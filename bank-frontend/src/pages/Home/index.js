import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useSelector, connect } from "react-redux";
import AdminHome from "./../Admin/Home";
import UserHome from "./../User/Home";

const Home = () => {
  const userType = useSelector((state) => state.user.userType);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (userType === "admin") {
      setisAdmin(true);
    } else {
      setisAdmin(false);
    }
  }, [userType]);

  return (
    <div>
      <Layout>
        <div className="p-8">{isAdmin ? <AdminHome /> : <UserHome />}</div>
      </Layout>
    </div>
  );
};

export default connect()(Home);
