import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCartAsync } from "../Cart/CartSlice";
import { resetOrder } from "./orderSlice";

function Order() {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(resetCartAsync());
    dispatch(resetOrder());
  }, [dispatch]);

  return (
    <>
      {!params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-black px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-red-400">
            Order Successfully Placed
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white-900 sm:text-5xl">
            Thank you for shopping with us
          </h1>
          <p className="mt-6 text-base leading-7 text-white-600">
            Your Order will be delivered in 3 days
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Order;
