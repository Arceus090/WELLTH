
import { notification } from 'antd';

// sessionTimer.js
export const initializeSessionTimer = () => {
    setInterval(() => {
      
      notification.warning({
        message: "You have been using this app for more than an hour. Please take a break",
        placement: "bottomRight",
      });
    }, 3600000); // Alert every minute
};
