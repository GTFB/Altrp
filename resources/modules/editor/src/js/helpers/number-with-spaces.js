export default function numberWithSpaces(x, thousandsSeparatorValue = ' ') {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorValue);
  return parts.join(".");
}
