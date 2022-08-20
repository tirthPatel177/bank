import React, { useEffect, useState } from "react";
import { useSelector, connect } from "react-redux";
import { getBankDetailsApi } from "../../apis/getBankDetailsApi";

const Home = () => {
  const [bankDetails, setbankDetails] = useState({});
  let user = useSelector((state) => state.user);

  const fetchBankDetails = async (role) => {
    const result = await getBankDetailsApi({ role });
    if (result === false) {
      // Toast error
      console.error("Error in fetching bank details");
    } else {
      console.log("Bank details: ", result);
      setbankDetails(result?.data);
    }
  };
  useEffect(() => {
    fetchBankDetails(user.userType);
  }, [user]);
  return (
    <div>
      <div className="flex flex-col gap-6">
        <h3>Total Deposit Amount: {bankDetails?.totalDeposit}</h3>
        <p>Total Users: {bankDetails?.totalUsers}</p>
      </div>
    </div>
  );
};

export default connect()(Home);
