import React from "react";

const TextArea = (props: any) => {
  const { textAreaRef, textAreaOnClickHandler, style } = props;
  return (
    <textarea
      ref={textAreaRef}
      onClick={textAreaOnClickHandler}
      style={style}
      className="textarea"
    />
  );
};

export default TextArea;