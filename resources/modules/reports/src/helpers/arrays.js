export const swap = (arr = [], start = 0, end = 0) => {
  let result = new Map();
  arr.map((_, index) => {
    switch (index) {
      case start:
        return result.set(index, arr[end]);
      case end:
        return result.set(index, arr[start]);
      default:
        return result.set(index, arr[index]);
    }
  });
  return Array.from(result.values());
};
