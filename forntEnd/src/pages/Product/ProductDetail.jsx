import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByIdAsync, selectProductById } from "./ProductSlice";
import { useAlert } from "react-alert";
import style from "./product.module.css";
import { addToCartAsync, selectItems } from "../Cart/CartSlice";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const product = useSelector(selectProductById);
  const dispatch = useDispatch();

  const params = useParams();
  const alert = useAlert();
  const items = useSelector(selectItems);
  const handleCart = (e) => {
    e.preventDefault();
    if (items.findIndex((item) => item.product.id === product.id) < 0) {
      const newItem = {
        product: product.id,
        quantity: 1,
      }; 
      dispatch(addToCartAsync({ item: newItem, alert }));
    } else {
      alert.error("Item Already added");
    }
  };

  useEffect(() => {
    dispatch(fetchProductByIdAsync(params.id));
  }, [dispatch, params.id]);

  return (
    <>
      <div className={style.container}>
        {product && (
          <>
            <div className={style.image}>
              <img src={product.images[0]} alt={product.title} />
            </div>
            <div className={style.details}>
              <h1 className={style.name}> {product.title}</h1>
              <p className={style.price}> ${product.price}</p>
              <p className={style.description}>{product.description}</p>
              <div className={style.btn}>
                <button className={style.AddToCart} onClick={handleCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetail;
