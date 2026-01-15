import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const cartKey = `cart_${currentUser.id}`;
    const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];

    setCart(storedCart);
  }, []);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handlePayment = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const cartKey = `cart_${currentUser.id}`;

    alert(`Payment successful via ${paymentMethod}`);
    localStorage.removeItem(cartKey);
    setCart([]);
    setShowModal(false);
  };

  return (
    <div>
      <h4>My Cart</h4>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.price * item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5 className="text-end">Grand Total: ₹{totalAmount}</h5>

          <button
            className="btn btn-success float-end"
            onClick={() => setShowModal(true)}
          >
            Proceed to Payment
          </button>

          {showModal && (
            <div
              className="modal fade show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Payment Checkout</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>

                  <div className="modal-body">
                    <p>
                      <b>Total Amount:</b> ₹{totalAmount}
                    </p>

                    {/* Payment Methods */}
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={paymentMethod === "UPI"}
                        onChange={() => setPaymentMethod("UPI")}
                      />
                      <label className="form-check-label">UPI</label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={paymentMethod === "Card"}
                        onChange={() => setPaymentMethod("Card")}
                      />
                      <label className="form-check-label">
                        Debit / Credit Card
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                      />
                      <label className="form-check-label">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-success" onClick={handlePayment}>
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Backdrop */}
              {/* <div className="modal-backdrop fade show"></div> */}
            </div>
          )}
        </>
      )}
    </div>
  );
}
