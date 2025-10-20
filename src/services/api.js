import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Users API
export const usersAPI = {
  // Login user
  login: async (email, password) => {
    const response = await api.get(`/users?email=${email}&password=${password}`);
    return response.data;
  },

  // Daftar user baru
  register: async (userData) => {
    const usersResponse = await api.get('/users');
    const users = usersResponse.data;
    const lastId = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    const newId = lastId + 1;

    const response = await api.post('/users', {
      ...userData,
      id: newId,
      role: 'customer',
      balance: 0,
      createdAt: new Date().toISOString()
    });

    return response.data;
  },
  // Get user by ID
  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Update user profile
  updateUser: async (userId, userData) => {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data;
  },

  // Top up balance
  topUpBalance: async (userId, amount) => {
    const user = await usersAPI.getUserById(userId);
    const updatedUser = {
      ...user,
      balance: user.balance + amount
    };
    const response = await api.patch(`/users/${userId}`, updatedUser);
    return response.data;
  }
};

// Products API
export const productsAPI = {
  // Get all products
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },

  // Get product by ID
  getById: async (productId) => {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  },

  // Get products by provider
  getByProvider: async (provider) => {
    const response = await api.get(`/products?provider=${provider}`);
    return response.data;
  },

  // Get popular products
  getPopular: async () => {
    const response = await api.get('/products?popular=true');
    return response.data;
  },

  // Search products
  search: async (query) => {
    const response = await api.get('/products');
    return response.data.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.provider.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Orders API
export const ordersAPI = {
  // Get all orders
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get orders by user ID
  getByUser: async (userId) => {
    const response = await api.get(`/orders?userId=${userId}`);
    return response.data;
  },

  // Get order by ID
  getById: async (orderId) => {
    const response = await api.get(`/orders?id=${orderId}`);
    return response.data[0];
  },

  // Create new order
  create: async (orderData) => {
    const order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };
    
    const response = await api.post('/orders', order);
    return response.data;
  },

  // Update order status
  updateStatus: async (orderId, status) => {
    const order = await ordersAPI.getById(orderId);
    const updatedOrder = {
      ...order,
      status,
      validUntil: status === 'completed' 
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        : order.validUntil
    };
    
    const response = await api.patch(`/orders/${order.id}`, updatedOrder);
    return response.data;
  },

  // Cancel order
  cancel: async (orderId) => {
    const response = await api.patch(`/orders/${orderId}`, { status: 'cancelled' });
    return response.data;
  }
};

// Transactions API
export const transactionsAPI = {
  // Get transactions by user ID
  getByUser: async (userId) => {
    const response = await api.get(`/transactions?userId=${userId}`);
    return response.data;
  },

  // Create new transaction
  create: async (transactionData) => {
    const transaction = {
      ...transactionData,
      id: Date.now(),
      date: new Date().toISOString()
    };
    
    const response = await api.post('/transactions', transaction);
    return response.data;
  }
};

export default api;