# Database Entity-Relationship (ER) Diagram

The Flowspace database is a relational PostgreSQL database. Below is the Entity-Relationship schema representing how users, projects, tasks, and authentication tokens are connected.

```mermaid
erDiagram
    users {
        UUID id PK
        VARCHAR full_name
        VARCHAR email "UNIQUE"
        VARCHAR password_hash
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    projects {
        UUID id PK
        UUID user_id FK
        VARCHAR name
        TEXT description
        ENUM status "NOT_STARTED | IN_PROGRESS | COMPLETED"
        DATE start_date
        DATE end_date
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    tasks {
        UUID id PK
        UUID project_id FK
        UUID user_id FK
        VARCHAR name
        TEXT description
        ENUM priority "LOW | MEDIUM | HIGH"
        ENUM status "PENDING | IN_PROGRESS | COMPLETED"
        DATE due_date
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    refresh_tokens {
        UUID id PK
        UUID user_id FK
        VARCHAR token_hash "UNIQUE"
        TIMESTAMP expires_at
        TIMESTAMP revoked_at
        TIMESTAMP created_at
    }

    users ||--o{ projects : "creates"
    users ||--o{ tasks : "owns"
    users ||--o{ refresh_tokens : "has"
    projects ||--o{ tasks : "contains"
```

## Relationships

1. **User - Project (1 to Many)**: A User can create many Projects, but a Project belongs to exactly one User.
2. **User - Task (1 to Many)**: A User owns many Tasks (for data isolation).
3. **Project - Task (1 to Many)**: A Project can contain multiple Tasks, and each Task is strictly linked to a specific Project.
4. **User - RefreshToken (1 to Many)**: A User can have multiple active refresh tokens across different devices (e.g., Web App and Mobile App concurrently).
