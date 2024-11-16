import React, { useState, useEffect } from "react";
import useFetchProducts from "../hooks/useFetchProducts";
import useCart from "../hooks/useCart";
import Pagination from "./Pagination";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const { products, loading } = useFetchProducts(page, 6); // Limit to 6 products per page
  const { cart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = existingCart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(existingCart));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...existingCart, { ...product, quantity: 1 }])
      );
    }
    alert("Product added to cart!");
  };

  return (
    <div>
      {/* Header with Cart Icon */}
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "linear-gradient(90deg, #3B1E54, #9B7EBD)",
    color: "#EEEEEE",
    borderBottom: "4px solid #D4BEE4",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  }}
>
  {/* Title */}
  <Typography 
    variant="h4" 
    style={{
      fontWeight: "bold", 
      textTransform: "uppercase",
      color: "#EEEEEE",
      letterSpacing: "1px",
    }}
  >
    Product Dashboard
  </Typography>
  
  {/* Cart Icon */}
  <IconButton
    onClick={() => navigate("/cart")}
    aria-label="cart"
    style={{
      backgroundColor: "#9B7EBD",
      padding: "10px",
      borderRadius: "50%",
      transition: "background-color 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D4BEE4")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#9B7EBD")}
  >
    <Badge
      badgeContent={cart.reduce((sum, item) => sum + item.quantity, 0)}
      color="secondary"
    >
      <ShoppingCartIcon style={{ color: "#3B1E54" }} />
    </Badge>
  </IconButton>
</div>


      <div
  style={{
    position: "relative",
    width: "100%",
    margin: "20px 0",
    display: "flex",
    justifyContent: "center",
  }}
>
  {/* Stylish Search Bar */}
  <TextField
    variant="outlined"
    size="small"
    placeholder="🔍 Search Products"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    fullWidth
    style={{
      background: "linear-gradient(90deg, #9B7EBD, #D4BEE4)",
      borderRadius: "30px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      fontWeight: "bold",
      color: "#3B1E54",
    }}
    InputProps={{
      style: {
        padding: "10px 20px",
        border: "2px solid #3B1E54",
        borderRadius: "30px",
        fontSize: "1rem",
        transition: "box-shadow 0.3s ease",
      },
      onFocus: (e) => {
        e.target.style.boxShadow = "0 0 15px #9B7EBD";
      },
      onBlur: (e) => {
        e.target.style.boxShadow = "none";
      },
    }}
  />
</div>

      {/* Products Grid */}
{loading ? (
  <Typography 
    style={{
      textAlign: "center",
      fontSize: "1.5rem",
      color: "#3B1E54",
      marginTop: "20px",
    }}
  >
    Loading...
  </Typography>
) : (
  <Grid container spacing={3} style={{ marginTop: "20px" }}>
    {filteredProducts.map((product) => (
      <Grid 
        item 
        xs={12} 
        sm={6} 
        md={4} 
        key={product.id} 
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            maxWidth: "300px",
            background: "linear-gradient(145deg, #EEEEEE, #D4BEE4)",
            borderRadius: "15px",
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
          <CardContent style={{ padding: "20px", textAlign: "center" }}>
            <Typography 
              variant="h6" 
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
                color: "#3B1E54",
              }}
            >
              {product.title}
            </Typography>
            <Typography 
              style={{
                fontSize: "1.2rem",
                marginBottom: "15px",
                color: "#3B1E54",
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#9B7EBD",
                color: "#EEEEEE",
                fontWeight: "bold",
                borderRadius: "20px",
                padding: "10px 20px",
                textTransform: "none",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#D4BEE4")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#9B7EBD")
              }
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}

      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default Dashboard;
