import { store } from "../store";

export const getAuthHeader = async () => {
  const token = store.getState().user.accessToken;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
