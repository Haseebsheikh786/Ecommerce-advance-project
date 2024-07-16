import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  resetPasswordAsync,
  resetPasswordRequestAsync,
  verifyCodeAsync,
} from "./authSlice";
import { Card, CardContent } from "../../components/ui/card";
// import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import image from "../../assets/images/Big_phone_with_cart.jpg";
import image2 from "../../assets/images/White Modern Minimal E-Commerce Logo.png";
import { Input } from "reactstrap";
import { useToast } from "../../components/ui/use-toast";
import { LoaderCircle } from "lucide-react";
import ValidationIcon from "../../components/ValidationIcon";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState(false);
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const { toast } = useToast();

  const handleInputChange = (index, event) => {
    console.log(index, event);
    const input = event.target;
    const maxLength = parseInt(input.getAttribute("maxlength"));
    const currentLength = input.value.length;

    if (currentLength >= maxLength) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
    if (
      currentLength === 0 &&
      event.nativeEvent.inputType === "deleteContentBackward"
    ) {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
    const newVerificationCode = inputRefs
      .map((ref) => ref.current.value)
      .join("");
    setVerificationCode(newVerificationCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
    };
    if (!email) {
      toast({
        variant: "destructive",
        title: " Uh oh!",
        description: "Enter valid email address",
      });
      setLoading(false);
      setError(true);
      return;
    }
    dispatch(resetPasswordRequestAsync(data))
      .then((response) => {
        if (response?.payload?.message === "Code sent successfully") {
          setAuth(true);
          toast({
            title: " Successful",
            description: "Code sent successfully",
          });
          setError(false);
        } else {
          toast({
            variant: "destructive",
            title: " Uh oh!",
            description: response?.payload?.response?.data?.error,
          });
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
      ResetPasswordCode: verificationCode,
    };
    if (!verificationCode) {
      toast({
        variant: "destructive",
        title: " Uh oh!",
        description: "Enter verification code",
      });
      setLoading(false);
      setError(true);
      return;
    }
    dispatch(verifyCodeAsync(data))
      .then((response) => {
        if (response?.payload?.message === "verify code successfully") {
          setnewPassword(true);
          toast({
            title: " Successful",
            description: "verified successfully",
          });
          setError(false);
        } else {
          toast({
            variant: "destructive",
            title: " Uh oh!",
            description: response?.payload?.response?.data?.error,
          });
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCHangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,
      password: Password,
    };
    if (!Password || !confirmPassword) {
      toast({
        variant: "destructive",
        title: " Uh oh!",
        description: "Enter new password",
      });
      setLoading(false);
      setError(true);
      return;
    }
    if (Password !== confirmPassword) {
      toast("Passwords do not match");
      toast({
        variant: "destructive",
        title: " Uh oh!",
        description: "Password do not match",
      });
      setLoading(false);
      return;
    }
    dispatch(resetPasswordAsync(data))
      .then((response) => {
        if (
          response?.payload?.data?.message === "password change successfully"
        ) {
          toast({
            title: " Successful",
            description: "password change successfully",
          });
          setError(false);
          navigate("/login");
        } else {
          toast({
            variant: "destructive",
            title: " Uh oh!",
            description: response?.payload?.response?.data?.error,
          });
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {!newPassword ? (
        <>
          {!auth ? (
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
                            Forgot Password
                          </h1>
                          <p class="text-balance text-muted-foreground">
                            enter your email to continue
                          </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div class="grid gap-4">
                            <div class="grid gap-2">
                              {error && !email ? (
                                <Label class="text-red-600">
                                  Email <ValidationIcon />
                                </Label>
                              ) : (
                                <Label>Email</Label>
                              )}
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
                            <Button disabled={loading}>
                              {loading && (
                                <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
                              )}
                              submit
                            </Button>
                          </div>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
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
                            Verification
                          </h1>
                          <p class="text-balance text-muted-foreground">
                            Please enter the code sent to your email address.
                          </p>
                        </div>
                        <form onSubmit={handleVerification}>
                          <div class="grid gap-4">
                            <div class="grid gap-2">
                              {error && !verificationCode ? (
                                <Label class="text-red-600">
                                  Verification Code <ValidationIcon />
                                </Label>
                              ) : (
                                <Label>Verification Code</Label>
                              )}
                              <div className="d-flex">
                                {[0, 1, 2, 3].map((index) => (
                                  <Input
                                    key={index}
                                    className="w-25 mx-1"
                                    type="text"
                                    name={`code${index + 1}`}
                                    id={`code${index + 1}`}
                                    maxLength="1"
                                    innerRef={inputRefs[index]}
                                    onChange={(event) =>
                                      handleInputChange(index, event)
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                            <Button disabled={loading}>
                              {loading && (
                                <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
                              )}
                              submit
                            </Button>
                          </div>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
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
                        Enter your new password
                      </h1>
                      <p class="text-balance text-muted-foreground">
                        Please enter your new credentials to continue.
                      </p>
                    </div>
                    <form onSubmit={handleCHangePassword}>
                      <div class="grid gap-4">
                        <div class="grid gap-2">
                          {error && !Password ? (
                            <Label class="text-red-600">
                              Password <ValidationIcon />
                            </Label>
                          ) : (
                            <Label>Password</Label>
                          )}
                          <Input
                            id="examplePassword"
                            name="password"
                            placeholder="******"
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div class="grid gap-2">
                          {error && !confirmPassword ? (
                            <Label class="text-red-600">
                              Confirm Password <ValidationIcon />
                            </Label>
                          ) : (
                            <Label>Confirm Password</Label>
                          )}
                          <Input
                            id="examplePassword"
                            name="password"
                            placeholder="******"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <Button disabled={loading}>
                          {loading && (
                            <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
                          )}
                          submit
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgetPassword;
