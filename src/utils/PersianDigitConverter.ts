function PersianDigitConverter(digits: string) {
  const map = [
    '۰',
    '۱',
    '۲',
    '۳',
    '۴',
    '۵',
    '۶',
    '۷',
    '۸',
    '۹',
  ];
  let value = '';
  for(let i = 0; i < digits.length; i++) {
    value += map[digits[i]];
  }
  return value;
}

export {
  PersianDigitConverter,
};
