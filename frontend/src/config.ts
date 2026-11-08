const serverUrl = import.meta.env.VITE_SERVER_URL;

if (!serverUrl) {
  throw new Error('VITE_SERVER_URL must be set to the backend URL');
}

export const SERVER_URL = serverUrl.replace(/\/+$/, '');