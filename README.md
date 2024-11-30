# AuthApp

This application is a NestJS-based backend API integrated with MongoDB as the database. It serves as a user authentication and management system, implementing secure user registration, login, and other user-related features. Here's a detailed description of its functionality:

# Key Features


1. # User Authentication
Signup: Users can register with their fullName, email, and a password.
The system enforces validations like email format and password complexity.
Passwords are securely hashed using bcrypt before being stored in the database.
Login: Users can log in by providing their email and password.
If valid credentials are provided, the system issues a JWT (JSON Web Token) for session management.
A LocalStrategy validates the credentials using Passport.js.
Logout: Users can log out, and their JWT becomes invalid.
2. #  Authorization
The app uses JWT-based authorization:
Secures private routes using a custom AuthGuard.
Protects API endpoints by verifying the token's validity and expiry.
3. # Forget Password (not implement added as note in auth service inside nest-app)
Generates a secure password reset token when a user requests a password reset.
Sends the token via email(nodemailer), which can be used to set a new password.
4. # User Management
Users can fetch their details using the token.
Admin or privileged users can:
Fetch the list of all users (only their fullName and email are exposed).
## Technology Stack
# Backend
NestJS Framework: Provides a modular and scalable structure.
MongoDB: For storing user data (email, hashed passwords, etc.).
Mongoose: A MongoDB ORM for schema definitions and database interactions.
Passport.js: For implementing authentication strategies (Local & JWT).
bcrypt: For securely hashing passwords.
# Frontend (Integration-ready with Angular)
Login, Signup, and Logout functionality.
Displays user-friendly error messages (e.g., invalid credentials, duplicate email).
Automatically logs the user out when the JWT token expires (8 hours).



## Run tasks

# run angular app
```sh
npm run front-end-serve
```

# run nest app
```sh
npm run back-end-serve
```

