export function redirect(url) {
  url = url || '/';
  window.location.assign(url);
}
export function generateId(){
  return '_' + Math.random().toString(36).substr(2, 9);
}