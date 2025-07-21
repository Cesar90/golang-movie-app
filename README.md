# 🎬 Golang Movie App

A full-stack movie application built with **Go (Golang)** for the backend and **TypeScript with Webpack** for the frontend. It features a secure RESTful API, JWT-based middleware, PostgreSQL integration, and a modular frontend engine for client-side routing.

---

## 🚀 Features

### 🔧 Backend (Golang)
- REST API architecture for CRUD operations
- JWT Middleware for secure routes
- PostgreSQL database integration
- Custom logger for detailed request tracing
- Modular structure using Go packages
- Serves HTML templates to the frontend

### 🌐 Frontend (Webpack + TypeScript)
- Custom routing engine to manage navigation without page reload
- Webpack bundling with custom loaders and plugins
- Modern JavaScript/TypeScript with scoped components
- Integrated with backend template rendering

---

## 📁 Project Structure
```text
golang-movie-app/
├── configwebpack/        # Webpack config loaders and plugins
├── data/                 # Interfaces and repositories (Golang)
├── handlers/             # HTTP handlers for the REST API
├── import/               # SQL database import scripts
├── logger/               # Custom logging utility (Golang)
├── models/               # Structs representing DB models
├── public/               # HTML, CSS, and static JS files
├── token/                # JWT Token handling (Golang)
├── webpcomponents/       # Frontend views and routing logic
├── webpack.config.js     # Webpack configuration entry point
└── package.json          # NPM config for frontend build
```

## 🛠 Setup Instructions

### 🔙 Backend Setup (Golang)

1. **Install Go (>=1.24)** if not already installed.
2. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/golang-movie-app.git
    cd golang-movie-app
    ```

3. **Configure PostgreSQL connection**  
   Edit your environment variables or configuration files for DB host, port, user, password, and dbname.

4. **Run the server**:

    ```bash
    go run main.go
    ```

> The server will initialize routes, apply middleware, and serve static files from `public/`.

---

### 🌐 Frontend Setup (Webpack + TypeScript)

1. **Install Node.js and npm** if not already installed.
2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start development server**:

    ```bash
    npm run dev
    ```

> This will build and watch frontend assets with hot module replacement.

---

## 🗄 Database Setup

1. Ensure **PostgreSQL** is installed and running.
2. Create a new database:

    ```sql
    CREATE DATABASE moviedb;
    ```

3. Run the SQL script inside the `import/` directory to initialize tables.

---

## 🔐 Security & Middleware

- Uses **JWT tokens** for protecting routes and APIs.
- The `token/` package handles:
  - Token generation upon login
  - Parsing and validation on protected routes
- Middleware automatically rejects unauthorized requests.

---

## 🧱 Frontend Routing Engine

Frontend routing is handled via a **custom TypeScript engine** under `webpcomponents/`.  
Features include:
- Page rendering by URL fragments (SPA-like navigation)
- Integration with backend-served templates
- Manual route matching via Webpack bundles