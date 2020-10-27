import axios from 'axios';

const baseURL = "https://staging.ownerapp.ai"

export default axios.create({
    baseURL
})