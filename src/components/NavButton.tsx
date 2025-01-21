import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { ProgressCircle } from "./ProgressCircle";

interface navButtonI {
  icon?: string;
  progressCircle?: number;
  text?: string;
  path: string;
  selected?: string;
  onClick?: () => void;
}

export const NavButton = ({
  icon,
  progressCircle,
  text,
  path,
  selected,
  onClick,
}: navButtonI) => {
  return (
    <Link
      to={path}
      className={`side-panel-button ${
        selected == text?.toLocaleLowerCase() || selected == text
          ? "selected"
          : ""
      }`}
      onClick={onClick}
    >
      {icon ? (
        <Icon name={icon} />
      ) : progressCircle !== undefined ? (
        <ProgressCircle percentage={progressCircle} />
      ) : undefined}
      {text}
    </Link>
  );
};
