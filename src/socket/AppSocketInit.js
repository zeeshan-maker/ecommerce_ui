// src/components/socket/AppSocketInit.js
import { useEffect } from 'react';
import socket from './socket';
import { useAuthSelector } from '../redux/useSelectors';
import { toast } from 'react-toastify';

const AppSocketInit = () => {
  const { user, isAuthenticated } = useAuthSelector();

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      socket.connect();
      socket.emit('register', user.id);

      socket.on('order_status_updated', ({ orderId, status }) => {
        toast.info(`Order #${orderId} status updated to ${status}`);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, user]);

  return null;
};

export default AppSocketInit;
