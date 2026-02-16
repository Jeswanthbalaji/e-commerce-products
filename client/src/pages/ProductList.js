import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await API.delete(`/products/${id}`);
    setProducts(products.filter(p => p._id !== id));
  };

  
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="main-title">My Store</h1>

<div className="controls">
  <input
    type="text"
    placeholder="Search by title..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <button className="btn add" onClick={() => navigate("/add")}>
    Add Product
  </button>
</div>


    
      <div className="grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(item => (
            <div key={item._id} className="card">
              <img src={item.image} alt={item.title} className="card-img" />
              <h3
                className="card-title"
                onClick={() => navigate(`/product/${item._id}`)}
              >
                {item.title}
              </h3>
              <p className="price">${item.price}</p>
              <button className="btn" onClick={() => navigate(`/edit/${item._id}`)}>
                Edit
              </button>
              <button className="btn delet" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
