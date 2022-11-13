
export default function altrpRandomId() {
  return Math.random()
    .toString(36)
    .substring(2, 9);
}
