import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Media from "App/Models/Media";
import empty from "../../../../helpers/empty";
import base_path from "../../../../helpers/path/base_path";
import fs from "fs";
import User from "App/Models/User";
import is_array from "../../../../helpers/is_array";
import CategoryObject from "App/Models/CategoryObject";
import imageSize from "image-size";
import convert from "heic-convert";
import { parseString } from "xml2js";
import data_get from "../../../../helpers/data_get";
import guid from "../../../../helpers/guid";
import public_path from "../../../../helpers/path/public_path";
import Logger from "@ioc:Adonis/Core/Logger";
import Application from "@ioc:Adonis/Core/Application";
import LIKE from "../../../../helpers/const/LIKE";
import { transliterate } from "../../../../helpers/transliterate";
import sharp from 'sharp';
import sizeOf from 'image-size';

export default class MediaController {
  private static fileTypes: any;
  async index({ response, request }: HttpContextContract) {
    const params = request.qs();
    const page = parseInt(params.page);
    const pageSize = parseInt(params.pageSize);
    const searchWord = params.s;
    let media;
    const mediaToUpdate = await Media.query().whereNull("guid").select("*");
    await Promise.all(
      mediaToUpdate.map(async (m: Media) => {
        m.guid = guid();
        await m.save();
        Logger.info(`Media id ${m.id} guid write!`);
      })
    );
    let query = Media.query().whereNull("deleted_at");
    let categories = params.categories;
    let type = params.type;

    if (!categories) {
      categories = [];
    } else {
      categories = categories.split(",");
    }

    if (type) {
      if (type === "other") {
        query.where((query) => {
          query.where("type", type).orWhereNull("type");
        });
      } else {
        query.where("type", type);
      }
    }

    if (!empty(categories)) {
      query
        .leftJoin(
          "altrp_category_objects",
          "altrp_category_objects.object_guid",
          "=",
          "altrp_media.guid"
        )
        .whereIn("altrp_category_objects.category_guid", categories);
    }
    let count;
    let pageCount = 1;
    if (pageSize && page) {
      media = await query
        .orderBy("id", "desc")
        .select("altrp_media.*")
        .preload("categories")
        .where("title", LIKE, `%${searchWord}%`)
        .paginate(page, pageSize);
      count = media.getMeta().total;
      pageCount = media.getMeta().last_page;

      media = media.all().map((model) => {
        return model.serialize();
      });
    } else {
      media = await query
        .orderBy("id", "desc")
        .select("altrp_media.*")
        .preload("categories");
      count = media.length;

      media = media.map((model) => {
        return model.serialize();
      });
    }

    if (type) {
      for (const media_item of media) {

        if (type === "image") {

          var width = 150
          var height = 150
          var originalFileName = base_path(`/public${media_item.url}`)
          var ext = media_item.url.split('.').pop();
          var fileName = media_item.url.split('.'+ext)[0];
          
          media_item.url = `${fileName}_${width}x${height}.${ext}`
          
          var searchFilename = base_path('/public'+media_item.url);

          if (await fs.existsSync(originalFileName)){
            if (!await fs.existsSync(base_path(`/public${media_item.url}`))){
              
              const dimensions = sizeOf(originalFileName)

              if (dimensions.width > dimensions.height) {
                height = Math.round(height*(dimensions.height/dimensions.width));
              }
              if (dimensions.width < dimensions.height) {
                width = Math.round(width*(dimensions.width/dimensions.height));
              }
              await sharp(originalFileName).resize(width, height).toFile(searchFilename);
            }
          }
        }
      }
    }

    return response.json({
      count,
      pageCount,
      media,
    });
  }

