/**
 * Enhanced error handling utilities
 */
import { logger } from './logger';

/**
 * Generic error handler for API calls and async operations
 */
export const handleAsyncError = (error, context = '') => {
  logger.error(`Error in ${context}:`, error);
  
  // Log to external service in production
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with error tracking service (Sentry, LogRocket, etc.)
    // errorTrackingService.captureException(error, { context });
  }

  return {
    message: getErrorMessage(error),
    code: error.code || 'UNKNOWN_ERROR',
    context
  };
};

/**
 * Extract user-friendly error messages
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'Une erreur inattendue s\'est produite. Veuillez réessayer.';
};

/**
 * Create error boundary fallback component props
 */
export const createErrorBoundaryProps = (componentName) => ({
  onError: (error, errorInfo) => {
    handleAsyncError(error, `${componentName} Error Boundary`);
  },
  fallback: ({ error, resetError }) => {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'min-h-screen flex items-center justify-center bg-background p-8';
    errorDiv.innerHTML = `
      <div class="text-center max-w-md">
        <h2 class="text-xl font-semibold text-foreground mb-4">
          Oops! Une erreur s'est produite
        </h2>
        <p class="text-muted-foreground mb-6">
          ${getErrorMessage(error)}
        </p>
        <button
          onclick="window.location.reload()"
          class="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    `;
    return errorDiv;
  }
});

/**
 * Retry mechanism for failed operations
 */
export const withRetry = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
};