"use client";

import { useEffect, useState } from "react";
import {
  getAllAppointments,
  getOneAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  type Appointment,
} from "../lib/api/appointments";

export default function Api() {
  // States for the functions
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");
  const [editingId, setEditingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch data when page loads
  useEffect(() => {
    loadAppointments();
  }, []);

  // Function to load aPPointments
  async function loadAppointments() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getAllAppointments();
      setAppointments(data);
    } catch (error) {
      setErrorMessage("Failed to load appointments, Please try again later");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to create a new appointment
  async function handleCreateAppointment(event: React.FormEvent) {
    event.preventDefault();

    // Check if name input is empty or not
    if (nameInput.trim() === "") {
      setErrorMessage("Please enter a name: ");
      return;
    }
    try {
      setIsSubmitting(true);
      setErrorMessage("");

      // Call the api to add the data
      const newAppointment = await createAppointment(nameInput, avatarInput);

      // Add the appointment to the data
      setAppointments([...appointments, newAppointment]);

      // Clear the form
      setNameInput("");
      setAvatarInput("");
    } catch (error) {
      setErrorMessage("Failed to create appointment, Please try again later");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleUpdateAppointment(event: React.FormEvent) {
    event.preventDefault();

    if (nameInput.trim() === "" || editingId === "") {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const updatedAppointment = await updateAppointment(
        editingId,
        nameInput,
        avatarInput
      );

      // Update the appintment in the data
      const updatedList = appointments.map((appointment) => {
        if (appointment.id === editingId) {
          return updatedAppointment;
        }
        return appointment;
      });

      setAppointments(updatedList);

      // Clear forms and editing mode
      setNameInput("");
      setAvatarInput("");
      setEditingId("");
    } catch (error) {
      setErrorMessage("Failed to update appointment, Please try again later");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Delete appointment
  async function handleDeleteAppointment(id: string) {
    // Ask the user to confirm the deletion
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmed) return;
    try {
      setErrorMessage("");

      // Call teh api
      await deleteAppointment(id);

      // Remove from the list
      const filteredList = appointments.filter(
        (appointment) => appointment.id !== id
      );
      setAppointments(filteredList);
    } catch (error) {
      setErrorMessage("Failed to delete appointment, Please try again later");
      console.error(error);
    }
  }

  // Start ediitng an appointments
  function startEditing(appointment: Appointment) {
    setEditingId(appointment.id);
    setNameInput(appointment.name);
    setAvatarInput(appointment.avatar);
  }

  function cancelEditing() {
    setEditingId("");
    setNameInput("");
    setAvatarInput("");
  }

  // Show loading spinner
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Appointments Manager
        </h1>
        <p className="text-gray-600 mb-8">
          Create, edit, and delete appointments
        </p>

        {errorMessage && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p>{errorMessage}</p>
            <button
              onClick={() => setErrorMessage("")}
              className="text-sm underline mt-1"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl text-gray-800 font-semibold mb-4">
            {editingId ? "✏️ Edit Appointment" : "➕ Create New Appointment"}
          </h2>

          <form
            onSubmit={
              editingId ? handleUpdateAppointment : handleCreateAppointment
            }
          >
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Avatar Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL (Optional)
              </label>
              <input
                type="url"
                value={avatarInput}
                onChange={(e) => setAvatarInput(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSubmitting ? "Saving..." : editingId ? "Update" : "Create"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEditing}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl text-gray-800 font-semibold">
              All Appointments ({appointments.length})
            </h2>
          </div>

          {/* If no appointments */}
          {appointments.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">
              <p className="text-lg">No appointments yet</p>
              <p className="text-sm mt-1">
                Create your first appointment above
              </p>
            </div>
          ) : (
            /* Show all appointments */
            <div>
              {appointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="px-6 py-4 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    {/* Left side - Avatar and Name */}
                    <div className="flex items-center gap-4">
                      <img
                        src={appointment.avatar}
                        alt={appointment.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {appointment.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Number: {appointment.id}
                        </p>
                      </div>
                    </div>

                    {/* Right side - Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditing(appointment)}
                        className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
