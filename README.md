
# 💬 Learnato Discussion Forum Microservice

A browser-based **discussion forum microservice** built for the Learnato Hackathon challenge.  
Learners and instructors can post questions, reply, upvote, search, and mark posts as answered.  
Designed as a modular, fast, and easily integrable component for the Learnato ecosystem.

---

## 🚀 **Project Overview**

**Theme:** “Empower learning through conversation.”  
This project implements a simple yet extensible discussion system using **React**, **Node.js**, and **MongoDB**.  
It supports CRUD operations, search, and instructor features while maintaining clean code architecture.

---

## 🧠 **Core Functionalities**

| Feature | Description |
|----------|--------------|
| 📝 **Create Post** | Add a new question (title + content). |
| 📃 **List Posts** | View all posts sorted by creation time. |
| 🔍 **Search Bar** | Filter posts dynamically by title or content. |
| 👍 **Upvote** | Increase a post’s vote count. |
| ✅ **Mark as Answered** | Instructor/admin marks a question as resolved. |
| 💬 **Replies (API ready)** | Endpoint to add replies under posts. |
| 📱 **Responsive UI** | Optimized for desktop and mobile views. |

---

## 🧰 **Tech Stack**

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Tailwind CSS, Vite |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (via Mongoose) |
| **Deployment** | Render (Frontend + Backend), MongoDB Atlas |

---

## 🧩 **API Endpoints**

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/posts` | Create a new post |
| `GET` | `/posts` | Fetch all posts (supports `?search=` query) |
| `GET` | `/posts/:id` | Get a single post and its replies |
| `POST` | `/posts/:id/reply` | Add a reply to a post |
| `POST` | `/posts/:id/upvote` | Increment post votes |
| `PATCH` | `/posts/:id/answered` | Mark post as answered |

---

## ⚙️ **Folder Structure**

```

learnato_assignment/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
└── README.md  (this file)

````

---

## 💻 **Local Setup Instructions**

### 🔹 Backend Setup
1. Navigate to backend:
   ```bash
   cd backend
````

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file:

   ```env
   MONGO_URI=mongodb://localhost:27017/learnato_forum
   PORT=5000
   ```
4. Run the server:

   ```bash
   npm start
   ```
5. Server runs at: `http://localhost:5000`

---

### 🔹 Frontend Setup

1. Navigate to frontend:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file:

   ```env
   VITE_API_BASE=http://localhost:5000
   ```
4. Start development server:

   ```bash
   npm run dev
   ```
5. App runs at: `http://localhost:5173`

---

## ☁️ **Deployment (Render)**

### Backend

* Deploy the `/backend` folder as a **Web Service**
* Build Command: `npm install`
* Start Command: `npm start`
* Environment Variables:

  ```env
  MONGO_URI=your_mongodb_atlas_uri
  PORT=10000
  ```

### Frontend

* Deploy the `/frontend` folder as a **Static Site**
* Build Command: `npm install && npm run build`
* Publish Directory: `dist`
* Environment Variable:

  ```env
  VITE_API_BASE=https://your-backend-name.onrender.com
  ```

---

## 🧪 **Testing**

* Add a new post and verify it appears immediately.
* Use the search bar to filter posts by keyword.
* Upvote a post — vote count should increase.
* Click “Mark Answered” to toggle the ✅ icon.

---

## 🧱 **Architecture**

**Frontend → Backend → MongoDB Atlas**

```
React + Vite UI  →  Express API  →  MongoDB (Atlas)
```

Communication is via REST APIs (`axios`), fully decoupled to allow microservice reuse in any Learnato environment.

---

## 🏁 **Author**

**Chandan Kumar M**
Frontend & Backend Developer
GitHub: [https://github.com/Chandan-kumar-M](https://github.com/Chandan-kumar-M)
