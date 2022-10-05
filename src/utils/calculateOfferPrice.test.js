import { calculateBestCartPrize } from "./calculateOfferPrice";

let tshirtItemsByCategory_test1 = {
  category1: 0,
  category2: 0,
  category3: 0,
  category4: 0,
  category5: 0,
};

let tshirtItemsByCategory_test2 = {
  category1: 0,
  category2: 0,
  category3: 0,
  category4: 1,
  category5: 0,
};
let tshirtItemsByCategory_test3 = {
  category1: 0,
  category2: 0,
  category3: 0,
  category4: 5,
  category5: 0,
};

let tshirtItemsByCategory_test4 = {
  category1: 2,
  category2: 2,
  category3: 2,
  category4: 1,
  category5: 1,
};
let tshirtItemsByCategory_test5 = {
  category1: 1,
  category2: 1,
  category3: 0,
  category4: 0,
  category5: 0,
};
let tshirtItemsByCategory_test6 = {
  category1: 1,
  category2: 1,
  category3: 1,
  category4: 0,
  category5: 0,
};
let tshirtItemsByCategory_test7 = {
  category1: 1,
  category2: 1,
  category3: 1,
  category4: 1,
  category5: 0,
};
let tshirtItemsByCategory_test8 = {
  category1: 1,
  category2: 1,
  category3: 1,
  category4: 1,
  category5: 1,
};

test("Test1: check if function retuns 0 if no shirt is selected", () => {
  const finalPrice = calculateBestCartPrize(tshirtItemsByCategory_test1);
  expect(finalPrice).toEqual(0);
});

test("Test2: a single tshirt should cost 8", () => {
  const finalPrice = calculateBestCartPrize(tshirtItemsByCategory_test2);
  expect(finalPrice).toEqual(8);
});

test("Test3: 5 items of single category shouls return 40", () => {
  const finalPrice = calculateBestCartPrize(tshirtItemsByCategory_test3);
  expect(finalPrice).toEqual(40);
});

test("Test4: example given in the question should return 51.2", () => {
  const finalPrice = calculateBestCartPrize(tshirtItemsByCategory_test4);
  expect(finalPrice).toEqual(51.2);
});

test("Test5: buying two different items results in a 5% discount", () => {
  const finalPrice = calculateBestCartPrize(tshirtItemsByCategory_test5);
  expect(finalPrice).toEqual(15.2);
});

test("Test6: buying three different items results in a 10% discount", () => {
  const finalPrice = calculateBestCartPrize(tshirtItemsByCategory_test6);
  expect(finalPrice).toEqual(21.6);
});

test("Test7: buying four different items results in a 20% discount", () => {
  const finalPrice = calculateBestCartPrize(tshirtItemsByCategory_test7);
  expect(finalPrice).toEqual(25.6);
});

test("Test8: buying five different items results in a 25% discount", () => {
  const finalPrice = calculateBestCartPrize(tshirtItemsByCategory_test8);
  expect(finalPrice).toEqual(30);
});
