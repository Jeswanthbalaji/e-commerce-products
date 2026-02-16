import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/products/${id}`, form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Edit Product</h2>
      <input name="title" value={form.title || ""} onChange={handleChange} />
      <input name="price" value={form.price || ""} onChange={handleChange} />
      <input name="image" value={form.image || ""} onChange={handleChange} />
      <input name="category" value={form.category || ""} onChange={handleChange} />
      <textarea name="description" value={form.description || ""} onChange={handleChange} />
      <button className="btn">Update</button>
    </form>
  );
};

export default EditProduct;
