import { useContext, useState } from "react";
import commonContext from "../contexts/common/commonContext";

const useForm = () => {
  const { toggleForm, setFormUserInfo } = useContext(commonContext);
  const [inputValues, setInputValues] = useState({});
  // const [isLoggedIn, setisLoggedIn] = useState(false);

  // handling input-values
  const handleInputValues = (e) => {
    const { name, value } = e.target;

    setInputValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const handleLogin = (loggedUser) => {
    try {
      fetch("http://localhost:5000/Login-user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Orgin": "*",
        },
        body: JSON.stringify({
          mail: inputValues.mail,
          password: inputValues.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "Login sucess") {
            window.alert(`Hello ${loggedUser}, you're successfully logged-in.`);
            setInputValues({});
            setFormUserInfo(loggedUser);
            toggleForm(false);
            // setisLoggedIn(true);
          } else {
            window.alert("Invail Credentails !!");
            setInputValues({});
          }
        });
    } catch (e) {}
  };

  const handleSignUp = () => {
    try {
      fetch("http://localhost:5000/auth", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Orgin": "*",
        },
        body: JSON.stringify({
          username: inputValues.username,
          mail: inputValues.mail,
          password: inputValues.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            window.alert(`you're successfully Registered.`);
            window.alert(`Please Login to continue`);
            setInputValues({});
          }
          else{
            window.alert(data.status);
            setInputValues({});
          }
        });
    } catch (e) {}
  };

  // handling form-submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const loggedUserInfo = inputValues.mail.split("@")[0].toUpperCase();

    if (inputValues.username === undefined) {
      handleLogin(loggedUserInfo);
    } else {
      handleSignUp();
    }
  };

  return { inputValues, handleInputValues, handleFormSubmit };
};

export default useForm;
