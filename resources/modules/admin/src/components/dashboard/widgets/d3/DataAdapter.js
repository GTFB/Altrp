import { getDataByPath } from "../../../../../../front-app/src/js/helpers";
import axios from "axios";
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
    let string = "";
    if (typeof parameters !== "undefined") {
      string = _.keys(parameters)
        .map((param, index) => {
          if (typeof parameters[param] !== "undefined")
            return `${param}=${parameters[param]}`;
        })
        .filter(item => typeof item !== "undefined")
        .join("&");
    }
    return string;
  }

  async getDataWithParams(datasource, key, dataKey, params) {
    const url = datasource.getWebUrl();
    let localParams = this.parseSourceParams(datasource.params);
    let parameters = this.queryString(params) + "&" + localParams;
    parameters = Array.from(new Set(parameters.split("&"))).join("&");
    const sendUrl = url + parameters;
    try {
      const req = await axios(sendUrl);
      let returnData = [];
      if (typeof req.data.data !== "undefined") {
        let tempData = _.uniqBy(req.data.data, key);
        returnData =
          tempData.map(d => {
            let currentKey = _.get(d, key);
            const keyFormatted = isNaN(Date.parse(currentKey))
              ? currentKey
              : new Date(currentKey);
            return {
              data: Number(_.get(d, dataKey)),
              key: keyFormatted
            };
          }) || [];
      } else if (typeof req.data !== "undefined") {
        let tempData = _.uniqBy(req.data, key);
        returnData =
          tempData.map(d => {
            let currentKey = _.get(d, key);
            const keyFormatted = isNaN(Date.parse(currentKey))
              ? currentKey
              : new Date(currentKey);
            return {
              data: Number(_.get(d, dataKey)),
              key: keyFormatted
            };
          }) || [];
      }
      return returnData;
    } catch (error) {
      // console.error(error);
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
            data: Number(_.get(d, data)),
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

  /**
   *
   * @param Array sources
   * @param Object storeParams
   * @param Object widgetParams
   * @param Number countRequest
   * @return Promise;
   * */
  async parseData(sources, storeParams, widgetParams, countRequest) {
    //возвращаемые значения
    let data = [];
    const isMultiple = _.keys(sources).length > 1; //проверка данных на несколько исчтоников
    let needCallAgain = true; //проверка на повторный вызов http запроса
    let isDate = true; //проверка на формат ключа

    //Обработка параметров
    const globalParams = _.cloneDeep(storeParams, []);
    const globalParamsArray = _.keys(globalParams)
      .map(param => {
        return { [param]: globalParams[param] };
      })
      .filter(param => {
        let key = _.keys(param)[0];
        return param[key] !== "";
      });
    const localParams = _.cloneDeep(widgetParams, []);
    const paramsResult = localParams.concat(globalParamsArray);

    if (_.keys(sources).length > 0) {
      //Если источник данных один, то возвращаем данные только по нему
      if (!isMultiple) {
        let source = sources[0];
        if (_.keys(paramsResult).length > 0) {
          data = await this.adaptDataByPath(source, paramsResult);
        } else {
          data = await this.adaptDataByPath(source);
        }
      } else {
        // Если несколько истчочников данных, то делаем запросы по каждому
        data = await this.getDataFromIterableDatasources(sources, paramsResult);
      }

      let dates = [];
      let resultDates = [];

      //Если больше одного источника, проверяем вложенные данные
      if (isMultiple) {
        let matches = data.map(obj => {
          if (_.keys(obj).length > 0) {
            return obj.data.length > 0;
          }
          return _.keys(obj).length > 0;
        });
        //Если во вложениях есть пустые данные, то вызываем запрос данных снова
        needCallAgain = _.includes(matches, false);
        if (!needCallAgain) {
          //В противном случае проверяем ключи на формат даты
          dates = data.map(obj => {
            return obj.data.map(item => item.key instanceof Date);
          });
          dates.forEach(array => (resultDates = resultDates.concat(array)));
          resultDates = _.uniq(resultDates);
          //Если хотя бы в одном из истчоников нет ключа по дате, то возвращаем ложь
          isDate = _.includes(resultDates, false) === true ? false : true;
        }
      } else {
        //Если один источник, проверяем данные в нём
        needCallAgain = _.keys(data).length === 0 && countRequest < 5;
        dates = data.map(obj => {
          return obj.key instanceof Date;
        });
        dates = _.uniq(dates);
        isDate = _.includes(dates, false) === true ? false : true;
      }
      return {
        data: data,
        isMultiple: isMultiple,
        isDate: isDate,
        needCallAgain: needCallAgain
      };
    }

    return {
      data: [],
      isMultiple: isMultiple,
      isDate: isDate,
      needCallAgain: needCallAgain
    };
  }

  async getDataFromIterableDatasources(sources, paramsResult = {}) {
    return Promise.all(
      sources.map(async source => {
        let dataArray = [];
        if (_.keys(paramsResult).length > 0) {
          dataArray = await new DataAdapter().adaptDataByPath(
            source,
            paramsResult
          );
        } else {
          dataArray = await new DataAdapter().adaptDataByPath(source);
        }
        if (_.keys(dataArray).length === 0) {
          return [];
        }
        const multipleDataArray = _.uniq(
          _.sortBy(
            dataArray.map((item, index) => {
              return {
                data: item.data,
                key: item.key,
                id: index
              };
            }),
            "key"
          ),
          "key"
        );
        return {
          key: source.title || source.path,
          data: multipleDataArray
        };
      })
    );
  }
}

export default DataAdapter;
