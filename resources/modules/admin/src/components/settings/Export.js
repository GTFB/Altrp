class Export extends Component {

  /**
   * Отрисовываем вкладку импорта админки
   */
  render() {
    return <div className="admin-updates p-4">
      <div className="admin-caption mt-1">
        Export All App Settings in Archive
      </div>
      <div>
        <a className="btn_success btn"
           href="/admin/ajax/downloads/settings"
        >Download ZIP Archive (JSON)</a>
      </div>
      <div className="mt-1">
        <a className="btn_success btn"
           href="/admin/ajax/downloads/stream_settings"
        >Download ZIP Archive (JSON Stream)</a>
      </div>
    </div>
  }
}

export default Export
