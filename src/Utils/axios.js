import axios from 'axios'

const baseURL = process.env.VUE_APP_API_BASE_URL
console.log(process.env.VUE_APP_API_BASE_URL, baseURL)

export const api = axios.create({
	baseURL,
})
