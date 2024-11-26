import axios, { AxiosError } from 'axios';

function isAxiosError(error: any): error is AxiosError {
  return axios.isAxiosError(error);
}

export default isAxiosError ;