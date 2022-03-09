import getResponsiveSetting from '../getResponsiveSetting';

export default function renderInputCropImage(settings, device, context) {
  const text = getResponsiveSetting(settings, 'text', device)
  const required = getResponsiveSetting(settings, 'required', device)

  return `
    <div style="display: flex; justify-content: center;">
      <div class="image-to-crop-container">
        <input type="file" accept="image/png, image/jpeg, image/jpg" class="hidden" id="${settings.getName() + settings.getId()}" ${required ? 'required' : ''} />
        <label htmlFor="${settings.getName() + settings.getId()}">
          <div className="crop-image-text">${text}</div>
          <div className="crop-image-background"></div>
        </label>
      </div>
    </div>
  `
}