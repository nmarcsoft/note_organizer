import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Method to make a GET request
  async getRequest(endpoint) {
    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method to make a POST request
  async postRequest(endpoint, data) {
    try {
      const response = await axios.post(`${this.baseURL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Centralized error handling
  handleError(error) {
    console.error('API call failed:', error);
    throw new Error(error);
  }
}

export default new ApiService('http://192.168.0.11');
