import axios from "axios";

export const getAllUsersApi = async (data) => {
  const result = await axios
    .get(process.env.REACT_APP_API_URL + "/api/v1/admin/users")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
  return result;
};
