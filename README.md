# Task Management REST API

A production-quality Task Management REST API built with **Node.js**, **Express**, and **MongoDB** (Mongoose). Supports full CRUD operations, validation, filtering, and clean error handling.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| dotenv | Environment configuration |
| nodemon | Development auto-restart |

---

## Folder Structure

```
├── app.js                  # Entry point
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   └── taskController.js   # Business logic
├── middleware/
│   ├── errorHandler.js     # Global error handler
│   └── validate.js         # Input validation
├── models/
│   └── Task.js             # Mongoose schema
├── routes/
│   └── taskRoutes.js       # Route definitions
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## Setup Instructions

### Prerequisites

- **Node.js** (v16+)
- **MongoDB** running locally on port `27017` (or a remote URI)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd assignment

# Install dependencies
npm install

# Create a .env file (already included, edit if needed)
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/taskmanager

# Start the server
npm start

# Or start in development mode (auto-restart on file changes)
npm run dev
```

The server will start at `http://localhost:5000`.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Server port |
| `MONGO_URI` | `mongodb://localhost:27017/taskmanager` | MongoDB connection string |

---

## API Endpoints

### Base URL: `http://localhost:5000/api/tasks`

---

### 1. Create a Task

**POST** `/api/tasks`

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete the Express tutorial",
    "category": "learning",
    "dueDate": "2026-04-01"
  }'
```

**Response** `201 Created`:
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Learn Node.js",
    "description": "Complete the Express tutorial",
    "completed": false,
    "category": "learning",
    "dueDate": "2026-04-01T00:00:00.000Z",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### 2. Get All Tasks

**GET** `/api/tasks`

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Filter by status
curl "http://localhost:5000/api/tasks?status=completed"
curl "http://localhost:5000/api/tasks?status=pending"

# Filter by category
curl "http://localhost:5000/api/tasks?category=learning"

# Combine filters
curl "http://localhost:5000/api/tasks?status=pending&category=work"
```

**Response** `200 OK`:
```json
{
  "success": true,
  "count": 2,
  "data": [ ... ]
}
```

---

### 3. Get a Single Task

**GET** `/api/tasks/:id`

```bash
curl http://localhost:5000/api/tasks/60d5f484f1a2c8b1f8e4e1a2
```

---

### 4. Update a Task

**PUT** `/api/tasks/:id`

```bash
curl -X PUT http://localhost:5000/api/tasks/60d5f484f1a2c8b1f8e4e1a2 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated description"
  }'
```

**Response** `200 OK`:
```json
{
  "success": true,
  "data": { ... }
}
```

---

### 5. Mark Task as Completed

**PATCH** `/api/tasks/:id/complete`

```bash
curl -X PATCH http://localhost:5000/api/tasks/60d5f484f1a2c8b1f8e4e1a2/complete
```

**Response** `200 OK`:
```json
{
  "success": true,
  "data": {
    "completed": true,
    ...
  }
}
```

> **Note:** Attempting to complete an already-completed task returns `400 Bad Request`.

---

### 6. Delete a Task

**DELETE** `/api/tasks/:id`

```bash
curl -X DELETE http://localhost:5000/api/tasks/60d5f484f1a2c8b1f8e4e1a2
```

**Response** `200 OK`:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

---

## Error Handling

All errors return a consistent JSON format:

```json
{
  "success": false,
  "error": "Description of the error"
}
```

| Status Code | Meaning |
|---|---|
| `400` | Bad request (validation failure, invalid ID, already completed) |
| `404` | Resource not found |
| `500` | Internal server error |

---

## Task Schema

| Field | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | String | ✅ | — | Task title (cannot be empty) |
| `description` | String | — | `""` | Task description |
| `completed` | Boolean | — | `false` | Completion status |
| `dueDate` | Date | — | `null` | Due date |
| `category` | String | — | `"general"` | Task category for filtering |
| `createdAt` | Date | — | auto | Timestamp |
| `updatedAt` | Date | — | auto | Timestamp |

---

## Testing

Use **Postman**, **cURL**, or any REST client to test the endpoints. Import the base URL `http://localhost:5000/api/tasks` and test each endpoint as documented above.
