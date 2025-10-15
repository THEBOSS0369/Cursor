# Frontend Code Examples

## Example 1: Page Component Pattern (App Router)

```typescript
// src/app/users/page.tsx
import { Metadata } from "next";
import { UserList } from "@/components/users/UserList";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "Users | Your App",
  description: "Manage users in your application",
};

export default async function UsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Users" description="Manage and view all users" />
      <UserList />
    </div>
  );
}
```

**KEY POINTS:**

- Server components by default
- Export metadata for SEO
- Use semantic HTML
- Use Tailwind utility classes
- Container pattern: `container mx-auto px-4 py-8`

---

## Example 2: Client Component with Form

```typescript
// src/components/users/UserForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { toast } from "react-hot-toast";

// Define validation schema
const userSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create user");
      }

      toast.success("User created successfully!");
      reset();
      router.push("/users");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <Input id="firstName" {...register("firstName")} className="mt-1" />
          {errors.firstName && (
            <ErrorMessage>{errors.firstName.message}</ErrorMessage>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <Input id="lastName" {...register("lastName")} className="mt-1" />
          {errors.lastName && (
            <ErrorMessage>{errors.lastName.message}</ErrorMessage>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className="mt-1"
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create User"}
        </Button>
      </div>
    </form>
  );
}
```

**KEY POINTS:**

- Use 'use client' directive for interactive components
- Use React Hook Form + Zod for validation
- Always show loading states
- Use toast for notifications
- Use router.refresh() after mutations
- Proper error handling with try-catch
- Accessible forms with labels
- Responsive design with Tailwind grid

---

## Example 3: API Route Pattern

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = createUserSchema.parse(body);

    // Call backend API
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
        body: JSON.stringify(validatedData),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { message: error.message || "Failed to create user" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation failed", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "10";

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/v1/users?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_SECRET_KEY}`,
        },
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
```

**KEY POINTS:**

- Validate all inputs with Zod
- Use environment variables for backend URL
- Proper error handling and status codes
- Use Next.js caching strategies
- Never expose sensitive data in responses
- Always log errors to console

---

## Example 4: Custom Hook Pattern

```typescript
// src/hooks/useUsers.ts
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
  createdAt: string;
}

interface UseUsersReturn {
  users: User[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      toast.success("User deleted successfully");
      await fetchUsers(); // Refetch after delete
      router.refresh();
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      toast.error(error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    isLoading,
    error,
    refetch: fetchUsers,
    deleteUser,
  };
}
```

**KEY POINTS:**

- Type all hook returns
- Handle loading and error states
- Use toast for user feedback
- Provide refetch functionality
- Proper error handling

---

## Example 5: Component Testing

```typescript
// src/components/users/__tests__/UserForm.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserForm } from "../UserForm";
import { toast } from "react-hot-toast";

// Mock dependencies
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("react-hot-toast");

describe("UserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("should render all form fields", () => {
    render(<UserForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("should show validation errors for invalid inputs", async () => {
    render(<UserForm />);
    const user = userEvent.setup();

    const submitButton = screen.getByRole("button", { name: /create user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });
  });

  it("should submit form with valid data", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: 1, email: "test@example.com" }),
    });

    render(<UserForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/password/i), "Password123!");

    const submitButton = screen.getByRole("button", { name: /create user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("User created successfully!");
    });
  });

  it("should show error toast on submission failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "User already exists" }),
    });

    render(<UserForm />);
    const user = userEvent.setup();

    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/first name/i), "John");
    await user.type(screen.getByLabelText(/last name/i), "Doe");
    await user.type(screen.getByLabelText(/password/i), "Password123!");

    const submitButton = screen.getByRole("button", { name: /create user/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("User already exists");
    });
  });
});
```

**KEY POINTS:**

- Use React Testing Library
- Test user interactions
- Mock external dependencies
- Test both success and error cases
- Test validation
- Use waitFor for async operations
