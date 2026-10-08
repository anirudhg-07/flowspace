# Flowspace API Documentation

All API requests (except login/register) require a valid JWT Bearer token in the `Authorization` header.
Base URL: `/api`

## Authentication (`/api/auth`)

| Method | Endpoint | Description | Body / Payload |
|--------|----------|-------------|----------------|
| `POST` | `/register` | Register a new user | `{ email, password, fullName }` |
| `POST` | `/login` | Authenticate user | `{ email, password }` |
| `POST` | `/refresh` | Refresh JWT access token | `{ refreshToken }` |
| `POST` | `/logout` | Invalidate refresh token | `{ refreshToken }` |
| `GET`  | `/me` | Get current user profile | *(Requires Auth)* |

## Dashboard (`/api/dashboard`)

| Method | Endpoint | Description | Body / Payload |
|--------|----------|-------------|----------------|
| `GET`  | `/` | Get aggregate user statistics (completed tasks, overall progress, upcoming deadlines) | *(Requires Auth)* |

## Projects (`/api/projects`)

| Method | Endpoint | Description | Body / Payload |
|--------|----------|-------------|----------------|
| `GET`  | `/` | Get all projects for user | *(Requires Auth)* |
| `GET`  | `/:id` | Get specific project by ID | *(Requires Auth)* |
| `POST` | `/` | Create a new project | `{ name, description, status, startDate, endDate }` |
| `PUT`  | `/:id` | Update an existing project | `{ name, description, status, startDate, endDate }` |
| `DELETE` | `/:id` | Delete a project and its tasks | *(Requires Auth)* |

## Tasks (`/api/tasks`)

| Method | Endpoint | Description | Body / Payload |
|--------|----------|-------------|----------------|
| `GET`  | `/` | Get all tasks (supports query filters: `?projectId=...&status=...`) | *(Requires Auth)* |
| `GET`  | `/:id` | Get specific task by ID | *(Requires Auth)* |
| `POST` | `/` | Create a new task in a project | `{ projectId, name, description, priority, status, dueDate }` |
| `PUT`  | `/:id` | Update an existing task | `{ name, description, priority, status, dueDate }` |
| `DELETE` | `/:id` | Delete a task | *(Requires Auth)* |
