# Mini Escrow Platform

A full-stack escrow management web application that helps users create, track, and manage escrow transactions in a simple digital workspace.

The platform is designed to support a safer transaction process by keeping escrow details organized, allowing parties to review transaction information, and capturing signatures as part of the agreement process.

## Live Demo

[View the live application](https://escrow-self-one.vercel.app/)

## Features

* Create and manage escrow transactions
* View all available escrow records
* Search and filter escrow transactions
* Capture digital signatures using a signature pad
* Store and retrieve transaction data through an API
* Responsive interface designed for desktop and mobile use

## Tech Stack

### Frontend

* React
* React DOM
* Axios
* React Signature Canvas
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* CORS
* dotenv

## Project Structure

```text
escrow/
│
├── frontend/              # React client application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/               # Express API and database logic
│   ├── server.js
│   ├── models/
│   ├── routes/
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB or a MongoDB Atlas database connection

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/novaivy/escrow.git
cd escrow
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the frontend

Open a new terminal window, then run:

```bash
cd frontend
npm install
npm start
```

The frontend will normally run on:

```text
http://localhost:3000
```

## API Communication

The React frontend communicates with the Express backend using Axios. The backend handles requests, validates and processes escrow data, then stores the records in MongoDB through Mongoose.

## Future Improvements

* User authentication and authorization
* Role-based dashboards for buyers, sellers, and administrators
* Payment gateway integration
* Email or SMS transaction notifications
* Escrow status updates and timeline tracking
* Document upload support
* Improved transaction dispute handling

## Author

**Nova Ivy**

* GitHub: https://github.com/novaivy
* Project repository: https://github.com/novaivy/escrow

## License

This project is available for learning, portfolio, and development purposes.

