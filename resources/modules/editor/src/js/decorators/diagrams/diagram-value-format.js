import { CONTROLLER_NUMBER, CONTROLLER_SELECT, CONTROLLER_SLIDER, CONTROLLER_SWITCHER, TAB_STYLE } from "../../classes/modules/ControllersManager";

export default function valueFormatControllers(element, options) {
  const name = options?.name || 'format'
  const tabName = options?.tabName || 'Value format'
  const tabID = options?.tabID || 'value_format'
  const useCurrency = options?.useCurrency === true

  element.startControlSection(tabID, {
    tab: TAB_STYLE,
    label: tabName
  })

  element.addControl(name + 'Enable', {
    label: 'Enable Formatting',
    type: CONTROLLER_SWITCHER,
    locked: true,
  })

    element.addControl(name + 'Type', {
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
      ],
      locked: true,
    })

    element.addControl(name + 'Sign', {
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
      ],
      locked: true,
    })

    if (useCurrency) {
      element.addControl(name + 'Currency', {
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
        ],
        locked: true,
      })
    }

    element.addControl(name + 'Precision', {
      type: CONTROLLER_NUMBER,
      label: 'Precision',
      locked: true,
    })

    element.addControl(name + 'Width', {
      type: CONTROLLER_SLIDER,
      label: 'Width',
      min: 0,
      max: 30,
      step: 1,
      locked: true,
    })

    element.addControl(name + 'Fill', {
      type: CONTROLLER_SLIDER,
      label: 'Fill',
      min: 0,
      max: 9,
      step: 1,
      locked: true,
    })

    element.addControl(name + 'Align', {
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
      ],
      locked: true,
    })

    element.addControl(name + 'ZeroPadding', {
      type: CONTROLLER_SWITCHER,
      label: 'Zero Padding',
      locked: true,
    })

    element.addControl(name + 'Comma', {
      type: CONTROLLER_SWITCHER,
      label: 'Comma',
      locked: true,
    })

    element.addControl(name + 'TrimTrailingZeros', {
      type: CONTROLLER_SWITCHER,
      label: 'Trim Trailing Zeros',
      locked: true,
    })

    element.endControlSection()
}
