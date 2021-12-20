export default function getFormatValueString (settings, options) {
    const name = options?.name || 'format'

    if (!settings[name + 'Enable']) {
        return
    }

    let formatValueString = ''
    
    if (settings[name + 'Fill']?.size) {
        formatValueString += settings[name + 'Fill']?.size
    }

    formatValueString += settings[name + 'Align'] || '>'

    formatValueString += settings[name + 'Sign'] || '-'

    formatValueString += settings[name + 'Symbol'] || ''

    if (settings[name + 'ZeroPadding']) {
        formatValueString += 0
    }

    formatValueString += settings[name + 'Width']?.size || ''

    if (settings[name + 'Comma']) {
        formatValueString += ','
    }

    formatValueString += '.'

    formatValueString += settings[name + 'Precision'] || 4

    if (settings[name + 'TrimTrailingZeros']) {
        formatValueString += '~'
    }

    formatValueString += settings[name + 'Type'] || ''

    return formatValueString
}