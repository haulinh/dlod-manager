import { getFetch } from '../utils/fetch';

const url = 'http://[::1]:3001/restaurants';

const getRestaurants = () => {
  console.log('url', url);
  return getFetch(url);
};

export default {
  getRestaurants,
};
