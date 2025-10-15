# Project Context

## What This Project Does

[Brief description of your project]

Example:
This is a SaaS platform for managing customer relationships. It includes user management, customer tracking, analytics, and reporting features.

## Tech Stack

- **Backend**: Java 17, Spring Boot 3.2, PostgreSQL
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Infrastructure**: AWS (ECS, RDS, S3), Docker

## Key Information for Claude Code

### Important Files to Read

Before implementing any feature, read these files:

1. `.claude/examples.md` - See how we write code
2. `.claude/coding-standards.md` - Follow these standards exactly
3. `.claude/knowledge-base.md` - Understand our architecture

### Repository Structure

```
backend/
├── src/main/java/com/company/
│   ├── controller/      # REST controllers
│   ├── service/         # Business logic
│   ├── repository/      # Data access
│   ├── dto/            # Request/Response objects
│   ├── entity/         # JPA entities
│   ├── mapper/         # Entity ↔ DTO conversion
│   ├── exception/      # Custom exceptions
│   ├── security/       # Security config
│   └── config/         # Spring configuration

frontend/
├── src/
│   ├── app/            # Next.js app router
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   ├── types/          # TypeScript types
│   └── styles/         # CSS files
```

### When Implementing Features

1. **Read** the examples in `.claude/examples.md` first
2. **Follow** all standards in `.claude/coding-standards.md`
3. **Use** existing utilities from `.claude/knowledge-base.md`
4. **Write** tests following our patterns
5. **Review** your own code before committing

### Quick Reference

- API Gateway: http://localhost:8080
- Backend Services: Ports 8081-8087
- Frontend Dev: http://localhost:3000
- Database: PostgreSQL on localhost:5432
