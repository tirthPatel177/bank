import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserDetailsApi } from "../../apis/getUserDetailsApi";

const Home = () => {
  const [userDetails, setuserDetails] = useState("");
  const userAccNo = useSelector((state) => state.user.accNo);

  const fetchUserDetails = async (accNo) => {
    const result = await getUserDetailsApi(accNo);
    if (result === false) {
      // Toast error
      console.error("Error in fetching user details");
    } else {
      console.log("User details: ", result);
      setuserDetails(result?.data?.user);
    }
  };

  useEffect(() => {
    fetchUserDetails(userAccNo);
  }, [userAccNo]);

  return (
    <div>
      {/* Hello {userDetails?.name}!! */}
      {/* <div>{JSON.stringify(userDetails)}</div> */}
      <div className="flex flex-col gap-6">
        <h3>Name: {userDetails?.name}</h3>
        <p>Email: {userDetails?.email}</p>
        <p>Account No: {userDetails?.accountNo}</p>
        <p>Balance: {userDetails?.balance}</p>
      </div>
    </div>
  );
};

export default Home;
