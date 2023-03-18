import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import ItemComponent from "./components/ItemComponent";
import { TshirtItems } from "./services/mockData";
import { Alert, Link } from "@mui/material";
import { calculateBestCartPrize } from "./utils/calculateOfferPrice";
import { StringConstants } from "./services/constants";

const theme = createTheme();

const SelectItemsScreen = () => {
  const [quantity, setQuantity] = useState([0, 0, 0, 0, 0]);
  const [finalCartPrice, setFinalCartPrice] = useState(0);

  useEffect(() => {
    let tshirtItemsByCategory = {
      category1: quantity[0],
      category2: quantity[1],
      category3: quantity[2],
      category4: quantity[3],
      category5: quantity[4],
    };
    const finalPrice = calculateBestCartPrize(tshirtItemsByCategory);
    setFinalCartPrice(finalPrice);
  }, [quantity]);

  const handleMinusButtonClicked = (index) => {
    let newQuantity = [...quantity];
    newQuantity[index] = newQuantity[index] - 1;
    setQuantity(newQuantity);
  };
  const handleIncreamentButtonClick = (index) => {
    let newQuantity = [...quantity];
    newQuantity[index] = newQuantity[index] + 1;
    setQuantity(newQuantity);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 2 }} />
          <Typography variant="h5" noWrap>
            {StringConstants.MENU_TITLE}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 4,
            pb: 3,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {StringConstants.HEADING}
            </Typography>
            <Box style={{ position: "fixed", width: "30%" }}>
              {!finalCartPrice > 0 ? (
                <Alert severity="warning">
                  {StringConstants.WARNING_MESSAGE}
                  🙂{" "}
                </Alert>
              ) : (
                <Alert severity="info">
                  {StringConstants.TOTAL_PRICE_MESSAGE}

                  <b>{finalCartPrice}</b>
                </Alert>
              )}
            </Box>

            <br />
            <br />
          </Container>
        </Box>
        <Container sx={{ py: 1 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {TshirtItems.map((card, index) => (
              <ItemComponent
                key={card.id}
                id={card.id}
                image={card.image}
                imageName={card.imageName}
                description={card.description}
                buttonDisabled={!quantity[index] > 0}
                categoryName={card.categoryName}
                quantity={quantity[index]}
                onDecreamentButtonClick={() => {
                  handleMinusButtonClicked(index);
                }}
                onIncreamentButtonClick={() => {
                  handleIncreamentButtonClick(index);
                }}
              />
            ))}
          </Grid>
        </Container>
        <br />
        <br />
        <Link
          target="_blank"
          variant="h4"
          href="https://pshah.ca/storeAssignment/store_discount_project_demo.pdf"
        >
          Click here to view the requirements
        </Link>
        <br />
        <br />
        <br />
      </main>
    </ThemeProvider>
  );
};

export default SelectItemsScreen;
