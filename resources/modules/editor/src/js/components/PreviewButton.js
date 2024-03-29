import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Settings from '../../svgs/settings.svg';
import Preview from '../../svgs/preview.svg';
import { setPreviewSettingModalOpened, setPreviewTab } from '../store/portal-status/actions';

const ButtonWithHoverMenu = styled.div`
  display: flex;
  flex-direction: column;
  height: 33px;
  overflow: visible;
  justify-content: flex-end;

  &:hover .hover-menu {
    display: block;
  }

  .hover-menu {
    background-color: #343B4C;
    border-radius: 4px;
    z-index: 999;
    display: none;
  }
`;

function PreviewButton({ templateData, setPreviewSettingModalOpened, setPreviewTab }) {
  const handleShowSetting = () => {
    setPreviewSettingModalOpened(true);
  };

  const handlePreview = () => {
    const newTabUrl = `/admin/altrp-template-preview/${templateData.guid}`;
    const newTab = window.open(newTabUrl, 'template_preview');

    setPreviewTab(newTab);
  };

  return (
    <ButtonWithHoverMenu>
      <div className="hover-menu">
        <button
          className="btn btn_settings"
          onClick={handleShowSetting}
        >
          <Settings className="icon" />
        </button>
      </div>

      <button
        className="btn"
        onClick={handlePreview}
      >
        <Preview className="icon" />
      </button>
    </ButtonWithHoverMenu>
  );
}

const mapStateToProps = state => ({
  templateData: state.templateData,
});

const mapDispatchToProps = {
  setPreviewSettingModalOpened,
  setPreviewTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewButton);
