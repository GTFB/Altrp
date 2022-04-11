import app_path from "../../helpers/app_path";
import fs from "fs";

export default class Other {
  public static directory = app_path('/AltrpOther/')

  constructor() {
    if (!fs.existsSync(Other.directory)){
      fs.mkdirSync(Other.directory);
    }
  }

  update(name, value) {
    if (!fs.existsSync(Other.directory + name + ".json")){
      fs.appendFileSync(Other.directory + name + ".json", JSON.stringify(value));
    } else {
      fs.writeFileSync(Other.directory + name + ".json", JSON.stringify(value))
    }
  }

  get(name, defaultValue) {
    let value = defaultValue
    if(!fs.existsSync(Other.directory + name + ".json")) {
      return value
    }

    const file = fs.readFileSync(Other.directory + name + ".json");

    return JSON.parse(file.toString())
  }
}

export const other = new Other()
