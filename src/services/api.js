const BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiService = {
  async getUsers() {
    try {
      const response = await fetch(`${BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  async getUserById(id) {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  async getPostsByUserId(userId) {
    try {
      const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }
};
