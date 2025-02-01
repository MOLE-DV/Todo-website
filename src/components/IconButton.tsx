// import { Icon } from "./Icon";

import { ReactNode } from "react";

interface iconButtonI {
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const IconButton = ({
  icon,
  className = "button",
  onClick,
}: iconButtonI) => {
  return (
    <button className={className} onClick={onClick}>
      {icon}
    </button>
  );
};
