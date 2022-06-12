import { AssetsConfig } from '@ioc:Adonis/Core/Static'

const staticConfig: AssetsConfig = {
  enabled: true,
  dotFiles: 'ignore',
  etag: true,
  lastModified: true,
  headers: (path: string,)=>{
    if(path.indexOf('storage') > -1 && path.indexOf('media') > -1){
      return {
        'Cache-Control': '315360000'
      }
    }
    return {

    }
  }
}

export default staticConfig
