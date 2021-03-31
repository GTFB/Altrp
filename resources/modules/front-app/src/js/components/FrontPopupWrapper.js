import React from 'react'
import styled from 'styled-components';
import { getResponsiveSetting } from '../helpers';


const FrontPopupWrapper = styled.div`
& .popup-close-button {
  ${({settings}) => {
    getResponsiveSetting(settings, 'popup_close_button_padding');
  }}
}
`

export default FrontPopupWrapper
