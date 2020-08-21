import React from "react";

import gif from "./assets/loader.gif";

const Loader = () => {
  return (
    <div className="rrbe-map__preloader">
      <img src={gif} alt="Загрузка данных" />
    </div>
  );
};

export default Loader;
