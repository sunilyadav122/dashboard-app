import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stats,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          gutterBottom
          color={theme.palette.secondary[700]}
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2" nowrap >{description}</Typography>
        <CardActions> 
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
        </CardActions>
      </CardContent>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stats[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stats[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

function Products() {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="1.5rem 1rem">
      <Header title="Products" subtitle="See your list of products" />
      {data?.productsWithStats || !isLoading ? (
        <Box  mt="1.3rem">
          <Grid container spacing={2}>
            {data?.productsWithStats.map((prod) => (
              <Grid item xs={12} sm={6} md={3} key={prod._id}>
                <Product
                  _id={prod._id}
                  name={prod.name}
                  description={prod.description}
                  price={prod.price}
                  rating={prod.rating}
                  category={prod.category}
                  supply={prod.supply}
                  stats={prod.stats}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Grid container justifyContent={"center"} alignItems={"center"}>
          <Grid item md={12}>
            <CircularProgress color="inherit" />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Products;
