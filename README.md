# Task Management System

A NestJS-based REST API for task management with JWT authentication and role-based access control.

## Features

- User authentication using JWT
- Role-based access control (User/Admin)
- Task management (CRUD operations)
- PostgreSQL database integration
- Protected routes with guards

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Git

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd task-management-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following configuration:
```env
DATABASE_HOST=dpg-ct4ldiogph6c73c7rufg-a.oregon-postgres.render.com
DATABASE_PORT=5432
DATABASE_USERNAME=ray
DATABASE_NAME=task_management_nd9y
JWT_SECRET=qwertyuiop
JWT_EXPIRES_IN=1d
DATABASE_PASSWORD=KreH8jCZUbdr88uRw4P32D9faY8MSgZX
```

## Running the Application

### Development Mode
```bash
# Watch mode
npm run start:dev

# Regular development mode
npm run start
```

### Production Mode
```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

## API Endpoints

### Authentication

#### Register a new user
```
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "role": "USER" | "ADMIN"
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

### Tasks

#### Create a new task
```
POST /tasks
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "status": "OPEN" | "CLOSED"
}
```

#### Get all tasks
```
GET /tasks
Authorization: Bearer <jwt-token>
```

#### Get task by ID
```
GET /tasks/:id
Authorization: Bearer <jwt-token>
```

#### Update task
```
PATCH /tasks/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "status": "OPEN" | "CLOSED"
}
```

#### Delete task
```
DELETE /tasks/:id
Authorization: Bearer <jwt-token>
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected endpoints:

1. Register a new user or login to receive a JWT token
2. Include the token in the Authorization header of your requests:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

## Role-Based Access

- Regular users (USER role) can only access and manage their own tasks
- Admin users (ADMIN role) can access and manage all tasks in the system

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Database Migrations

```bash
# Generate a migration
npm run typeorm:generate-migration

# Run migrations
npm run typeorm:run-migrations
```

## Project Structure

```
src/
├── auth/              # Authentication module
├── tasks/             # Tasks module
├── config/            # Configuration files
├── common/            # Shared resources
└── main.ts           # Application entry point
```

## Error Handling

The API uses standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## License

[MIT](LICENSE)

## Support

For support, please open an issue in the repository.