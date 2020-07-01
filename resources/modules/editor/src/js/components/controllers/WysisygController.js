import React, { Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import DynamicIcon from "../../../svgs/dynamic.svg";

const JoditEditor = React.lazy(() => import("jodit-react"));

const WysiwygController = ({
  currentElement,
  controller,
  controlId,
  label
}) => {
  const value = currentElement.getSettings(controlId);
  const [content, setContent] = useState(value);

  // Изменяем контент в предпросмотре
  useEffect(() => {
    controller.changeValue(content);
  }, [content]);

  // Изменяем содержимое wysiwyg если был выбран другой элемент
  useEffect(() => {
    setContent(value);
  }, [currentElement]);

  if(this.state.show === false) {
    return '';
  } else {
    return (
      <div className="controller-container controller-container_wysiwyg">
        <div className="controller-container__label">{label}</div>
        <div className="controller-container__dynamic">
          Dynamic
          <DynamicIcon/>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <JoditEditor onChange={value => setContent(value)} value={content}/>
        </Suspense>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    currentElement: state.currentElement.currentElement
  };
}

export default connect(mapStateToProps)(WysiwygController);
