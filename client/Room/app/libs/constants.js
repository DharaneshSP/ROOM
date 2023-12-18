
export const BACKEND = process.env.NODE_ENV=="production"?"https://roomclient.vercel.app":"http://localhost:3000";
export const SOCKET_SERVER=process.env.NODE_ENV=="production"?"https://socket-server-sp.onrender.com":"http://localhost:8000";