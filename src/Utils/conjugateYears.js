export default function conjugateYears(nYears) {
  if (nYears === 1) {
    return 'rok';
  } if (nYears >= 2 && nYears <= 4) {
    return 'roky';
  }
  return 'let';
}
