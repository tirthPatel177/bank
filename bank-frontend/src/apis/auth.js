import axios from "axios";

export const loginApi = async (data) => {
  const result = await axios
    .post(process.env.REACT_APP_API_URL + "/api/v1/login", data)
    .then((res) => {
      console.log("success api called", res);
      return res.data;
    })
    .catch((error) => {
      return false;
    });
  return result;
};
