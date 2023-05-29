import {DateTime} from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column, ManyToMany, manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User';
import Category from "App/Models/Category";
import fs from "fs";
import base_path from "../../helpers/path/base_path";
import sizeOf from 'image-size';
import sharp from 'sharp';

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
  public media_type: string

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

  public getThumbnail(): string {
    return this.getPathVariation(150, 150)
  }

  public getCard(): string {
    return this.getPathVariation(300, 300)
  }

  public getGood(): string {
    return this.getPathVariation(600, 600)
  }

  public getStandart(): string {
    return this.getPathVariation(1600, 1080)
  }

  private getPathVariation(width, height): string {
    
    const url = this.url
    const parts = url.split('/');
    const originalFileName = parts[5];
    const ext = originalFileName.split('.').pop();
    const folder = base_path(`/public/${url.replace(originalFileName, '')}`)
    const requestedFileName = originalFileName.split('.')[0]+'_'+width+'x'+height+'.'+ext;

    var files: any[] = []
    files = fs.readdirSync(folder).filter(fn => fn.startsWith(requestedFileName));

    const requestedPath = url.replace(originalFileName, requestedFileName);

    if (files.length > 0) {
      return requestedPath
    }
    else {
      files = fs.readdirSync(folder).filter(fn => fn.startsWith(originalFileName.split('.')[0]));
    }

    if (files.length > 0) {
      const originalPath = folder+originalFileName

      if (fs.existsSync(originalPath)){
        
        const searchFilename = folder+requestedFileName
        const dimensions: any = sizeOf(originalPath)
        var targetAspectRatio = height / width;
        var sourceAspectRatio = dimensions.height / dimensions.width;

        if (targetAspectRatio == 1) {
          if (dimensions.width > dimensions.height) {
            height = Math.round(height*(dimensions.height/dimensions.width));
          }
          if (dimensions.width < dimensions.height) {
            width = Math.round(width*(dimensions.width/dimensions.height));
          }
        } else if(targetAspectRatio < 1 && targetAspectRatio > sourceAspectRatio) {
          height = Math.round(width * sourceAspectRatio);
        } else if(targetAspectRatio < 1 && targetAspectRatio < sourceAspectRatio){
          width = Math.round(height * sourceAspectRatio);
        }

        if(ext == 'webp'){
          if (width > 0 && height > 0) {
            sharp(originalPath).toFormat('webp').resize(width, height).toFile(searchFilename);
          } else {
            sharp(originalPath).toFormat('webp').toFile(searchFilename);
          }
          return requestedPath
        } else if(width > 0 && height > 0) {
          sharp(originalPath).resize(width, height).toFile(searchFilename);
          return requestedPath
        }
      }
    }
    return '';
  }

}
