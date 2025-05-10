Got it, bro! You want a clean, **professional-looking `README.md`**—fully formatted, without Markdown block escapes or extra explanations. Here's exactly what you can **copy and paste directly** into your `README.md` file:

---

# 💖 SAILUUUU - A Romantic Web App for Lakshmi Sahithi

**SAILUUUU** is a heartfelt web application crafted with love for **Lakshmi Sahithi**. This romantic app combines aesthetics with utility, offering features like an infinity-scrolling homepage, a career goals planner, and scheduled romantic video messages.

---

## 🌟 Features

### 🏠 Home Page

* Romantic **cosmic-themed black background**
* **Horizontally scrolling infinite gallery** of special images
* Images **cycle automatically** every 2 seconds
* **Shooting stars animation** for a dreamy vibe
* **Heart-themed navbar** with elegant transitions

### 🎯 Career Goals Page

* **Interactive calendar** to mark important events
* **To-do list** with task completion tracking
* **Floating heart animations** on task completion
* **Split-screen layout** for better focus and planning

### 🎥 Video Message Scheduler

* Record **romantic video messages** using your device camera
* Schedule them to be sent **via email** at a chosen date and time
* View **delivery status** of scheduled messages
* Get **notifications** upon successful delivery

---

## 🚀 Getting Started

### ✅ Prerequisites

* Node.js (v14 or above)
* npm or yarn
* A Gmail account for sending video messages

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/sailuuuu.git
   cd sailuuuu
   ```

2. Install dependencies:

   ```bash
   cd sailuuu-app
   npm install
   cd ../backend
   npm install
   ```

3. Configure email settings:

   * Copy `.env.example` to `.env` inside the `backend/` folder:

     ```bash
     cp .env.example .env
     ```
   * Update with your Gmail credentials (see `backend/README.md` for detailed steps)

---

## 💻 Running the App

### Option 1: Using Start Scripts

* **Windows**:

  ```bash
  start-app.bat
  ```

* **Mac/Linux**:

  ```bash
  chmod +x start-app.sh
  ./start-app.sh
  ```

### Option 2: Manual Run

1. Start the backend:

   ```bash
   cd backend
   npm start
   ```

2. Start the frontend in a new terminal:

   ```bash
   cd sailuuu-app
   npm run dev
   ```

3. Open in your browser:

   * Frontend: [http://localhost:3000](http://localhost:3000)
   * Backend API: [http://localhost:3001](http://localhost:3001)

---

## 🎬 Video Message Feature Setup

For step-by-step instructions on configuring and using the video message feature, check the following guide:

📄 [`README-VIDEO-MESSAGES.md`](sailuuu-app/README-VIDEO-MESSAGES.md)

---

## 🛠️ Technologies Used

### Frontend

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)

### Backend

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Nodemailer](https://nodemailer.com/) – for sending emails
* [Multer](https://github.com/expressjs/multer) – for file uploads
* [Node-cron](https://www.npmjs.com/package/node-cron) – for task scheduling

---

## 💌 Made with love for Lakshmi Sahithi

> *“Every click, every scroll, every line of code — is a little whisper of love.”*

---

✅ **Now this is fully professional, clean, and GitHub-ready.** Just replace `yourusername` with your actual GitHub username in the repo link. Want me to generate badges or a GitHub project banner next?
