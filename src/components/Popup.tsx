import { useContext, useEffect, useState } from "react";
import "../styles/popup.sass";
import { popupStateI } from "../interfaces/interfaces";
import { PopupContext } from "../contexts/PopupContext";

export const Popup = () => {
  const { popupState, setPopupState } = useContext(PopupContext);
  const [tempData, setTempData] = useState<popupStateI | null>(popupState);

  const popupButtonHandler = () => {
    setPopupState({ hidden: true });
  };

  useEffect(() => {
    if (popupState?.hidden !== true) {
      setTempData(popupState);
    }
  }, [popupState]);

  return (
    <div
      className={`popup ${
        popupState?.hidden
          ? "hidden"
          : popupState?.hidden !== null
          ? "visible"
          : "none"
      }`}
    >
      <h1>{tempData?.title}</h1>
      <p className="popup-desc">{tempData?.descritpion}</p>
      {tempData?.buttons ? (
        tempData.buttons.map((buttonData, index) => (
          <button
            key={index}
            className={
              buttonData.className ? buttonData.className : "popup-button"
            }
            onClick={buttonData.onClick}
          >
            {buttonData.name}
          </button>
        ))
      ) : (
        <button className="popup-button" onClick={popupButtonHandler}>
          OK
        </button>
      )}
    </div>
  );
};
