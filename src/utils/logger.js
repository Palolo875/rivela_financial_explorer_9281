const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Logger utility for handling console statements in development and production
 */
export const logger = {
  log: (...args) => {
    if (isDevelopment) {
      console.log(...args);
    }
  },
  
  warn: (...args) => {
    if (isDevelopment) {
      console.warn(...args);
    }
  },
  
  error: (...args) => {
    // Always log errors, but could be sent to error reporting service in production
    console.error(...args);
    
    // In production, you might want to send to an error reporting service
    if (!isDevelopment) {
      // Example: Sentry.captureException(args[0]);
    }
  },
  
  info: (...args) => {
    if (isDevelopment) {
      console.info(...args);
    }
  },
  
  debug: (...args) => {
    if (isDevelopment) {
      console.debug(...args);
    }
  }
};

export default logger;