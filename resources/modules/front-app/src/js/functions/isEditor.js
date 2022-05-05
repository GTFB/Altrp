
/**
 * @return {boolean}
 * */
export default function isEditor() {
  const path = window.location?.pathname;
  return path?.includes("/admin/editor") || false;
}
