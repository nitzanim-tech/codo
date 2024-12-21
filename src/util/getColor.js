export default function getColor(score) {
  score /= 100;
  const START = [255, 123, 217];
  const END = [88, 134, 255];
  const diffs = START.map((x, i) => END[i] - x);
  const res = START.map((x, i) => x + score * diffs[i]);
  return `rgb(${Math.round(res[0])}, ${Math.round(res[1])}, ${Math.round(res[2])})`;
}
