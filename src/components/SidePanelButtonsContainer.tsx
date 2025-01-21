import { useState } from "react";
import { NavButton } from "./NavButton";

export const SidePanelButtonsContainer = () => {
  const [selected, setSelected] = useState("home");
  return (
    <div className="side-panel-buttons-container">
      <div className="side-panel-buttons-category">
        <div className="side-panel-buttons-category-title">General</div>
        <NavButton
          path="/"
          icon="home"
          text="Home"
          selected={selected}
          onClick={() => setSelected("home")}
        />
        <NavButton
          path="/tasks"
          icon="tasks"
          text="Tasks"
          selected={selected}
          onClick={() => setSelected("tasks")}
        />
        <NavButton
          path="/"
          icon="trash"
          text="Trash"
          selected={selected}
          onClick={() => setSelected("trash")}
        />
      </div>
      <div className="side-panel-buttons-category">
        <div className="side-panel-buttons-category-title">My progress</div>
        <NavButton path="/" progressCircle={20} text="Learn Python" />
        <NavButton path="/" progressCircle={45} text="Start buissnes" />
        <NavButton path="/" progressCircle={81} text="Learn React.js" />
      </div>
    </div>
  );
};
