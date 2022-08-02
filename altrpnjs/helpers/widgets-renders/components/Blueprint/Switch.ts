export default function Switch({ checked, className }) {
  return `
    <label class="bp3-control bp3-switch ${className}">
      <input type="checkbox" ${checked ? 'checked="true"' : ''}>
      <span class="bp3-control-indicator"></span>
    </label>
  `;
}
