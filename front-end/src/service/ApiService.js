import axios from 'axios';

class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;

    // Set default configuration for all axios requests
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,  // Include credentials such as cookies in cross-origin requests
      headers: {
        'Content-Type': 'application/json', // Set default headers
        // You can add other common headers here if needed
      },
    });
  }

  // Method to make a GET request
  async getRequest(endpoint) {
    try {
      const response = await this.client.get(endpoint);
      console.log(response.data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method to make a POST request
  async postRequest(endpoint, data) {
    try {
      const response = await this.client.post(endpoint, data);
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

export default new ApiService('http://0.0.0.0:9090');
