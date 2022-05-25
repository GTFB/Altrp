import AltrpFile from "../../../../../front-app/src/js/classes/AltrpFile";
import CloseIcon from "../../../svgs/times.svg"
import isEditor from "../../../../../front-app/src/js/functions/isEditor";
import replaceContentWithData from "../../../../../front-app/src/js/functions/replaceContentWithData";
import getDataFromLocalStorage from "../../../../../front-app/src/js/functions/getDataFromLocalStorage";
import parseOptionsFromSettings from "../../../../../front-app/src/js/functions/parseOptionsFromSettings";
import {changeFormFieldValue} from "../../../../../front-app/src/js/store/forms-data-storage/actions";

const FileInput = window.altrpLibs.Blueprint.FileInput;

(window.globalDefaults = window.globalDefaults || []).push(`
.altrp-widget_input-gallery .bp3-file-upload-input{
    display: none;
}
.altrp-widget_input-gallery .bp3-file-upload-input::after{
  width: auto;
  min-width: 0;
  display: none;
}
.input-gallery__item.input-gallery__item{
  height: 100px;
}
.input-gallery__item.input-gallery__item.input-gallery__item.input-gallery__item{
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  position: relative;
    width:100%;
}
.input-gallery__item.input-gallery__item svg{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
}
.input-gallery-wrapper{
    display: grid;
    grid-auto-flow: row dense;
    }
`)

class InputGalleryWidget extends Component {

  constructor(props) {
    super(props);
    props.element.component = this;
    if (window.elementDecorator) {
      window.elementDecorator(this);
    }
    const state ={
      settings: {...props.element.getSettings()},
      value: this.defaultValue,
      imageUrls_0: _.get(props.element.getResponsiveSetting('preview_placeholder'), 'url'),
    };
    this.defaultValue = this.getDefaultValue(state)

    this.state = state;
    this.altrpSelectRef = React.createRef();
    if (this.defaultValue) {
      this.dispatchFieldValueToStore(this.defaultValue);
    }
  }

  /**
   *
   * @param e
   * @param item
   */
  async deleteItem(e, item){
    this.setState(state => ({...state, notActive: true}))
    let filesStorage = this.state.filesStorage;
    let value = this.getValue()
    let fileToDelete;
    filesStorage = filesStorage.filter(file => {
      if(file.getProperty('media.id') === item){
        fileToDelete = file;
      }
      return file.getProperty('media.id') !== item
    })
    if(fileToDelete){
      try {
        await fileToDelete.deleteFileFromStorage()
      } catch (e) {console.error(e);}
    }
    value = value.filter(v => v !== item)
    try {
      const limit = this.props.element.getResponsiveSetting('limit');
      _.forEach(filesStorage, (file, idx) => {
        if (limit && idx >= limit) {
          return
        }
        if(file.getFile()){
          const reader = new FileReader
          reader.readAsDataURL(file.getFile())
          reader.onload = () => {
            this.setState(state => {
                state[`imageUrls_${idx}`] = reader.result;
                return {...state};
              }
            )
          }
        } else {
          this.setState(state => {
            state[`imageUrls_${idx}`] = file.getProperty('media.url');
            return {...state};
          })
        }
      })
    } catch (e) {
      console.error(e);
    }
    this.setState(state => ({...state, notActive: false}))
    this.onChange(value, filesStorage)
  }

  /**
   * Чистит значение
   */
  clearValue() {
    this.onChange([]);
    this.dispatchFieldValueToStore(null, true);
  }


  /**
   *
   * @returns {[]}
   */
  getValue = () => {
    let value;
    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();
    if (isEditor()) {
      value = this.state.value;
    } else {
      value = _.get(appStore.getState().formsStore, `${formId}`, '')
      value = _.get(value, fieldName, '')
      if(! _.isArray(value)){
        value = [value]
      }
    }
    return value || [];
  }

