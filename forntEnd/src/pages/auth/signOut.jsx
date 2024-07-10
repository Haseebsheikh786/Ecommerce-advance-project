import { useEffect } from "react";
import { selectLoggedInUser, signOutAsync } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
 
const SignOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });

  return <> {!user && <Navigate to="/" replace={true}></Navigate>}</>;
};

export default SignOut;
   