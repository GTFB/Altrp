import React from "react";

const EmptyWidget = ({ text }) => {
  return (
    <div className="spinner-container">
      <div className="spinner-container__text">{text ? text : "Данные обрабатываются"}</div>
    </div>
  );
};

export default EmptyWidget;
