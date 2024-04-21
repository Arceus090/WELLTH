Social Media Web App
Welcome to our Social Media Web App! This application allows users to connect, share, and interact with each other through posts, comments, and likes.

Getting Started
To get started with the app, follow these steps:

Backend Setup
1.	Open your terminal.
2.	Navigate to the backend directory of the project by running the following command:
cd backend
3.	Create a new .env file in the backend directory.
4.	In the .env file, add the following configurations:

MONGO_URL=<Your_MongoDB_Connection_String>
PORT=<Your_Backend_Port>
JWT_SECRET=<Your_JWT_Secret_Key>
Replace <Your_MongoDB_Connection_String>, <Your_Backend_Port>, and <Your_JWT_Secret_Key> with your MongoDB connection string, preferred backend port, and a secret key for JWT authentication respectively.

5.	Run the following command to install all the required dependencies:
npm install


Frontend Setup
1.	Open another instance of your terminal.
2.	Navigate to the frontend directory of the project by running the following command:
cd frontend
3.	Run the following command to install all the required dependencies:
npm install

Running the App
Once all the dependencies are installed, you can run the app by following these steps:

Backend
•	In your terminal, navigate to the backend directory if you're not already there.
•	Run the following command to start the backend server:
node index.js
•	This will connect the backend to the database using the configurations provided in the .env file.
Frontend
•	In another terminal instance, navigate to the frontend directory if you're not already there.
•	Run the following command to start the frontend server:
npm start
•	This will launch the app in your default web browser, and you can start exploring and using the Social Media Web App!
