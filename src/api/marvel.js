import axios from 'axios';

const KEY = '1531cbc9cfd93e96ec6bcf4797f220fa';

export default axios.create({
    baseURL: 'https://gateway.marvel.com/',
    params: {
        apikey: KEY
    }
})