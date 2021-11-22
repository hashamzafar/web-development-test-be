import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
    const [login, setLogin] = useState("");
    const [loginValidation, setLoginValidation] = useState(false);
    const [isTransitionPage, setTransitionPage] = useState(false);
    const [token, setToken] = useState("");


    const handleForm = (key, value) => {
        setLogin({
            ...login,
            [key]: value,
        });


    };

    const getUserToken = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(
                `${process.env.REACT_APP_API_HOST}/loginuser`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(login),
                }
            );
            if (response.ok) {
                let userToken = await response.json();

                window.localStorage.setItem("user_Token", userToken.accessToken);

                setToken(window.localStorage.getItem("user_Token", userToken));
                getUserData(token);
            } else {
                setLoginValidation(true);
            }
        } catch (error) {
            setLoginValidation(true);

        }
    };
    const getUserData = async () => {
        let token = "Bearer " + window.localStorage.getItem("user_Token");
        try {
            let response = await fetch(`${process.env.REACT_APP_API_HOST}/loginuser`, {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            if (response.ok) {
                let userData = await response.json();
                if (userData.email === undefined) {
                    setLoginValidation(true);
                    return;
                }
                setTransitionPage(true);
                let userDataKeyList = Object.keys(userData);
                userDataKeyList.forEach((key) =>
                    window.localStorage.setItem(key, userData[key])
                );
                props.history.push("home");
            } else {
                setLoginValidation(true);
            }
        } catch (e) {
            console.log(e);
            return e;
        }
    };

    return (
        <div className="backg py-5">
            <Container id="container" className="py-5">
                <Form id="login" >
                    <div >
                        <img
                            src="https://cdn.pixabay.com/photo/2021/04/07/02/23/gaming-6157807_1280.png"
                            width="300"
                            height="300"
                            alt=""
                            className="mr-auto"
                        />
                        <h3 id="title">Welcome to Gaming App</h3>
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label id="title">Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            onChange={(e) => {
                                handleForm("email", e.target.value);
                            }}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>



                    <Form.Group controlId="formBasicCheckbox" id="title">
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>

                    {loginValidation && (
                        <div className="container d-flex justify-content-center">
                            <p className="text-danger">
                                <strong>Sorry incorrect username :(</strong>
                            </p>
                        </div>
                    )}


                    <Button variant="success" type="submit" className="my-2 btn btn-large w-100" id="btn" onClick={(e) => getUserToken(e)}>
                        <Link to="/home" className="link" onClick={(e) => getUserToken(e)} >     Log in</Link>
                    </Button>
                    <a class="google-btn" href="/auth/google">Google+</a>
                    <Link to="/register" className="link">
                        <Button
                            variant="primary"
                            className="my-2 btn btn-large w-100"
                            type="submit"
                            id="btn"
                        >
                            Register
                        </Button>
                    </Link>
                </Form>
            </Container>
        </div >
    );
};

export default Login;

