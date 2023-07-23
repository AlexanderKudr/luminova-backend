// const array = [1, 2, 3, 4];

// const t0 = performance.now();

// array.length = 10000000;
// const result = array.fill(0, 4, 10000000);

// const t1 = performance.now();
// console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

// console.log(result);
// let prices = {
//   banana: 3,
//   orange: 10,
//   meat: 4,
// };
// const values = Object.values(prices)
// const test = Object.fromEntries(values.map((value) => [value, value * 2]));
// console.log(test, 'test')

const data = [1, 2, 3, 4];
const waitForData = async <T>(array: T): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(array), 1000);
  });
};

const result = await waitForData<typeof data>(data);

export {};
console.log(result);

