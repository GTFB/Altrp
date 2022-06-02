import ArrayConverter from "../classes/converters/ArrayConverter";
import DataConverter from "../classes/converters/DataConverter";

/**
 * Вернуть экземпляр конвертера необходимого типа (array - ArrayConverter и т. д.)
 * @return {DataConverter}
 */
export default function getConverter(data) {
  switch (data.data_type) {
    case "array":
      return new ArrayConverter(data);
  }
  return new DataConverter();
}
