/**
 * Вернуть значение из строки
 * @param string
 */
export default function parseStringValue(string) {
  let value = string;

  if (Number(value)) {
    return Number(value);
  }
  switch (value) {
    case "true": {
      return true;
    }
    case "false": {
      return false;
    }
    case "null": {
      return null;
    }
    case "undefined": {
      return undefined;
    }
    case "0": {
      return 0;
    }
  }
  return value;
}
