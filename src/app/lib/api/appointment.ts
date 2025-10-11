// This is the same api file but it is of very high level. It contains the code which only experieince devloper will understand.

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Appointment {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export interface CreateAppointmentData {
  name: string;
  avatar?: string;
  createdAt?: string;
}

export interface UpdateAppointmentData {
  name?: string;
  avatar?: string;
  createdAt?: string;
}

export class APIError extends Error {
  constructor(message: string, public status: number, public data?: any) {
    super(message);
    this.name = "APIError";
  }
}

// Wraper for fetching with error handling
// The T is here of anytype let's say if i add appointment then if i call it in future , it will only allow me to use appointment
// Now with T i can call it like this const appt = await apiFetch<Appointment[]>('/appointments')
// or const users = await apiFetch<User[]>('/users')
export async function apiFetch<T>(
  endpoint: string,
  // here the options is set because now i can call , header, body , method, etc not only expiclity mentioned like headers
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);

    // Handle http errors
    if (!response.ok) {
      // the catch is added because if the response is not json then it will return empty object instead of crashing
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || `HTTP ${response.status}: {response.statusText}`,
        errorData.status,
        errorData
      );
    }

    // Handle it for deletion as after deletion sometimes it sends empty response
    // So for that we are returning empty object
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  } catch (error) {
    // If the error coming is the instance of APIError then just throw that instead of wrapping it again.
    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError(
      error instanceof Error ? error.message : "Network request failed",
      // this 0 is custom that we have defined, it is different than normal erros like 400, 500, etc..
      0
    );
  }
}

// CRUD Operations
// Get appointments
export async function getAllAppointments(): Promise<Appointment[]> {
  return apiFetch<Appointment[]>("/appointments");
}

// Get appointment by id
export async function getAppointmentById(id: string): Promise<Appointment> {
  return apiFetch<Appointment>(`/appointments/${id}`);
}

// Create new appointment
export async function createAppointment(
  data: CreateAppointmentData
): Promise<Appointment> {
  return apiFetch<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      createdAt: data.createdAt || new Date().toISOString(),
      avatar:
        data.avatar ||
        `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    }),
  });
}

// Update appointment
export async function updateAppointment(
  id: string,
  data: UpdateAppointmentData
): Promise<Appointment> {
  return apiFetch<Appointment>(`/appointments/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Delete Appointment
export async function deleteAppointment(id: string): Promise<void> {
  return apiFetch<void>(`/appointments/${id}`, {
    method: "DELETE",
  });
}

// Delete multiple appointments
export async function deleteMultipleAppointments(ids: string[]): Promise<void> {
  await Promise.all(ids.map((id) => deleteAppointment(id)));
}

// Search appointments
export async function searchAppointments(
  query: string
): Promise<Appointment[]> {
  const appointments = await getAllAppointments();
  return appointments.filter((apt) =>
    apt.name.toLowerCase().includes(query.toLowerCase())
  );
}
