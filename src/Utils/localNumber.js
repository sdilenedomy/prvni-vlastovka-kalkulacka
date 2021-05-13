import i18next from 'i18next';

export default function localNumber(number) {
  return number.toLocaleString(i18next.language);
}
