import "../styles/sidePanel.sass";
import { SidePanelButtonsContainer } from "./SidePanelButtonsContainer";

export const SidePanel = () => {
  return (
    <nav className="side-panel">
      <header className="side-panel-title">Todos</header>
      <SidePanelButtonsContainer />
    </nav>
  );
};
