import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const SourceControl = ({ name, value, onChange, options = {} }) => {
  const [sources, setSources] = useState([]);

  const getSources = useCallback(async () => {
    const req = await axios("/admin/ajax/data_sources_for_query");
    if (req.status === 200) {
      console.log("req :>> ", req);
      setSources(req.data[1].options);
    }
  }, [setSources]);

  useEffect(() => {
    getSources();
  }, [getSources]);

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Form.Group>
      <Form.Label>{name}</Form.Label>
      <Form.Control {...options} as="select" size="sm" value={value} onChange={handleChange}>
        <option value="">В ручную</option>
        {sources.map((s, i) => (
          <option key={i} value={s.value}>
            {s.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default SourceControl;
