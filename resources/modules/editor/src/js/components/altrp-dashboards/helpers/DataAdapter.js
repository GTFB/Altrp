import { getDataByPath } from "../../../../../../front-app/src/js/helpers";
import axios from "axios";
import appStore from "../../../../../../front-app/src/js/store/store";

//Класс для работы с репитером
//получает данные из источника и приводит их к указанному формату ключ->значение
class DataAdapter {

      //Передаем сюда репитер
      constructor(repeater) {
            this.repeater = repeater;
      }

      getAlias(path) {
            return path.split('altrpdata.')[1];
      }

      getDatasourceByPath(path) {
            return _.find(dataStorageUpdater.data.currentDataSources, (o) => {
                  return o.data.alias === this.getAlias(path);
            });
      }

      queryString(params) {
            let data = _.values(params).map((param, index) => {
                  let key = encodeURIComponent(_.keys(param)[0]);
                  let value = encodeURIComponent(param[key]);

                  let result = '';
                  if (index === 0) {
                        if (param[key] === null) {
                              result = `?`;
                        }
                        else {
                              result = `?${key}=${value}`;
                        }
                  }
                  else {
                        if (param[key] === null) {
                              result = ``;
                        }
                        else {
                              result = `&${key}=${value}`;
                        }
                  }
                  return result;
            }).join('');
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
                        }
                  });
                  return returnData;
            } catch (error) {
                  console.log('WITH PARAMS ERROR=>', error);
            }
      }

      async adaptDataByPath(path, key, dataKey, params = {}) {
            if (_.keys(params).length > 0) {
                  let datasource = this.getDatasourceByPath(path);
                  if (typeof datasource !== 'undefined') {
                        return await this.getDataWithParams(datasource, key, dataKey, params);
                  }
            }
            try {
                  let data = getDataByPath(path, []);
                  // console.log('DATA IN ADAPTER =>', data);
                  if (data.length > 0) {
                        data = data.map(d => ({
                              data: _.get(d, dataKey),
                              key: _.get(d, key)
                        }));
                        //Исключаем дублирование ключей, т.к. это приводит к ошибкам рендера всех диаграм
                        data = _.uniqBy(data, 'key');
                  }
                  return data;
            } catch (error) {
                  console.log('ADAPTER ERROR =>', error);
            }
      }

      //Возвращаем данные в паре ключ->значение, указанные в настройках
      parse() {
            let source = this.repeater.map(r => {
                  try {
                        let data = this.adaptDataByPath(r.path, r.key, r.data);
                        return { ...r, data };
                  } catch (error) {
                        console.error('PARSE DATA ERROR =>', error);
                  }

            });
            return source;
      }
}

export default DataAdapter;