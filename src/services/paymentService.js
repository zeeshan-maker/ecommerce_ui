// services/paymentService.js
import API from './api';

export const createStripeSession = async (form) => {
  const res = await API.post('/stripe/create-stripe-session',form);
  return res.data;
};
