import React from "react";

const DText = ({ text, model }) => {
  console.log("model :>> ", model);

  const setDynamicText = (text) => {
    const vars = model?.item?.value || {};
    for (const key in vars) {
      text = text.replace(`{{${key}}}`, vars[key]);
    }
    return text;
  };

  return <div dangerouslySetInnerHTML={{ __html: setDynamicText(text) }} />;
};

export default DText;
