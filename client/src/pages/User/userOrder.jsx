import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserOrders } from "./userSlice";
import style from "./order.module.css";
import { Link, Navigate } from "react-router-dom";
import { selectUserInfo } from "../auth/authSlice";
import { Separator } from "../../components/ui/separator";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
export default function UserOrder() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  console.log(orders);
  const user = useSelector(selectUserInfo);

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserOrderAsync(user?._id));
    }
  }, [dispatch, user]);

  return (
    <>
      {/* <div>
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
    </div> */}
      <Card className="my-8 mx-4">
        <div className="flex justify-between items-center ">
          <CardHeader>
            <CardTitle> orders</CardTitle>
            <CardDescription> here's a list of all orders</CardDescription>
          </CardHeader>
        </div>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Delivery</TableHead>
                <TableHead>items</TableHead>
                <TableHead>total items</TableHead>
                <TableHead>amount</TableHead>
                <TableHead>address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders?.map((order, index) => (
                <TableRow>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="flex space-x-2">
                    {order.items.map((item, i) => (
                      <div className=" ">
                        <img
                          // src={item.product.thumbnail}
                          src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
                          alt={item.product.thumbnail}
                          className="h-11 w-11 rounded-lg"
                        />
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="">{order.totalItems}</TableCell>
                  <TableCell className="">{order.totalAmount}</TableCell>
                  <TableCell className="">
                    {order.selectedAddress.city},{order.selectedAddress.street},
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
