import React from "react";
import { Card } from "react-bootstrap";
import { useDrag } from "react-dnd";
import classNames from "classnames";

const Widget = ({ widget }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { ...widget },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={classNames({
        widgets__item: true,
        isDragging,
      })}
      title={widget.name}
    >
      <Card>
        <Card.Body>{widget.icon}</Card.Body>
      </Card>
    </div>
  );
};

export default Widget;
