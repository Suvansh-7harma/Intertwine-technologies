import React from "react";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useCart from "../hooks/useCart";

const Cart = () => {
  const { cart, updateCart } = useCart();

  const handleQuantityChange = (productId, amount) => {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: Math.max(item.quantity + amount, 1) }
        : item
    );
    updateCart(updatedCart);
  };

  const handleDeleteProduct = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    updateCart(updatedCart);
  };

  const handleClearCart = () => {
    updateCart([]);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px", backgroundColor: "#F4F4F9" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ color: "#3B1E54" }}
      >
        Your Cart
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {cart.length === 0 ? (
          <Typography
            variant="h5"
            align="center"
            style={{ width: "100%", color: "#9B7EBD" }}
          >
            Your cart is empty
          </Typography>
        ) : (
          cart.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card
                style={{
                  maxWidth: "350px",
                  backgroundColor: "#D4BEE4",
                  borderRadius: "10px",
                  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent style={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    style={{ color: "#3B1E54", fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{ color: "#9B7EBD", margin: "10px 0" }}
                  >
                    ${item.price} x {item.quantity}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity === 1}
                      style={{
                        padding: "5px 15px",
                        borderRadius: "20px",
                        borderColor: "#9B7EBD",
                        fontWeight: "bold",
                      }}
                    >
                      -
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleQuantityChange(item.id, 1)}
                      style={{
                        padding: "5px 15px",
                        borderRadius: "20px",
                        borderColor: "#9B7EBD",
                        fontWeight: "bold",
                      }}
                    >
                      +
                    </Button>
                  </div>
                  <IconButton
                    onClick={() => handleDeleteProduct(item.id)}
                    style={{ color: "#3B1E54", marginTop: "10px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography variant="h5" style={{ color: "#3B1E54" }}>
          Total: ${totalPrice.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          onClick={handleClearCart}
          style={{
            marginTop: "20px",
            padding: "10px 30px",
            backgroundColor: "#9B7EBD",
            color: "#EEEEEE",
            borderRadius: "30px",
            fontWeight: "bold",
          }}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
