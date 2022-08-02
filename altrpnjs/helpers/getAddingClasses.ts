import getResponsiveSetting from './getResponsiveSetting';

export default function getAddingClasses(settings: any, screen) {
  const {
    hide_on_wide_screen,
    hide_on_desktop,
    hide_on_laptop,
    hide_on_tablet,
    hide_on_big_phone,
    hide_on_small_phone,
    isFixed,
  } = settings;
  let classes = '';

  if (hide_on_wide_screen) {
    classes += ' hide_on_wide_screen';
  }
  if (hide_on_desktop) {
    classes += ' hide_on_desktop';
  }
  if (hide_on_laptop) {
    classes += ' hide_on_laptop';
  }
  if (hide_on_tablet) {
    classes += ' hide_on_tablet';
  }
  if (hide_on_big_phone) {
    classes += ' hide_on_big_phone';
  }
  if (hide_on_small_phone) {
    classes += ' hide_on_small_phone';
  }
  if (isFixed) {
    classes += ' fixed-section';
  }
  if (getResponsiveSetting(settings, 'en_an', screen)) {
    classes += ' altrp-invisible ';
  }
  if (getResponsiveSetting(settings, 'css_class', screen)) {
    classes += ` ${getResponsiveSetting(settings, 'css_class', screen)} `;
  }
  return classes;
}
