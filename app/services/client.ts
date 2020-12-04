import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://testdomaind.us-east-1.elasticbeanstalk.com/v1',
  responseType: 'json',
  withCredentials: true,
});

export { apiClient };

// export const BASEURL='http://testdomaind.us-east-1.elasticbeanstalk.com/v1/' 
