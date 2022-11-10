import renderAsset from './../renderAsset';
import replaceContentWithData from "../string/replaceContentWithData";

// @ts-ignore
export default function renderIcon(settings, device, context) {
  const titleText = settings.title_text === undefined ? 'Title' : settings.title_text
  const dynamicTag = settings.title_tag || 'h3'
  return `<div class='icon-widget-wrapper'>
    <span class="icon-widget__icon">${settings.icon?.id ? renderAsset(settings.icon) : `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 32C7.168 32 0 24.832 0 16C0 7.168 7.168 0 16 0C24.832 0 32 7.168 32 16C32 24.832 24.832 32 16 32ZM16 1.344C7.904 1.344 1.344 7.904 1.344 16C1.344 24.096 7.904 30.656 16 30.656C24.096 30.656 30.656 24.096 30.656 16C30.656 7.904 24.096 1.344 16 1.344V1.344ZM22.016 25.344C21.888 25.344 21.76 25.28 21.632 25.216L16 21.472L10.368 25.216C10.144 25.376 9.824 25.376 9.6 25.216C9.376 25.056 9.28 24.768 9.344 24.48L11.232 17.6L5.6 13.184C5.376 13.024 5.28 12.704 5.376 12.448C5.472 12.192 5.728 12 6.016 12H12.896L15.392 5.76C15.584 5.248 16.416 5.248 16.608 5.76L19.104 12H26.016C26.272 12 26.528 12.192 26.624 12.448C26.72 12.704 26.624 13.024 26.4 13.184L20.768 17.6L22.656 24.48C22.72 24.768 22.624 25.056 22.4 25.216C22.272 25.28 22.144 25.344 22.016 25.344V25.344ZM16 20C16.128 20 16.256 20.032 16.384 20.096L20.896 23.136L19.36 17.504C19.296 17.248 19.392 16.96 19.584 16.8L24.064 13.344H18.656C18.4 13.344 18.144 13.152 18.048 12.928L16 7.808L13.952 12.896C13.856 13.152 13.6 13.344 13.344 13.344H7.936L12.416 16.8C12.608 16.96 12.704 17.248 12.64 17.504L11.104 23.136L15.616 20.096C15.744 20.032 15.872 20 16 20V20Z" fill="black"/>
</svg>`}</span>
    <div class="content">
      <${dynamicTag} class='title'>
         ${replaceContentWithData(titleText, context)}
      </${dynamicTag}>
      <div class="description">${settings.description === undefined ? 'Icon description' : settings.description}</div>
    </div>
  </div>`
}
