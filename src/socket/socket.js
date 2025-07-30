// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://ecommerce-api-ip3v.onrender.com"); // ✅ Use your backend URL in production

export default socket;
