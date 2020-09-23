class Export extends Component {

  /**
   * Отрисовываем вкладку импорта админки
   */
  render() {
    return <div className="admin-updates p-4">
      <div className="admin-caption mt-1">
        Export All App Settings in Archive
      </div>

      <a className="btn_success btn"
         href="/admin/downloads/settings"
      >Download ZIP Archive</a>
    </div>
  }
}

export default Export
