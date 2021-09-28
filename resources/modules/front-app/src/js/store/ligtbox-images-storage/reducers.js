import { ADD_IMAGE, REMOVE_IMAGE } from "./actions";
import mutate from "dot-prop-immutable";

const initialStore = {}
/**
 *
 * @param {{}} store
 * @param {string} type
 * @param {string} image
 * @param {string} storeName
 * @returns {{}}
 */
export const lightboxImagesReducer = (store = initialStore, { type, image, storeName }) => {
  if(_.isNumber(storeName)){
    storeName = storeName + ''
  }
  switch (type) {
    case ADD_IMAGE:{
      let lightboxImages = store[storeName] || [];
      if(! lightboxImages.find(i=>image === i)){
        lightboxImages.push(image)
        lightboxImages = [...lightboxImages]
        store = mutate.set(store, storeName, lightboxImages)
      }
    }break;
    case REMOVE_IMAGE:{
      let lightboxImages = store[storeName] || [];
      if( lightboxImages.find(i=>image === i)) {
        lightboxImages = lightboxImages.filter(i => image !== i)
        lightboxImages = [...lightboxImages]
        store = mutate.set(store, storeName, lightboxImages)
      }
    }break
  }
  return store;
};
