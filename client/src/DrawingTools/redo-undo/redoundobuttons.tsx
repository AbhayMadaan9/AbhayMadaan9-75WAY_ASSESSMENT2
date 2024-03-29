import React, { useContext, useEffect } from "react";
import { StyleOptionsContext } from "../../context/StyleOptionsContext";

import "./styleredoundobuttons.scss";
import Undo from "./undo";
import Redo from "./redo";


const RedoUndoButtons = () => {
  const { undo, redo } = useContext(StyleOptionsContext);

  // This is for setting the ctrl-z / ctrl-y commands.
  useEffect(() => {
    const redoUndoFunction = (event: any) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        undo();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "y") {
        redo();
      }
    };

    document.addEventListener("keydown", redoUndoFunction);

    return () => {
      document.removeEventListener("keydown", redoUndoFunction);
    };
  }, [undo, redo]);

  return (
    <div className="container--redo-undo position-fixed flex">
      <Undo undo={undo} />
      <Redo redo={redo} />
    </div>
  );
};

export default RedoUndoButtons;