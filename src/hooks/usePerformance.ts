import { useEffect } from 'react';

export const usePerformance = () => {
  useEffect(() => {
    // Report web vitals if available
    if ('performance' in window && 'getEntriesByType' in performance) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log performance metrics in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`${entry.name}: ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });
      
      return () => observer.disconnect();
    }
  }, []);
  
  // Preload critical resources
  useEffect(() => {
    const preloadCriticalImages = () => {
      const criticalImages = [
        '/images/hero-destruction.jpg',
        '/images/douma-hospital-after.jpg',
        '/images/schule.jpg'
      ];
      
      criticalImages.forEach((src) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };
    
    preloadCriticalImages();
  }, []);
};

export default usePerformance;