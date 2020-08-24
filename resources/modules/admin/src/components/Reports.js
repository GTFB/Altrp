import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setModalSettings, toggleModal } from "../js/store/modal-settings/actions";

import AdminTable from "./AdminTable";

function Reports() {
  const dispatch = useDispatch();
  const [reports, setReports] = useState([]);

  const openPreview = (item) => {
    window.open(item.preview, "_blank");
  };

  const columns = [
    {
      name: "id",
      title: "ID",
    },
    {
      name: "name",
      title: "Name",
      url: true,
      target: "_blank",
    },
    {
      name: "description",
      title: "Description",
    },
    {
      name: "updated_at",
      title: "Updated At",
    },
    {
      name: "preview",
      title: "Preview",
      is_button: true,
      button: {
        class: "",
        function: openPreview,
        title: "Preview",
      },
    },
  ];

  const showModal = () => {
    const modalSettings = {
      title: "Add New Report",
      submitButton: "Add",
      active: true,
      submit: function(formData) {
        return axios.post("/admin/ajax/reports", formData);
      },
      fields: [
        {
          name: "name",
          label: "Report Name",
          required: true,
        },
        {
          name: "description",
          label: "Description",
          required: true,
        },
      ],
      success: function(res) {
        setReports([...reports, res.data]);
        dispatch(toggleModal());
      },
    };
    dispatch(setModalSettings(modalSettings));
  };

  // Функция получения отчетов из БД
  const getReports = async () => {
    const req = await axios("/admin/ajax/reports");
    if (req.status === 200 && typeof req.data !== "string") {
      setReports(req.data);
    }
  };

  // Получаем отчеты при рендере компонента
  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="admin-tables admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">
            Reports
          </a>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">All Reports</span>
        </div>
        <button onClick={showModal} className="btn">
          Add New
        </button>
        <div className="admin-filters">
          <span className="admin-filters__current">All ({reports.length || "0"})</span>
        </div>
      </div>
      <div className="admin-content">
        {reports.length > 0 && <AdminTable columns={columns} rows={reports} />}
      </div>
    </div>
  );
}

export default Reports;
