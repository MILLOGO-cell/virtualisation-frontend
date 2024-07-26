// services/api.js

import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Livre (Book) endpoints
export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error);
    throw error;
  }
};

export const createBook = async (book) => {
  try {
    const response = await axios.post(`${API_URL}/books`, book);
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

export const updateBook = async (id, book) => {
  try {
    const response = await axios.put(`${API_URL}/books/${id}`, book);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with id ${id}:`, error);
    throw error;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/books/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting book with id ${id}:`, error);
    throw error;
  }
};

export const borrowBook = async (id, clientId) => {
  try {
    const response = await axios.post(`${API_URL}/books/${id}/borrow`, {
      client_id: clientId,
    });
    return response.data;
  } catch (error) {
    console.error(`Error borrowing book with id ${id}:`, error);
    throw error;
  }
};

// Catégorie (Category) endpoints
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${API_URL}/categories/${id}`, category);
    return response.data;
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw error;
  }
};

// Client endpoints
export const getClients = async () => {
  try {
    const response = await axios.get(`${API_URL}/clients`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

export const getClient = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching client with id ${id}:`, error);
    throw error;
  }
};

export const createClient = async (client) => {
  try {
    const response = await axios.post(`${API_URL}/clients`, client);
    return response.data;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
};

export const updateClient = async (id, client) => {
  try {
    const response = await axios.put(`${API_URL}/clients/${id}`, client);
    return response.data;
  } catch (error) {
    console.error(`Error updating client with id ${id}:`, error);
    throw error;
  }
};

export const deleteClient = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting client with id ${id}:`, error);
    throw error;
  }
};

export const getClientBorrowedBooks = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/clients/${id}/borrowedBooks`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching borrowed books for client with id ${id}:`,
      error
    );
    throw error;
  }
};
