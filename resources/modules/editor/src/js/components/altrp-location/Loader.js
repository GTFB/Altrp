import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader() {
  return (
    <div className="altrp-location__preloader">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
