import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import Media from "App/Models/Media";
import empty from "../../../../helpers/empty";
import base_path from "../../../../helpers/base_path";
import fs from 'fs'
import path from 'path'
import { string } from '@ioc:Adonis/Core/Helpers'
import User from "App/Models/User";
import is_array from "../../../../helpers/is_array";
import CategoryObject from "App/Models/CategoryObject";
import storage_path from "../../../../helpers/storage_path";

export default class MediaController {
  private static fileTypes: any;
  async index({response, request}: HttpContextContract) {
    let query = Media.query().whereNull('deleted_at')
    let categories = request.qs().categories;
    let type = request.qs().type;

    if (!categories) {
      categories = []
    } else {
      categories = categories.split(',')
    }

    if (type) {
      if (type === 'other') {
        query.where(query => {
          query.where('type', type).orWhereNull('type')
        })
      } else {
        query.where('type', type)
      }
    }

    if( ! empty(categories)){
      query.leftJoin('altrp_category_objects', 'altrp_category_objects.object_guid', '=', 'altrp_media.guid')
        .whereIn('altrp_category_objects.category_guid', categories)
    }

    let media:any[] = await (query.orderBy('id').select('altrp_media.*').preload('categories'))


    media = media.map(model => {
      return model.serialize()
    })

    return response.json(media)
  }

  public static  getFileTypes() {
    if (!MediaController.fileTypes) {
      let fileTypes = fs.readFileSync(base_path('config/file-types.json'), {encoding:'utf8'});
      fileTypes = JSON.parse(fileTypes);
      MediaController.fileTypes = fileTypes;
    }
    return MediaController.fileTypes;
  }
  static getTypeForFile(file){

    let extensionLoaded = file.extname.split('.').pop();

    let type = '';
    let file_types = MediaController.getFileTypes();
    for (let file_type of file_types ){
      if( ( ! type ) &&   file_type.extensions.indexOf(extensionLoaded) !== -1 ){
        type = file_type.name;
      }
    }
    if( ! type ){
      type = 'other';
    }
    return type;
  }

  store({response, request, auth}: HttpContextContract){
    const user: User|null = auth.user
    if(! user){
      return response.status(403).json({success: false, 'not allwed'})
    }
    const files = request.files('files')
    const ext = file.extname.split('.').pop()
    let res:Media[] = []
    for(let file of files){
      let media = new Media();
      media.title = file.clientName;
      media.media_type = file.type || '';
      media.author = user.id;
      media.type = MediaController.getTypeForFile( file );
      const date = new Date
      let filename = string.generateRandom(40) + '.' + ext
      media.filename = storage_path('public/media/' +
        date.getFullYear() + '/' +
        (date.getMonth() + 1)  +'/'+ filename)
        await file.moveToDisk( 'media/' +  date.getFullYear() + '/' + (date.getMonth() + 1) +,
        {name : filename}, 'local' );

      if (ext == "heic") {
        media.title = file.clientName.split('.')[0] . '.jpg';
        media.media_type = "image/jpeg";
        media.type = "image";
        media.filename = self::storeHeicToJpeg( file );
      }

      _path = Storage::path( 'public/' . media.filename );
      ext = pathinfo( _path, PATHINFO_EXTENSION );
      if( ext === 'svg' ){
        $svg = file_get_contents( _path );
        $svg = simplexml_load_string( $svg );
        media.width = ( string ) data_get( $svg.attributes(), 'width', 150 );
        media.height = ( string ) data_get( $svg.attributes(), 'height', 150 );
      } else {
        $size = getimagesize( _path );
        media.width = data_get( $size, '0', 0 );
        media.height = data_get( $size, '1', 0 );
      }

      media.main_color = getMainColor( _path );
      media.url =  Storage::url( media.filename );
      media.guid = (string)Str::uuid();
      media.save();

      const categories = request.input( '_categories' );
      if( is_array(categories) && categories.length > 0 && media.guid){
        let insert:any[] = [];
        for(let category of categories ){
          insert.push( {
            category_guid: category['value'],
            object_guid: media.guid,
            object_type: "Media"
          });
        }
        await CategoryObject.createMany(insert);
      }
      res.push(media)
    }
    res = res.reverse()
    return response.json( res );
  }
}
