export function randInt(start: number, end: number) {
  if (end <= start) return 0;

  return Math.floor(Math.random() * (start - end + 1)) + end;
}
