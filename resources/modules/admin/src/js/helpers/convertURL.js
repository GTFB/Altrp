import webpSupport from "./webpSupport";

export default function convertUrl(url) {
  url = url.split('.')
  url[url.length - 2] = `${url[url.length - 2]}_150x150`
  if(['jpg', 'jpeg', 'png'].includes(url[url.length - 1]) && webpSupport()){
    url[url.length - 1] = 'webp'
  }
  url = url.join('.')
  return url;
}
