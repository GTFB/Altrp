import getResponsiveSetting from '../getResponsiveSetting';

export default function renderInputDateRange(settings, device) {
  const startInputPlaceholder = getResponsiveSetting(
    settings,
    'start_placeholder',
    device,
    'start date'
  );
  const endInputPlaceholder = getResponsiveSetting(settings, 'end_placeholder', device, 'end date');

  return `
    <span class="bp3-popover-wrapper">
      <span aria-haspopup="true" class="bp3-popover-target">
        <div class="bp3-control-group">
          <div class="bp3-input-group">
            <input type="text" autocomplete="off" placeholder="${startInputPlaceholder}" class="bp3-input">
          </div>
          <div class="bp3-input-group">
            <input type="text" autocomplete="off" placeholder="${endInputPlaceholder}" class="bp3-input">
          </div>
        </div>
      </span>
    </span>
  `;
}
