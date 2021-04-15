export const GET_CUSTOM_FONTS = 'GET_CUSTOM_FONTS';

export function getCustomFonts(metaValue){
  return {
    type: GET_CUSTOM_FONTS,
    metaValue,
  }
}
