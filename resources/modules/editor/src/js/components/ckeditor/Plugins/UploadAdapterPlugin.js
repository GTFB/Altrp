import Resource from "../../../classes/Resource";

class UploadAdapter {
  constructor(props) {
    this.loader = props;
    this.resource = new Resource({ route: "/ajax/media" });
  }

  upload() {
    return new Promise((resolve, reject) => {
      this.loader.file.then(result => {
        this.resource.postFiles([result]).then(response => {
          resolve({
            default: response[0].url
          });
        });
      });
    });
  }
}

/**
 *
 * @param editor
 */
export default function UploadAdapterPlugin(editor) {
  console.log(editor)
  editor.plugins.get("FileRepository").createUploadAdapter = loader => {
    return new UploadAdapter(loader);
  };
}
