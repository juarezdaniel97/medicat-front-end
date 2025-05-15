import axios from "axios";

const apiTwilio = axios.create({
    baseURL: "https://medicat-api.onrender.com/api",
    headers: {
        'Content-Type': 'application/json'
    }
})


export const sendSMS = (data) => apiTwilio.post(`/twilio/send-sms`, data);



export default apiTwilio;