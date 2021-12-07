import { CONTROLLER_NUMBER, CONTROLLER_SELECT, CONTROLLER_SLIDER, CONTROLLER_SWITCHER, TAB_STYLE } from "../../classes/modules/ControllersManager";

export default function valueFormatControllers(element) {
    element.startControlSection('value_format', {
      tab: TAB_STYLE,
      label: 'Value format'
    })

    element.addControl('enableFormatting', {
      label: 'Enable formatting',
      type: CONTROLLER_SWITCHER,
    })

    element.addControl('formatType', {
      label: 'Type',
      type: CONTROLLER_SELECT,
      options: [
        {
          label: 'None',
          value: ''
        },
        {
          label: 'Decimal notation, rounded to significant digits',
          value: 'r'
        },
        {
          label: 'Decimal notation with an SI prefix, rounded to significant digits',
          value: 's'
        },
        {
          label: 'Exponent notation',
          value: 'e'
        },
        {
          label: 'Fixed point notation',
          value: 'f'
        },
        {
          label: 'Either decimal or exponent notation, rounded to significant digits',
          value: 'g',
        },
        {
          label: 'Multiply by 100, and then decimal notation with a percent sign',
          value: '%',
        }, 
        {
          label: "Multiply by 100, round to significant digits, and then decimal notation with a percent sign",
          value: "p",
        }, 
        {
          label: "Binary notation, rounded to integer",
          value: "b",
        }, 
        {
          label: "Octal notation, rounded to integer",
          value: "o",
        },
        {
          label: "Decimal notation, rounded to integer",
          value: "d",
        },
        {
          label: "Hexadecimal notation, using lower-case letters, rounded to integer",
          value: "x",
        },
        {
          label: "Hexadecimal notation, using upper-case letters, rounded to integer",
          value: "X",
        },
        {
          label: "Converts the integer to the corresponding unicode character before printing",
          value: "c",
        },
      ]
    })

    element.addControl('formatSign', {
      type: CONTROLLER_SELECT,
      label: 'Sign',
      options: [
        {
          label: "Nothing for zero or positive and a minus sign for negative",
          value: "-",
        }, 
        {
          label: "A plus sign for zero or positive and a minus sign for negative",
          value: "+",
        }, 
        {
          label: "Nothing for zero or positive and parentheses for negative",
          value: "(",
        }, 
        {
          label: "A space for zero or positive and a minus sign for negative",
          value: " ",
        }
      ]
    })

    element.addControl('currency', {
      type: CONTROLLER_SELECT,
      label: 'Currency',
      options: [
        {
          label: "none",
          value: '',
        },
        {
          label: "$",
          value: "$",
        },
        {
          label: "€",
          value: "€",
        },
        {
          label: '₽',
          value: '₽'
        },
        {
          label: '¢',
          value: '¢'
        },
        {
          label: '¥',
          value: '¥'
        },
        {
          label: '₣',
          value: '₣'
        },
        {
          label: '₴',
          value: '₴'
        },
        {
          label: '₸',
          value: '₸'
        },
        {
          label: '￡',
          value: '￡'
        },
        {
          label: '₤',
          value: '₤'
        },
        {
          label: '元',
          value: '元'
        },
        {
          label: '円',
          value: '円'
        },
        {
          label: '₯',
          value: '₯'
        },
        {
          label: '₪',
          value: '₪'
        },
      ]
    })

    element.addControl('formatPrecision', {
      type: CONTROLLER_NUMBER,
      label: 'Precision',
    })

    element.addControl('formatWidth', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      min: 0,
      max: 30,
      step: 1
    })

    element.addControl('formatFill', {
      type: CONTROLLER_SLIDER,
      label: 'Fill',
      min: 0,
      max: 9,
      step: 1
    })

    element.addControl('formatAlign', {
      type: CONTROLLER_SELECT,
      label: 'Align',
      options: [
        {
          label: "Force the field to be right-aligned within the available space",
          value: ">",
        }, 
        {
          label: "Force the field to be left-aligned within the available space",
          value: "<",
        }, 
        {
          label: "Force the field to be centered within the available space",
          value: "^",
        }, 
        {
          label: "Force the field to be right-aligned within the available space, but with any sign and symbol to the left of any padding",
          value: "=",
        }
      ]
    })

    element.addControl('formatZeroPadding', {
      type: CONTROLLER_SWITCHER,
      label: 'Zero padding'
    })

    element.addControl('formatComma', {
      type: CONTROLLER_SWITCHER,
      label: 'Comma'
    })

    element.addControl('formatTrimTrailingZeros', {
      type: CONTROLLER_SWITCHER,
      label: 'Trim trailing zeros'
    })

    element.endControlSection()
}