  async getById({ params, response }: HttpContextContract) {
    const id = params.id;
    let media;
    const mediaToUpdate = await Media.query()
      .where("id", "=", id)
      .whereNull("guid")
      .select("*");
    await Promise.all(
      mediaToUpdate.map(async (m: Media) => {
        m.guid = guid();
        await m.save();
        Logger.info(`Media id ${m.id} guid write!`);
      })
    );
    let query = Media.query().where("id", "=", id).whereNull("deleted_at");
    let categories = params.categories;
    let type = params.type;

    if (!categories) {
      categories = [];
    } else {
      categories = categories.split(",");
    }

    if (type) {
      if (type === "other") {
        query.where((query) => {
          query.where("type", type).orWhereNull("type");
        });
      } else {
        query.where("type", type);
      }
    }

    if (!empty(categories)) {
      query
        .leftJoin(
          "altrp_category_objects",
          "altrp_category_objects.object_guid",
          "=",
          "altrp_media.guid"
        )
        .whereIn("altrp_category_objects.category_guid", categories);
    }

    media = await query
      .orderBy("id", "desc")
      .select("altrp_media.*")
      .preload("categories");

    media = media.map((model) => {
      return model.serialize();
    });

    media = media[0];

    return response.json(media);
  }

  async updateMedia({ response, request }: HttpContextContract) {
    const id = request.all().id;
    const mediaToUpdate = await Media.find(id);
    if (!mediaToUpdate) {
      response.status(404);
      return response.json({
        success: false,
        message: "Media not found",
      });
    }
    try {
      mediaToUpdate.merge(request.all());
      await mediaToUpdate.save();
    } catch (e) {
      console.error(e);
    }
    return response.json(mediaToUpdate);
  }

  public static getFileTypes() {
    if (!MediaController.fileTypes) {
      let fileTypes = fs.readFileSync(base_path("config/file-types.json"), {
        encoding: "utf8",
      });
      fileTypes = JSON.parse(fileTypes);
      MediaController.fileTypes = fileTypes;
    }
    return MediaController.fileTypes;
  }
  static getTypeForFile(file) {
    let extensionLoaded = file.extname.split(".").pop();

    let type = "";
    let file_types = MediaController.getFileTypes();
    for (let file_type of file_types) {
      if (!type && file_type.extensions.indexOf(extensionLoaded) !== -1) {
        type = file_type.name;
      }
    }
    if (!type) {
      type = "other";
    }
    return type;
  }

  async store({ response, request, auth }: HttpContextContract) {
    // @ts-ignore
    const user: User | null = auth.user;
    if (!user) {
      return response
        .status(403)
        .json({ success: false, message: "not allowed" });
    }
    const files = request.allFiles().files || [];
    let res: Media[] = [];
    // @ts-ignore
    for (let file of files) {
      if (!file) {
        continue;
      }
      // @ts-ignore
      const ext = file.extname.split(".").pop();
      let media = new Media();
      media.title = file.clientName;
      media.media_type = file.type || "";
      media.author = user.id;
      media.type = MediaController.getTypeForFile(file);
      media.guid = guid();
      const date = new Date();

      let title = transliterate(file.clientName).split(".");

      title.pop();

      title = title.join();

      let filename = title + "." + ext;

      let urlBase =
        "/media/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/";
      let dirname = public_path("/storage" + urlBase);

      if (fs.existsSync(dirname + filename)) {
        filename = title + "_" + new Date().valueOf() + "." + ext;
      }

      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
      }
      media.filename = urlBase + filename;

      // @ts-ignore
      await file.moveToDisk(dirname, { name: filename }, "local");
      let content = fs.readFileSync(dirname + filename);

      if (ext == "heic") {
        media.title = file.clientName.split(".")[0] + ".jpg";
        media.media_type = "image/jpeg";
        media.type = "image";
        content = convert({
          buffer: content,
          format: "JPEG",
          quality: 1,
        });
        fs.writeFileSync(dirname + filename, content);
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

      const categories = request.input("_categories");
      if (is_array(categories) && categories.length > 0 && media.guid) {
        let insert: any[] = [];
        for (let category of categories) {
          insert.push({
            category_guid: category["value"],
            object_guid: media.guid,
            object_type: "Media",
          });
        }
        await CategoryObject.createMany(insert);
      }
      res.push(media);
    }
    res = res.reverse();
    return response.json(res);
  }

