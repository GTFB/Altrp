/**
 * @class AltrpFile
 */
class AltrpFile extends AltrpModel{
  constructor(data) {
    if(data instanceof File){
      data = {file: data}
    }
    super(data);
    if(data.file.type.indexOf('image') >= 0){
      const reader = new FileReader
      reader.onload = ()=>{
        this.setProperty('dataAsUrl', reader.result)
      }
      reader.readAsDataURL(data.file)
    }
  }

  /**
   * @return {File}
   */
  getFile(){
    return this.getProperty('file')
  }
  getFileName(){
    return this.getFile()?.name || ''
  }

  /**
   *
   * @param mbImage
   * @returns {*}
   */
  toString(mbImage = 1){
    return this.getFileName()
  }
}

export default AltrpFile
