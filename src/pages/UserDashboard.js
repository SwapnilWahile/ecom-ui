import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let storedProducts = JSON.parse(localStorage.getItem("products"));

    if (!storedProducts || storedProducts.length === 0) {
      storedProducts = [
        { id: 1, name: "Laptop", price: 50000 },
        { id: 2, name: "Mobile Phone", price: 20000 },
      ];
      localStorage.setItem("products", JSON.stringify(storedProducts));
    }

    setProducts(storedProducts);
  }, []);

  const addToCart = (product) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) return;

  const cartKey = `cart_${currentUser.id}`;
  const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem(cartKey, JSON.stringify(cart));
  alert("Product added to cart");
};


  return (
    <div>
      <h4 className="mb-4">User Dashboard</h4>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4 col-sm-6 mb-4" key={p.id}>
              <div className="card h-100 shadow-sm">

                <img
                  src=""
                  className="card-img-top m-2"
                  alt={p.name}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text fw-bold">₹{p.price}</p>

                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => addToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
