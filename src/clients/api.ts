import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzFmZjdmOTg1NWIzY2Q0M2U4ZWM0MCIsInVzZXJuYW1lIjoidXNlcjEyMyIsImVtYWlsIjoidXNlcjEyM0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3NjQ5NTYyODUsImV4cCI6MTc2NDk2MzQ4NX0.TQRiMqqDKqMCrBLGr11xIP191UZv9HJAqXv8JiDZDqo`,
  },
});
