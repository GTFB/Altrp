interface InputProps {
  type: string;
  placeholder: string;
  getName: () => string;
  readOnly: boolean;
  autoComplete?: string;
  widgetView: string;
}

export default function AltrpInput<T extends InputProps>({
  type,
  placeholder,
  getName,
  readOnly,
  autoComplete,
  widgetView,
}: T) {
  let input: string = '';

  if (widgetView === 'popoverOn') {
    input = `<div class="bp3-popover2-target"><div class="bp3-input-group bp3-fill"><input type="${type}" ${
      readOnly ? 'readonly' : ''
    } name="${getName()}" id="${getName()}" placeholder="${placeholder}" class="bp3-input"></div></div>`;
  } else if (widgetView === 'popoverOff') {
    input = `<div class="bp3-input-group"><input type="${type}" ${
      readOnly ? 'readonly' : ''
    } name="${getName()}" id="${getName()}" autocomplete="${autoComplete}" placeholder="${placeholder}" class="bp3-input"></div>`;
  }

  return input;
}
