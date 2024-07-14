import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import {
  resetPasswordAsync,
  resetPasswordRequestAsync,
  selectUserInfo,
  verifyCodeAsync,
} from "./authSlice";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);  
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleInputChange = (index, event) => {
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
    dispatch(resetPasswordRequestAsync(data))
      .then((response) => {
        if (response?.payload?.message === "Code sent successfully") {
          setAuth(true);
        } else {
          toast(response?.payload?.response?.data?.error);
          console.log(response?.payload?.response?.data?.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
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
    dispatch(verifyCodeAsync(data))
      .then((response) => {
        if (response?.payload?.message === "verify code successfully") {
          setnewPassword(true);
        } else {
          toast(response?.payload?.response?.data?.error);
          console.log(response?.payload?.response?.data?.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
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
    if (Password !== confirmPassword) {
      toast("Passwords do not match");
      setLoading(false);
      return;
    }

    dispatch(resetPasswordAsync(data))
      .then((response) => {
        console.log(response);
        if (
          response?.payload?.data?.message === "password change successfully"
        ) {
          toast("Successfully changed password.");
          navigate("/auth");
        } else {
          toast(response?.payload?.response?.data?.error);
          console.log(response?.payload?.response?.data?.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {!newPassword ? (
        <>
          {!auth ? (
            <Container className="my-5 authContainer">
              <h2 className="my-3 text-center">Forgot Password</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup className="col-">
                  <Label for="exampleEmail " className=" mb-1">
                    Email
                  </Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Enter your Email"
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <Button color="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner color="white" size="sm">
                      {" "}
                      Loading...
                    </Spinner>
                  ) : (
                    "Submit"
                  )}{" "}
                </Button>
              </Form>
            </Container>
          ) : (
            <Container className="my-5 authContainer">
              <h2 className="my-3 text-center">Verification</h2>
              <p className="text-center">
              Please enter the code sent to your email address.
              </p>
              <Form onSubmit={handleVerification}>
                <FormGroup>
                  <Label for="verificationCode" className="mx-1">
                    Verification Code
                  </Label>
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
                        onChange={(event) => handleInputChange(index, event)}
                      />
                    ))}
                  </div>
                </FormGroup>
                <Button color="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <Spinner color="white" size="sm">
                      {" "}
                      Loading...
                    </Spinner>
                  ) : (
                    "Submit"
                  )}{" "}
                </Button>
              </Form>
            </Container>
          )}
        </>
      ) : (
        <Container className="my-5 authContainer">
          <h2 className="my-3 text-center">Enter your new password</h2>

          <Form onSubmit={handleCHangePassword}>
            <FormGroup className="col-">
              <Label for="examplePassword" className=" mb-1">
                Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Enter password "
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="col-">
              <Label for="examplePassword" className=" mb-1">
                Confirm Password
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Enter password "
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" type="submit" disabled={loading}>
              {loading ? (
                <Spinner color="white" size="sm">
                  {" "}
                  Loading...
                </Spinner>
              ) : (
                "Submit"
              )}{" "}
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
};

export default ForgetPassword;
