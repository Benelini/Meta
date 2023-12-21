import { useEffect } from 'react';

const useDebounce = (searchTerm: string, delay: number, callback: (searchTerm: string) => void) => {
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm) {
        callback(searchTerm);
      }
    }, delay);

    return () => clearTimeout(handler);
  }, [searchTerm, delay, callback]);
};

export default useDebounce;