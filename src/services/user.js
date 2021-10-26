import axios from 'axios'
const baseUrl = 'http://localhost:3042/api/users'

const getAllUsers = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data).then((resdata) => {
        console.log('usesers', resdata);
        return resdata;
    });
};

export default { getAllUsers }