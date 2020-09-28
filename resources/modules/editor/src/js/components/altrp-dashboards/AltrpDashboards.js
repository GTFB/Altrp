import React, { useEffect, useState, useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import sub from "date-fns/sub";
import axios from "axios";
import ru from "date-fns/locale/ru";

import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";

import AddWidget from "./AddWidget";
import CardWidget from "./CardWidget";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);
setDefaultLocale("ru");

const AltrpDashboards = ({ id, settings }) => {
  const [widgets, setWidgets] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date().getTime());
  const [endDate, setEndDate] = useState(new Date().getTime());

  const getWidgets = useCallback(
    async (id, startDate, endDate) => {
      try {
        const req = await axios(`/ajax/dashboards/${id}`);
        if (req.status === 200) {
          setWidgets(
            req.data.map((w) => {
              return {
                ...w,
                options: { ...JSON.parse(w.options), animated: settings.animated },
                filter: { ...JSON.parse(w.filter), startDate, endDate },
              };
            })
          );
        }
      } catch (error) {}
    },
    [id, settings.animated, startDate, endDate]
  );

  const handleAdd = (widget) => {
    setWidgets([widget, ...widgets]);
  };

  const handleRemove = (widget) => {
    setWidgets(widgets.filter((w) => w.id !== widget.id));
    axios.delete(`/ajax/dashboards/${widget.id}`);
  };

  const handleEdit = (widget) => {
    setWidgets(widgets.map((w) => (w.id === widget.id ? widget : w)));
    axios.put(`/ajax/dashboards/${widget.id}`, {
      ...widget,
      options: JSON.stringify(widget.options),
      filter: JSON.stringify(widget.filter),
    });
  };

  const handleChangeStartDate = (date) => {
    setStartDate(date.getTime());
  };

  const handleChangeEndDate = (date) => {
    setEndDate(date.getTime());
  };

  const handleWeek = () => {
    const start = sub(endDate, { weeks: 1 }).getTime();
    setStartDate(start);
  };

  const handleMonth = () => {
    const start = sub(endDate, { months: 1 }).getTime();
    setStartDate(start);
  };

  useEffect(() => {
    getWidgets(id, startDate, endDate);
  }, [id, startDate, endDate]);

  return (
    <div className="altrp-dashboard">
      <div className="altrp-dashboard__controls">
        <Dropdown>
          <Dropdown.Toggle variant="light">
            <ThreeDotsVertical color="#7a7a7b" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setIsShow(true)}>Добавить виджет</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleWeek}>Неделя</Dropdown.Item>
            <Dropdown.Item onClick={handleMonth}>Месяц</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.ItemText as="div">
              <DatePicker
                closeOnScroll={true}
                className="form-control first"
                popperClassName="datepicker-popper-mobile"
                popperPlacement="bottom-end"
                selected={startDate}
                selectsStart
                onChange={handleChangeStartDate}
                dateFormat="dd.MM.yyyy"
                showYearDropdown
              />
            </Dropdown.ItemText>
            <Dropdown.ItemText as="div">
              <DatePicker
                closeOnScroll={true}
                className="form-control last"
                popperClassName="datepicker-popper-mobile"
                popperPlacement="bottom-end"
                selected={endDate}
                minDate={startDate}
                selectsEnd
                onChange={handleChangeEndDate}
                dateFormat="dd.MM.yyyy"
                showYearDropdown
              />
            </Dropdown.ItemText>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="altrp-dashboard__widgets">
        {isShow && (
          <AddWidget settings={settings} id={id} setIsShow={setIsShow} onAdd={handleAdd} />
        )}
        {widgets.map((widget) => (
          <CardWidget
            settings={settings}
            key={widget.id}
            widget={widget}
            onDeleted={handleRemove}
            onEdited={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default AltrpDashboards;
