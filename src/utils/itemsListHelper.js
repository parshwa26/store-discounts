//return the count of total unique categories remaining
export const getItemsCategorySize = (tshirtItemsByCategory) => {
  let temp = Object.keys(tshirtItemsByCategory).filter(
    (tshirtType) => tshirtItemsByCategory[tshirtType] > 0
  );
  return temp?.length;
};

//return the highest items quanttity in order
export const sortTshirtItem = (tshirtItemsByCategory) => {
  const entries = Object.entries(tshirtItemsByCategory);

  entries.sort((a, b) => {
    return (Object.values(a)[1] < Object.values(b)[1]) - 0.5;
  });

  return entries;
};

// Removes the category of tshirts if quantity is zero
export const removeEmptyTshirtType = (tshirtItemsByCategory) => {
  const tshirtItemsEntries = Object.entries(tshirtItemsByCategory);
  let removedEmptyTshirtType = tshirtItemsEntries.filter((quantity) => {
    return Object.values(quantity)[1] > 0; // Only return if items qauntity of that category is greater than 0
  });
  return removedEmptyTshirtType;
};

// Check if there are any items category remaining to be billed
export const checkAnyTshirtExist = (tshirtItemsByCategory) => {
  let remainingItemsToBeBilled = Object.keys(tshirtItemsByCategory).filter(
    (quantity) => tshirtItemsByCategory[quantity] > 0
  );
  if (remainingItemsToBeBilled?.length === 0) {
    return false;
  }
  return true;
};
