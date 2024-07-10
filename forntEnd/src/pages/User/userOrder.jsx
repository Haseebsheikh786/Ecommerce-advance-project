import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrderAsync,
  selectUserInfo,
  selectUserOrders,
} from "./userSlice";
import style from "./order.module.css";
import { selectLoggedInUser } from "../auth/authSlice";
import { Link, Navigate } from "react-router-dom";
export default function UserOrder() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserOrderAsync());
    }
  }, [dispatch, user]);

  return (
    <div>
      {orders ? (
        <>
          {!orders.length && (
            <>
              <div className="mt-10 flex flex-column items-center justify-center gap-x-6">
                <h1 className={style.EmptyCart}>No order to display</h1>
                <Link
                  to="/"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back home
                </Link>
              </div>
            </>
          )}
          {orders &&
            orders.map((order) => (
              <div class={style.cartcontainer}>
                <h1> Order # {order.id}</h1>
                {order.items.map((item) => (
                  <div class={style.item} key={item.id}>
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                    />
                    <div class={style.itemdetails}>
                      <div className={style.first}>
                        <p>{item.product.title}</p>
                        <p>{item.product.price}</p>
                      </div>
                      <div className={style.second}>
                        <p> Qty :{item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}

                <div class={style.subtotal}>
                  <p>
                    totalItems: <span>{order.totalItems} items</span>
                  </p>
                  <p>
                    Subtotal: <span> $ {order.totalAmount}</span>
                  </p>
                </div>
                <p className={style.shippingP}>Shipping Address :</p>
                <div className={style.shippingDetail}>
                  <p className={style.shippingPhone}>
                    {order.selectedAddress.phone}
                  </p>
                  <h5> {order.selectedAddress.name}</h5>
                  <p>
                    {" "}
                    {order.selectedAddress.street} ,{" "}
                    {order.selectedAddress.city}
                  </p>
                </div>
              </div>
            ))}
        </>
      ) : null}
    </div>
  );
}
