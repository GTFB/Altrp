import React, { Suspense, useState, useEffect } from "react";
import {connect, useSelector} from "react-redux";
import DynamicIcon from "../../../svgs/dynamic.svg";
import {controllerMapStateToProps} from "../../decorators/controller";
const TinyMCE = React.lazy(() => import("../tinymce/TinyMCE"));
import { mountListenerHistory, unmountListenerHistory } from '../../helpers';

const WysiwygController = ({ controller, controlId, label }) => {
  const currentElement = useSelector((state) => state.currentElement.currentElement);
  const currentState = useSelector((state) => state.currentState);
  const currentScreen = useSelector((state) => state.currentScreen);
  const controllerValue = useSelector((state) => state.controllerValue);
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
  const isShow = React.useMemo(()=>{
    return controller.isShow();
  }, [controllerValue, currentElement]);
  if (!isShow) {
    return "";
  }

   const onBlur = () => {
    mountListenerHistory();
  };
  const onFocus = () =>{
    unmountListenerHistory();
  }

  return (
    <div className="controller-container controller-container_wysiwyg">
      <div className="controller-container__label">{label}</div>
      <div className="controller-container__dynamic">
        Dynamic
        <DynamicIcon />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <TinyMCE 
          onChange={(value) => setContent(value)} value={content}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </Suspense>
    </div>
  );
};

export default WysiwygController;
