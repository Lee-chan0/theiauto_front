import { createContext, useContext, useEffect, useRef, useState } from "react";


const ScrollAndStickyCheckContext = createContext();

export function ScrollAndStickyCheckContextProvier({ children }) {
  const [overScroll, setOverScroll] = useState(0);
  const [focusOut, setFocusOut] = useState(false);
  const [scrollDirectionUp, setScrollDirectionUp] = useState(false);
  const lastScrollTop = useRef(0);
  const bannerHeightRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const userScroll = window.scrollY;

      if (overScroll === 0) return;

      if (userScroll > overScroll) {
        setFocusOut(true);
      } else {
        setFocusOut(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [overScroll]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll < lastScrollTop.current) {
        setScrollDirectionUp(false);
      } else {
        setScrollDirectionUp(true);
      }

      lastScrollTop.current = currentScroll <= 0 ? 0 : currentScroll;
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ScrollAndStickyCheckContext.Provider
      value={{
        scrollDirectionUp, setScrollDirectionUp, setOverScroll,
        overScroll, bannerHeightRef, focusOut
      }}
    >
      {children}
    </ScrollAndStickyCheckContext.Provider>
  )
}

export function useScrollStickyState() {
  return useContext(ScrollAndStickyCheckContext);
}