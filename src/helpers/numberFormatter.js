export default function numberFormtater(value) {
  return new Intl.NumberFormat().format(value);
}
