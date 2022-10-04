import { getDataByPath } from "../../../../../../front-app/src/js/helpers";
import { BAR, PIE, LINE, TABLE, POINT } from "../../widgetTypes";
import axios from "axios";
import moment from "moment";
//Класс для работы с репитером
//получает данные из источника и приводит их к указанному формату ключ->значение
const MAX_DATA_TO_SVG = 100;
class DataAdapter {
  constructor(diagramType, sources, storeParams, widgetParams, countRequest) {
    this.diagramType = diagramType;
    this.sources = sources;
    this.storeParams = storeParams;
    this.widgetParams = widgetParams;
    this.countRequest = countRequest;
  }
  /**
   * Вывод alias по пути датасурса
   */
  getAlias(path) {
    try {
      return path.split("altrpdata.")[1];
    } catch (error) {
      console.error(error);
    }
  }
  /**
   * Получение экземпляра Datasource по его пути
   * @param {*} path
   */
  getDatasourceByPath(path) {
    return _.find(dataStorageUpdater.data.currentDataSources, o => {
      return o.data.alias === this.getAlias(path);
    });
  }

  /**
   * Формирование строки с параметрами для URL
   * @param {*} params
   */
  queryString(params) {
    let data = _.values(params).map((param, index) => {
      let key = encodeURIComponent(_.keys(param)[0]);
      let value = encodeURIComponent(param[key]);
      let result = "";
      if (index === 0) {
        if (param[key] === null || param[key] == null) {
          result = ``;
        } else {
          result = `${key}=${value}`;
        }
      } else {
        if (param[key] === "" || param[key] == null) {
          result = ``;
        } else {
          result = `&${key}=${value}`;
        }
      }
      return result;
    });
    data = data.join("");
    return data;
  }

  /**
   * Преобразование параметров в массив
   * @param {*} params
   */
  parseSourceParams(params) {
    let string = "";
    if (typeof params !== "undefined") {
      string = _.keys(params)
        .map((param, index) => {
          if (typeof params[param] !== "undefined" || params[param] !== "")
            return `${param}=${params[param]}`;
        })
        .filter(item => {
          const value =
            item.split("=")[1] !== "undefined" ? item.split("=")[1] : "";
          return (
            typeof value !== "undefined" &&
            value !== "" &&
            value !== null &&
            value !== "null"
          );
        })
        .join("&");
    }
    return string;
  }

  selectFormatting(resultRequest, key, dataKey, keyIsDate) {
    let returnData = [];
    switch (this.diagramType) {
      case LINE:
        returnData = this.formatData(resultRequest, key, dataKey, keyIsDate);
        break;
      case POINT:
        returnData = this.formatData(resultRequest, key, dataKey, keyIsDate);
        break;
      case TABLE:
        returnData = this.formatData(resultRequest, key, dataKey, keyIsDate);
        break;
      case PIE:
        returnData = this.formatDataPie(resultRequest, key, dataKey, keyIsDate);
        break;
      case BAR:
        returnData = this.formatDataBar(resultRequest, key, dataKey, keyIsDate);
        break;
      default:
        break;
    }
    return returnData;
  }
  /**
   * Форматирование данных под Line,Table и Scatter
   * @param {*} array
   * @param {*} key
   * @param {*} dataKey
   */
  formatData(array, key, dataKey, keyIsDate = false) {
    return (
      array.map(d => {
        const currentKey = _.get(d, key);
        const keyFormatted = !moment(currentKey).isValid()
          ? currentKey
          : moment(currentKey).format("DD.MM.YYYY");
        return {
          y: Number(_.get(d, dataKey)),
          x: keyIsDate ? keyFormatted : currentKey
        };
      }) || []
    );
  }

