

import "./styletools.scss";
import Eraser from "./eraser";
import Line from "./line";
import Pencil from "./pencil";
import Rectangle from "./rectangle";
import Selection from "./selection.tsx";
import TrashBin from "./tarshbin";
import TextArea from "./text/textarea";

const Tools = () => {
  return (
    <div className="container--tools position-fixed flex flex-jcenter flex-acenter flex-dcolumn">
      Tools
      <Selection />
      <Line />
      <Rectangle />
      <Pencil />
      {/* <TextArea /> */}
      <Eraser />
      <TrashBin />
    </div>
  );
};

export default Tools;