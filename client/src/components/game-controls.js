import React from "react";
import AvalonAdminControls from "./avalon-admin-controls";

const GameControls = props => {
  if (!props.admin) {
    return null;
  }

  switch (props.game) {
    case "Avalon":
      return <AvalonAdminControls {...props} />;
    default:
      return null;
  }
};

export { GameControls };
