import axios from "axios";

const API = "http://localhost:5000";

// SEND OTP
export const sendOtp = async (data) => {
  return await axios.post(`${API}/send-otp`, data);
};

// VERIFY OTP
export const verifyOtp = async (data) => {
  return await axios.post(`${API}/verify-otp`, data);
};