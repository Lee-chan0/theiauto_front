import { createContext, useContext, useState } from "react";



const SideNavStateContext = createContext();

export function SideNavStateContextProvider({ children }) {
  const [needImportant, setNeedImportant] = useState(false);
  const [isSearchBarActive, setIsSearchBarActive] = useState(false);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  return (
    <SideNavStateContext.Provider
      value={{ needImportant, setNeedImportant, isSearchBarActive, setIsSearchBarActive, mobileMenuActive, setMobileMenuActive }}
    >
      {children}
    </SideNavStateContext.Provider>
  )
}

export function useSideNavState() {
  return useContext(SideNavStateContext);
};