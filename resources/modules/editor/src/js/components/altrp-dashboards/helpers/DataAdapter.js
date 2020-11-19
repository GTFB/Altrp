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

  async getDataWithParams(datasource, key, dataKey, params) {
    let url = datasource.getWebUrl();
    let sendUrl = url + this.queryString(params);
    try {
      const req = await axios(sendUrl);
      let returnData = req.data.data.map(d => {
        return {
          data: _.get(d, dataKey),
          key: _.get(d, key)
        };
      });
      return returnData;
    } catch (error) {
      console.log("WITH PARAMS ERROR=>", error);
    }
  }

  async adaptDataByPath(datasourceObject, params = {}) {
    console.log("====================================");
    console.log(datasourceObject);
    console.log("====================================");
    const { path, key, data } = datasourceObject;
    if (_.keys(params).length > 0) {
      const datasource = this.getDataByPath(path);
      if (typeof datasource !== "undefined") {
        return await this.getDataWithParams(datasource, key, dataKey, params);
      }
    }
    try {
      let dataArray = getDataByPath(path, []);
      console.log(path);
      if (dataArray.length > 0) {
        //Исключаем дублирование ключей, т.к. это приводит к ошибкам рендера всех диаграм
        dataArray = _.uniqBy(dataArray, key);
        dataArray = dataArray.map(d => {
          let currentKey = _.get(d, key);
          const keyFormatted = isNaN(Date.parse(currentKey))
            ? currentKey
            : new Date(currentKey);
          return { data: _.get(d, data), key: keyFormatted };
        });
        if (datasourceObject.splitTo && datasourceObject.splitFrom) {
          dataArray = dataArray.slice(
            datasourceObject.splitFrom,
            datasourceObject.splitTo
          );
        }
        console.log(dataArray);
      }
      return dataArray;
    } catch (error) {
      console.log("ADAPTER ERROR =>", error);
    }
  }
}

export default DataAdapter;
