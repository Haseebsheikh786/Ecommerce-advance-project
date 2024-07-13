import React, { useRef, useState } from "react";
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
import {
  ResendVerificationCodeAsync,
  emailVerificationAsync,
  selectUserInfo,
  selectloginUser,
} from "./authSlice";

const EmailVerification = () => {
  const user = useSelector(selectUserInfo);
  const user2 = useSelector(selectloginUser);
  console.log(user, user2);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const handleVerification = (e) => {
    e.preventDefault();
    setLoading(true);

    const obj = {
      email: email,
      verificationCode: verificationCode,
    };

    dispatch(emailVerificationAsync(obj))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };
  const ResendCode = () => {
    setLoading(true);

    const obj = {
      email: email,
    };

    dispatch(ResendVerificationCodeAsync(obj))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <Container className="my-5 authContainer">
        <h2 className="my-3 text-center">Verification</h2>
        <p>Email: {email}</p>

        <p className="text-center">Enter the code sent to your email address</p>
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
          <p onClick={ResendCode}>
            <a className="text-danger pointer">Resend Code</a>
          </p>
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
    </>
  );
};

export default EmailVerification;
