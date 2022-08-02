/**
 * clear all require cache
 */
import Logger from '@ioc:Adonis/Core/Logger';

export default function clearRequireCache() {
  Object.keys(require.cache).forEach(function (key) {
    delete require.cache[key];
  });
  Logger.info('Require cache cleared!');
}
