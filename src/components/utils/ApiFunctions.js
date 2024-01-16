import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

// This function add a new Room to the database
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms", formData);
  return response.status === 201;
}

// This function gets all room types from database
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}

// This function gets all rooms from the database
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching all rooms");
  }
}

//This function deletes room by the Id
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error("Error deleting room: " + error.message);
  }
}

// This function updates the room
export async function updateRoom(roomId, roomData) {
  try {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);
    const response = await api.put(`/rooms/${roomId}`, formData);
    return response;
  } catch (error) {
    throw new Error(`Error updating room: ${error.message}`);
  }
}

// This function fetches the room from database
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room: ${error.message}`);
  }
}

// This function saves a new booking to the database
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(`/bookings/${roomId}/booking`, booking);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error book room: ${error.message}`);
    }
  }
}

// This function gets all bookings from the database
export async function getAllBookings() {
  try {
    const result = await api.get(`/bookings`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

// This function gets booking by confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(
        `Error fetching booking by confirmation code: ${error.message}`
      );
    }
  }
}

// This function cancels booking
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/cancel/${bookingId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking: ${error.message}`);
  }
}

// This function gets all available rooms from the database with a given date and room type
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  try {
    const result = await api.get(
      `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching available rooms: ${error.message}`);
  }
}
