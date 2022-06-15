import React, { useEffect, useState, useCallback } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import sub from "date-fns/sub";
import axios from "axios";
import ru from "date-fns/locale/ru";

import ThreeDotsVertical from "react-bootstrap-icons/dist/icons/three-dots-vertical";

import AddWidget from "./AddWidget";
import CardWidget from "./CardWidget";
import GlobalParameter from "./fields/GlobalParameter";

import "react-datepicker/dist/react-datepicker.css";

registerLocale("ru", ru);
setDefaultLocale("ru");

const AltrpDashboards = ({ id, settings, globalParameter }) => {
  const start = new Date().setFullYear(new Date().getFullYear() - 1);
  const end = new Date().getTime();
  const [widgets, setWidgets] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [startDate, setStartDate] = useState(start);
  const [endDate, setEndDate] = useState(end);
  const isMobile = screen.width <= 480; //Проверка на ширину экрана
  let navPosition = "jusitfy-content-end";
  /*
   * Получить настройки дашборда для текущего пользователя
   */

  const getSettings = async id => {
    try {
      // Отправляем запрос
      const req = await axios(`/ajax/dashboards/${id}/settings`, {
        headers: [{ key: "Cache-Control", value: "no-store" }]
      });
      // Если успешно
      if (req.status === 200) {
        console.log("req.data :>> ", req.data);
        // Получаем настройки
        return JSON.parse(req.data.settings);
      } else {
        return {};
      }
    } catch (error) {
      return {};
    }
  };

  /*
   * Получаем настройки и виджеты
   */
  const getWidgets = async id => {
    try {
      const req = await axios(`/ajax/dashboards/${id}`, {
        headers: [{ key: "Cache-Control", value: "no-store" }]
      });
      if (req.status === 200) {
        console.log("req.data DASHBOARDS:>> ", req.data);
        return req.data;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  };

  /*
   * Получаем данные
   */
  const getData = useCallback(
    async (id, startDate, endDate) => {
      try {
        // Получаем виджеты
        const myWidgets = await getWidgets(id);
        // Если виджетов нет ничего не делаем
        //if (myWidgets.length === 0) return;
        // Если есть, получаем настройки
        const filters = await getSettings(id);
        // Если настройки есть
        if (
          filters !== null &&
          filters.hasOwnProperty("startDate") &&
          filters.hasOwnProperty("endDate")
        ) {
          // Записываем вижеты в состояние с настройками
          setWidgets(
            myWidgets.map(w => {
              return {
                ...w,
                options: {
                  ...JSON.parse(w.options),
                  animated: settings.animated
                },
                filter: { ...JSON.parse(w.filter), ...filters }
              };
            })
          );
          // Записываем даты в состояние
          setStartDate(filters.startDate);
          setEndDate(filters.endDate);
        } else {
          // Возвращаем виджеты с дефолтными настройками
          setWidgets(
            myWidgets.map(w => {
              return {
                ...w,
                options: {
                  ...JSON.parse(w.options),
                  animated: settings.animated
                },
                filter: { ...JSON.parse(w.filter), startDate, endDate }
              };
            })
          );
          // И записываем настройки
          axios.post(
            `/ajax/dashboards/${id}/settings`,
            { settings: { startDate, endDate } },
            {
              headers: [{ key: "Cache-Control", value: "no-store" }]
            }
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    [id, settings.animated, startDate, endDate]
  );

  const handleAdd = widget => {
    setWidgets([widget, ...widgets]);
  };

  const handleRemove = widget => {
    setWidgets(widgets.filter(w => w.id !== widget.id));
    axios.delete(`/ajax/dashboards/${widget.id}`, {
      headers: [{ key: "Cache-Control", value: "no-store" }]
    });
  };

  const handleEdit = widget => {
    setWidgets(widgets.map(w => (w.id === widget.id ? widget : w)));
    axios.put(
      `/ajax/dashboards/${widget.id}`,
      {
        ...widget,
        options: JSON.stringify(widget.options),
        filter: JSON.stringify(widget.filter)
      },
      {
        headers: [{ key: "Cache-Control", value: "no-store" }]
      }
    );
  };

  const handleChangeStartDate = date => {
    setStartDate(date.getTime());
    axios.post(
      `/ajax/dashboards/${id}/settings`,
      {
        settings: { startDate: date.getTime(), endDate }
      },
      {
        headers: [{ key: "Cache-Control", value: "no-store" }]
      }
    );
  };

  const handleChangeEndDate = date => {
    setEndDate(date.getTime());
    axios.post(
      `/ajax/dashboards/${id}/settings`,
      {
        settings: { startDate, endDate: date.getTime() }
      },
      {
        headers: [{ key: "Cache-Control", value: "no-store" }]
      }
    );
  };

  const handleWeek = () => {
    const start = sub(endDate, { weeks: 1 }).getTime();
    setStartDate(start);
    axios.post(
      `/ajax/dashboards/${id}/settings`,
      { settings: { startDate: start, endDate } },
      {
        headers: [{ key: "Cache-Control", value: "no-store" }]
      }
    );
  };

  const handleMonth = () => {
    const start = sub(endDate, { months: 1 }).getTime();
    setStartDate(start);
    axios.post(
      `/ajax/dashboards/${id}/settings`,
      { settings: { startDate: start, endDate } },
      {
        headers: [{ key: "Cache-Control", value: "no-store" }]
      }
    );
  };

  const setGlobalOption = (key, value) => {
    setWidgets(
      widgets.map(widget => ({
        ...widget,
        filter: { ...widget.filter, [key]: value }
      }))
    );
  };
  /**
   * Навигационное меню, показывающееся на экаранах шириной более 480px
   * */
  const navigationMenu = () => (
    <Nav className={navPosition}>
      <Nav.Item className="nav-button" onClick={() => setIsShow(true)}>
        Add Widget
      </Nav.Item>
      <Nav.Item className="nav-datepickers">
        <div className="nav-datepicker">
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
        </div>
        <div className="nav-datepicker">
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
        </div>
      </Nav.Item>
      <Nav.Item className="nav-button" onClick={handleWeek}>
        Week
      </Nav.Item>
      <Nav.Item className="nav-button" onClick={handleMonth}>
        Month
      </Nav.Item>
      {globalParameter &&
        globalParameter.map((param, index) => (
          <Nav.Item key={index}>
            <GlobalParameter
              settings={settings}
              setGlobalOption={setGlobalOption}
              parameter={param}
            />
          </Nav.Item>
        ))}
    </Nav>
  );

  /**
   * Выпадающее меню, показывающееся на экаранах шириной менее 480px
   * */
  const dropdownMenu = () => (
    <Dropdown>
      <Dropdown.Toggle variant="light">
        <ThreeDotsVertical color="#7a7a7b" />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setIsShow(true)}>
          Add Widget
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleWeek}>Week</Dropdown.Item>
        <Dropdown.Item onClick={handleMonth}>Month</Dropdown.Item>
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
        <Dropdown.Divider />
        {globalParameter &&
          globalParameter.map((param, index) => (
            <Dropdown.Item
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
              }}
              key={index}
            >
              <GlobalParameter
                settings={settings}
                setGlobalOption={setGlobalOption}
                parameter={param}
              />
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );

  useEffect(() => {
    getData(id, startDate, endDate);
  }, [id, startDate, endDate]);

  return (
    <div className="altrp-dashboard">
      <div className="altrp-dashboard__controls">
        {isMobile ? dropdownMenu() : navigationMenu()}
      </div>
      <div className="altrp-dashboard__widgets">
        {isShow && (
          <AddWidget
            settings={settings}
            id={id}
            setIsShow={setIsShow}
            onAdd={handleAdd}
          />
        )}
        {widgets.map(widget => {
          return (
            <CardWidget
              settings={settings}
              key={widget.id}
              widget={widget}
              onDeleted={handleRemove}
              onEdited={handleEdit}
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AltrpDashboards;
