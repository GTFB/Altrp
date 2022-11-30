import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from "react-bootstrap/Spinner";
import axios from 'axios';
import styled from 'styled-components';

import JSONEditor from './JSONEditor'
import { setPreviewSettingModalOpened } from '../store/portal-status/actions';

import '../../sass/modal.scss';

const ErrorBox = styled.div`
  color: rgba(100, 30, 30, 0.6);
  margin-top: 4px;
  padding: 4px;
`;

function PreviewSettingModal({
  isPreviewSettingModalOpened,
  setPreviewSettingModalOpened,
  templateData
}) {
  const [previewSetting, setPreviewSetting] = useState('{}');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (templateData.id) {
      const fetchPreviewSetting = async () => {
        let { data: previewSetting } = await axios.get(
          `/admin/ajax/templates/${templateData.id}/settings`,
          {
            params: {
              setting_name: 'preview_data'
            }
          }
        );

        setPreviewSetting(JSON.stringify(previewSetting.data || {}, null, 2));
      };

      fetchPreviewSetting();
    }
  }, [templateData.id]);

  const savePreviewSetting = async () => {
    await axios.put(
      `/admin/ajax/templates/${templateData.id}/settings`,
      {
        setting_name: 'preview_data',
        data: previewSetting
      }
    );
  };

  const handleChange = newValue => {
    setPreviewSetting(newValue);
  }

  const handleClose = () => setPreviewSettingModalOpened(false);

  const handleSaveAndPreview = async () => {
    setLoading(true);
    try {
      await savePreviewSetting();
      setError(null);
      window.open(`/admin/altrp-template-preview/${templateData.guid}`, '_blank');
    } catch(err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSaveAndClose = async () => {
    setLoading(true);
    try {
      await savePreviewSetting();
      setError(null);
      handleClose();
    } catch(err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Modal show={isPreviewSettingModalOpened}>
      {loading && (
        <Spinner />
      )}

      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Data Preview Settings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <JSONEditor value={previewSetting} onChange={handleChange} />

        {error && (
          <ErrorBox>{error}</ErrorBox>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleSaveAndPreview} disabled={loading}>
          Save & Open Preview
        </Button>

        <Button variant="primary" onClick={handleSaveAndClose} disabled={loading}>
          Save & Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = state => ({
  isPreviewSettingModalOpened: state.portalStatus.isPreviewSettingModalOpened,
  templateData: state.templateData,
});

const mapDispatchToProps = {
  setPreviewSettingModalOpened,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewSettingModal);
