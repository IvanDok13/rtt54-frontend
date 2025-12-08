import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzFmZjdmOTg1NWIzY2Q0M2U4ZWM0MCIsInVzZXJuYW1lIjoidXNlcjEyMyIsImVtYWlsIjoidXNlcjEyM0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3NjUyMTkwOTIsImV4cCI6MTc2NTMwNTQ5Mn0.4f3oYHoJnRaagSa6m-ccrHLwbLwgLV_6cAMXdvlWFO4`,
  },
});
