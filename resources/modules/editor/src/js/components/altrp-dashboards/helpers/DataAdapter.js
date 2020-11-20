import { getDataByPath } from "../../../../../../front-app/src/js/helpers";
import axios from "axios";
import appStore from "../../../../../../front-app/src/js/store/store";
import format from "date-fns";
import ru from "date-fns/locale/ru";
//Класс для работы с репитером
//получает данные из источника и приводит их к указанному формату ключ->значение
class DataAdapter {
  //Передаем сюда репитер
  constructor(repeater) {
    this.repeater = repeater;
  }

  getAlias(path) {
    try {
      return path.split("altrpdata.")[1];
    } catch (error) {
      console.log(error);
    }
  }

  getDatasourceByPath(path) {
    return _.find(dataStorageUpdater.data.currentDataSources, o => {
      return o.data.alias === this.getAlias(path);
    });
  }

  queryString(params) {
    let data = _.values(params)
      .map((param, index) => {
        let key = encodeURIComponent(_.keys(param)[0]);
        let value = encodeURIComponent(param[key]);

        let result = "";
        if (index === 0) {
          if (param[key] === null) {
            result = `?`;
          } else {
            result = `?${key}=${value}`;
          }
        } else {
          if (param[key] === null) {
            result = ``;
          } else {
            result = `&${key}=${value}`;
          }
        }
        return result;
      })
      .join("");
    return data;
  }

  parseSourceParams(params) {
    let parameters = params;
    parameters.map(param => {
      console.log("====================================");
      console.log(param);
      console.log("====================================");
    });
  }

  async getDataWithParams(datasource, key, dataKey, params) {
    const url = datasource.getWebUrl();
    let localParams = this.parseSourceParams(datasource.params);
    const sendUrl = url + this.queryString(params);
    try {
      const req = await axios(sendUrl);
      const returnData =
        req.data.data.map(d => {
          return {
            data: _.get(d, dataKey),
            key: _.get(d, key)
          };
        }) || [];
      return returnData;
    } catch (error) {
      return [];
    }
  }

  async adaptDataByPath(datasourceObject, params = {}) {
    const { path, key, data } = datasourceObject;
    if (_.keys(params).length > 0) {
      const datasource = this.getDatasourceByPath(path);
      if (typeof datasource !== "undefined") {
        return await this.getDataWithParams(datasource, key, data, params);
      }
    }
    try {
      let dataArray = getDataByPath(path, []);
      if (dataArray.length > 0) {
        //Исключаем дублирование ключей, т.к. это приводит к ошибкам рендера всех диаграм
        dataArray = _.uniqBy(dataArray, key);
        dataArray = dataArray.map(d => {
          let currentKey = _.get(d, key);
          const keyFormatted = isNaN(Date.parse(currentKey))
            ? currentKey
            : new Date(currentKey);
          return {
            data: _.get(d, data),
            key: keyFormatted,
            source: datasourceObject.title || datasourceObject.path
          };
        });
        if (datasourceObject.splitTo && datasourceObject.splitFrom) {
          dataArray = dataArray.slice(
            datasourceObject.splitFrom,
            datasourceObject.splitTo
          );
        }
      }
      return dataArray;
    } catch (error) {
      console.log("ADAPTER ERROR =>", error);
    }
  }
}

export default DataAdapter;
