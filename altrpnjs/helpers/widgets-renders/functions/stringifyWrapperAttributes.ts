import _ from "lodash";
import getResponsiveSetting from "../../getResponsiveSetting";
import {encode} from "html-entities";

const mapper = [
]

export default function stringifyWrapperAttributes(settings: {
  sticky?: string;
  conditions: [] | null
  conditional_other: boolean | null
  conditional_other_display: string | null
}, screenName = ''){
  const altrpSettings : {
    perspective?:boolean
  } = {}


  if(getResponsiveSetting(settings, 'mouse-effects:enable',screenName)){
    getResponsiveSetting(settings, 'mouse-effects:track',screenName)
    && (altrpSettings['mouse-effects:track'] = getResponsiveSetting(settings, 'mouse-effects:track',screenName))
    getResponsiveSetting(settings, 'mouse-effects:tilt',screenName)
    && (altrpSettings['mouse-effects:tilt'] = getResponsiveSetting(settings, 'mouse-effects:tilt',screenName))
    altrpSettings.perspective = true
  }

  if(getResponsiveSetting(settings, 'scroll-effects:enable',screenName)){
    altrpSettings.perspective = true
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

  if(settings?.conditional_other){
    altrpSettings['conditional_other'] = settings?.conditional_other
    altrpSettings['conditional_other_display'] = settings?.conditional_other_display || 'AND'
    altrpSettings['conditions'] = settings?.conditions
  }

  mapper.forEach((prop)=>{
    if(settings[prop]){
      altrpSettings[prop] = settings[prop]
    }
  })
  if(_.isEmpty(altrpSettings)){
    return  ''
  }
  return ` data-altrp-settings="${encode(JSON.stringify(altrpSettings))}" `
}
