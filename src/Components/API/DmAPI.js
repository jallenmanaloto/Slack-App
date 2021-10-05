import axios from 'axios';

axios.defaults.baseURL = 'http://206.189.91.54/api/v1/';

export const RetrieveUsersAPI = (data) => {
    return axios({
        method: data.method,
        url: data.url,
        headers: {
            'access-tokens': data['access-tokens'],
            client: data.client,
            expiry: data.expiry,
            uid: data.uid,
        },
    })
};


export const SendDmAPI = (data) => {
    return axios({
        method: data.method,
        url: data.url,
        data: {
            receiver_id: data.id,
            receiver_class: data.receiver_class,
            body: data.inputMsg
        },
        headers: {
            'access-tokens': data['access-tokens'],
            uid: data.uid,
            expiry: data.expiry,
            client: data.client,
        },
    })
};

export const DisplayMsgsAPI = (data) => {
    return axios({
        method: data.method,
        url: data.url,
        headers: {
            'access-tokens': data['access-tokens'],
            uid: data.uid,
            expiry: data.expiry,
            client: data.client,
        },
        params: {
            receiver_id: data.userData.data?.data?.id,
            receiver_class: data.receiver_class
        }
    })
}; 