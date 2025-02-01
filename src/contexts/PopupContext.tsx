import { createContext, ReactNode, useState } from "react";
import { popupStateI } from "../interfaces/interfaces";

type PopupContextType = {
  popupState: popupStateI | null;
  setPopupState: React.Dispatch<React.SetStateAction<popupStateI>>;
};

export const PopupContext = createContext<PopupContextType>({
  popupState: null,
  setPopupState: () => {},
});

export const PopupProvider = ({ children }: { children: ReactNode }) => {
  const [popupState, setPopupState] = useState<popupStateI>({ hidden: null });
  return (
    <PopupContext.Provider value={{ popupState, setPopupState }}>
      {children}
    </PopupContext.Provider>
  );
};
