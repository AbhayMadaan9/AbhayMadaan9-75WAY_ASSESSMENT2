import { useState } from "react";

// This hook is for to keep the snapshots of the drawings so that we can use redo-undo logic.
export const useHistory = (initialState: any) => { //for now set to any it is any array actually
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState<any>([initialState]); //for now action is set to any 

  const setState = (action: any, overwrite = false) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action; //for now action is set to any 
    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1); // This is for cleaning up the state snapshots' indexes after undo-redo process. If we draw something and undo it and then draw something new, the previous indexes and snapshots should be deleted.
      setHistory([...updatedState, newState]);
      setIndex((prevState) => prevState + 1);
    }
  };

  const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
  const redo = () =>
    index < history.length - 1 && setIndex((prevState) => prevState + 1);

  return [history[index], setState, undo, redo];
};