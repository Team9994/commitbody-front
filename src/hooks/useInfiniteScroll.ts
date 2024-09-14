import { useEffect, useRef } from 'react';

const useInfiniteScroll = (
  callback: () => void,
  options?: IntersectionObserverInit | undefined
) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [callback, options]);

  return observerRef;
};

export default useInfiniteScroll;
