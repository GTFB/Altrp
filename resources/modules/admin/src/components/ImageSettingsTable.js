import AdminTable from "./AdminTable";
import {useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import ImageSettingsModal from "./ImageSettingsModal";

function ImageSettingsTable(props) {
  const [state, setState] = useState({
    imageSettings: [],
    imageSettingsSearch: '',
    currentPage: 1,
  })
  const itemsPerPage = 10;

  const history = useHistory()

  useEffect(async () => {
    await getImageSettings();
  }, [])

  const getImageSettings = async () => {
    let url = new URL(location.href);
    let urlS = url.searchParams.get('s')
    let getUrlS = urlS === null ? state.imageSettingsSearch : urlS
    let { data } = await axios.get(`/admin/ajax/media_settings?s=${getUrlS}`)
    setState(state => ({
      ...state,
      imageSettings: data,
      imageSettingsSearch: getUrlS
    }))
  }

  const searchImageSettings = async (e) => {
    e.preventDefault();
    let url = new URL(location.href);
    if (state.imageSettingsSearch) {
      url.searchParams.set('s', state.imageSettingsSearch);
      history.push(`${url.pathname + url.search + url.hash}`)
    } else {
      url.searchParams.delete('s');
      history.push(`${url.pathname + url.search + url.hash}`)
    }
    await getImageSettings()
  }

  const changeSearch = (e) => {
    setState(state => ({
      ...state,
      imageSettingsSearch: e.target.value
    }))
  }
  const {imageSettings, imageSettingsSearch, currentPage} = state
  return (
    <div className="image-settings-table">
      <AdminTable
        columns={[
          {
            name: 'name',
            title: 'Name',
            button__table: true,
            tag: "Link"
          },
          {
            name: 'width',
            title: 'Width'
          },
          {
            name: 'height',
            title: 'Height'
          }
        ]}
        rows={imageSettings.map(item => ({...item, editUrl: `/admin/ajax/media_settings/:id`, button__table: () => props.edit(item.id)}))}

        quickActions={[
          {
            tag: "button",
            route: `/admin/ajax/media_settings/:id`,
            method: "delete",
            confirm: `Are You Sure`,
            after: () => getImageSettings(),
            className: "quick-action-menu__item_danger",
            title: "Delete"
          }
        ]}

        searchTables={{
          submit: searchImageSettings,
          value: imageSettingsSearch,
          change: (e) => changeSearch(e)
        }}

        pageCount={Math.ceil(imageSettings.length / itemsPerPage) || 1}
        currentPage={currentPage}
        changePage={page => {
          if (currentPage !== page) {
            setState(state => ({
              ...state,
              currentPage: page
            }));
          }
        }}
        itemsCount={imageSettings.length}
        openPagination={true}
      />

      {props.activeMode && (
        <ImageSettingsModal
          id={props.id}
          activeMode={props.activeMode}
          toggleModal={props.onToggle}
          getImageSettings={getImageSettings}
        />
      )}
    </div>
  )
}

export default ImageSettingsTable;
