# Node.js & MongoDB User Authentication & Authorization

<img src="./assets/jwt-auth-banner.png" alt="banner" width="100%" height="auto">

## Overview

This project demonstrates User Authentication (Registration, Login) & Authorization using JSON Web Tokens (JWT) in a Node.js and MongoDB application. Key features include user registration, role-based authorization, and access to protected resources.

| **Route**         | **Method** | **URL**          | **Action**                                                  | **Authorization**                                |
| ----------------- | ---------- | ---------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| User Registration | POST       | /api/auth/signup | Register a new user account.                                | None                                             |
| User Login        | POST       | /api/auth/signin | Authenticate a user by username and password.               | None                                             |
| Public Content    | GET        | /api/test/all    | Access public content that does not require authentication. | None                                             |
| User Content      | GET        | /api/test/user   | Access content for logged-in users (any role).              | Requires a valid JWT token.                      |
| Moderator Content | GET        | /api/test/mod    | Access content for users with the "moderator" role.         | Requires a valid JWT token and "moderator" role. |
| Admin Content     | GET        | /api/test/admin  | Access content for users with the "admin" role.             | Requires a valid JWT token and "admin" role.     |

These routes outline the HTTP methods, URLs, actions, and authorization requirements for the Node.js & MongoDB User Authentication & Authorization project.

| **Authentication Routes** | **Description**    |
| ------------------------- | ------------------ |
| `POST /api/auth/signup`   | User registration. |
| `POST /api/auth/signin`   | User login.        |

| **Authorization Routes** | **Description**                                       |
| ------------------------ | ----------------------------------------------------- |
| `GET /api/test/all`      | Accessible to all users, no specific role required.   |
| `GET /api/test/user`     | Accessible to logged-in users (user/moderator/admin). |
| `GET /api/test/mod`      | Accessible to users with the "moderator" role.        |
| `GET /api/test/admin`    | Accessible to users with the "admin" role.            |

# Technologies and Terms

This project utilizes various technologies and terms to implement user authentication and authorization effectively. Here's an overview of key components and concepts:

## Technologies

### Node.js

- **Node.js**: A JavaScript runtime environment that allows server-side scripting. It's used to build the backend server of this application.

### MongoDB

- **MongoDB**: A NoSQL database that stores data in a flexible, JSON-like format. MongoDB is used to store user data and roles.

### Express.js

- **Express.js**: A popular Node.js framework for building web applications and APIs. It simplifies routing, middleware, and HTTP handling.

### JSON Web Tokens (JWT)

- **JSON Web Tokens (JWT)**: A compact, self-contained means of securely transmitting information between parties as a JSON object. JWTs are used for user authentication and authorization.

### Bcrypt.js

- **Bcrypt.js**: A library for hashing passwords securely. It's used to hash and verify user passwords stored in the database.

### Cors

- **CORS (Cross-Origin Resource Sharing)**: Middleware that enables or restricts cross-origin HTTP requests. It's used to allow requests from specific origins in this project.

## Key Terms

### Authentication

- **Authentication**: The process of verifying the identity of a user or system. In this project, it involves user registration and login.

### Authorization

- **Authorization**: The process of granting or denying access to specific resources or actions based on user roles and permissions.

### JSON Web Token (JWT)

- **JSON Web Token (JWT)**: A digitally signed token that contains claims about the user. It's used for securely transmitting user data between the client and server.

### Roles

- **Roles**: User roles define a user's level of access and permissions within the application. Common roles include "user," "moderator," and "admin."

### Middleware

- **Middleware**: Functions that process requests before they reach the route handlers. They can be used for tasks like authentication and authorization.

### REST API

- **REST API (Representational State Transfer API)**: An architectural style for designing networked applications. It uses standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources.

### Mongoose

- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. It simplifies interactions with MongoDB by providing a schema-based model for data.

### Session-Based vs. Token-Based Authentication

- **Session-Based vs. Token-Based Authentication**: Two common methods for user authentication. In this project, we use token-based authentication, which involves the use of JWTs for secure communication between the client and server.

### Secure Password Storage

- **Secure Password Storage**: Techniques and best practices for securely storing user passwords in a way that protects them from unauthorized access. Bcrypt.js is used for secure password hashing.

## Environment Variables

This project uses config folder to configure its behavior. To set up the necessary config variables, follow these steps:

1. Locate the `config.sample` folder in the project directory.

2. Duplicate the `config.sample` folder and rename the copy to `config`
   use command from the root directory `cp -R app/config.sample/ app/config/`
