import { useEffect, useState } from "react";



function useCarousel(items, interval = 3000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length <= 1) return;

    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(id);
  }, [items, interval]);

  return items?.[index];
}

export default useCarousel;