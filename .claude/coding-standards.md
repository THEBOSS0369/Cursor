# Coding Standards

Claude, you MUST follow these standards exactly when writing code for this project.

## Java Backend Standards

### 1. Naming Conventions

- **Classes**: PascalCase (UserService, OrderController)
- **Methods**: camelCase (createUser, findById)
- **Variables**: camelCase (userEmail, firstName)
- **Constants**: UPPER_SNAKE_CASE (MAX_RETRY_COUNT, API_BASE_URL)
- **Packages**: lowercase (com.company.service.user)

### 2. Annotations Order

Always use annotations in this order:

```java
@Service  // or @Controller, @Repository, @Component
@RequiredArgsConstructor
@Transactional  // if needed
@Slf4j
@Validated  // if needed
public class MyClass {
```

### 3. Dependency Injection

- ALWAYS use constructor injection via `@RequiredArgsConstructor`
- NEVER use `@Autowired` on fields
- Mark all dependencies as `private final`

**CORRECT:**

```java
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final EmailService emailService;
}
```

**WRONG:**

```java
@Service
public class UserService {
    @Autowired  // DON'T DO THIS
    private UserRepository userRepository;
}
```

### 4. Logging Standards

- Use `@Slf4j` annotation
- Log levels:
  - **ERROR**: Exceptions that need immediate attention
  - **WARN**: Potential issues or unexpected behavior
  - **INFO**: Important business operations (user created, payment processed)
  - **DEBUG**: Detailed flow information (queries, method entry/exit)
- Never log sensitive data (passwords, credit cards, tokens)
- Always include context in log messages

```java
log.info("Creating user with email: {}", email);  // GOOD
log.info("Creating user");  // BAD - no context
log.debug("Password: {}", password);  // NEVER DO THIS
```

### 5. Exception Handling

- Create custom exceptions for business logic errors
- Use `@RestControllerAdvice` for global exception handling
- Always return proper HTTP status codes
- Include meaningful error messages for users

### 6. Validation

- Use `@Valid` on controller method parameters
- Use Bean Validation annotations (`@NotNull`, `@Email`, `@Size`, etc.)
- Provide clear validation messages
- Validate business rules in service layer

### 7. DTOs and Entities

- NEVER expose entities directly in controllers
- Always use separate Request and Response DTOs
- Use Mapper classes to convert between entities and DTOs
- Never include passwords or sensitive data in response DTOs

### 8. Database

- Table names: snake_case (user_accounts, order_items)
- Column names: snake_case (first_name, created_at)
- Always define indexes on foreign keys and frequently queried columns
- Use `@PrePersist` and `@PreUpdate` for audit fields
- Use `EnumType.STRING` not `ORDINAL` for enums

### 9. Transactions

- Service layer should be `@Transactional`
- Use `@Transactional(readOnly = true)` for read operations
- Keep transactions as short as possible
- Never call external APIs inside transactions

### 10. Testing

- Test class name: `{ClassName}Test`
- Use `@DisplayName` for readable test descriptions
- Follow Given-When-Then pattern
- Mock all external dependencies
- Test both success and failure cases
- Aim for >80% code coverage

### 11. Method Structure

Always structure methods in this order:

1. Validation / Guard clauses
2. Business logic
3. Persistence
4. Logging
5. Return

```java
public UserResponse createUser(CreateUserRequest request) {
    // 1. Validation
    if (userRepository.existsByEmail(request.getEmail())) {
        throw new DuplicateUserException("User already exists");
    }

    // 2. Business logic
    User user = buildUser(request);

    // 3. Persistence
    User savedUser = userRepository.save(user);

    // 4. Logging
    log.info("User created with ID: {}", savedUser.getId());

    // 5. Return
    return userMapper.toResponse(savedUser);
}
```

### 12. Code Organization

- Controller: Handle HTTP, validation, call service
- Service: Business logic, transactions
- Repository: Data access only
- Mapper: Entity ↔ DTO conversion
- No business logic in controllers or repositories

---

## Next.js Frontend Standards

### 1. File Naming

- Components: PascalCase (UserForm.tsx, ContactPage.tsx)
- Utilities: camelCase (apiClient.ts, formatDate.ts)
- Hooks: camelCase starting with 'use' (useUsers.ts, useAuth.ts)
- Types: PascalCase (User.ts, ApiResponse.ts)

### 2. Component Structure

Always structure components in this order:

1. Imports
2. Type definitions
3. Component definition
4. Return JSX

```typescript
// 1. Imports
import { useState } from "react";
import { Button } from "@/components/ui/Button";

// 2. Types
interface UserFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
}

// 3. Component
export function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [loading, setLoading] = useState(false);

  // 4. Return
  return <form>{/* JSX */}</form>;
}
```

### 3. TypeScript Standards

