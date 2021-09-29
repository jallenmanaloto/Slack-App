import axios from 'axios';

axios.defaults.baseURL = 'https://206.189.91.54/api/v1/';

export const callAPI = (data) => {
    return axios({
        method: data.method,
        url: data.url,
        data: {
            'email': data.email,
            'password': data.password,
            'password_confirmation': data.password_confirmation,
        },
    }).then((res) => console.log(res))
    .catch((err) => console.err) 
};

