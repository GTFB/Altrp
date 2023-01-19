
export default function altrpRandomId():string {
  return Math.random()
    .toString(36)
    .substring(2, 9);
}
