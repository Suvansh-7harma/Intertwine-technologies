import { useState, useEffect } from "react"; // Import React hooks
import axios from "axios"; // Import Axios for API requests

const useFetchProducts = (page, limit = 6) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`
      );
      setProducts(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, [page, limit]);

  return { products, loading };
};

export default useFetchProducts;
