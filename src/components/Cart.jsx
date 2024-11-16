import React from "react";
import useCart from "../hooks/useCart";
import { Button, Typography, Grid, Card, CardContent, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const { cart, updateCart } = useCart();

  const handleQuantityChange = (productId, amount) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0);
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
      <Typography variant="h4" gutterBottom align="center" style={{ color: "#3B1E54" }}>
        Your Cart
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {cart.length === 0 ? (
          <Typography variant="h5" align="center" style={{ width: "100%", color: "#9B7EBD" }}>
            Your cart is empty
          </Typography>
        ) : (
          cart.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id} style={{ display: "flex", justifyContent: "center" }}>
              <Card
                style={{
                  maxWidth: "350px",
                  backgroundColor: "#D4BEE4",
                  borderRadius: "10px",
                  boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 12px 20px rgba(0, 0, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
                }}
              >
                <CardContent style={{ textAlign: "center", padding: "15px" }}>
                  <Typography variant="h6" style={{ color: "#3B1E54", fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" style={{ color: "#9B7EBD", margin: "10px 0" }}>
                    ${item.price} x {item.quantity}
                  </Typography>
                  <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleQuantityChange(item.id, -1)}
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
                    onClick={() => handleQuantityChange(item.id, 0)}
                    style={{
                      color: "#3B1E54",
                      marginTop: "10px",
                      backgroundColor: "#D4BEE4",
                      borderRadius: "50%",
                      padding: "5px",
                    }}
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
          color="secondary"
          onClick={handleClearCart}
          style={{
            marginTop: "20px",
            padding: "10px 30px",
            backgroundColor: "#9B7EBD",
            color: "#EEEEEE",
            borderRadius: "30px",
            fontWeight: "bold",
            textTransform: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#D4BEE4")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#9B7EBD")
          }
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
