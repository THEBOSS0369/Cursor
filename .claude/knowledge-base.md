# Codebase Knowledge Base

Claude, this document contains critical information about our existing codebase. Use this information when implementing features.

## Project Architecture

### Backend Architecture

- **Framework**: Spring Boot 3.2.1
- **Java Version**: 17
- **Build Tool**: Maven
- **Database**: PostgreSQL 15
- **Authentication**: JWT tokens with Spring Security
- **API Documentation**: Swagger/OpenAPI at `/swagger-ui.html`

### Microservices Architecture

We have 8 microservices:

1. **user-service** (Port: 8081)

   - Handles user management, authentication
   - Database: `users_db`
   - Key endpoints: `/api/v1/users`, `/api/v1/auth`

2. **notification-service** (Port: 8082)

   - Handles email, SMS, push notifications
   - Database: `notifications_db`
   - Key endpoints: `/api/v1/notifications`

3. **payment-service** (Port: 8083)

   - Handles payment processing
   - Integrates with: Stripe, PayPal
   - Database: `payments_db`

4. **order-service** (Port: 8084)

   - Handles order management
   - Database: `orders_db`

5. **inventory-service** (Port: 8085)

   - Handles product inventory
   - Database: `inventory_db`

6. **api-gateway** (Port: 8080)

   - Main entry point
   - Routes requests to services
   - Handles CORS, rate limiting

7. **analytics-service** (Port: 8086)

   - Handles analytics and reporting
   - Database: `analytics_db`

8. **admin-service** (Port: 8087)
   - Admin dashboard backend
   - Database: Connects to all service databases (read-only)

### Frontend Architecture

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod
- **UI Components**: Custom component library in `src/components/ui/`
- **Deployment**: Vercel

### Service Communication

- **Sync**: REST APIs (service-to-service)
- **Async**: RabbitMQ for event-driven communication
- **Service Discovery**: Eureka
- **API Gateway**: Spring Cloud Gateway

---

## Database Schemas

### User Service Database Schema

#### Table: users

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMP,
    CONSTRAINT chk_status CHECK (status IN ('ACTIVE', 'INACTIVE', 'SUSPENDED', 'DELETED'))
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_created_at ON users(created_at);
```

#### Table: user_roles

```sql
CREATE TABLE user_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL,
    granted_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_role CHECK (role IN ('USER', 'ADMIN', 'MODERATOR', 'SUPPORT'))
);

CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
```

#### Table: user_sessions

```sql
CREATE TABLE user_sessions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) NOT NULL,
    device_info VARCHAR(255),
    ip_address VARCHAR(45),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL,
    revoked BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(token);
```

### Notification Service Database Schema

#### Table: notifications

```sql
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(20) NOT NULL,
    channel VARCHAR(20) NOT NULL,
    subject VARCHAR(200),
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    sent_at TIMESTAMP,
    error_message TEXT,
    retry_count INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_type CHECK (type IN ('WELCOME', 'VERIFICATION', 'PASSWORD_RESET', 'ORDER_CONFIRMATION', 'PAYMENT_SUCCESS')),
    CONSTRAINT chk_channel CHECK (channel IN ('EMAIL', 'SMS', 'PUSH')),
    CONSTRAINT chk_status CHECK (status IN ('PENDING', 'SENT', 'FAILED', 'CANCELLED'))
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
```

---

## API Contracts

### User Service APIs

#### POST /api/v1/auth/register

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response (201):**

```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "status": "ACTIVE",
  "emailVerified": false,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

#### POST /api/v1/auth/login

**Request:**

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response (200):**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 3600,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

#### GET /api/v1/users/{userId}

**Headers:**

```
Authorization: Bearer {accessToken}
```

**Response (200):**

```json
{
  "id": 1,
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "status": "ACTIVE",
  "emailVerified": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "lastLoginAt": "2024-01-20T15:45:00Z"
}
```

---

## Existing Utilities and Helpers

### Backend Utilities

#### ResponseWrapper.java

Located in: `src/main/java/com/company/common/dto/ResponseWrapper.java`

Use this for wrapping all API responses:

```java
public class ResponseWrapper<T> {
    private boolean success;
    private String message;
    private T data;
    private LocalDateTime timestamp;

    public static <T> ResponseWrapper<T> success(T data) {
        return ResponseWrapper.<T>builder()
            .success(true)
            .data(data)
            .timestamp(LocalDateTime.now())
            .build();
    }

    public static <T> ResponseWrapper<T> error(String message) {
        return ResponseWrapper.<T>builder()
            .success(false)
            .message(message)
            .timestamp(LocalDateTime.now())
            .build();
    }
}
```

#### JwtTokenProvider.java

Located in: `src/main/java/com/company/security/JwtTokenProvider.java`

Use this for JWT operations:

