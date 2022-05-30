
/**
 * Задержка с интерфейсом промиса
 * @param ms
 * @return {Promise}
 */
export default function delay(ms) {
  if (_.isString(ms)) {
    ms = Number(ms);
  }
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}