  /**
   * Форматирование данных под Pie
   * @param {*} array
   * @param {*} key
   * @param {*} dataKey
   */
  formatDataPie(array, key, dataKey, keyIsDate = false) {
    return (
      array.map(d => {
        const currentKey = _.get(d, key);
        const keyFormatted = !moment(currentKey).isValid()
          ? currentKey
          : moment(currentKey).format("DD.MM.YYYY");
        return {
          value: Number(_.get(d, dataKey)),
          id: keyIsDate ? keyFormatted : currentKey
        };
      }) || []
    );
  }
  /**
   * Форматирование данных под Pie
   * @param {*} array
   * @param {*} key
   * @param {*} dataKey
   */
  formatDataBar(array, key, dataKey, keyIsDate = false) {
    return (
      array.map(d => {
        const currentKey = _.get(d, key);
        const keyFormatted = !moment(currentKey).isValid()
          ? currentKey
          : moment(currentKey).format("DD.MM.YYYY");
        return {
          key: keyIsDate ? keyFormatted : currentKey,
          value: Number(_.get(d, dataKey)),
          [keyFormatted]: Number(_.get(d, dataKey)),
          label: keyIsDate
            ? `${keyFormatted} (${Number(_.get(d, dataKey))})`
            : `${currentKey} (${Number(_.get(d, dataKey))})`
        };
      }) || []
    );
  }
  /**
   * Получение данных по web url датасорса для диаграмм типа Line,Table,Scatter
   * @param {*} datasource
   * @param {*} datasourceObject
   * @param {*} key
   * @param {*} dataKey
   * @param {*} params
   */
  async getDataWithParams(datasource, datasourceObject, key, dataKey, params) {
    const { path, title, keyIsDate } = datasourceObject;
    const datasourceTitle = title || path;
    const url = datasource.getWebUrl();
    const localParams = this.parseSourceParams(datasource.params);
    let parameters = this.queryString(params) + "&" + localParams;
    parameters = Array.from(new Set(parameters.split("&"))).join("&");
    const sendUrl = url + "?" + parameters;
    try {
      const req = await axios(sendUrl);
      const resultRequest =
        typeof req.data.data !== "undefined"
          ? _.uniqBy(req.data.data, key)
          : _.uniqBy(req.data, key);
      let returnData = this.selectFormatting(
        resultRequest,
        key,
        dataKey,
        keyIsDate
      );
      if (datasourceObject.splitTo && datasourceObject.splitFrom) {
        returnData = returnData.slice(
          datasourceObject.splitFrom,
          datasourceObject.splitTo
        );
      }
      return {
        id: datasourceTitle,
        data: returnData
      };
    } catch (error) {
      return [];
    }
  }
  /**
   * Получение данных по пути datasource для диаграмм Line,Table,Scatter
   * @param {*} datasourceObject
   * @param {*} params
   */
  async adaptDataByPath(datasourceObject, params = {}) {
    const { path, key, data, title, keyIsDate } = datasourceObject;
    const datasourceTitle = title || path;
    if (_.keys(params).length > 0) {
      const datasource = this.getDatasourceByPath(path);
      if (typeof datasource !== "undefined") {
        return await this.getDataWithParams(
          datasource,
          datasourceObject,
          key,
          data,
          params
        );
      }
    }
    try {
      let dataArray = getDataByPath(path, []);
      //на случай если приходит просто обект
      dataArray = Array.isArray(dataArray) ? dataArray : [dataArray];
      if (dataArray.length > 0) {
        //Исключаем дублирование ключей, т.к. это приводит к ошибкам рендера всех диаграм
        dataArray = _.uniqBy(dataArray, key);
        dataArray = this.selectFormatting(dataArray, key, data, keyIsDate);
        if (datasourceObject.splitTo && datasourceObject.splitFrom) {
          dataArray = dataArray.slice(
            datasourceObject.splitFrom,
            datasourceObject.splitTo
          );
        }
      }
      return [
        {
          id: datasourceTitle,
          data: dataArray
        }
      ];
    } catch (error) {
      console.log("ADAPTER ERROR =>", error);
    }
  }

