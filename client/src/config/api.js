// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:8080');

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
  LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/v1/auth/forgot-password`,
  USER_AUTH: `${API_BASE_URL}/api/v1/auth/user-auth`,
  ADMIN_AUTH: `${API_BASE_URL}/api/v1/auth/admin-auth`,
  PROFILE: `${API_BASE_URL}/api/v1/auth/profile`,
  ORDERS: `${API_BASE_URL}/api/v1/auth/orders`,
  ALL_ORDERS: `${API_BASE_URL}/api/v1/auth/all-orders`,
  UPDATE_ORDER_STATUS: (orderId) => `${API_BASE_URL}/api/v1/auth/order-status/${orderId}`,
  
  // Category endpoints
  GET_CATEGORIES: `${API_BASE_URL}/api/v1/category/get-category`,
  CREATE_CATEGORY: `${API_BASE_URL}/api/v1/category/create-category`,
  UPDATE_CATEGORY: (categoryId) => `${API_BASE_URL}/api/v1/category/update-category/${categoryId}`,
  DELETE_CATEGORY: (categoryId) => `${API_BASE_URL}/api/v1/category/delete-category/${categoryId}`,
  
  // Product endpoints
  GET_PRODUCTS: `${API_BASE_URL}/api/v1/product/get-product`,
  GET_PRODUCT_BY_SLUG: (slug) => `${API_BASE_URL}/api/v1/product/get-product/${slug}`,
  CREATE_PRODUCT: `${API_BASE_URL}/api/v1/product/create-product`,
  UPDATE_PRODUCT: (productId) => `${API_BASE_URL}/api/v1/product/update-product/${productId}`,
  DELETE_PRODUCT: (productId) => `${API_BASE_URL}/api/v1/product/delete-product/${productId}`,
  GET_PRODUCT_LIST: (page) => `${API_BASE_URL}/api/v1/product/product-list/${page}`,
  GET_PRODUCT_COUNT: `${API_BASE_URL}/api/v1/product/product-count`,
  GET_PRODUCT_CATEGORY: (slug) => `${API_BASE_URL}/api/v1/product/product-category/${slug}`,
  GET_RELATED_PRODUCTS: (pid, cid) => `${API_BASE_URL}/api/v1/product/related-product/${pid}/${cid}`,
  SEARCH_PRODUCTS: (keyword) => `${API_BASE_URL}/api/v1/product/search/${keyword}`,
  PRODUCT_FILTERS: `${API_BASE_URL}/api/v1/product/product-filters`,
  PRODUCT_PHOTO: (productId) => `${API_BASE_URL}/api/v1/product/product-photo/${productId}`,
  
  // Payment endpoints
  CREATE_ORDER: `${API_BASE_URL}/api/v1/payment/create-order`,
  VERIFY_PAYMENT: `${API_BASE_URL}/api/v1/payment/verify-payment`,
};

export default API_BASE_URL;
