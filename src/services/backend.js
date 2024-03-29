import axios from "axios";

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/blogs`;

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => response.data)
    .then((resdata) => {
      console.log("inside getall", resdata);
      return resdata;
    });
};
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config).then((res) => res.data);
};
export default { getAll, create, update, remove, setToken };
