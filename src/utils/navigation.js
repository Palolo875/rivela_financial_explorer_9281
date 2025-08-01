import { useNavigate } from 'react-router-dom';

/**
 * Custom hook for programmatic navigation
 * Replaces direct window.location manipulation with React Router
 */
export const useAppNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (path, options = {}) => {
    try {
      navigate(path, options);
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window.location for emergency cases
      window.location.href = path;
    }
  };

  const goBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error('Navigation back error:', error);
      window.history.back();
    }
  };

  const reload = () => {
    window.location.reload();
  };

  return {
    navigateTo,
    goBack,
    reload
  };
};

/**
 * Utility function to construct URLs with query parameters
 */
export const buildUrl = (path, params = {}) => {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });
  return url.pathname + url.search;
};