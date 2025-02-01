import { useEffect, useState } from "react";
import home_icon from "../assets/icons/bx-home-alt-2.svg";
import tasks_icon from "../assets/icons/bx-task.svg";
import trash_icon from "../assets/icons/bx-trash-alt.svg";
import sign_out_icon from "../assets/icons/sign-out.svg";
import check_icon from "../assets/icons/bx-check.svg";
import cancel_icon from "../assets/icons/bx-x.svg";

interface iconI {
  name?: string;
  source?: string;
  className?: string;
}

export function Icon({ name, source, className = "icon" }: iconI) {
  const [imgData, setImgData] = useState({ source: "", alt: "" });
  useEffect(() => {
    switch (name) {
      case "home":
        setImgData({ source: home_icon, alt: "Home" });
        break;
      case "tasks":
        setImgData({ source: tasks_icon, alt: "Tasks" });
        break;
      case "trash":
        setImgData({ source: trash_icon, alt: "Trash" });
        break;
      case "sign-out":
        setImgData({ source: sign_out_icon, alt: "Sign out" });
        break;
      case "check":
        setImgData({ source: check_icon, alt: "Submit" });
        break;
      case "cancel":
        setImgData({ source: cancel_icon, alt: "Cancel" });
        break;
    }
  }, [setImgData]);

  return (
    <img
      className={className}
      src={imgData.source || source}
      alt={imgData.alt}
    />
  );
}
