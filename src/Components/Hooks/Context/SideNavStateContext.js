import { createContext, useContext, useState } from "react";



const SideNavStateContext = createContext();

export function SideNavStateContextProvider({ children }) {
  const [needImportant, setNeedImportant] = useState(false);

  return (
    <SideNavStateContext.Provider
      value={{ needImportant, setNeedImportant }}
    >
      {children}
    </SideNavStateContext.Provider>
  )
}

export function useSideNavState() {
  return useContext(SideNavStateContext);
};