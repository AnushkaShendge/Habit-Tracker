# Habit Tracker

![Screenshot 2024-07-03 205717](https://github.com/AnushkaShendge/Habit-Tracker/assets/145828745/bf1f5fd2-d2ae-4c49-a92b-14bdffcdf921)

![Screenshot 2024-07-03 205736](https://github.com/AnushkaShendge/Habit-Tracker/assets/145828745/b9ae72b6-b577-446f-b1b3-026b64642f36)

![Screenshot 2024-07-03 205820](https://github.com/AnushkaShendge/Habit-Tracker/assets/145828745/734c11de-bef7-47f6-b96f-222be8bcf3b4)

![Screenshot 2024-07-03 205858](https://github.com/AnushkaShendge/Habit-Tracker/assets/145828745/4950a2a7-6705-4b0e-9ad8-6165cb6ef1d0)

![Screenshot 2024-07-03 205938](https://github.com/AnushkaShendge/Habit-Tracker/assets/145828745/f92be120-1bdb-482d-897b-eaf57e2eaf69)


Welcome to the Habit Tracker project! This project allows users to track their daily habits, view their progress, and share thoughts with the community. Built using the MERN stack (MongoDB, Express, React, Node.js), this application provides a seamless experience for habit management.

## Features

- **User Authentication**: Secure user registration and login with JWT-based authentication.
- **Habit Management**: Create, view, and complete daily habits.
- **Statistics Page**: Visualize your habit progress with charts.
- **Community Posts**: Share thoughts and see posts from other users.
- **Sidebar Navigation**: Easy navigation with a fixed and toggleable sidebar.
- **Theme Support**: Light and dark mode support.
- **Daily Quotes**: Motivational quotes updated daily.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB Atlas account or a local MongoDB instance.
- A `.env` file with the following environment variables:
  - `MONGO_URL`: MongoDB connection string.
  - `JWT_SECRET`: Secret key for JWT.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/habit-tracker.git
    cd habit-tracker
    ```

2. Install server dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:
    ```bash
    cd ../client
    npm install
    ```

### Running the Application

1. Start the server:
    ```bash
    cd server
    npm start
    ```

2. Start the client:
    ```bash
    cd ../client
    npm start
    ```

### API Endpoints

- **Register User**: `POST /register`
  ```json
  {
    "username": "exampleuser",
    "email": "example@example.com",
    "password": "password123"
  }
