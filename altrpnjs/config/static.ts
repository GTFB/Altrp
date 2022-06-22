import { AssetsConfig } from '@ioc:Adonis/Core/Static'

const staticConfig: AssetsConfig = {
  enabled: true,
  dotFiles: 'ignore',
  etag: true,
  lastModified: true,
  headers: ()=>{
    return {
        'Cache-Control': 'max-age=315360000'
    }
  }
}

export default staticConfig
