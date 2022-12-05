import axios from 'axios'

const baseURL =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000/api/'
		: process.env.VUE_APP_API_BASE_URL

export const api = axios.create({
	baseURL,
})
