export default function processObject(obj, fn, key:null|number|string = null) {
  if (typeof obj !== 'object' || obj === null) {
// If the property is not an object or an array, apply the function to it
    return fn(obj, key);
  }

  if (Array.isArray(obj)) {
// If the property is an array, loop through each item and recursively call the same function for each item
    return obj.map((item, key) => processObject(item, fn, key));
  }

// If the property is an object, loop through each property and recursively call the same function for each property
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[key] = processObject(obj[key], fn, key);
  });
  return newObj;
}
