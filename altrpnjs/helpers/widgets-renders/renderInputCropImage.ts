import getResponsiveSetting from '../getResponsiveSetting';
//@ts-ignore
export default function renderInputCropImage(settings, device) {
  const text = getResponsiveSetting(settings, 'text', device)
  const required = getResponsiveSetting(settings, 'required', device)

  return `
    <div style="display: flex; justify-content: center;">
      <div class="image-to-crop-container">
        <input type="file" accept="image/png, image/jpeg, image/jpg" class="hidden" ${required ? 'required' : ''} />
        <label>
          <div class="crop-image-text">${text}</div>
          <div class="crop-image-background"></div>
        </label>
      </div>
    </div>
  `
}
