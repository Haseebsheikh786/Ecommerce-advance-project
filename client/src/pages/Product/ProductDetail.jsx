import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectProductById } from "./ProductSlice";
import style from "./product.module.css";
import { addToCartAsync, selectItems } from "../Cart/CartSlice";
import { useParams } from "react-router-dom";
import { CardTitle, Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { useMediaQuery } from "react-responsive";

const ProductDetail = () => {
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();

  const params = useParams();
  const items = useSelector(selectItems);
  const isSmallScreen = useMediaQuery({ query: "(max-width: 640px)" });

  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      };
      dispatch(addToCartAsync({ item: newItem }));
    } else {
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      {product && (
        <Card class="sm:mx-5 sm:p-4 py-4 px-2">
          <div class="flex flex-col lg:flex-row">
            <div class="w-full lg:w-1/2 p-4 hidden lg:flex">
              <img
                src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
                // src={product.thumbnail}
                alt="Basic Tee"
                class="w-full h-auto rounded-lg shadow-lg  "
              />
            </div>

            <div class="w-full lg:w-1/2 p-4">
              <div class="flex justify-between items-center">
                <CardTitle class=" sm:text-xl">{product.title}</CardTitle>
                <CardTitle class="sm:text-xl ">${product.price}</CardTitle>
              </div>

              <div class="w-full pt-7 pb-2 flex lg:hidden">
                <img
                  src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
                  // src={product.thumbnail}
                  alt="Basic Tee"
                  class="w-full h-auto rounded-lg shadow-lg  "
                />
              </div>

              <div class="my-6">
                <span class="font-semibold">Color:</span>
                <div class="flex items-center mt-2">
                  <span class="w-10 h-10 rounded-full bg-black border-2 border-destructive mr-2 cursor-pointer"></span>
                  <span class="w-10 h-10 rounded-full bg-white border-2 mr-2 cursor-pointer"></span>
                  <span class="w-10 h-10 rounded-full bg-primary border-2 cursor-pointer"></span>
                </div>
              </div>

              <div class="my-6">
                <span class="font-semibold">Memory</span>
                <div class="flex items-center space-x-2 mt-2">
                  <Button
                    size={isSmallScreen ? "sm" : "default"}
                    variant="outline"
                  >
                    32
                  </Button>
                  <Button
                    size={isSmallScreen ? "sm" : "default"}
                    variant="outline"
                  >
                    64
                  </Button>
                  <Button
                    size={isSmallScreen ? "sm" : "default"}
                    variant="outline"
                  >
                    128
                  </Button>
                 
                  <Button
                    size={isSmallScreen ? "sm" : "default"}
                    variant="outline"
                  >
                    512
                  </Button>
                </div>
              </div>

              <Button className="min-w-full" onClick={handleCart}>
                Add to cart
              </Button>
              <div class="mt-3">
                <p class="">{product.description}</p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ProductDetail;
