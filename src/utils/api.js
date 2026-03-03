import { API_BASE_URL } from './constants';

export const api = {
  // Menu endpoints
  getMenuItems: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/menu?${params}`);
    return response.json();
  },

  getMenuItem: async (id) => {
    const response = await fetch(`${API_BASE_URL}/menu/item/${id}`);
    return response.json();
  },

  getFeaturedItems: async () => {
    const response = await fetch(`${API_BASE_URL}/menu/featured`);
    return response.json();
  },

  // Reservation endpoints
  createReservation: async (data) => {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  getReservation: async (confirmationCode) => {
    const response = await fetch(`${API_BASE_URL}/reservations/confirmation/${confirmationCode}`);
    return response.json();
  },

  // Contact endpoints
  sendContactInquiry: async (data) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};