  async store_from_frontend({ response, request, auth }: HttpContextContract) {
    // @ts-ignore
    const user: User | null = auth.user;
    const files = request.allFiles().files || [];
    let res: Media[] = [];
    for (let file of files) {
      if (!file) {
        continue;
      }
      // @ts-ignore
      const ext = file.extname.split(".").pop();
      let media = new Media();
      media.title = file.clientName;
      media.media_type = file.type || "";
      if (user) {
        media.author = user.id;
      } else {
        media.guest_token = request.csrfToken;
      }
      media.type = MediaController.getTypeForFile(file);
      media.guid = guid();
      const date = new Date();
      let filename = media.guid + "." + ext;
      let urlBase =
        "/media/" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/";
      let dirname = public_path("/storage" + urlBase);
      if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
      }
      media.filename = urlBase + filename;
      // @ts-ignore
      await file.moveToDisk(dirname, { name: filename }, "local");
      let content = fs.readFileSync(dirname + filename);

      if (ext == "heic") {
        media.title = file.clientName.split(".")[0] + ".jpg";
        media.media_type = "image/jpeg";
        media.type = "image";
        content = convert({
          buffer: content,
          format: "JPEG",
          quality: 1,
        });
        fs.writeFileSync(dirname + filename, content);
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

      const categories = request.input("_categories");
      if (is_array(categories) && categories.length > 0 && media.guid) {
        let insert: any[] = [];
        for (let category of categories) {
          insert.push({
            category_guid: category["value"],
            object_guid: media.guid,
            object_type: "Media",
          });
        }
        await CategoryObject.createMany(insert);
      }
      res.push(media);
    }
    res = res.reverse();
    return response.json(res);
  }

  async showFull({ params }) {
    const media = await Media.query()
      .where("id", parseInt(params.id))
      .firstOrFail();

    const serialized = media.serialize();

    const stats = fs.statSync(Application.publicPath(media.url));
    let mb = stats.size / (1024 * 1024);
    let unit = 'Mb'

    if (mb < 1) {
      mb = mb * 1024;
      unit = 'Kb'
    }

    const isFloat = !Number.isInteger(mb);

    if (isFloat) {
      //@ts-ignore
      mb = mb.toFixed(3);
    }

    serialized.filesize = mb + " " + unit;

    return serialized;
  }

  async show({ params, response }) {
    const path = `/storage/media/${params.year}/${params.month}/${params.name}`;

    let file;

    if (fs.existsSync(Application.publicPath(path))) {
      file = fs.readFileSync(Application.publicPath(path));
    }

    if (!file) {
      const media = await Media.query().where("url", path).first();

      if (media) {
        response.header("custom-label", media.title);
      }

      return file;
    } else {
      response.status(404);
      return {
        message: "file not found",
      };
    }
  }

  async destroy({ params, response }: HttpContextContract) {
    const media = await Media.find(params.id);
    if (!media) {
      return response
        .status(404)
        .json({ success: false, message: "Media not found" });
    }
    let filename = public_path("/storage" + media.filename);
    if (fs.existsSync(filename)) {
      fs.rmSync(filename);
    }

    await media?.delete();
    return response.json({ success: true });
  }

  async destroy_from_frontend({
    params,
    response,
    request,
    auth,
  }: HttpContextContract) {
    const { id } = params;
    const media = await Media.find(parseInt(id));
    if (!media) {
      response.status(404);
      return response.json({ success: false, message: "Media not found" });
    }
    const user = auth.user;
    if (!user && request.csrfToken !== media.guest_token) {
      response.status(403);
      return response.json({
        success: false,
        message: "Not Access to deleting media",
      });
    }
    //@ts-ignore
    if (user && !user.hasRole("admin") && user.id !== media.author) {
      response.status(403);
      return response.json({
        success: false,
        message: "Not Access to deleting media",
      });
    }

    let filename = public_path("/storage" + media.filename);
    if (fs.existsSync(filename)) {
      fs.rmSync(filename);
    }
    await media.delete();
    return response.json({ success: true });
  }
}
