import axios from "axios";
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users`;

const getAllUsers = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .then((resdata) => {
      console.log("usesers", resdata);
      return resdata;
    });
};

export default { getAllUsers };
