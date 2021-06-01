import axios from 'axios'
const baseUrl = 'http://46.101.16.81:3015/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }