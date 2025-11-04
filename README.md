Task Mate: Advanced To-Do List Manager (Full-Stack)

Task Mate is a comprehensive, full-stack application designed for efficient task management. It combines a dynamic user interface built with React with a robust, persistent data layer powered by a Node.js/Express API and MongoDB.

This application is set up as a lightweight monorepo and is configured for seamless deployment on platforms like Vercel.

Features

Full CRUD Operations: Create, Read, Update, and Delete tasks.

Persistent Storage: All tasks are securely stored in a MongoDB database.

Task Details: Supports task titles, descriptions, due dates, and categories.

Completion Toggling: Easily mark tasks as completed or incomplete.

Filtering: Filter tasks by category to quickly focus on specific work.

Search: Instant client-side searching by task title or description.

Responsive Design: A clean, modern, and mobile-friendly interface.

Technology Stack

Component

Technology

Description

Frontend

React, react-scripts

Dynamic User Interface and component-based structure.

Backend

Node.js, Express, CORS

RESTful API server handling all data interactions.

Database

MongoDB, Mongoose

Persistent and schema-based data modeling.

Configuration

dotenv, Vercel Configuration

Secure environment variable management and serverless routing.

Styling

Custom CSS (App.css)

Modern, responsive styling.

Installation and Setup

Follow these instructions to get a copy of the project running on your local machine.

1. Prerequisites

You must have the following software installed:

Node.js (LTS version recommended)

npm or Yarn

MongoDB Instance (Local or cloud service like MongoDB Atlas)

2. Clone the Repository

git clone [YOUR_REPO_URL]
cd task-mate-fullstack


3. Install Dependencies

Install all project dependencies (for both frontend and backend) from the root directory:

npm install
# or
yarn install


4. Environment Configuration

Create a file named .env in the root directory. This file is excluded from version control (.gitignore) and is used to store sensitive configuration.

Add your MongoDB connection URI to this file:

# .env
MONGODB_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskmate?retryWrites=true&w=majority"


Replace the placeholders (<username>, <password>, <cluster>) with your actual MongoDB credentials.

5. Run Locally

The project uses react-scripts, which typically handles the full development setup.

To start the React frontend and the Express API server (via proxying defined in the build config):

npm start
# or
yarn start


The application will open in your browser, usually at http://localhost:3000.

Deployment (Vercel)

This repository is pre-configured for deployment as a single project on Vercel as a Serverless Function/Static Build hybrid.

The included vercel.json file sets up the routing:

The frontend is built as a static application using react-scripts build.

All requests matching /api/* are routed to the serverless function defined at api/index.js.

All other requests are routed to the static index.html file, enabling client-side routing.

Deployment Steps:

Connect your GitHub repository to your Vercel account.

When setting up the project on Vercel, ensure you configure an Environment Variable named MONGODB_URI and paste your secure connection string value there.

Vercel will automatically build and deploy the application.

Project Structure

The codebase is organized into logical directories for clear separation of concerns:

task-mate-fullstack/
├── api/
│   └── index.js           # Express/Mongoose REST API entry point
├── public/
│   └── index.html         # Main HTML template
├── src/
│   ├── App.js             # Main React component, state, and API logic
│   ├── App.css            # Global application styling
│   ├── index.js           # React entry point
│   └── components/
│       ├── Header.js      # Application header
│       ├── TaskForm.js    # Form for adding/editing tasks
│       ├── TaskItem.js    # Renders a single task
│       ├── TaskList.js    # Renders the list of tasks
│       ├── SearchBar.js   # Task search input
│       └── CategoryFilter.js # Task category filter
├── .env                   # Local environment variables (ignored by Git)
├── .gitignore             # Files and folders to ignore
├── package.json           # Project dependencies and scripts
└── vercel.json            # Vercel deployment configuration
