import axios from 'axios';
import React from 'react';

const Otp = () => {
    const sendOtp = async (mobile) => {
        try {
            const response = await axios.post("http://localhost:1337/api/auth/send-otp", { mobile });
            console.log(response.data); // No need for response.json() with axios
        } catch (error) {
            console.error("Error sending OTP:", error.response?.data || error.message);
        }
    };

    return (
        <button onClick={() => sendOtp(6006948676)}>Send OTP</button>
    );
};

export default Otp;
