import axios from 'axios'

const baseUrl = 'http://localhost:3000'

const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
})

export default axiosClient