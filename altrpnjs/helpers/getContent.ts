import replaceContentWithData from './replaceContentWithData';
import getResponsiveSetting from './getResponsiveSetting';
import * as _ from 'lodash';

export default function getContent(
  settings,
  context,
  settingName,
  device: string,
  returnRaw = false
) {
  /**
   * @member {FrontElement} element
   */
  // return this.props.element.getContent(settingName);

  let content = getResponsiveSetting(settings, settingName, device, '');

  if (returnRaw) {
    content = content.trim().replace('{{', '').replace('}}', '');
    content = _.get(context, content, '');
  } else {
    content = replaceContentWithData(content, context);
  }
  return content === 'null' ? '' : content;
}
