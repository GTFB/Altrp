import getResponsiveSetting from "../get-responsive-setting";

export default function stringifyWrapperAttributes(settings, screenName = ''){
  const altrpSettings = {}


  if(getResponsiveSetting(settings, 'mouse-effects:enable')){
    getResponsiveSetting(settings, 'mouse-effects:track')
    && (altrpSettings['mouse-effects:track'] = getResponsiveSetting(settings, 'mouse-effects:track'))
    getResponsiveSetting(settings, 'mouse-effects:tilt',screenName)
    && (altrpSettings['mouse-effects:tilt'] = getResponsiveSetting(settings, 'mouse-effects:tilt'))
  }

  if(getResponsiveSetting(settings, 'scroll-effects:enable',screenName)){
    getResponsiveSetting(settings, 'sc-effects:vertical',screenName)
    && (altrpSettings['mouse-effects:vertical'] = getResponsiveSetting(settings, 'mouse-effects:vertical',screenName))

    getResponsiveSetting(settings, 'sc-effects:horizontal',screenName)
    && (altrpSettings['mouse-effects:horizontal'] = getResponsiveSetting(settings, 'mouse-effects:horizontal',screenName))

    getResponsiveSetting(settings, 'sc-effects:transparency',screenName)
    && (altrpSettings['mouse-effects:transparency'] = getResponsiveSetting(settings, 'mouse-effects:transparency',screenName))

    getResponsiveSetting(settings, 'sc-effects:blur',screenName)
    && (altrpSettings['mouse-effects:blur'] = getResponsiveSetting(settings, 'mouse-effects:blur',screenName))

    getResponsiveSetting(settings, 'sc-effects:rotate',screenName)
    && (altrpSettings['mouse-effects:rotate'] = getResponsiveSetting(settings, 'mouse-effects:rotate',screenName))

    getResponsiveSetting(settings, 'sc-effects:scale',screenName)
    && (altrpSettings['mouse-effects:scale'] = getResponsiveSetting(settings, 'mouse-effects:scale',screenName))

    getResponsiveSetting(settings, 'sc-effects:x-anchor',screenName)
    && (altrpSettings['mouse-effects:x-anchor'] = getResponsiveSetting(settings, 'mouse-effects:x-anchor',screenName))

    getResponsiveSetting(settings, 'sc-effects:y-anchor',screenName)
    && (altrpSettings['mouse-effects:y-anchor'] = getResponsiveSetting(settings, 'mouse-effects:y-anchor',screenName))
  }
  if(_.isEmpty(altrpSettings)){
    return  ''
  }
  return JSON.stringify(altrpSettings)
}
