import axios from "axios";

export const transferApi = async (data) => {
  const result = await axios
    .post(process.env.REACT_APP_API_URL + "/api/v1/transactions/transfer", data)
    .then((res) => {
      console.log("success api called", res);
      return res.data;
    })
    .catch((error) => {
      return false;
    });
  return result;
};

export const getUserTransactions = async (data) => {
  const result = await axios
    .post(process.env.REACT_APP_API_URL + "/api/v1/transactions", data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
  return result;
};
