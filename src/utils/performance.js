/**
 * Performance monitoring utilities for the application
 */
import React from 'react';

/**
 * Measure component render time
 * @param {string} componentName - Name of the component
 * @param {Function} renderFn - Function to measure
 */
export const measureRenderTime = (componentName, renderFn) => {
  if (process.env.NODE_ENV === 'development') {
    const start = performance.now();
    const result = renderFn();
    const end = performance.now();
    console.log(`${componentName} render time: ${(end - start).toFixed(2)}ms`);
    return result;
  }
  return renderFn();
};

/**
 * Debounce function to limit the rate of function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Whether to execute immediately
 */
export const debounce = (func, wait, immediate = false) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
};

/**
 * Throttle function to limit the rate of function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Lazy load component with error boundary
 * @param {Function} importFn - Dynamic import function
 * @param {Object} fallback - Fallback component
 */
export const lazyLoadWithErrorBoundary = (importFn, fallback = null) => {
  return React.lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      console.error('Failed to load component:', error);
      // Return a fallback component
      return {
        default: fallback || (() => 
          React.createElement('div', {
            className: 'text-center p-4 text-red-500'
          }, 'Failed to load component')
        )
      };
    }
  });
};

/**
 * Performance observer for Core Web Vitals
 */
export const observeWebVitals = () => {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (process.env.NODE_ENV === 'development') {
          console.log('LCP:', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (process.env.NODE_ENV === 'development') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput && process.env.NODE_ENV === 'development') {
          console.log('CLS:', entry.value);
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

/**
 * Memory usage monitoring
 */
export const monitorMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && 'performance' in window && 'memory' in performance) {
    const memory = performance.memory;
    console.log('Memory Usage:', {
      used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
      allocated: Math.round(memory.totalJSHeapSize / 1024 / 1024),
      limit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
    });
  }
};