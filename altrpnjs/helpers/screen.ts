import map from 'lodash/map'
import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import { toJSON, toCSS } from 'cssjson'

import SCREENS from './const/SCREENS'
import ArrayObject from './array-object'
import BaseGenerator from "App/Generators/BaseGenerator";
import _ from 'lodash'

const nameMapScreen = {}

SCREENS.forEach(screen => {
  nameMapScreen[screen.name] = screen
})

interface Range {
  min: number
  max: number
}

function merge(ranges: Range[]) {
  if (ranges.length == 0) return []

  ranges.sort((a, b) => a.min - b.min)

  let stack: Range[] = [ranges[0]]

  for (let i = 1; i < ranges.length; i++) {
    let prev = stack.pop()
    let cur = ranges[i]
    if (prev!.max >= cur.min - 1) {
      stack.push({ min: prev!.min, max: Math.max(prev!.max, cur.max) })
    } else {
      stack.push(prev!, cur)
    }
  }

  return stack
}

export const mergeScreenQuery = (names: string[]) => {
  const ranges = merge(names.map(name => {
    if (!nameMapScreen[name]) {
      const match = name.match(/(\d+)_(\d+)/)

      if (match) {
        return { min: Number(match[1]), max: Number(match[2]) }
      }

      return { min: 0, max: 10000 }
    }

    return {
      min: nameMapScreen[name].min ?? 0,
      max: nameMapScreen[name].max ?? 10000
    }
  }))

  const screenQuery = ranges.map(range => {
    const query = ['screen']

    if (range.min) {
      query.push(`(min-width: ${range.min}px)`)
    }

    if (range.max && range.max !== 10000) {
      query.push(`(max-width: ${range.max}px)`)
    }

    return query.length === 1 ? null : query.join(' and ')
  })
    .filter(range => range)
    .join(', ')

  return screenQuery ? `@media ${screenQuery}` : null
}

const mediaQueryToRange = query => {
  const maxMatch = query.match(/max-width: ?(\d+)px/)
  const max = maxMatch ? Number(maxMatch[1]) : 10000
  const minMatch = query.match(/min-width: ?(\d+)px/)
  const min = minMatch ? Number(minMatch[1]) : 0

  return { min, max }
}

function optimize(items) {
  const map = new ArrayObject()
  const result = new ArrayObject()

  items.forEach(item => {
    item.value.forEach(name => {
      result.remove(map.getAsString(name), name)
      map.add(name, item.id)

      result.add(map.getAsString(name), name)
    })
  })

  return result.getEntries()
}

export const flatStyleArray = (styleArray, withPreset) => {
  if (!isArray(styleArray)) {
    return null
  }


  const jsonStyleArray = styleArray
    .map(style => toJSON(style))
    .map(jsonStyle => {
      const newJson = {}

      forEach(jsonStyle.children, (value, key) => {

        if (!isEmpty(value.children) || !isEmpty(value.attributes)) {

          newJson[key] = value
        }
      })

      return newJson
    })

  const flattenStyleArray = jsonStyleArray
    .map(json => {

      return map(json, (value: { attributes: Record<string, any> }, key) => [key, value.attributes])
    })
    .flat()
    .map(item => {
      if(! withPreset && item[0].includes('_altrp-preset_')){
        return null
      }

      return map(item[1], (style, key) => {

        return `${item[0]}??${key}??${style}`
      })
    })
    .filter(item => item)
    .flat()
  return flattenStyleArray
}

export const mergeStyles = (styles, withPreset = false) => {
  const converted = map(styles, (value, key) => {

    return isArray(value)
      ? {
        id: key,
        value: flatStyleArray(value, withPreset)
      }
      : null
  }).filter(styles => styles)

  const merged = optimize(converted)
    .map(([keyGroup, styles]) => {
      const keys = keyGroup.split(',')
      const style = {}

      styles.forEach(item => {
        const [className, key, value] = item.split("??")

        if (style[className]) {
          style[className].attributes[key] = value
        } else {
          style[className] = { children: {}, attributes: { [key]: value } }
        }
      })

      return [mergeScreenQuery(keys), toCSS({ children: style, attributes: {} })]
    })

  return merged
}

export const optimizeStyles = async (styles) => {
  const stylesJson = toJSON(styles)
  const queryStylesJson = {}
  const queryPresetStylesJson = {}
  forEach(stylesJson.children, (value, key) => {
    let _queryStylesJson = queryStylesJson
    if (key.indexOf('@media') < 0) {
      const newKey = `0_10000`
      if(key.includes('_altrp-preset_')){
        key += ' '

        // @ts-ignore
        let _key: string = key.match(/(?<=_altrp-preset_)([\S]+?)(?=[.\s,])/g)?.[0]
        if(! _key){
          console.error('error with preset selector')
        }

        queryPresetStylesJson[_key] = queryPresetStylesJson[_key] || {}
        _queryStylesJson = queryPresetStylesJson[_key]
      }

      if (_queryStylesJson[newKey]) {
        if(_queryStylesJson[newKey].children[key]){
          _queryStylesJson[newKey].children[key].attributes = {
            ..._queryStylesJson[newKey].children[key].attributes,
            ...value.attributes
          }
        }
        _queryStylesJson[newKey].children[key] = value
      } else {
        _queryStylesJson[newKey] = { children: { [key]: value } }
      }
    } else {
      const range = mediaQueryToRange(key)
      const newKey = `${range.min}_${range.max}`

      map(value.children,(value,key )=>{

        if(key.includes('_altrp-preset_')){
          key += ' '

          // @ts-ignore
          let _key: string = key.match(/(?<=_altrp-preset_)([\S]+?)(?=[.\s,])/g)?.[0]
          if(! _key){
            console.error('error with preset selector')
          }
          queryPresetStylesJson[_key] = queryPresetStylesJson[_key] || {}
          if (queryPresetStylesJson[_key][newKey]) {

            if(queryPresetStylesJson[_key][newKey].children[key]){
              queryPresetStylesJson[_key][newKey].children[key].attributes = {
                ...queryPresetStylesJson[_key][newKey].children[key].attributes,
                ...value.attributes
              }
            }
            queryPresetStylesJson[_key][newKey].children[key] = value
          } else {
            queryPresetStylesJson[_key][newKey] = { children: { [key]: value } }
          }
        }
      })
      _queryStylesJson[newKey] = [toCSS(value)]

    }
  })

  if(queryStylesJson['0_10000']){
    queryStylesJson['0_10000'] =  [toCSS(queryStylesJson['0_10000'])]
  }
  /**
   * generatePresetStyles
   */
  await Promise.all(map(queryPresetStylesJson, async (queryStylesJson: any, key)=>{
    map(queryStylesJson, (value, key)=>{
      queryStylesJson[key] = [toCSS(value)]
    })

    let styles: any = []
    let optimizedStyles = mergeStyles(queryStylesJson, true)
    optimizedStyles = _.sortBy(optimizedStyles,([mediaQuery]: string[], idx) => {
      if(! mediaQuery){
        return -1
      }
      return idx
    })
    optimizedStyles.forEach(([mediaQuery, queryStyles]: string[]) => {

      mediaQuery ? styles.push(`${mediaQuery}{${queryStyles}}`) : styles.push(queryStyles)
    })
    styles = styles.join('')

    await BaseGenerator.generateCssFile(key, styles, 'altrp-presets')
  }))
  // if(queryPresetStylesJson['0_10000']){
  //   queryPresetStylesJson['0_10000'] =  [toCSS(queryPresetStylesJson['0_10000'])]
  // }


  return mergeStyles(queryStylesJson)
}
