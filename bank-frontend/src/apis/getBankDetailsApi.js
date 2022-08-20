import axios from "axios";
import { getAuthHeader } from "../redux/services/authHeader";

export const getBankDetailsApi = async (data) => {
  const header = await getAuthHeader();
  const result = await axios
    .get(process.env.REACT_APP_API_URL + "/api/v1/admin/bankdetails", header)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return false;
    });
  return result;
};
