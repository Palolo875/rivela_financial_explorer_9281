/**
 * Centralized environment configuration
 */

export const env = {
  // Application Info
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Rivela Financial Explorer',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Financial Analytics Platform',
  
  // Environment
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  API_TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG_MODE: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
  ENABLE_PERFORMANCE_MONITORING: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true',
  
  // Security
  ENABLE_SECURITY_HEADERS: import.meta.env.VITE_ENABLE_SECURITY_HEADERS === 'true',
  
  // Development
  ENABLE_DEV_TOOLS: import.meta.env.VITE_ENABLE_DEV_TOOLS === 'true',
  ENABLE_HOT_RELOAD: import.meta.env.VITE_ENABLE_HOT_RELOAD === 'true',
  
  // External Services
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID,
};

/**
 * Validate required environment variables
 */
export const validateEnvironment = () => {
  const required = [];
  
  // Add required environment variables here
  // Example: if (!env.API_BASE_URL) required.push('VITE_API_BASE_URL');
  
  if (required.length > 0) {
    throw new Error(`Missing required environment variables: ${required.join(', ')}`);
  }
};

export default env;