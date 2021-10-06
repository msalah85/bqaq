import axios from 'axios';

export default axios.create({
    baseURL: 'https://ws.bqaiqdawah.org.sa/api/v1/',
    //- headers: { 'Authorization': `Bearer test@123` },
});

axios.interceptors.response.use(function (response) {
    /// Do something with response data
    console.log('interceptor', response);
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});