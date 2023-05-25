// отвечает за работу прелоадера.
import React from "react";
import "../../blocks/preloader/Preloader.css";

const Preloader = ({loader}) => {
  return (
    <div className={`preloader ${loader && 'preloader__hidden'}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
