export const CHANGE_FORM_FIELD_VALUE = 'CHANGE_FORM_FIELD_VALUE';
export const CLEAR_FORM_FIELD_VALUE = 'CLEAR_FORM_FIELD_VALUE';

/**
 * Получает данные поля формы и сохраняет в хранилище
 * @param {string}fieldName
 * @param {*}value
 * @param {string}formId
 * @param {boolean}userInput
 * @return {{type: string, fieldName: *, value: *, formId: *}}
 */
export function changeFormFieldValue(fieldName, value, formId, userInput) {
  return {
    type: CHANGE_FORM_FIELD_VALUE,
    fieldName,
    value,
    formId,
    changedField: userInput ? `${formId}.${fieldName}` : null,
  };
}
/**
 * Очистить данные поля формы и сохраняет в хранилище
 * @param {string | null}formId
 * @return {{type: string, fieldName: *, value: *, formId: *}}
 */
export function clearFormStorage(formId = null) {
  return {
    type: CLEAR_FORM_FIELD_VALUE,
    formId,
  };
}

