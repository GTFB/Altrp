import Resource from "../../../../editor/src/js/classes/Resource";

class Import extends Component {
  constructor(props) {
    super(props);
    this.inputFile = React.createRef();
    this.inputCustomFile = React.createRef();
    this.resource = new Resource({route:'/admin/ajax/import/settings'});
    this.custom_resource = new Resource({route:'/admin/ajax/import/custom_settings'});
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

    return <div><form
                 onSubmit={this.onSubmit}
                 method="post"
                 className="admin-updates p-4">
      <div className="admin-caption mt-1">
        Export All App Settings in Archive
      </div>
      <input type="hidden"
             name="_token"
             value={_token}/>
      <input type="file"
             ref={this.inputFile}
             accept={'.zip,application/zip,application/x-zip,application/x-zip-compressed'}
             name="file"
             required/>
      <button className="btn_success btn">Import ZIP Archive</button>
    </form>

    <form
      onSubmit={this.onCustomSubmit}
      method="post"
      className="admin-updates p-4">
      <div className="admin-caption mt-1">
        Export All App Settings in Archive
      </div>
      <input type="hidden"
             name="_token"
             value={_token}/>
      <input type="file"
             ref={this.inputCustomFile}
             accept={'.zip,application/zip,application/x-zip,application/x-zip-compressed'}
             name="file"
             required/>
      <button className="btn_success btn">Import ZIP Archive (JSON)</button>
    </form></div>
  }
}

export default Import
