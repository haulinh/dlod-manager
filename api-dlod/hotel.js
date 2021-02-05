import { getFetch } from '../utils/fetch';

const url = 'http://[::1]:3001/hotels';

const getHotels = () => {
  console.log('url', url);
  return getFetch(url);
};

export default {
  getHotels,
};
