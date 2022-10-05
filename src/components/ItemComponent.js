import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

const ItemComponent = ({
  id,
  image,
  imageName,
  description,
  buttonDisabled,
  quantity,
  onDecreamentButtonClick,
  onIncreamentButtonClick,
}) => {
  return (
    <Grid item key={id} xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia component="img" src={image} alt={imageName} height="250" />

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {imageName}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
        <Typography align="left" ml={1} variant="subtitle1">
          Select quantity
        </Typography>
        <CardActions>
          <Button
            variant="contained"
            disabled={buttonDisabled}
            color="error"
            onClick={() => onDecreamentButtonClick()}
            data-testid={"decreament-button"}
          >
            <RemoveIcon />
          </Button>
          <Button variant="contained" disabled={true} color="error">
            <Typography marginX={5} color="black">
              {quantity}
            </Typography>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              onIncreamentButtonClick();
            }}
          >
            <AddIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ItemComponent;
