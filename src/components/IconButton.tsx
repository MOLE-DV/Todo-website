import { Icon } from "./Icon";

interface iconButtonI {
  source?: string;
  className?: string;
}

export const IconButton = ({ source, className = "button" }: iconButtonI) => {
  return (
    <button className={className}>
      <Icon source={source} />
    </button>
  );
};
