import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToTop() {
  const { pathname } = useLocation();

  // 1. Automatically snap to top on page navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Exportable manual function for smooth UI scrolling
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { scrollToTop };
}