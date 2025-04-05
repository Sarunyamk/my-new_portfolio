import axios from 'axios';
import { ContactFormData } from './validation';

// Assuming your backend API endpoint
const API_URL = 'https://your-backend-api.com';

export const sendContactForm = async (data: ContactFormData) => {
    try {
        const response = await axios.post(`${API_URL}/contact`, data);
        return response.data;
    } catch (error) {
        console.error('Error sending contact form:', error);
        throw error;
    }
};
