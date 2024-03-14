import { parseString } from "xml2js";
import {DateTime} from 'luxon'
import axios from 'axios'
import path from 'path'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column, computed, ManyToMany, manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Category from "App/Models/Category";
import changeFileExtension from "../../helpers/string/changeFileExtension";
import guid from "../../helpers/guid";
import public_path from "../../helpers/path/public_path";
import MediaController from "App/Controllers/Http/admin/MediaController";
import transliterate from "../../helpers/transliterate";
import fs from "fs";
import convert from "lodash/fp/convert";
import data_get from "../../helpers/data_get";
import imageSize from "image-size";
export default class Media extends BaseModel {

  public static table = 'altrp_media'

  @column({isPrimary: true})
  public id: number

  @column()
  public soft_deletes: boolean

  @column()
  public time_stamps: boolean

  @column()
  public filename: string

  @column()
  public url: string

  @column()
  public media_type: string | null

  @column()
  public media_variation: string

  @column()
  public type: string

  @column()
  public author: number | null

  @column()
  public title: string

  @column()
  public  alternate_text: string

  @column()
  public caption: string

  @column()
  public description: string

  @column()
  public main_color: string

  @column()
  public guest_token: string

  @column()
  public guid: string

  @column()
  public width: number

  @column()
  public height: number

