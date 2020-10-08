export function tempConvert(temp) {
  temp = ((temp - 273.15) * 9) / 5 + 32;
  return Math.floor(temp);
}
