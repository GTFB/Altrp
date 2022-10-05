import React, { useState, useEffect, useCallback } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

function FilterField({ widget, setWidget, param, changeTitle }) {
  const [options, setOptions] = useState([]);
  //const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getOptions = useCallback(
    async (param) => {
      console.log('KOSTYA =>', param);
      setIsLoading(true);
      const req = await axios(`/ajax/models/queries/${param.model}/${param.value}`);
      if (req.status === 200) {
        setOptions(req.data.data);
        setIsLoading(false);
      }
    },
    [param]
  );

  useEffect(() => {
    options.length === 0 && getOptions(param);
  }, [param]);

  return (
    <Form.Group>
      <Form.Label>{param.label}</Form.Label>
      <Form.Control
        as="select"
        custom
        value={widget.filter?.[param.value] || ""}
        onChange={(e) => {
          let oldParam = widget.filter[param.value] || {};
          let findLabel = options.find(option => option.value == oldParam);
          let oldLabel = typeof findLabel !== 'undefined' ? findLabel.label : false;
          console.log(oldLabel, '<---');
          setWidget({ ...widget, filter: { ...widget.filter, [param.value]: e.target.value } })
          let paramName = options.find(option => option.value == e.target.value).label || '';
          changeTitle(` / ${paramName}`, ` / ${oldLabel}`);
        }
        }
        required
      >
        <option value="">-</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default FilterField;
