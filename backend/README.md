# Flashcard Backend

This document provides an overview of the backend architecture and components used in the Flashcard web application. The backend is built with Node.js and Express.js, utilizing Prisma as the ORM for database management.

## Overview

The backend manages user authentication, flashcard creation, updates, deletions, and other core functionalities. It connects to a PostgreSQL database via Prisma, ensuring efficient data management and retrieval.

## Key Technologies

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Web framework for routing and middleware.
- **Prisma**: ORM for database interaction with PostgreSQL.
- **PostgreSQL**: Relational database for storing user and flashcard data.
- **JWT**: JSON Web Tokens for secure user authentication.

## Folder Structure

- **`/prisma`**: Contains Prisma schema (`schema.prisma`) and migration files.
- **`/models`**: Defines the Prisma models corresponding to database tables.
- **`/routes`**: Express routes for handling API requests.
- **`/controllers`**: Business logic for handling CRUD operations and authentication.
- **`/middleware`**: Middleware functions for authentication and error handling.
- **`/config`**: Environment variables and configuration settings.

## Setting Up the Backend

To run the backend locally, follow these steps:

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Environment Variables**:

   Create a `.env` file in the root directory with the following variables:

   ```plaintext
   DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
   JWT_SECRET="your_jwt_secret_key"
   ```

3. **Run Migrations**:

   Initialize the database with Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

4. **Start the Server**:

   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`.

## API Endpoints

### Authentication

- **POST `/api/auth/login`**: Log in a user and return a JWT.

### Flashcards

- **GET `/api/quetions`**: Retrieve all flashcards for the authenticated user.
- **POST `/api/questions`**: Create a new flashcard.
- **PUT `/api/questions/:id`**: Update a flashcard.
- **DELETE `/api/questions/:id`**: Delete a flashcard.

## Prisma Schema Example

The Prisma schema (`schema.prisma`) defines the database models. An example schema is as follows:

```prisma
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  password  String
  flashcards Flashcard[]
}

model Flashcard {
  id        Int      @id @default(autoincrement())
  question  String
  answer    String
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}
```
