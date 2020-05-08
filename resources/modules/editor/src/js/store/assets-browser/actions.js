export const ASSETS_SHOW = 'ASSETS_SHOW';
export const ASSETS_TOGGLE = 'ASSETS_TOGGLE';

export function assetsShow(settings) {
  settings.active = true;
  return {
    type: ASSETS_SHOW,
    settings
  };
}

export function assetsToggle() {
  return {
    type: ASSETS_TOGGLE,
  };
}

