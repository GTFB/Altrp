

const AdminBarWrapper = styled.div`
& .admin-bar {
  top: 0;
  position: absolute;
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  background-color: #343B4C;
  color: #fff;

  font-family: 'Open Sans';
  line-height: 25px;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  z-index: 1000;
}
& .admin-bar__link {
  cursor: pointer;
  margin-left: 15px;
}
& .admin-bar__tools {
  display: flex;
  justify-content: space-between;

  background-color: #343b4c;
  color: #fff;

  font-family: "Open Sans";
  line-height: 25px;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  z-index: 1000;
}


& .admin-bar__tool {
  margin-left: 15px;

  cursor: pointer;
}

& .admin-bar__tool-svg {
  margin-right: 10px;
  vertical-align: text-top;
}

& .admin-bar__profile {
  margin-right: 25px;
}

& .admin-bar__profile-svg {
  vertical-align: text-top;
  margin-left: 10px;
}

& .admin-bar__popup-template {
  position: relative;
  width: 150px;
  padding-bottom: 7px;
  padding-top: 5px;

  line-height: 16px;
  z-index: 999;
  background-color: #343b4c;
}

& .admin-bar__popup-template-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 11px;

  overflow: hidden;
  text-overflow: ellipsis;
}

& .admin-bar__popup-template-item:hover {
  background: #4f5972;
}

& .admin-bar__popup-template-chevron {
  margin-top: 3px;
}

& .admin-bar__popup-popups-items {
  display: none;
  position: fixed;
  left: 160px;
  width: 150px;
  padding-bottom: 7px;
  margin-top: -4px;

  background-color: #343b4c;
}

& .admin-bar__popup-popups:hover .admin-bar__popup-popups-items {
  display: block;
}

& .admin-bar__popup-popups-item {
  padding: 4px 11px;

  overflow: hidden;
  text-overflow: ellipsis;
}
& .admin-bar__popup-popups-item:hover {
  background: #4f5972;
}
& .admin-bar__search-bar {
  margin: 2px 0;
  margin-left: 15px;
}
& .admin-bar__search-result {
  position: fixed;
  margin-top: 23px;
  width: 315px;
  height: 156px;
  padding: 11px 3px 7px 9px;

  z-index: 999;
  background-color: #343b4c;
}
& .admin-bar__search-content {
  width: 100%;
  height: 100%;
  overflow: auto;
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
  padding: 2px 9px;
  vertical-align: top;
  line-height: 17px;
}
& .admin-bar__button {
  width: 83px;
  height: 21px;
  margin-left: 9px;
  padding: 3px;
  vertical-align: top;

  color: #000000;
  background-color: #87ca00;
  border-radius: 2px;
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
`;

export default AdminBarWrapper;
