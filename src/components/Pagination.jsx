import React from "react";
import { Button } from "@mui/material";

const Pagination = ({ page, setPage }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
        gap: "20px",
      }}
    >
      {/* Previous Button */}
      <Button
        variant="outlined"
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        style={{
          padding: "10px 20px",
          backgroundColor: page === 0 ? "#EEEEEE" : "#9B7EBD",
          color: "#3B1E54",
          fontWeight: "bold",
          borderRadius: "30px",
          borderColor: "#9B7EBD",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D4BEE4")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = page === 0 ? "#EEEEEE" : "#9B7EBD")}
      >
        Previous
      </Button>

      {/* Next Button */}
      <Button
        variant="outlined"
        onClick={() => setPage(page + 1)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#9B7EBD",
          color: "#3B1E54",
          fontWeight: "bold",
          borderRadius: "30px",
          borderColor: "#9B7EBD",
          transition: "background-color 0.3s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#D4BEE4")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#9B7EBD")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
