import * as _ from 'lodash';
export default function replaceContentWithData(content: string, context: object): string {
  let paths = _.isString(content) ? content.match(/{{([\s\S]+?)(?=}})/g) : null;
  if (_.isArray(paths)) {
    // @ts-ignore
    paths.forEach((path) => {
      path = path.replace('{{', '');
      let value = _.get(context, path);

      if (value === 0) {
        value = '0';
      }
      path = escapeRegExp(path);
      content = content.replace(new RegExp(`{{${path}}}`, 'g'), value || '');
    });
  }

  return content;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
