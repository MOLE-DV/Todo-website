import { useEffect, useState } from "react";
import home_icon from "../assets/icons/house.svg";
import tasks_icon from "../assets/icons/briefcase.svg";
import trash_icon from "../assets/icons/bin.svg";

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
    }
  }, [setImgData]);

  return (
    <img
      className={className}
      src={source ? source : imgData.source}
      alt={imgData.alt}
    />
  );
}
