import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleAddProduct = (e) => {
    e.preventDefault();

    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.push({
      id: Date.now(),
      name,
      price,
    });

    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added successfully");

    navigate("/admin-products");
  };

  return (
    <div className="card p-4">
      <h4>Add Product (Admin)</h4>

      <form onSubmit={handleAddProduct}>
        <input
          className="form-control mb-3"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <button className="btn btn-success w-100">Add Product</button>
      </form>
    </div>
  );
}
