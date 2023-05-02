function convertToDecimal(romanNumeral) {
  console.log(romanNumeral.length, "romanNumeral.length");
  const lookupTable = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let decimalNum = 0;

  for (let i = 0; i < romanNumeral.length; i++) {
    const currentNum = lookupTable[romanNumeral[i]];
    const nextNum = lookupTable[romanNumeral[i + 1]];

    if (currentNum < nextNum) {
      decimalNum -= currentNum;
    } else {
      decimalNum += currentNum;
    }
  }

  const iterateIntoArray = (number) => {
    const result = [];
    for (let i = 0; i < number; i++) {
      result.push(i);
    }
    return result;
  };
  console.log(iterateIntoArray(decimalNum));
  return iterateIntoArray(decimalNum);
}