  /**
   * Загрузка виджета
   * @param {{}} prevProps
   * @param {{}} prevState
   */
  async _componentDidMount(prevProps, prevState) {
    if (this.props.element.getSettings("content_options")) {
      let options = parseOptionsFromSettings(
        this.props.element.getSettings("content_options")
      );

      this.setState(state => ({...state, options}));
    }

    let value = this.state.value;

    /**
     * Если модель обновилась при смене URL
     */
    if (
      prevProps &&
      !prevProps.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentModel.getProperty("altrpModelUpdated")
    ) {
      value = this.getDefaultValue();
      this.setState(
        state => ({...state, value, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
      return;
    }

    if (
      this.props.currentModel.getProperty("altrpModelUpdated") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      !this.state.contentLoaded
    ) {
      value = this.getDefaultValue() || [];
      this.setState(
        state => ({...state, value, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
      return;
    }

    if (this.state.value !== value) {
      this.setState(
        state => ({...state, value}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }
  }

  /**
   * Обновление виджета
   */
  async _componentDidUpdate(prevProps, prevState) {
    const {content_options, model_for_options} = this.state.settings;
    if (!this.getValue() && this.state.imageUrls_0 !== _.get(this.props.element.getResponsiveSetting('preview_placeholder'), 'url')) {
      this.setState(
        state => ({...state, imageUrls_0: _.get(this.props.element.getResponsiveSetting('preview_placeholder'), 'url')})
      )
    }
    if (
      prevProps &&
      !prevProps.currentDataStorage.getProperty("currentDataStorageLoaded") &&
      this.props.currentDataStorage.getProperty("currentDataStorageLoaded")
    ) {
      let value = this.getDefaultValue();
      this.setState(
        state => ({...state, value, contentLoaded: true}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    }


    if (content_options && !model_for_options) {
      let options = parseOptionsFromSettings(content_options);
      if (!_.isEqual(options, this.state.options)) {
        this.setState(state => ({...state, options}));
      }
    }
    this.updateValue(prevProps);
  }

  /**
   * @param {{} | null} state
   * @returns {*[]}
   */
  getDefaultValue(state) {

    let value = this.getContent("default_value", true) || []
    if(! _.isArray(value) && ! _.isEmpty(value)){
      value = [value];
    }

    let filesStorage = _.map(value, (media, idx) => {
      const newFile =  new AltrpFile()
      newFile.setProperty('media', media)
      return newFile
    })
    value.forEach((v, idx)=>{
      if(!v?.url){
        return
      }
      if(state){
        state[`imageUrls_${idx}`] = v.url
        state.filesStorage = filesStorage
      } else {
        this.setState(state=>{
          // this.state[]
          state[`imageUrls_${idx}`] = v.url
          state.filesStorage = filesStorage
        })
      }
    })
    value = value.map(v => v.id)
    return value
  }
  /**
   * Обновить значение если нужно
   * @param {{}} prevProps
   */
  updateValue(prevProps) {

    if (isEditor()) {
      return;
    }

    let content_calculation = this.props.element.getSettings(
      "content_calculation"
    );
    const altrpforms = this.props.formsStore;
    const fieldName = this.props.element.getFieldId();
    const formId = this.props.element.getFormId();

    if (!content_calculation) {
      /**
       * Обновить значение, если formsStore изменилось из другого компонента
       */
      const path = `${formId}.${fieldName}`;
      if (
        this.props.formsStore !== prevProps.formsStore &&
        _.get(altrpforms, path) !== this.state.value
      ) {
        this.setState(state => ({
          ...state,
          value: _.get(altrpforms, path)
        }));
      }
      return;
    }

    const prevContext = {};
    const altrpdata = this.props.currentDataStorage.getData();
    const altrpmodel = this.props.currentModel.getData();
    const altrpuser = this.props.currentUser.getData();
    const altrppagestate = this.props.altrpPageState.getData();
    const altrpresponses = this.props.altrpresponses.getData();
    const altrpmeta = this.props.altrpMeta.getData();
    const context = this.props.element.getCurrentModel().getData();

    if (content_calculation.indexOf("altrpdata") !== -1) {
      context.altrpdata = altrpdata;
      if (!altrpdata.currentDataStorageLoaded) {
        prevContext.altrpdata = altrpdata;
      } else {
        prevContext.altrpdata = prevProps.currentDataStorage.getData();
      }
    }

    if (content_calculation.indexOf("altrpforms") !== -1) {
      context.altrpforms = altrpforms;
      /**
       * Не производим вычисления, если изменилось текущее поле
       */
      if (`${formId}.${fieldName}` === altrpforms.changedField) {
        prevContext.altrpforms = altrpforms;
      } else {
        prevContext.altrpforms = prevProps.formsStore;
      }
    }

    if (content_calculation.indexOf("altrpmodel") !== -1) {
      context.altrpmodel = altrpmodel;
      prevContext.altrpmodel = prevProps.currentModel.getData();
    }

    if (content_calculation.indexOf("altrpuser") !== -1) {
      context.altrpuser = altrpuser;
      prevContext.altrpuser = prevProps.currentUser.getData();
    }

    if (content_calculation.indexOf("altrpuser") !== -1) {
      context.altrpuser = altrpuser;
      prevContext.altrpuser = prevProps.currentUser.getData();
    }

    if (content_calculation.indexOf("altrppagestate") !== -1) {
      context.altrppagestate = altrppagestate;
      prevContext.altrppagestate = prevProps.altrpPageState.getData();
    }

    if (content_calculation.indexOf("altrpmeta") !== -1) {
      context.altrpmeta = altrpmeta;
      prevContext.altrpmeta = prevProps.altrpMeta.getData();
    }

    if (content_calculation.indexOf("altrpresponses") !== -1) {
      context.altrpresponses = altrpresponses;
      prevContext.altrpresponses = prevProps.altrpresponses.getData();
    }

    if (content_calculation.indexOf("altrpstorage") !== -1) {
      context.altrpstorage = getDataFromLocalStorage("altrpstorage", {});
    }

    if (
      _.isEqual(prevProps.currentDataStorage, this.props.currentDataStorage) &&
      _.isEqual(prevProps.currentUser, this.props.currentUser) &&
      _.isEqual(prevProps.formsStore, this.props.formsStore) &&
      _.isEqual(prevProps.altrpPageState, this.props.altrpPageState) &&
      _.isEqual(prevProps.altrpMeta, this.props.altrpMeta) &&
      _.isEqual(prevProps.altrpresponses, this.props.altrpresponses) &&
      _.isEqual(prevProps.currentModel, this.props.currentModel)
    ) {
      return;
    }

    if (
      !_.isEqual(prevProps.formsStore, this.props.formsStore) &&
      `${formId}.${fieldName}` === altrpforms.changedField
    ) {
      return;
    }

    let value = "";

    try {
      content_calculation = content_calculation
        .replace(/}}/g, "')")
        .replace(/{{/g, "_.get(context, '");
      value = eval(content_calculation);
      if (value === this.state.value) {
        return;
      }
      this.setState(
        state => ({...state, value}),
        () => {
          this.dispatchFieldValueToStore(value);
        }
      );
    } catch (e) {
      console.error(
        "Evaluate error in Input: '" + e.message + "'",
        this.props.element.getId()
      );
    }
  }


  /**
   * Изменение значения в виджете
   * @param {[]} value
   * @param {[]| null} filesStorage
   */
  onChange = async (value, filesStorage = null) => {
    this.setState(state => ({...state, filesStorage}))
    if (isEditor()) {
      this.setState(state => ({...state, value}))
    } else {
      this.dispatchFieldValueToStore(value, true)
    }
  }

  /**
   * Передадим значение в хранилище формы
   * @param {*} value
   * @param {boolean} userInput true - имзенилось пользователем
   */
  dispatchFieldValueToStore = async (value, userInput = false) => {
    let formId = this.props.element.getFormId();
    let fieldName = this.props.element.getFieldId();

    if (fieldName.indexOf("{{") !== -1) {
      fieldName = replaceContentWithData(fieldName);
    }
    if (_.isObject(this.props.appStore) && fieldName && formId) {
      this.props.appStore.dispatch(
        changeFormFieldValue(fieldName, value, formId, userInput)
      );

      if (userInput) {
        const change_actions = this.props.element.getSettings("change_actions");

        if (change_actions && !isEditor()) {
          const actionsManager = (
            await import(
              /* webpackChunkName: 'ActionsManager' */
              "../../../../../front-app/src/js/classes/modules/ActionsManager.js"
              )
          ).default;
          await actionsManager.callAllWidgetActions(
            this.props.element.getIdForAction(),
            "change",
            change_actions,
            this.props.element
          );
        }
      }
    }
  };

  addElements = async (e) => {
    this.setState(state => ({...state, notActive: true}))
    let {filesStorage} = this.state;
    filesStorage = filesStorage || []
    let files = e.target.files;
    const limit = this.props.element.getResponsiveSetting('limit');
    let value = this.getValue();

    files = _.map(files, (file, idx) => {
      return new AltrpFile(file)
    })
    filesStorage = filesStorage.concat(files)
    this.setState(state => ({...state, filesStorage: value}))
    try {
      value = value.concat(
        await Promise.all(
          files.map(async file => ((await file.storeFile()).getProperty('media.id')))
        )
      )
    } catch (e) {
      console.error(e);
    }

    if (limit) {
      value = value.slice(0, limit)
      filesStorage = filesStorage.slice(0, limit)
    }
    this.onChange(value, filesStorage)
    this.setState(state => ({...state, key: Math.random()}))
    try {
      _.forEach(filesStorage, (file, idx) => {
        if (limit && idx >= limit) {
          return
        }
        if(file.getFile()){
          const reader = new FileReader
          reader.readAsDataURL(file.getFile())
          reader.onload = () => {
            this.setState(state => {
                state[`imageUrls_${idx}`] = reader.result;
                return {...state};
              }
            )
          }
        } else {
          this.setState(state => {
            state[`imageUrls_${idx}`] = file.getProperty('media.url');
            return {...state};
          })
        }
      })
    } catch (e) {
      console.error(e);
    }
    this.setState(state => ({...state, notActive: false}))
  }

  /**
   * Взовращает имя для атрибута name
   * @return {string}
   */
  getName() {
    return `${this.props.element.getFormId()}[${this.props.element.getFieldId()}]`;
  }

  render() {
    const {element} = this.props

    const inputProps = {
      name: this.getName(),
      accept: element.getResponsiveSetting('accept'),
      multiple: 1,
    }
    const {notActive} = this.state
    const value = this.getValue()

    const limit = element.getResponsiveSetting('limit')
    const fileInputProps = {
      key: this.state.key,
      inputProps,
      style: {
        pointerEvents: notActive ? 'none' : '',
        backgroundImage: `url(${element.getResponsiveSetting('placeholder')?.url || "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj48cGF0aCBkPSJNMjMuNDE0IDIxLjQxNEwzMCAxNC44MjhWNDRhMiAyIDAgMDA0IDBWMTQuODI4bDYuNTg2IDYuNTg2Yy4zOS4zOTEuOTAyLjU4NiAxLjQxNC41ODZzMS4wMjQtLjE5NSAxLjQxNC0uNTg2YTIgMiAwIDAwMC0yLjgyOGwtMTAtMTBhMiAyIDAgMDAtMi44MjggMGwtMTAgMTBhMiAyIDAgMTAyLjgyOCAyLjgyOHoiPjwvcGF0aD48cGF0aCBkPSJNNTAgNDBhMiAyIDAgMDAtMiAydjhjMCAxLjEwMy0uODk3IDItMiAySDE4Yy0xLjEwMyAwLTItLjg5Ny0yLTJ2LThhMiAyIDAgMDAtNCAwdjhjMCAzLjMwOSAyLjY5MSA2IDYgNmgyOGMzLjMwOSAwIDYtMi42OTEgNi02di04YTIgMiAwIDAwLTItMnoiPjwvcGF0aD48L3N2Zz4K"})`
      },
      onInputChange: this.addElements,
      className: `bp3-file-input_preview input-gallery__item`,
    }
    if (limit && value.length >= limit) {
      fileInputProps.style.display = 'none'
    }
    const deleteText = element.getResponsiveSetting('delete', '')
    return (
      <div className="input-gallery-wrapper">
        {value.map((item, idx) => {
          return <div
            className="input-gallery__item"
            title={deleteText}
            style={{
              backgroundImage: `url(${this.state[`imageUrls_${idx}`]})`
            }}
            key={item}>
            {<CloseIcon className="input-gallery__delete" onClick={(e) => {
              this.deleteItem(e, item)
            }}/>}
          </div>
        })}
        <FileInput {...fileInputProps} />
      </div>
    )
  }

}

export default InputGalleryWidget;
