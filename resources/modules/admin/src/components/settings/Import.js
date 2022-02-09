import Resource from "../../../../editor/src/js/classes/Resource";
import {FileInput} from "@blueprintjs/core";
import getCookie from "../../../../editor/src/js/helpers/getCookie";

class Import extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: '',
      fileCustomName: ''
    }

    this.inputFile = React.createRef();
    this.inputCustomFile = React.createRef();
    this.resource = new Resource({route:'/admin/ajax/import/settings'});
    this.custom_resource = new Resource({route:'/admin/ajax/import/custom_settings'});
  }

  addFile = () => {
    let inputFile = this.inputFile.current.files[0].name
    this.setState({
      fileName: inputFile
    })
  }

  addCustomFile = () => {
    let inputCustomFile = this.inputCustomFile.current.files[0].name
    this.setState({
      fileCustomName: inputCustomFile
    })
  }

  /**
   * Отправка формы
   */
  onSubmit  = async e => {
    e.preventDefault();
    let res = await this.resource.postFiles(this.inputFile.current.files, 'application/zip,application/x-zip,application/x-zip-compressed');
    if( res.success ){
      await alert('Success');
      window.location.href = '/admin/dashboard';
    } else {
      alert('Error ' + res.message)
    }
  };

  /**
   * Отправка формы
   */
  onCustomSubmit  = async e => {
    e.preventDefault();
    let res = await this.custom_resource.postFiles(this.inputCustomFile.current.files, 'application/zip,application/x-zip,application/x-zip-compressed');
    if( res.success ){
      await alert('Success');
      window.location.href = '/admin/dashboard';
    } else {
      alert('Error ' + res.message)
    }
  };
  /**
   * Отрисовываем вкладку импорта админки
   */
  render() {
    let _token

    if(window._token){
      _token = window._token
    } else {
      _token = getCookie('XSRF-TOKEN')
    }
    return <div><form
                 onSubmit={this.onSubmit}
                 method="post"
                 className="admin-updates admin-import p-4">
      <div className="admin-caption mt-1">
        Import All App Settings in Archive
      </div>
      <input type="hidden"
             name="_token"
             value={_token}/>
      {/*<input type="file"*/}
      {/*       ref={this.inputFile}*/}
      {/*       accept={'.zip,application/zip,application/x-zip,application/x-zip-compressed'}*/}
      {/*       name="file"*/}
      {/*       required/>*/}
      <div className="admin-import__block">
        <FileInput
          inputProps={{accept: ".zip,application/zip,application/x-zip,application/x-zip-compressed", name: "file", ref: this.inputFile, onChange: this.addFile}}
          className="admin-updates__inputFile"
          text={this.state.fileName || "Choose file..."}
        />
        <button className="btn_success btn">Import ZIP Archive</button>
      </div>
    </form>

    <form
      onSubmit={this.onCustomSubmit}
      method="post"
      className="admin-updates admin-import p-4">
      <div className="admin-caption mt-1">
        Import Filtered App Settings in Archive
      </div>
      <input type="hidden"
             name="_token"
             value={_token}/>
      {/*<input type="file"*/}
      {/*       ref={this.inputCustomFile}*/}
      {/*       accept={'.zip,application/zip,application/x-zip,application/x-zip-compressed'}*/}
      {/*       name="file"*/}
      {/*       required/>*/}
      <div className="admin-import__block">
        <FileInput
          inputProps={{accept: ".zip,application/zip,application/x-zip,application/x-zip-compressed", name: "file", ref: this.inputCustomFile, onChange: this.addCustomFile}}
          className="admin-updates__inputFile"
          text={this.state.fileCustomName || "Choose file..."}
        />
        <button className="btn_success btn">Import ZIP Archive (JSON)</button>
      </div>
    </form></div>
  }
}

export default Import
