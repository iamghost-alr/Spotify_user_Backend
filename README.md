Spotify User Backend

A backend API for managing users and music, built with Node.js, Express, and MongoDB.

Features:

User Authentication (JWT based)
Music Upload and Management
Organized MVC Structure
Protected Routes
File Upload Support
Tech Stack
Node.js
Express.js
MongoDB
JWT (Authentication)
Multer / Storage Service

Installation and Setup:

1. Clone the repository
git clone https://github.com/iamghost-alr/Backend-Projects.git
cd Spotify-User-Backend
2. Install dependencies
npm install
3. Create .env file

Create a .env file in the root directory and add:

PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
4. Run the server
npm start

Or (if using nodemon):

npm run dev
API Endpoints
Auth Routes
POST /register → Register user
POST /login → Login user
Music Routes
POST /music → Upload music (Protected)
GET /music → Get all music

Folder Structure:

src/
│
├── controllers/
├── routes/
├── model/
├── services/
├── db/
└── app.js

Important Notes

Make sure MongoDB is running
.env file is required

Made by Naman
