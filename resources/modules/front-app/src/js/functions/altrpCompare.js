/**
 * Функция для сравнения значений
 * @param leftValue
 * @param rightValue
 * @param operator
 * @return {boolean}
 */
export default function altrpCompare(
  leftValue = "",
  rightValue = "",
  operator = "empty"
) {
  switch (operator) {
    case "empty": {
      return _.isEmpty(leftValue);
    }
    case "not_empty": {
      return !_.isEmpty(leftValue);
    }
    case "null": {
      return !leftValue;
    }
    case "not_null": {
      return !!leftValue;
    }
    case "==": {
      if (!leftValue && !rightValue) {
        return true;
      }
      if (!(_.isObject(leftValue) || _.isObject(rightValue))) {
        return leftValue == rightValue;
      } else {
        return _.isEqual(leftValue, rightValue);
      }
    }
    case "===": {
      return _.isEqual(leftValue, rightValue);
    }
    case "<>": {

      if (!leftValue && !rightValue) {
        return false;
      }
      if (!(_.isObject(leftValue) || _.isObject(rightValue))) {
        return leftValue != rightValue;
      } else {
        return !_.isEqual(leftValue, rightValue);
      }
    }
    case ">": {
      return Number(leftValue) > Number(rightValue);
    }
    case ">=": {
      return Number(leftValue) >= Number(rightValue);
    }
    case "<": {
      return Number(leftValue) < Number(rightValue);
    }
    case "<=": {
      return Number(leftValue) <= Number(rightValue);
    }
    case "in": {
      if (_.isString(rightValue)) {
        return rightValue.indexOf(leftValue) !== -1;
      }
      if (!_.isArray(rightValue)) {
        return false;
      }
      let result = false;
      rightValue.forEach(item => {
        if (!result) {
          result = altrpCompare(leftValue, item, "==");
        }
      });
      return result;
    }
    case "not_in": {
      return !altrpCompare(leftValue, rightValue, "in");
    }
    case "contain": {

      if (_.isString(leftValue)) {
        return leftValue.indexOf(rightValue) !== -1;
      }
      if (!_.isArray(leftValue)) {
        return false;
      }
      let result = false;
      leftValue.forEach(item => {
        if (!result) {
          result = altrpCompare(rightValue, item, "contain");
        }
      });
      return result;
    }
    case "not_contain": {
      return !altrpCompare(leftValue, rightValue, "contain");
    }
  }
}
