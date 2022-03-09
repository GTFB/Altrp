import getResponsiveSetting from '../getResponsiveSetting';

export default function renderInputGallery(settings, device, context) {
  const backgroundImageUrl = `url(${getResponsiveSetting(settings, 'placeholder', device)?.url || "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj48cGF0aCBkPSJNMjMuNDE0IDIxLjQxNEwzMCAxNC44MjhWNDRhMiAyIDAgMDA0IDBWMTQuODI4bDYuNTg2IDYuNTg2Yy4zOS4zOTEuOTAyLjU4NiAxLjQxNC41ODZzMS4wMjQtLjE5NSAxLjQxNC0uNTg2YTIgMiAwIDAwMC0yLjgyOGwtMTAtMTBhMiAyIDAgMDAtMi44MjggMGwtMTAgMTBhMiAyIDAgMTAyLjgyOCAyLjgyOHoiPjwvcGF0aD48cGF0aCBkPSJNNTAgNDBhMiAyIDAgMDAtMiAydjhjMCAxLjEwMy0uODk3IDItMiAySDE4Yy0xLjEwMyAwLTItLjg5Ny0yLTJ2LThhMiAyIDAgMDAtNCAwdjhjMCAzLjMwOSAyLjY5MSA2IDYgNmgyOGMzLjMwOSAwIDYtMi42OTEgNi02di04YTIgMiAwIDAwLTItMnoiPjwvcGF0aD48L3N2Zz4K"})`

  const deleteText = getResponsiveSetting(settings, 'delete', device, '')
  return `
    <div className="input-gallery-wrapper">
      <label class="bp3-file-input bp3-file-input_preview input-gallery__item" style="background-image: ${backgroundImageUrl}">
        <input name="[]" multiple="" type="file">
          <span class="bp3-file-upload-input">
            Choose file...
          </span>
        </label>
    </div>
  `
}