  /**
   * Для Line, Table и Scatter
   * @return Promise;
   * */
  async parseData() {
    //возвращаемые значения
    let data = [];
    const isMultiple = _.keys(this.sources).length > 1; //проверка данных на несколько исчтоников
    let needCallAgain = true; //проверка на повторный вызов http запроса
    let isDate = true; //проверка на формат ключа
    let isLarge = false; //проверка на большие датасеты, большим считается с более, чем 50 элементами

    //Обработка параметров
    const globalParams = _.cloneDeep(this.storeParams, []);
    const globalParamsArray = _.keys(globalParams)
      .map(param => {
        return { [param]: globalParams[param] };
      })
      .filter(param => {
        let key = _.keys(param)[0];
        return param[key] !== "";
      });
    const localParams = _.cloneDeep(this.widgetParams, []);
    const paramsResult =
      typeof localParams !== "undefined" && typeof localParams !== "number"
        ? localParams.concat(globalParamsArray)
        : [].concat(globalParamsArray);
    if (_.keys(this.sources).length > 0) {
      //Если источник данных один, то возвращаем данные только по нему
      if (!isMultiple) {
        let source = this.sources[0];
        try {
          if (_.keys(paramsResult).length > 0) {
            data = await this.adaptDataByPath(source, paramsResult);
          } else {
            data = await this.adaptDataByPath(source);
          }
        } catch (error) {
          data = [];
        }
        // data = [data];
      } else {
        // Если несколько истчочников данных, то делаем запросы по каждому
        data = await this.getDataFromIterableDatasources(
          this.sources,
          paramsResult
        );
        data.forEach((item, index) => {
          data[index] = item[0];
        });
      }
      let dates = [];
      let resultDates = [];
      //Если больше одного источника, проверяем вложенные данные
      if (isMultiple) {
        let matches = data.map(obj => {
          if (_.keys(obj).length > 0) {
            if (!isLarge) {
              isLarge =
                typeof obj.data !== "undefined"
                  ? obj.data.length > MAX_DATA_TO_SVG
                  : false;
            }
            return typeof obj.data !== "undefined"
              ? obj.data.length > MAX_DATA_TO_SVG
              : false;
          } //Если хотя бы в одном из источников данных больше 50, то это большой датасет
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
        if (!Array.isArray(data)) {
          data = [data];
        }
        needCallAgain =
          typeof data[0] !== "undefined"
            ? _.keys(data[0].data).length === 0 && this.countRequest < 5
            : true;
        dates = data.map(obj => {
          if (!isLarge) {
            isLarge = obj.data.length > MAX_DATA_TO_SVG;
          }
          return obj.key instanceof Date;
        });
        dates = _.uniq(dates);
        isDate = _.includes(dates, false) === true ? false : true;
      }
      return {
        data: data,
        isMultiple: isMultiple,
        isDate: isDate,
        needCallAgain: needCallAgain,
        isLarge: isLarge
      };
    }

    return {
      data: [],
      isMultiple: isMultiple,
      isDate: isDate,
      needCallAgain: needCallAgain,
      isLarge: isLarge
    };
  }
  /**
   * Для Pie и Bar
   * @return Promise;
   * */
  async parseDataNotType() {
    //возвращаемые значения
    let data = [];
    const isMultiple = _.keys(this.sources).length > 1; //проверка данных на несколько исчтоников
    let needCallAgain = true; //проверка на повторный вызов http запроса
    let isDate = true; //проверка на формат ключа
    let isLarge = false; //проверка на большие датасеты, большим считается с более, чем 50 элементами

    //Обработка параметров
    const globalParams = _.cloneDeep(this.storeParams, []);
    const globalParamsArray = _.keys(globalParams)
      .map(param => {
        return { [param]: globalParams[param] };
      })
      .filter(param => {
        let key = _.keys(param)[0];
        return param[key] !== "";
      });
    const localParams = _.cloneDeep(this.widgetParams, []);
    const paramsResult =
      typeof localParams !== "undefined" && typeof localParams !== "number"
        ? localParams.concat(globalParamsArray)
        : [].concat(globalParamsArray);
    if (_.keys(this.sources).length > 0) {
      //Если источник данных один, то возвращаем данные только по нему
      if (!isMultiple) {
        let source = this.sources[0];
        if (_.keys(paramsResult).length > 0) {
          data = await this.adaptDataByPath(source, paramsResult);
        } else {
          data = await this.adaptDataByPath(source);
        }
        data = typeof data === "object" && _.keys(data) === 0 ? [] : data;
      } else {
        // Если несколько истчочников данных, то делаем запросы по каждому
        data = await this.getDataFromIterableDatasources(
          this.sources,
          paramsResult
        );
        data.forEach((item, index) => {
          data[index] = item[0];
        });
      }

      let dates = [];
      let resultDates = [];

      //Если больше одного источника, проверяем вложенные данные
      if (isMultiple) {
        let matches = data.map(obj => {
          if (_.keys(obj).length > 0) {
            if (!isLarge) {
              isLarge = obj.length > MAX_DATA_TO_SVG;
            }
            return obj.length > 0;
          } //Если хотя бы в одном из источников данных больше 50, то это большой датасет
          return _.keys(obj).length > 0;
        });
        //Если во вложениях есть пустые данные, то вызываем запрос данных снова
        needCallAgain = _.includes(matches, false);
        if (!needCallAgain) {
          //В противном случае проверяем ключи на формат даты
          dates = data.map(obj => {
            return obj.map(item => item.key instanceof Date);
          });
          dates.forEach(array => (resultDates = resultDates.concat(array)));
          resultDates = _.uniq(resultDates);
          //Если хотя бы в одном из истчоников нет ключа по дате, то возвращаем ложь
          isDate = _.includes(resultDates, false) === true ? false : true;
        }
      } else {
        let matches =
          data.length > 0 ? data.map(obj => obj.length > 0) : [false];
        //Если во вложениях есть пустые данные, то вызываем запрос данных снова
        needCallAgain = _.includes(matches, false) && this.countRequest < 5;
        //Если один источник, проверяем данные в нём
        dates =
          data.length > 0
            ? data.map(obj => {
                if (!isLarge) {
                  isLarge = obj.length > MAX_DATA_TO_SVG;
                }
                return obj.key instanceof Date;
              })
            : false;
        dates = _.uniq(dates);
        isDate = _.includes(dates, false) === true ? false : true;
      }
      if (this.diagramType === PIE) {
        if (Array.isArray(data)) {
          data = _.uniqBy([].concat(...data.map(item => item.data)), "id");
        } else {
          if (data.data.length > 0) {
            data = _.uniqBy(data.data, "id");
          } else {
            data = [];
          }
        }
      } else {
        if (!isMultiple && this.diagramType === BAR) {
          if (!isMultiple && this.diagramType === BAR) {
            if (Array.isArray(data)) {
              data = data[0].data;
            } else {
              data = data.data;
            }
          }
        } else {
          data = [].concat(...data.map(item => item.data));
        }
      }
      return {
        data: data,
        isMultiple: isMultiple,
        isDate: isDate,
        needCallAgain: needCallAgain,
        isLarge: isLarge
      };
    }

    return {
      data: [],
      isMultiple: isMultiple,
      isDate: isDate,
      needCallAgain: needCallAgain,
      isLarge: isLarge
    };
  }
  /**
   * Получение массива данных из нескольких датасурсов для диаграмм Line,Table,Scatter
   * @param {*} sources
   * @param {*} paramsResult
   */
  async getDataFromIterableDatasources(sources, paramsResult = {}) {
    return Promise.all(
      sources.map(async source => {
        let dataArray = [];
        if (_.keys(paramsResult).length > 0) {
          dataArray = await this.adaptDataByPath(source, paramsResult);
        } else {
          dataArray = await this.adaptDataByPath(source);
        }
        if (_.keys(dataArray).length === 0) {
          return [];
        }
        return dataArray;
      })
    );
  }
}

export default DataAdapter;
