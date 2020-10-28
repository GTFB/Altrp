import { getDataByPath } from "../../../../../../front-app/src/js/helpers";

//Класс для работы с репитером
//получает данные из источника и приводит их к указанному формату ключ->значение
class DataAdapter {

      //Передаем сюда репитер
      constructor(repeater) {
            this.repeater = repeater;
      }

      adaptDataByPath(path, key, dataKey) {
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