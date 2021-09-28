export const ADD_IMAGE = 'ADD_IMAGE';
export const REMOVE_IMAGE = 'REMOVE_IMAGE';
/**
 *
 * @param {string} image
 * @param {string} storeName
 * @return {{type: string, image: {}, storeName:string}}
 */
export const addImageToLightboxStorage = (image, storeName) => {
  return {
    type: ADD_IMAGE,
    image,
    storeName,
  };
};

/**
 *
 * @param {string} image
 * @param {string} storeName
 * @return {{type: string, image: {}, storeName:string}}
 */
export const removeImageFromLightbox = (image, storeName) => {
  return {
    type: REMOVE_IMAGE,
    image,
    storeName,
  };
};
