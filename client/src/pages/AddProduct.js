import  { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({ title: "", price: "", description: "", image: "", category: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.description) {
      alert("Please fill in all required fields");
      return;
    }
    if (!form.title || !form.price || !form.description) {
      alert("Please fill in all required fields");
      return;
    }
    await API.post("/products", form);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Product</h2>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <button className="btn">Add</button>
    </form>
  );
};

export default AddProduct;
