import axios from 'axios';

axios.defaults.baseURL = 'https://slackapi.avionschool.com/api/v1/';

export const callAPI = (data) => {
    return axios({
        method: data.method,
        url: data.url,
        data: {
            'email': data.email,
            'password': data.password,
            'password_confirmation': data
        },
    }).then((res) => console.log(res))
    .catch((error) => console.error)

};