/**
 * @class AltrpFile
 */
class AltrpFile extends AltrpModel{
  constructor(data) {
    if(data instanceof File){
      data = {file: data}
    }
    if(! data.file instanceof File){
      throw new Error('Need a File instance in AltrpFile Constructor')
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
   *
   * @returns {Promise<AltrpFile>}
   */
  async storeFile(){
    try {
      let response = await AltrpFile.getResource().postFiles([this.getFile()])
      this.setProperty('media', response[0])
    }catch (e) {
      console.error(e);
    }
    return this
  }
  /**
   *
   * @returns {Promise<AltrpFile>}
   */
  async deleteFileFromStorage(){
    const id = this.getProperty('media.id');
    if(! id){
      return this
    }
    try {
      let response = await AltrpFile.getResource().delete(id)
      this.setProperty('media', null)
    }catch (e) {
      console.error(e);
    }
    return this
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
   * @returns {string}
   */
  toString(){
    return this.getFileName()
  }

  /**
   *
   * @returns {Resource}
   */
  static getResource(){
    if(! AltrpFile.resource){
      AltrpFile.resource = new window.altrpHelpers.Resource({route: '/ajax/media'})
    }
    return AltrpFile.resource
  }
}

export default AltrpFile
