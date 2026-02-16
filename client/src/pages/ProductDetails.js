import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="details-card">
        <img src={product.image} alt={product.title} className="details-img" />
        <div className="details-info">
          <h2>{product.title}</h2>
          <p className="details-price">${product.price}</p>
          <p className="details-desc">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
