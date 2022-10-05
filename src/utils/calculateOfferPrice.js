import constants from "../services/constants";
import {
  checkAnyTshirtExist,
  getItemsCategorySize,
  removeEmptyTshirtType,
  sortTshirtItem,
} from "./itemsListHelper";

const oneShirtPrice = constants.ONE_SHIRT_PRIZE;

//Return the amount of eligible discount on total unique items
const getPercentageOfDiscount = (uniqueItems) => {
  if (uniqueItems === 5) return constants.FIVE_ITEMS_DISCOUNT;
  else if (uniqueItems === 4) return constants.FOUR_ITEMS_DISCOUNT;
  else if (uniqueItems === 3) return constants.THREE_ITEMS_DISCOUNT;
  else if (uniqueItems === 2) return constants.TWO_ITEMS_DISCOUNT;
  else return 1;
};

//Calculates the total cost after applied discount. Can be consider as greedy algorithm
const basicAlgorithm = (tshirtItemsByCategory) => {
  //Initilizing requried variables
  let totalCartCost = 0;
  let tempTshirtItemsByCategory = tshirtItemsByCategory;

  //Loop until all items are calculated towards billing
  while (checkAnyTshirtExist(tempTshirtItemsByCategory)) {
    let numberOfDifferentTshirt = 0;
    let remainingItemsBag = {}; // keeps track of unbilled items

    tempTshirtItemsByCategory = removeEmptyTshirtType(
      tempTshirtItemsByCategory
    );

    //Put the items in the bag which are already counted toward the final billing
    for (let i = 0; i < tempTshirtItemsByCategory.length; i++) {
      if (tempTshirtItemsByCategory[i][1] - 1 > 0) {
        remainingItemsBag[tempTshirtItemsByCategory[i][0]] =
          tempTshirtItemsByCategory[i][1] - 1;
      }
      numberOfDifferentTshirt++;
    }

    //Calculating the cost based on current item in the final billing
    totalCartCost =
      totalCartCost +
      numberOfDifferentTshirt *
        oneShirtPrice *
        getPercentageOfDiscount(numberOfDifferentTshirt);

    tempTshirtItemsByCategory = remainingItemsBag;
  }
  return totalCartCost;
};

//Picks one item from the provide category
const pickOneItem = (tshirtsItemCategory, remainingQuantities) => {
  if (tshirtsItemCategory[1] - 1 > 0) {
    remainingQuantities[tshirtsItemCategory[0]] = tshirtsItemCategory[1] - 1;
  }
};

//Selects items smartly towards the billing
const smartAlorithmOfSelectingItems = (tshirtItemsByCategory) => {
  let totalCartCost = 0;
  let tempTshirtItemsByCategory = tshirtItemsByCategory;

  //Loop until all items are not finished billing
  while (checkAnyTshirtExist(tempTshirtItemsByCategory)) {
    //If total items category is less than 4 call the basic algorithm
    if (getItemsCategorySize(tempTshirtItemsByCategory) < 4) {
      totalCartCost += basicAlgorithm(tempTshirtItemsByCategory);
      break;
    }

    let remainingItemsBag = {};
    let sortedTshirtItems = sortTshirtItem(tempTshirtItemsByCategory);

    sortedTshirtItems = sortedTshirtItems.filter((shirt) => {
      return shirt[1] > 0;
    });

    // tempTshirtItemsByCategory = removeEmptyTshirtType(
    //   tempTshirtItemsByCategory
    // );

    pickOneItem(sortedTshirtItems[0], remainingItemsBag); //Pick one from each Category provided and put rest in remaining item bags
    pickOneItem(sortedTshirtItems[1], remainingItemsBag);
    pickOneItem(sortedTshirtItems[2], remainingItemsBag);
    pickOneItem(
      sortedTshirtItems[sortedTshirtItems.length - 1],
      remainingItemsBag
    );

    for (let i = 3; i < sortedTshirtItems.length - 1; i++) {
      remainingItemsBag[sortedTshirtItems[i][0]] = sortedTshirtItems[i][1];
    }

    //Calculate the price for four picked items
    totalCartCost =
      totalCartCost + 4 * oneShirtPrice * getPercentageOfDiscount(4);
    tempTshirtItemsByCategory = remainingItemsBag;
  }
  return totalCartCost;
};

export const calculateBestCartPrize = (tshirtItemsByCategory) => {
  //If no items pressent in cart return 0
  if (!checkAnyTshirtExist(tshirtItemsByCategory)) {
    return 0;
  }
  let tshirtsTypeInCart = Object.keys(tshirtItemsByCategory).filter(
    (tshirtType) => tshirtItemsByCategory[tshirtType] > 0
  );

  //If only one type of item in cart return total cost of those individual items
  if (tshirtsTypeInCart?.length == 1) {
    return tshirtItemsByCategory[tshirtsTypeInCart[0]] * oneShirtPrice;
  } else {
    //Calculate best possible sets of outcome using below two algorithm
    const costOfbasicAlgorithm = basicAlgorithm(tshirtItemsByCategory);
    const costOfsmartAlorithmOfSelectingItems = smartAlorithmOfSelectingItems(
      tshirtItemsByCategory
    );
    console.log("====================================");
    console.log("costOfbasicAlgorithm", costOfbasicAlgorithm);
    console.log(
      "costOfsmartAlorithmOfSelectingItems",
      costOfsmartAlorithmOfSelectingItems
    );
    console.log("====================================");
    return Math.min(costOfsmartAlorithmOfSelectingItems, costOfbasicAlgorithm);
  }
};
