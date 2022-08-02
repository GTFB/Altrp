import getResponsiveSetting from '../getResponsiveSetting';

export default function renderInputFile(settings, device) {
  const disabled = getResponsiveSetting(settings, 'readonly', device);
  const buttonText = getResponsiveSetting(settings, 'button_text', device);
  const accept = getResponsiveSetting(settings, 'accept', device);
  const multiple = getResponsiveSetting(settings, 'multiple', device);
  const preview = getResponsiveSetting(settings, 'preview', device);
  const imageUrls_0 = getResponsiveSetting(settings, 'preview_placeholder', device)?.url;

  let className = ``;

  if (getResponsiveSetting(settings, 'preview', device)) {
    className = 'bp3-file-input_preview';
  }

  return `
    <style>
      .bp3-file-upload-input::after {
        content: "${buttonText || 'Browse'}";
      }
    </style>

    <label class="bp3-file-input ${disabled ? 'bp3-disabled' : ''} ${className}" style="${
    imageUrls_0 && preview ? `background-image: url(${imageUrls_0})` : ''
  }">
      <input type="file" ${multiple ? 'multiple' : ''} ${disabled ? 'disabled' : ''} ${
    accept ? `accept="${accept}"` : ''
  }>
      <span class="bp3-file-upload-input ${
        buttonText ? 'bp3-file-upload-input-custom-text' : ''
      }" bp3-button-text="${buttonText || 'Browse'}"></span>
    </label>
  `;
}
