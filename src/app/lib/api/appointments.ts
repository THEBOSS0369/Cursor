const API_URL = "https://68e1d73a8943bf6bb3c508ed.mockapi.io";

export type Appointment = {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
};

// Get all appointments
export async function getAllAppointments() {
  const response = await fetch(`${API_URL}/appointments`);

  if (!response.ok) {
    throw new Error("Faild to fetch appointments");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

// Get one appointment
export async function getOneAppointment(id: string) {
  const response = await fetch(`${API_URL}/appointments/${id}`);

  if (!response.ok) {
    throw new Error("Faild to fetch appointment");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

// Create the User
export async function createAppointment(name: string, avatar?: string) {
  // Send the User Data
  const newAppointment = {
    name: name,
    avatar:
      avatar ||
      `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    createdAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newAppointment),
  });

  if (!response.ok) {
    throw new Error("Faild to create appointment");
  }

  const data = await response.json();
  return data;
}

// Update the Appointment
export async function updateAppointment(
  id: string,
  name: string,
  avatar?: string
) {
  const updatedData = {
    name: name,
    avatar: avatar,
  };

  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    throw new Error("Faild to update appointment");
  }

  const data = await response.json();
  return data;
}

// Delete the appointment
export async function deleteAppointment(id: string) {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Faild to delete appointment");
  }

  const data = await response.json();
  return data;
}
