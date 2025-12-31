import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.BASE_API_URL || process.env.NEXT_PUBLIC_BASE_API_URL 
});

export default instance;