// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // hoặc URL server của bạn
  timeout: 10000,
});

export default api;
