import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Form,
  FormGroup,
  Label,
  Container,
  Button,
  Spinner,
} from "reactstrap";
import { login, register, selectloginUser } from "./authSlice";
import { toast } from "react-toastify";

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
      if (password !== confirmPassword) {
        toast("Passwords do not match");
        setLoading(false);
      } else {
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
      }
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
      <Container className="my-5 authContainer">
        <h2 className="text-center my-3">
          {auth ? "Sign Up" : "Login "} {user?.email}
        </h2>

        <Form onSubmit={handleSubmit}>
          {auth && (
            <FormGroup className="col-">
              <Label for="examplePassword" className=" mb-1">
                Username
              </Label>
              <Input
                id="examplePassword"
                name="password"
                placeholder="Enter username "
                type="text"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
                required
              />
            </FormGroup>
          )}
          <FormGroup className="col-">
            <Label for="exampleEmail " className=" mb-1">
              Email
            </Label>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Enter Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup className="col-">
            <Label for="examplePassword" className=" mb-1">
              Password
            </Label>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Enter password "
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!auth && (
              <p className="mt-1">
                <a className="text-danger" href="/forgot-password">
                  Forgot Password?
                </a>
              </p>
            )}
          </FormGroup>
          {auth && (
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
          )}
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
        {!auth ? (
          <p className="text-center my-2">
            don't have an account?{" "}
            <span className="text-danger pointer" onClick={() => setAuth(true)}>
              Sign Up
            </span>
          </p>
        ) : (
          <p className="text-center my-2">
            Already have an account?{" "}
            <span
              className="text-danger pointer"
              onClick={() => setAuth(false)}
            >
              Login
            </span>
          </p>
        )}
      </Container>
    </>
  );
};

export default AuthPage;