```java
@Component
public class JwtTokenProvider {
    public String generateToken(Authentication authentication);
    public String getUserIdFromToken(String token);
    public boolean validateToken(String token);
}
```

### Frontend Utilities

#### apiClient.ts

Located in: `src/lib/apiClient.ts`

ALWAYS use this for API calls, never use fetch directly:

```typescript
import { apiClient } from "@/lib/apiClient";

// GET request
const users = await apiClient.get("/api/users");

// POST request
const newUser = await apiClient.post("/api/users", userData);

// PUT request
const updated = await apiClient.put(`/api/users/${id}`, userData);

// DELETE request
await apiClient.delete(`/api/users/${id}`);
```

Features:

- Automatic token injection
- Error handling
- Request/response logging
- Retry logic

#### formatters.ts

Located in: `src/lib/formatters.ts`

Use these for formatting:

```typescript
import { formatDate, formatCurrency, formatPhone } from "@/lib/formatters";

formatDate(date); // "Jan 15, 2024"
formatCurrency(1000); // "$1,000.00"
formatPhone("+1234567890"); // "+1 (234) 567-8900"
```

---

## Environment Variables

### Backend (.env)

```properties
# Database
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/users_db
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}

# JWT
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRATION=3600000

# RabbitMQ
SPRING_RABBITMQ_HOST=localhost
SPRING_RABBITMQ_PORT=5672

# External Services
STRIPE_API_KEY=${STRIPE_API_KEY}
SENDGRID_API_KEY=${SENDGRID_API_KEY}
```

### Frontend (.env.local)

```bash
# API
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws

# Auth
NEXT_PUBLIC_JWT_SECRET=your-secret-key

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Third-Party Integrations

### Email Service

We use **SendGrid** for emails

- API Key stored in: `SENDGRID_API_KEY`
- Template IDs:
  - Welcome Email: `d-abc123`
  - Verification Email: `d-def456`
  - Password Reset: `d-ghi789`

### Payment Processing

We use **Stripe** for payments

- API Key: `STRIPE_API_KEY`
- Webhook endpoint: `/api/v1/webhooks/stripe`
- Test mode: Use test keys in development

### File Storage

We use **AWS S3** for file storage

- Bucket: `company-files-prod`
- Region: `us-east-1`
- CDN: CloudFront distribution

---

## Common Patterns in Our Codebase

### Pattern 1: Pagination

All list endpoints support pagination:

```
GET /api/v1/users?page=0&size=20&sort=createdAt,desc
```

Response format:

```json
{
  "content": [...],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 20
  },
  "totalElements": 150,
  "totalPages": 8
}
```

### Pattern 2: Soft Delete

We use soft deletes for all entities:

- Set `deleted_at` timestamp
- Filter out deleted records in queries
- Use `@Where(clause = "deleted_at IS NULL")` on entities

### Pattern 3: Audit Fields

All entities have these fields:

```java
@Column(name = "created_at", nullable = false, updatable = false)
private LocalDateTime createdAt;

@Column(name = "updated_at")
private LocalDateTime updatedAt;

@Column(name = "deleted_at")
private LocalDateTime deletedAt;

@Column(name = "created_by")
private Long createdBy;

@Column(name = "updated_by")
private Long updatedBy;
```

### Pattern 4: Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "User not found",
  "errorCode": "USER_NOT_FOUND",
  "timestamp": "2024-01-15T10:30:00Z",
  "path": "/api/v1/users/999"
}
```

---

## Testing Patterns

### Backend Testing

- Unit tests in: `src/test/java/.../unit/`
- Integration tests in: `src/test/java/.../integration/`
- Use `@WebMvcTest` for controller tests
- Use `@DataJpaTest` for repository tests
- Use Testcontainers for integration tests with real database

### Frontend Testing

- Component tests in: `__tests__/` directory
- Use `render` from React Testing Library
- Mock API calls with `msw` (Mock Service Worker)
- Use `userEvent` for simulating user interactions

---

## Deployment

### Backend Deployment

- Docker images built in CI/CD
- Deployed to AWS ECS
- Load balanced with Application Load Balancer
- Autoscaling based on CPU/memory

### Frontend Deployment

- Deployed to Vercel
- Automatic preview deployments for PRs
- Production domain: https://app.yourcompany.com

---

## Team Conventions

### Branch Naming

- Feature: `feature/PROJ-123-short-description`
- Bug fix: `fix/PROJ-456-bug-description`
- Hotfix: `hotfix/PROJ-789-urgent-fix`

### PR Guidelines

- Title: `[PROJ-123] Short description`
- Always link to Jira ticket
- Require at least 1 approval
- All tests must pass
- No merge conflicts

### Code Review Focus

1. Business logic correctness
2. Security vulnerabilities
3. Performance implications
4. Test coverage
5. Code readability
