import { render, fireEvent } from "@testing-library/react";
import ItemComponent from "./ItemComponent";
import Dress_Shirt from "../images/Dress_Shirt.jpg";

const props = {
  key: 1,
  id: 1,
  image: Dress_Shirt,
  imageName: "dress shirt",
  description: "this is description",
  buttonDisabled: "false",
  categoryName: "category1",
  quantity: "4",
  onDecreamentButtonClick: {},
  onIncreamentButtonClick: {},
};

test("Check the item component renders", () => {
  const { getByText } = render(<ItemComponent {...props} />);

  const title = getByText(/dress shirt/);
  expect(title).not.toBeNull();
});

test("Check selected item renders", () => {
  const { getByText } = render(<ItemComponent {...props} />);

  const quantity = getByText(/4/);
  expect(quantity).not.toBeNull();
});

test("Check wether description is displayed", () => {
  const { getByText } = render(<ItemComponent {...props} />);

  const quantity = getByText(/this is description/);
  expect(quantity).not.toBeNull();
});
