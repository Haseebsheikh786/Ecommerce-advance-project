import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { login, register, selectloginUser } from "./authSlice";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import image from "../../assets/images/Big_phone_with_cart.jpg";
import image2 from "../../assets/images/White Modern Minimal E-Commerce Logo.png";

const AuthPage = ({}) => {
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector(selectloginUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (auth) {
      const obj = {
        email,
        password,
        userName,
      };
      try {
        const response = await dispatch(register(obj));
        console.log(response);
        if (response?.payload === "User already registered") {
          console.log(response?.payload?.response?.data?.error);
        } else {
          navigate(`/verify-email?email=${email}`);
        }
      } catch (error) {
        console.log("Error:", error);
      }
      setLoading(false);
    } else {
      const obj = {
        email: email,
        password: password,
      };
      try {
        const response = await dispatch(login(obj));
        console.log(response);

        if (response?.payload === "User is not verified") {
          navigate(`/verify-email?email=${email}`);
        } else {
          if (location.state && location.state.from) {
            navigate(location.state.from);
          } else {
            console.log(response?.payload?.response?.data?.error);
            navigate("/");
          }
        }
      } catch (error) {
        console.log("Error:", error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {user?.Isverified && <Navigate to="/" replace={true}></Navigate>}
      <div class="relative">
        <div class="hidden lg:block relative lg:fixed w-full lg:w-5/12 min-h-screen inset-0">
          <img
            src={image}
            alt="Image"
            class="lg:h-full xl:h-full 2xl:h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div class="flex flex-col items-center justify-center lg:h-screen mx-3 ">
          <div class="lg:hidden flex flex-col justify-end items-center">
            <img src={image2} alt="logo" class="h-32 w-32" />
          </div>
          <div class="flex items-center justify-center w-full lg:w-7/12 ml-auto">
            <Card className="">
              <CardContent class="p-8">
                <div class="mx-auto grid sm:w-[350px] gap-6">
                  <div class="grid gap-2 text-center">
                    <h1 class="text-3xl font-semibold tracking-tight">
                      {!auth ? "login to your account" : "Create new account"}
                    </h1>
                    <p class="text-balance text-muted-foreground">
                      enter your credentials to {auth ? "signup" : "login"}
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div class="grid gap-4">
                      {auth && (
                        <div class="grid gap-2">
                          <Label>Username</Label>
                          <Input
                            id="name"
                            placeholder="username"
                            type="text"
                            auto-capitalize="none"
                            auto-complete="email"
                            auto-correct="off"
                            value={userName}
                            onChange={(e) => setuserName(e.target.value)}
                          />
                        </div>
                      )}
                      <div class="grid gap-2">
                        <Label>Email</Label>
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          auto-capitalize="none"
                          auto-complete="email"
                          auto-correct="off"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div class="grid gap-2 relative">
                        <Label>Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="******"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      {!auth && (
                        <div class="">
                          <Label for="remember">
                            <input
                              type="checkbox"
                              id="remember"
                              name="remember"
                              v-model="remember"
                            />
                            <span class="ml-1"> remember me </span>
                          </Label>
                        </div>
                      )}
                      <Button>login</Button>
                    </div>
                  </form>
                  {!auth ? (
                    <p className="text-center  ">
                      don't have an account?{" "}
                      <span
                        className="text-danger cursor-pointer"
                        onClick={() => setAuth(true)}
                      >
                        Sign Up
                      </span>
                    </p>
                  ) : (
                    <p className="text-center">
                      Already have an account?{" "}
                      <span
                        className="text-danger cursor-pointer"
                        onClick={() => setAuth(false)}
                      >
                        Login
                      </span>
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;