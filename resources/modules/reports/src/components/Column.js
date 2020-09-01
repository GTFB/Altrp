import React, { useCallback } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { contextMenu } from "react-contexify";
import classNames from "classnames";

import { changeColumns } from "../store/sections/actions";
import { swap } from "../helpers/arrays";
import { ItemTypes } from "../helpers/itemTypes";
import LoadableWidget from "./LoadableWidget";

import "../scss/columns.scss";
import { selectSection } from "../store/sections/actions";

const Column = ({ rows, md, columnIndex, sectionIndex, accept, onDrop }) => {
  const dispatch = useDispatch();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const moveWidget = useCallback(
    (dragIndex, hoverIndex) => {
      const data = swap(rows, dragIndex, hoverIndex);
      dispatch(changeColumns({ sectionIndex, columnIndex, data }));
    },
    [columnIndex, dispatch, rows, sectionIndex]
  );

  const showContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      // Делаем текущую секцию активной
      dispatch(selectSection(sectionIndex));
      // Показываем контекстное меню
      contextMenu.show({
        id: ItemTypes.SECTIONS,
        event: e,
        props: {
          sectionIndex,
          columnIndex,
        },
      });
    },
    [columnIndex, dispatch, sectionIndex]
  );

  return (
    <div
      ref={drop}
      className={classNames({
        rrbe__column: true,
        col: true,
        canDrop,
        [`col-md-${md}`]: md > 0,
        isActive: isOver && canDrop,
      })}
      onContextMenu={showContextMenu}
    >
      {rows.map((widget, rowIndex) => (
        <LoadableWidget
          key={`${widget.id}-${rowIndex}`}
          widget={widget}
          sectionIndex={sectionIndex}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          moveWidget={moveWidget}
        />
      ))}
    </div>
  );
};

export default Column;
