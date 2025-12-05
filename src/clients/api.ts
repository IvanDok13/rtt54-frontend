import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzFmZjdmOTg1NWIzY2Q0M2U4ZWM0MCIsInVzZXJuYW1lIjoidXNlcjEyMyIsImVtYWlsIjoidXNlcjEyM0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3NjQ5NzQ0MjEsImV4cCI6MTc2NTA2MDgyMX0.Q1IA_yt45dKrJDDCeSsIPNO1y6iB__L6gJUlm3z5INE`,
  },
});
