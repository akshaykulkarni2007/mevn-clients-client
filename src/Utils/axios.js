import axios from 'axios'

const baseURL = process.env.VUE_APP_API_BASE_URL
console.log(process.env.NODE_ENV, process.env.VUE_APP_API_BASE_URL)

export const api = axios.create({
	baseURL,
})
