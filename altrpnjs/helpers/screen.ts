import map from 'lodash/map'
import forEach from 'lodash/forEach'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import purifycss from 'purify-css'
import { toJSON, toCSS } from 'cssjson'

import SCREENS from './const/SCREENS'
import ArrayObject from './array-object'

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

export const flatStyleArray = (styleArray, html, purifycssOptions) => {
  if (!isArray(styleArray)) {
    return null
  }

  const purifiedStyleArray = html
    ? styleArray
      .map(style => purifycss(html, style, purifycssOptions))
      .filter(style => style)
    : styleArray

  const jsonStyleArray = purifiedStyleArray
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
      return map(item[1], (style, key) => {
        return `${item[0]}??${key}??${style}`
      })
    })
    .flat()

  return flattenStyleArray
}

export const mergeStyles = (styles, html, purifycssOptions) => {
  const converted = map(styles, (value, key) => {
    return isArray(value)
      ? {
        id: key,
        value: flatStyleArray(value, html, purifycssOptions)
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

export const optimizeStyles = (styles, html?, purifycssOptions?) => {
  const stylesJson = toJSON(styles)
  const queryStylesJson = {}

  forEach(stylesJson.children, (value, key) => {
    if (key.indexOf('@media') < 0) {
      const newKey = `0_10000`
      if (queryStylesJson[newKey]) {
        queryStylesJson[newKey].children[key] = value
      } else {
        queryStylesJson[newKey] = { children: { [key]: value } }
      }
    } else {
      const range = mediaQueryToRange(key)
      const newKey = `${range.min}_${range.max}`
      queryStylesJson[newKey] = [toCSS(value)]
    }
  })

  return mergeStyles(queryStylesJson, html, purifycssOptions)
}
