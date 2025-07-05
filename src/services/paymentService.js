// services/paymentService.js
import API from './api';

export const createStripeSession = async () => {
  const res = await API.post('/stripe/create-stripe-session');
  return res.data;
};
