import getResponsiveSetting from '../getResponsiveSetting';

export default function renderInputGallery(settings, device, ) {
  let backgroundImageUrl = `url(${getResponsiveSetting(settings, 'placeholder', device)?.url || "data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDY0IDY0IiB3aWR0aD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIj48cGF0aCBkPSJNMjMuNDE0IDIxLjQxNEwzMCAxNC44MjhWNDRhMiAyIDAgMDA0IDBWMTQuODI4bDYuNTg2IDYuNTg2Yy4zOS4zOTEuOTAyLjU4NiAxLjQxNC41ODZzMS4wMjQtLjE5NSAxLjQxNC0uNTg2YTIgMiAwIDAwMC0yLjgyOGwtMTAtMTBhMiAyIDAgMDAtMi44MjggMGwtMTAgMTBhMiAyIDAgMTAyLjgyOCAyLjgyOHoiPjwvcGF0aD48cGF0aCBkPSJNNTAgNDBhMiAyIDAgMDAtMiAydjhjMCAxLjEwMy0uODk3IDItMiAySDE4Yy0xLjEwMyAwLTItLjg5Ny0yLTJ2LThhMiAyIDAgMDAtNCAwdjhjMCAzLjMwOSAyLjY5MSA2IDYgNmgyOGMzLjMwOSAwIDYtMi42OTEgNi02di04YTIgMiAwIDAwLTItMnoiPjwvcGF0aD48L3N2Zz4K"})`
  let defaultValue = getResponsiveSetting(settings, 'default_value', device)
  if(defaultValue.indexOf('{{') === 0){
    defaultValue = defaultValue.replace('}}', '.url}}')
    backgroundImageUrl =`url(${defaultValue})`
  }
  // const deleteText = getResponsiveSetting(settings, 'delete', device, '')
  return `
    <div class="input-gallery-wrapper">
<!--      <div class="input-gallery__item" style="background-image: url(&quot;undefined&quot;);">-->
<!--        <svg class="input-gallery__delete" width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.583 5.354L9.23 1.707 8.523 1 4.9 4.622 1.753 1.024 1 1.683l3.212 3.67L1 9.025l.753.659L4.9 6.085l3.622 3.622L9.23 9 5.583 5.354z" fill="#343B4C"></path>-->
<!--          <path d="M9.23 1.707l.177.177.176-.177-.176-.177-.177.177zM5.583 5.354l-.176-.177-.177.177.177.176.176-.176zM8.523 1L8.7.823 8.523.646l-.177.177.177.177zM4.9 4.622l-.188.165.175.2.19-.188-.177-.177zM1.753 1.024L1.94.86 1.776.672l-.188.164.165.188zM1 1.683l-.165-.188-.188.164.165.188L1 1.683zm3.212 3.67l.188.165.144-.164-.144-.165-.188.165zM1 9.025L.812 8.86l-.165.188.188.164L1 9.024zm.753.659l-.165.188.188.165.165-.189-.188-.164zM4.9 6.085l.176-.177-.189-.189-.175.201.188.165zm3.622 3.622l-.177.177.177.177.177-.177-.177-.177zM9.23 9l.177.177L9.583 9l-.176-.177L9.23 9zm-.177-7.47L5.407 5.177l.353.353 3.647-3.646-.354-.354zm-.707-.353l.707.707.354-.354L8.7.823l-.354.354zM5.077 4.799L8.7 1.177 8.346.823 4.724 4.445l.353.354zm-3.513-3.61l3.149 3.598.376-.33L1.94.86l-.377.329zm-.4.682l.753-.659-.33-.376-.752.659.33.376zM4.4 5.189l-3.212-3.67-.376.328 3.212 3.671.376-.33zm-.376 0L.812 8.859l.376.33L4.4 5.519l-.376-.33zM.835 9.212l.753.659.33-.376-.753-.659-.33.376zm1.106.635L5.089 6.25l-.377-.33-3.148 3.598.377.33zm2.783-3.585l3.622 3.622.354-.354-3.623-3.622-.353.354zM8.7 9.884l.707-.707-.354-.354-.707.707.354.354zm.707-1.06L5.76 5.176l-.353.353 3.646 3.647.354-.354z" fill="#000"></path>-->
<!--        </svg>-->
<!--      </div>-->
      <label class="bp3-file-input bp3-file-input_preview input-gallery__item" style="background-image: ${backgroundImageUrl};">
        <input name="[]" multiple="" type="file">
        <span class="bp3-file-upload-input">Choose file...</span>
      </label>
    </div>
  `
}
