import axios from 'axios';
import { baseUrl } from './api-constants';

const cancelToken = axios.CancelToken;
const source = cancelToken.source();
const Interceptor = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  cancelToken: source.token,
});

Interceptor.interceptors.request.use();

Interceptor.interceptors.response.use();

export default Interceptor;

