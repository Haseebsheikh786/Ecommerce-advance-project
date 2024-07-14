import React from "react";
import style from "../User/order.module.css";
const A = () => {
  return (
    <>
      <div class={style.cartcontainer}>
        <h1>Order Number</h1>
        <div class={style.item}>
          <img
            src="https://i.dummyjson.com/data/products/1/1.jpg"
            alt="error"
          />
          <div class={style.itemdetails}>
            <div className={style.first}>
              <p>Item Name</p>
              <p>$20.00</p>
            </div>
            <div className={style.second}>
              <p>Qty:1</p>
            </div>
          </div>
        </div>

        <div class={style.subtotal}>
          <p>
            totalItems: <span>10</span>
          </p>
          <p>
            Subtotal: <span> $100</span>
          </p>
        </div>
        <p className={style.shippingP}>Shipping Address :</p>
        <div className={style.shippingDetail}>
          <p className={style.shippingPhone}>0345432345432</p>
          <h5>Haseeb Farrukh</h5>
          <p>eid gah road lalamusa</p>
        </div>
      </div>
    </>
  );
};

export default A;