import React, { useCallback, useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import AddImagePNG from "icons/add-image.png";

const MediaControl = ({ name, value, onChange, options = {} }) => {
  const [isShow, setIsShow] = useState(false);
  const [files, setFiles] = useState([]);
  const [selected, setSelected] = useState([]);

  const getMediaFiles = useCallback(async () => {
    const req = await axios("/admin/ajax/media");
    if (req.status === 200) {
      setFiles(req.data);
    }
    console.log("req :>> ", req);
  }, []);

  const isActive = (file) => {
    return selected.find((item) => item.id === file.id);
  };

  const handleSelect = (file) => {
    const selectIndex = selected.findIndex((item) => item.id === file.id);
    if (selectIndex === -1) {
      console.log("add :>> ", selectIndex);
      setSelected([...selected, file]);
    } else {
      console.log("sub :>> ", selectIndex);
      setSelected(selected.filter((item) => item.id !== file.id));
    }
  };

  const handleChoose = () => {
    onChange(selected[0].url);
  };

  useEffect(() => {
    isShow && getMediaFiles();
  }, [getMediaFiles, isShow]);

  return (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <div className="image-uploader">
        {value ? (
          <div className="image-uploader__image" style={{ backgroundImage: `url(${value})` }}></div>
        ) : (
          <div
            className="image-uploader__image"
            style={{ backgroundImage: `url(${AddImagePNG})` }}
          ></div>
        )}
        <div className="image-uploader__button" onClick={() => setIsShow(true)}>
          <span>Выберите изображение</span>
        </div>
      </div>
      <Modal animation={false} size="lg" show={isShow} onHide={() => setIsShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="image-list">
            {files.map((file) => (
              <div
                className={isActive(file) ? "image-list__item active" : "image-list__item"}
                key={file.id}
                onClick={() => handleSelect(file)}
              >
                <div
                  className="image-list__item-src"
                  style={{ backgroundImage: `url(${file.url})` }}
                ></div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsShow(false)}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleChoose} disabled={selected.length === 0}>
            Выбрать
          </Button>
        </Modal.Footer>
      </Modal>
    </Form.Group>
  );
};

export default MediaControl;
