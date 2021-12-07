export default function getFormatValueString (settings) {
    if (!settings.enableFormatting) {
        return
    }

    let formatValueString = ''
    
    if (settings.formatFill?.size) {
        formatValueString += settings.formatFill?.size
    }

    formatValueString += settings.formatAlign || '>'

    formatValueString += settings.formatSign || '-'

    formatValueString += settings.formatSymbol || ''

    if (settings.formatZeroPadding) {
        formatValueString += 0
    }

    formatValueString += settings.formatWidth?.size || ''

    if (settings.formatComma) {
        formatValueString += ','
    }

    formatValueString += '.'

    formatValueString += settings.formatPrecision || 4

    if (settings.formatTrimTrailingZeros) {
        formatValueString += '~'
    }

    formatValueString += settings.formatType || ''

    return formatValueString
}