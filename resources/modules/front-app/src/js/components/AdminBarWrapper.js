

const AdminBarWrapper = styled.div`
& {
  position: absolute;
  top: 0;
  z-index: 9999999;
  width: 100%;
}
& .admin-bar {
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px;

  background-color: #343B4C;
  color: #fff;

  font-family: 'Roboto', sans-serif;
  line-height: 25px;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  z-index: 1000;
  transition: transform 0.12s, margin 0.12s;
  top: 0;
}

  & .admin-bar__left {
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
  }

& .admin-bar.closed {
  transform: translateY(-100%);
}

& .admin-bar__arrow {
  height: 20px;
  width: 25px;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 3px;
  z-index: 99999;
  background-color: #343B4C;
  cursor: pointer;
  border-radius: 0 0 6px 0;
}

& .admin-bar__arrow div {
  margin-bottom: 5px;
  transform: rotate(225deg);
  border: solid #fff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-left: 5px;
  margin-right: 5px;
  transition: transform 0.2s, margin 0.2s;
}

& .admin-bar__arrow.closed div {
  margin-bottom: 8px;
  transform: rotate(45deg);
}

& .admin-bar__link {
  margin-left: 15px;
  cursor: pointer;
}

& .admin-bar__tools {
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #fff;
  font-family: 'Roboto', sans-serif;
  line-height: 25px;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  z-index: 1000;
}


& .admin-bar__tool {
  position: relative;
  margin-left: 20px;
  cursor: pointer;
}

& .admin-bar__tool-svg {
  fill: white;
  width: 16px;
  height: 16px;
  margin-right: 10px;
  vertical-align: text-top;
}

& .admin-bar__profile {
  display: flex;
  align-items: center;
  margin-right: 25px;
}

& .admin-bar__profile-svg {
  vertical-align: text-top;
  margin-left: 10px;
}

& .admin-bar__popup-template {
  position: absolute;
  left: 0;
  top: 30px;
  width: 150px;
  max-height: 450px;

  line-height: 16px;
  z-index: 999;
}

  & .admin-bar__popup-popups {
    position: relative;
  }

& .admin-bar__popup-template-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 11px;
  text-overflow: ellipsis;
  background-color: #343b4c;
}

& .admin-bar__popup-template-item:hover {
  background: #4f5972;
}

& .admin-bar__popup-template-chevron {
  margin-top: 3px;
}

& .admin-bar__popup-popups-items {
  display: none;
  position: absolute;
  right: -300px;
  top: 3px;
  width: 300px;
  //padding-bottom: 7px;
  margin-top: -4px;

  background-color: #343b4c;
}

& .admin-bar__popup-popups:hover .admin-bar__popup-popups-items {
  display: block;
}

& .admin-bar__popup-popups-item {
  padding: 6px 11px;

  overflow: hidden;
  text-overflow: ellipsis;
}
& .admin-bar__popup-popups-item:hover {
  background: #4f5972;
}
& .admin-bar__search-bar {

}
& .admin-bar__search-result {
  position: fixed;
  margin-top: 30px;
  max-width:  600px;
  min-width: 300px;
  width: auto;
  height: 250px;
  padding: 11px 3px 7px 9px;

  z-index: 999;
  background-color: #343b4c;
}

  & .admin-bar__search-bar {
    margin-left: 30px;
  }

& .admin-bar__search-content {
  max-width: 600px;
  width: 100%;
  height: 100%;
  overflow: auto;
  margin: 0;
}


& .admin-bar__autocomplete {
  position: fixed;
  margin-top: 21px;
  width: 223px;
  padding: 7px 0;


  z-index: 1000;
  box-shadow: 0px 1px 2px 1px rgba(34, 60, 80, .3);
  background-color: #ffffff;
  border-radius: 5px;
  color: #000000;
}
& .admin-bar__autocomplete-option {
  padding: 2px 7px;

  cursor: pointer;
}

& .admin-bar__autocomplete-option:hover {
  background-color: #d3d2d2;
}

& .admin-bar__search-value {
  padding-left: 15px;
}
& .admin-bar__search-button {
  position: fixed;
  height: 22px;
  width: 292px;
  margin-top: -22px;
  margin-left: -5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 11px;

  color: #000000;
  background-color: #f4f4f4;
  cursor: pointer;
}
& .admin-bar__search-button:hover {
  background-color: #c2c2c2;
}

& .admin-bar__search-button svg {
  margin-left: 5px;
}
& .admin-bar__search {
  width: 223px;
  border: 1px;
  padding: 4px 9px;
  vertical-align: top;
  line-height: 17px;
}
& .admin-bar__button {
  width: 85px;
  margin-left: 9px;
  padding: 5px;
  vertical-align: top;
  font-size: 13px;
  font-weight: 400;

  color: #000000;
  background-color: #87ca00;
  border-radius: 2px;
}

  & .admin-bar__button:hover {
    background-color: #7bb701;
  }

  & .admin-bar__button-update {
    margin-left: 9px;
    padding: 5px 20px;
    vertical-align: top;
    font-size: 13px;
    font-weight: 400;

    color: #000000;
    background-color: #87ca00;
    border-radius: 2px;
  }

  & .admin-bar__button-update:hover {
    background-color: #7bb701;
  }

& .admin-bar__search-content::-webkit-scrollbar {
  width: 12px;
  background: #F4F4F4;
}
& .admin-bar__search-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}
& .admin-bar__search-content::-webkit-scrollbar-thumb {
  background: #888;
  height: 45px;
}

& .admin-bar__search-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

& .history-popup__card {
  padding: 5px 10px;
}

& .history-popup__card:hover {
  background-color: #4f5972;
}

  @media screen and (max-width: 1070px) {
    & .admin-bar__search-bar {
      margin-right: 30px;
    }

    & .admin-bar__link {
      margin-left: 30px;
    }

    & .admin-bar__tools {
      flex-grow: 1;
      order: 2;
    }

    & .admin-bar__left {
      order: 1;
      margin-bottom: 10px;
    }

    & .admin-bar__tool:last-child {
      margin-right: 30px;
    }
  }

  @media screen and (max-width: 667px) {
    & .admin-bar__left {
      flex-wrap: wrap;
    }

    & .admin-bar__search-bar {
      margin-bottom: 10px;
    }

    & .admin-bar__profile {
      margin-left: 30px;
    }
  }

  @media screen and (max-width: 480px) {
    & .admin-bar {
      flex-shrink: 0;
    }

    & .admin-bar__tools {
      flex-shrink: 0;
    }

    & .admin-bar__search-bar {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }
  }

`;

export default AdminBarWrapper;
