import axios from 'axios';

axios.defaults.baseURL = 'http://206.189.91.54/api/v1/';

export const callAPI = (data) => {
    
    return axios({
        method: data.method,
        url: data.url,
        data: {
            'email': data.email,
            'password': data.password,
            'password_confirmation': data.password_confirmation,
        },
        headers: {
            'access-tokens': data['access-tokens'],
            uid: data.uid,
            expiry: data.expiry,
            client: data.client,
        },
    })
};