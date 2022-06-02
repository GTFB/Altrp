import React from "react";
import getConverter from "./getConverter";

/**
 * Конвертируются данные
 * @param {{} | []} settings
 * @param {*} data
 */
export default function convertData(settings, data) {
  if (_.isArray(settings)) {
    settings.forEach(item => {
      const converter = getConverter(item);
      data = converter.convertData(data);
    });
  }
  if (settings.data_type) {
    const converter = getConverter(settings);
    data = converter.convertData(data);
  }
  return data;
}
