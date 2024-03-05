// sessionTimer.js
export const initializeSessionTimer = () => {
    setInterval(() => {
        alert("You have been using this app for more than an hour. Please take a break.");
    }, 3600000); // Alert every minute
};
