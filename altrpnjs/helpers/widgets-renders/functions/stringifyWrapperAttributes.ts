import _ from "lodash";
import getResponsiveSetting from "../../getResponsiveSetting";
import {encode} from "html-entities";

export default function stringifyWrapperAttributes(settings: {}, screenName = ''){
  const altrpSettings = {}


  if(getResponsiveSetting(settings, 'mouse-effects:enable',screenName)){
    getResponsiveSetting(settings, 'mouse-effects:track',screenName)
    && (altrpSettings['mouse-effects:track'] = getResponsiveSetting(settings, 'mouse-effects:track',screenName))
    getResponsiveSetting(settings, 'mouse-effects:tilt',screenName)
    && (altrpSettings['mouse-effects:tilt'] = getResponsiveSetting(settings, 'mouse-effects:tilt',screenName))
  }

  if(getResponsiveSetting(settings, 'scroll-effects:enable',screenName)){
    getResponsiveSetting(settings, 'scroll-effects:vertical',screenName)
    && (altrpSettings['scroll-effects:vertical'] = getResponsiveSetting(settings, 'scroll-effects:vertical',screenName))

    getResponsiveSetting(settings, 'scroll-effects:horizontal',screenName)
    && (altrpSettings['scroll-effects:horizontal'] = getResponsiveSetting(settings, 'scroll-effects:horizontal',screenName))

    getResponsiveSetting(settings, 'scroll-effects:transparency',screenName)
    && (altrpSettings['scroll-effects:transparency'] = getResponsiveSetting(settings, 'scroll-effects:transparency',screenName))

    getResponsiveSetting(settings, 'scroll-effects:blur',screenName)
    && (altrpSettings['scroll-effects:blur'] = getResponsiveSetting(settings, 'scroll-effects:blur',screenName))

    getResponsiveSetting(settings, 'scroll-effects:rotate',screenName)
    && (altrpSettings['scroll-effects:rotate'] = getResponsiveSetting(settings, 'scroll-effects:rotate',screenName))

    getResponsiveSetting(settings, 'scroll-effects:scale',screenName)
    && (altrpSettings['scroll-effects:scale'] = getResponsiveSetting(settings, 'scroll-effects:scale',screenName))

    getResponsiveSetting(settings, 'scroll-effects:x-anchor',screenName)
    && (altrpSettings['scroll-effects:x-anchor'] = getResponsiveSetting(settings, 'scroll-effects:x-anchor',screenName))

    getResponsiveSetting(settings, 'scroll-effects:y-anchor',screenName)
    && (altrpSettings['scroll-effects:y-anchor'] = getResponsiveSetting(settings, 'scroll-effects:y-anchor',screenName))
  }
  if(_.isEmpty(altrpSettings)){
    return  ''
  }
  return ` data-altrp-settings="${encode(JSON.stringify(altrpSettings))}" `
}
