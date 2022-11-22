import { useEffect } from 'react';

function useWindowScroll(listener) {
  useEffect(() => {
    window.addEventListener('scroll', listener);

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);
}

export default useWindowScroll;