  @belongsTo(() => User, {
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({autoCreate: true})
  public createdAt: DateTime

  @column.dateTime({autoCreate: true, autoUpdate: true})
  public updatedAt: DateTime

  @manyToMany(() => Category, {
    pivotTable: 'altrp_category_objects',
    relatedKey: 'guid',
    localKey: 'guid',
    pivotForeignKey: 'object_guid',
    pivotRelatedForeignKey: 'category_guid',
  })
  public categories: ManyToMany<typeof Category>

  @computed()
  get absolute_path() {
    return public_path(`/storage${this.filename}`)
  }
  @computed()
  get webp_url() {
    return changeFileExtension(this.url || '', 'webp')
  }
  @computed()
  get thumbnail_url(): string {
    return this.getPathVariation(150, 150)
  }
  @computed()
  get card_url(): string {
    return this.getPathVariation(300, 300)
  }
  @computed()
  get good_url(): string {
    return this.getPathVariation(600, 600)
  }
  @computed()
  get standard_url(): string {
    return this.getPathVariation(1600, 1080)
  }
  @computed()
  get thumbnail_webp_url(): string {
    return changeFileExtension(this.getPathVariation(150, 150), 'webp')
  }
  @computed()
  get card_webp_url(): string {
    return changeFileExtension(this.getPathVariation(300, 300), 'webp')
  }
  @computed()
  get good_webp_url(): string {
    return changeFileExtension(this.getPathVariation(600, 600), 'webp')
  }
  @computed()
  get standard_webp_url(): string {
    return changeFileExtension(this.getPathVariation(1600, 1080), 'webp')
  }

  static async _import(
    {
      data,
      filename,
      user_id,
      ignoreRenaming,
      fileUrl,
      media_type,
      encoding,
    }: ImportType
  ):Promise<Media>{
    let media = new Media();
    const date = new Date();
    const ext = filename.split(".").pop();

    let title: string[]| string = filename.split(".");
    title.pop();
    title = title.join('');
    title = transliterate(title)
    // @ts-ignore
    title = title.substring(0, 36)
    title = title + '_' + (new Date().valueOf())
    if(! ignoreRenaming){
      filename = title + "." + ext;
    }



    let urlBase =
      "/media/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/";

    if (!fs.existsSync(public_path("/storage" + urlBase))) {
      fs.mkdirSync(public_path("/storage" + urlBase), { recursive: true });
    }
    let dirname = ("/storage" + urlBase);
    media.filename = urlBase + filename;
    media.title = filename
    media.guid = guid()
    media.type = MediaController.getTypeForFile(filename);
    //media.media_type = file.type || "";
    media.author = user_id;
    //const

    let content:string|Buffer = ''
    if(data){
      content = data
      media.media_type = media_type || null
      // @ts-ignore
      content = Buffer.from(content, encoding || 'binary');
    } else if(fileUrl){
      const response = await  axios.get(fileUrl,{ responseType: 'arraybuffer' })
      content = response.data
      media.media_type = response.headers['content-type']?.split('/')[0] || ''
    }
    // @ts-ignore
    fs.writeFileSync(public_path(dirname + filename), content);
    //let content = fs.readFileSync(public_path(dirname + filename));
    if (ext == "heic") {
      media.title = media.title.split(".")[0] + ".jpg";
      media.media_type = "image/jpeg";
      media.type = "image";
      content = convert({
        buffer: content,
        format: "JPEG",
        quality: 1,
      });
      fs.writeFileSync(public_path(dirname + filename), content);
    }

    if (ext === "svg") {
      let svg = content;
      svg = parseString(svg);
      media.width = data_get(svg, "$.width", 150);
      media.height = data_get(svg, "$.height", 150);
    } else {
      let dimensions;
      try {
        dimensions = imageSize(content);
      } catch (e) {}
      media.width = data_get(dimensions, "width", 0);
      media.height = data_get(dimensions, "height", 0);
    }
    media.main_color = "";
    media.url = "/storage" + urlBase + filename;
    await media.save();
    return media

  }

  static async importFromString(importData:ImportType):Promise<Media>{
    return Media._import(importData)
  }

  static async importFromUrl(fileUrl: string| object, filename: string, user_id: number, ignoreRenaming = false):Promise<Media>{
    if( typeof fileUrl === 'object'){
      // @ts-ignore
      return Media._import(fileUrl)
    }
    return Media._import({
      fileUrl,
      filename,
      user_id,
      ignoreRenaming
    })
  }

  private getPathVariation(width, height): string {

    const url = this.url
    const parts = url.split('/');
    const originalFileName = parts[5];
    const ext = originalFileName.split('.').pop();
    //const folder = base_path(`/public/${url.replace(originalFileName, '')}`)
    const requestedFileName = originalFileName.split('.')[0]+'_'+width+'x'+height+'.'+ext;

    //var files: any[] = []
    //files = fs.readdirSync(folder).filter(fn => fn.startsWith(requestedFileName));

    const requestedPath = url.replace(originalFileName, requestedFileName);

    return requestedPath

    // if (files.length > 0) {
    //   return requestedPath
    // }
    // else {
    //   files = fs.readdirSync(folder).filter(fn => fn.startsWith(originalFileName.split('.')[0]));
    // }
    //
    // if (files.length > 0) {
    //   const originalPath = folder+originalFileName
    //
    //   if (fs.existsSync(originalPath)){
    //
    //     const searchFilename = folder+requestedFileName
    //     const dimensions: any = sizeOf(originalPath)
    //     var targetAspectRatio = height / width;
    //     var sourceAspectRatio = dimensions.height / dimensions.width;
    //
    //     if (targetAspectRatio == 1) {
    //       if (dimensions.width > dimensions.height) {
    //         height = Math.round(height*(dimensions.height/dimensions.width));
    //       }
    //       if (dimensions.width < dimensions.height) {
    //         width = Math.round(width*(dimensions.width/dimensions.height));
    //       }
    //     } else if(targetAspectRatio < 1 && targetAspectRatio > sourceAspectRatio) {
    //       height = Math.round(width * sourceAspectRatio);
    //     } else if(targetAspectRatio < 1 && targetAspectRatio < sourceAspectRatio){
    //       width = Math.round(height * sourceAspectRatio);
    //     }
    //
    //     if(ext == 'webp'){
    //       if (width > 0 && height > 0) {
    //         sharp(originalPath).toFormat('webp').resize(width, height).toFile(searchFilename);
    //       } else {
    //         sharp(originalPath).toFormat('webp').toFile(searchFilename);
    //       }
    //       return requestedPath
    //     } else if(width > 0 && height > 0) {
    //       sharp(originalPath).resize(width, height).toFile(searchFilename);
    //       return requestedPath
    //     }
    //   }
    // }
    // return '';
  }

  async moveToFolder(dirname: string){
    if(! dirname){
      return
    }

    if (! fs.existsSync(public_path(dirname))) {

      fs.mkdirSync(public_path(dirname), {recursive: true})
    }

    const newPath = this.url.replace(path.dirname(this.url), dirname)
    fs.renameSync(public_path(newPath), public_path(this.url))
    this.url = newPath
    await this.save()
  }
}
interface ImportType{
  data?: string,
  fileUrl?: string,
  filename: string,
  user_id: number,
  ignoreRenaming?: boolean,
  media_type?: string,
  encoding?:string,
}
