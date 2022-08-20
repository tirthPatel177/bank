import axios from "axios";

export const createUserApi = async (data) => {
  const result = await axios
    .post(process.env.REACT_APP_API_URL + "/api/v1/admin/users", data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
  return result;
};
