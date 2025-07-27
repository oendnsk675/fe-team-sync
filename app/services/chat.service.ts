import { axiosWithAuth } from '../utils/axiosInstance';

export const fetchDataUserActive = (team_id: string | null) => {
  return axiosWithAuth
    .get(`team/user/active?team_id=${team_id}`)
    .then(({ data }) => data.data)
    .catch((error) => {});
};
