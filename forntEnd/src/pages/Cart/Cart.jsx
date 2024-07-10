import { useSelector, useDispatch } from "react-redux";
import style from "./a.module.css";

import {
  deleteItemFromCartAsync,
  selectItems,
  updateCartAsync,
  selectCartLoaded,
} from "./CartSlice";
import { Link, Navigate } from "react-router-dom";
import Modal from "../../components/Common/Modal";
import { useState } from "react";

export default function Cart() {
  const [openModal, setOpenModal] = useState(null);

  const cartLoaded = useSelector(selectCartLoaded);

  const dispatch = useDispatch();

  const items = useSelector(selectItems);

  const totalAmount = items.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <>
      {items.length > 0 ? (
        <>
          {!items.length && cartLoaded && (
            <Navigate to="/" replace={true}></Navigate>
          )}

          <div class={style.cartcontainer}>
            <h1>Your Shopping Cart</h1>
            {items.map((item) => (
              <div class={style.item}>
                <img
                  src={item.product.thumbnail}
                  alt={item.product.thumbnail}
                />
                <div class={style.itemdetails}>
                  <div className={style.first}>
                    <p>{item.product.title}</p>
                    <p>${item.product.price}</p>
                  </div>
                  <div className={style.second}>
                    <label htmlFor="quantity">Qty</label>
                    <select
                      onChange={(e) => handleQuantity(e, item)}
                      value={item.quantity}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <Modal
                      title={`Delete ${item.product.title}`}
                      message="Are you sure you want to delete this Cart item ?"
                      dangerOption="Delete"
                      cancelOption="Cancel"
                      dangerAction={(e) => handleRemove(e, item.id)}
                      cancelAction={() => setOpenModal(null)}
                      showModal={openModal === item.id}
                    ></Modal>
                    <button
                      onClick={(e) => {
                        setOpenModal(item.id);
                      }}
                      type="button"
                      className={style.removeBtn}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div class={style.subtotal}>
              <p>
                totalItems: <span>{totalItems} items</span>
              </p>
              <p>
                Subtotal: <span> ${totalAmount}</span>
              </p>
            </div>

            <div class={style.actions}>
              <Link to="/checkout">
                <button class={style.checkout}>Checkout</button>{" "}
              </Link>

              <Link to="/" class={style.continueshopping}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-10 flex flex-column items-center justify-center gap-x-6">
            <h1 className={style.EmptyCart}>Your Cart is Empty</h1>
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </>
      )}
    </>
  );
}