- ALWAYS use TypeScript, never plain JavaScript
- ALWAYS define types for props, state, and function returns
- Use `interface` for object types
- Use `type` for unions, intersections, and primitives
- Never use `any` - use `unknown` if type is truly unknown
- Enable strict mode in tsconfig.json

### 4. React Patterns

- Prefer functional components over class components
- Use hooks for state and side effects
- Server components by default, add `'use client'` only when needed
- Keep components small and focused (< 200 lines)
- Extract complex logic into custom hooks

### 5. State Management

- Local state: `useState` for simple cases
- Form state: React Hook Form
- Complex state: `useReducer` or Zustand
- Server state: React Query or SWR
- Never use Redux unless absolutely necessary

### 6. Styling Standards

- Use Tailwind CSS utility classes
- Component-specific styles in `.module.css` files
- Follow mobile-first responsive design
- Common breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Use semantic color names from Tailwind config

```typescript
// GOOD
<div className="container mx-auto px-4 py-8">
  <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
    Title
  </h1>
</div>

// BAD
<div style={{ padding: '2rem' }}>  // Don't use inline styles
  <h1>Title</h1>
</div>
```

### 7. Form Handling

- ALWAYS use React Hook Form for forms
- ALWAYS use Zod for validation schemas
- Show validation errors inline below fields
- Disable submit button while submitting
- Show loading state on submit button
- Reset form after successful submission

### 8. API Integration

- API routes in `src/app/api/`
- Use `fetch` API with proper error handling
- Always validate request body with Zod
- Return proper HTTP status codes
- Use environment variables for backend URLs
- Never expose API secrets to frontend

### 9. Error Handling

- Use try-catch in async functions
- Show user-friendly error messages
- Use toast notifications for feedback
- Log errors to console in development
- Never show stack traces to users

### 10. Accessibility

- Use semantic HTML elements
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain proper focus management
- Test with screen readers
- Minimum contrast ratio: 4.5:1

### 11. Performance

- Use Next.js Image component for images
- Implement proper caching strategies
- Use dynamic imports for large components
- Lazy load below-the-fold content
- Minimize bundle size

### 12. Testing

- Test files: `__tests__/*.test.tsx`
- Use React Testing Library
- Test user interactions, not implementation
- Mock external dependencies (APIs, router)
- Test accessibility
- Aim for >80% coverage

### 13. File Organization

```
src/
├── app/                    # Next.js app router
│   ├── (routes)/          # Route groups
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
├── types/                # TypeScript types
└── styles/               # Global styles
```

### 14. Import Order

Always organize imports in this order:

1. React and Next.js imports
2. Third-party libraries
3. Internal components
4. Internal utilities
5. Types
6. Styles

```typescript
// 1. React/Next
import { useState } from "react";
import { useRouter } from "next/navigation";

// 2. Third-party
import { toast } from "react-hot-toast";
import { z } from "zod";

// 3. Components
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

// 4. Utils
import { apiClient } from "@/lib/apiClient";

// 5. Types
import type { User } from "@/types/User";

// 6. Styles
import styles from "./UserForm.module.css";
```

### 15. Environment Variables

- Prefix public variables with `NEXT_PUBLIC_`
- Never commit `.env.local` to git
- Document all env vars in `.env.example`
- Validate env vars at build time

---

## General Standards (Both Backend & Frontend)

### 1. Comments

- Write self-documenting code (good naming > comments)
- Use comments for WHY, not WHAT
- Document complex algorithms
- Add TODO comments for future improvements
- Keep comments up to date

```typescript
// GOOD
// Retry failed requests up to 3 times with exponential backoff
// to handle temporary network issues
const maxRetries = 3;

// BAD
// Set max retries to 3
const maxRetries = 3;
```

### 2. Git Commit Messages

Follow Conventional Commits:

```
feat(component): add new feature
fix(component): fix bug description
refactor(component): refactor code
test(component): add tests
docs(component): update documentation
style(component): formatting changes
chore(component): maintenance tasks
```

Examples:

```
feat(user-service): add email verification endpoint
fix(contact-form): fix validation error display
refactor(api-client): simplify error handling
test(user-service): add integration tests
```

### 3. Code Review Checklist

Before creating PR, verify:

- [ ] Code follows all standards above
- [ ] All tests pass
- [ ] No linting errors
- [ ] No TypeScript errors
- [ ] No console.logs in production code
- [ ] Proper error handling
- [ ] Security considerations addressed
- [ ] Performance optimized
- [ ] Accessibility requirements met
- [ ] Documentation updated

### 4. Security Standards

- Never commit secrets to git
- Use environment variables for credentials
- Validate all user inputs
- Sanitize data before displaying
- Use parameterized queries
- Implement rate limiting
- Use HTTPS for all external calls
- Keep dependencies updated

### 5. Documentation

- README.md: Project setup and overview
- API documentation: OpenAPI/Swagger
- Component documentation: Storybook
- Inline documentation: TSDoc/JSDoc for public APIs
