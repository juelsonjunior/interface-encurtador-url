import axios from 'axios'

const api = axios.create({
    baseURL: "https://api-encurtador-url.onrender.com/"
})

export default api