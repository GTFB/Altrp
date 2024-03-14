export default async function setValue(prop: string, value: any) {
  globalCache[prop] = value

}
