# Serverless Data Pipeline for Real-Time Analytics

A complete end-to-end **serverless analytics pipeline** built using:

- **Node.js + Express** (Backend API)  
- **MongoDB Atlas** (Cloud Database)  
- **Automated Data Transformation**  
- **React + Material UI** (Analytics Dashboard)  
- **Chart.js** (Interactive Charts)  
- **Node Auto Generator Script** (Simulated Test Data)

This project collects raw data, transforms it, stores it in the cloud, and visualizes insights through a modern dashboard.

## 🚀 Features

### ✔ Raw Data Ingestion
- REST API endpoint (`/ingest`)
- Accepts JSON payload
- Stores raw data in MongoDB Atlas

### ✔ Automated Data Transformation
Categorizes incoming values as:

| Value | Category |
|-------|----------|
| > 50  | High     |
| 20–50 | Medium   |
| < 20  | Low      |

### ✔ Cloud Storage (MongoDB Atlas)
- Fully serverless  
- Always online  
- Secure + free tier  

### ✔ React Dashboard
Built using **Material UI**, **Chart.js**, and responsive components.

Displays:
- Raw Data Table  
- Processed Data Table  
- Category-Based Bar Chart  

### ✔ Auto Test Data Generator
Simulates real-time incoming data every 5 seconds.

## 📂 Project Structure

serverless-data-pipeline/
│
├── backend/
│   ├── index.js
│   ├── auto_test_data.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── RawData.js
│   │   └── ProcessedData.js
│   ├── controllers/
│   ├── routes/
│   └── utils/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js
│       ├── components/
│       └── App.css
│
└── README.md

## ⚙️ Setup Instructions

### 1. Backend Setup

Install Dependencies:
cd backend
npm install

Add MongoDB Atlas URI:
Create a .env file:

MONGO_URI=your_mongodb_connection_string

Start Backend:
node index.js

You should see:
Server running on port 4000
MongoDB Connected

### 2. Frontend Setup

cd frontend
npm install
npm start

Runs at:
http://localhost:3000

## 🧪 Auto Test Data Generator

node auto_test_data.js

## 📡 API Endpoints

POST /ingest
{
  "name": "Sensor-A",
  "value": 78
}

GET /analytics - Returns raw data  
GET /processed - Returns processed data  

## 🧠 Learning Outcomes

- Data pipeline architecture  
- API development  
- Cloud database integration  
- Data transformation  
- Full-stack development  
- Real-time analytics visualization  

## 👨‍💻 Author

**Praful Jain P**  
Cloud & AI Enthusiast
