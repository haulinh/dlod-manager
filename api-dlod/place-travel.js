import { getFetch } from '../utils/fetch';

const url = 'http://[::1]:3001/place-travels';

const getPlaceTravels = () => {
  console.log('url', url);
  return getFetch(url);
};

export default {
  getPlaceTravels,
};
