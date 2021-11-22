import { useFormik, Formik, Field, Form } from "formik"
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"


const validate = (values) => {
    const errors = {}


    if (!values.email) {
        errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
    }

    return errors
}
const Registration = (props) => {
    const [previewSource, setPreviewSource] = useState();
    const [file, setFile] = useState("")
    const previewFile = (file) => {

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault()
        if (!previewSource) return
        handleSubmitFile(previewSource)

    }
    const formData = new FormData();
    const onFileChange = (e) => {


        if (e.target && e.target.files[0]) {
            formData.append('picture', e.target.files[0])
            setFile(formData)
            previewFile(e.target.files[0])
        } else {
            console.log("image upload not succeded")
        }
    }


    const [showAlert, setShowAlert] = useState(false)
    const formik = useFormik({
        initialValues: {


            email: "",
            first_name: "",
            last_name: "",
            nickname: "",
            picture: file,
        },
        validate,
        onSubmit: (values) => {
            createUser(values, " <<<<<< inside Signupform on submit")

        },
    })


    const createUser = async (values) => {

        try {
            let response = await fetch(
                `${process.env.REACT_APP_API_HOST}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),

                }

            )

            if (response.ok) {
                let data = await response.json()

                window.localStorage.setItem("user_Token", data.access_token)
                window.localStorage.setItem("_id", data)
                await picture()

            } else {
                alert("User not created")
            }

        } catch (e) {
            return e
        }

    }
    const picture = async () => {
        let id = window.localStorage.getItem("_id");
        console.log(id)
        const res = await fetch(`${process.env.REACT_APP_API_HOST}/${id}/uploadprofile`, {
            method: "POST",
            body: file
        })
        console.log(res)
    }
    const getUserData = async () => {

        try {
            let response = await fetch(
                `${process.env.REACT_APP_API_HOST}/register`,
                {
                    method: "Get",

                }
            )
            let userData = await response.json()
            let userDataKeyList = Object.keys(userData)
            userDataKeyList.forEach((key) =>
                window.localStorage.setItem(key, userData[key])
            )
            setShowAlert(true)
            setTimeout(() => {
                props.history.push("/")
            }, 2000)
        } catch (e) {
            console.log(e)
            return e
        }
    }

    return (
        <div class="backg py-5">



            <Container id="container" className="col-md-8">

                <div >
                    <img
                        src="https://cdn.pixabay.com/photo/2021/04/07/02/23/gaming-6157807_1280.png"
                        width="300"
                        height="300"
                        alt=""
                        className="mr-auto"
                    />
                    <h3 id="title">Join  Gaming App</h3>
                </div>
                <Formik
                    initialValues={{
                        first_name: "",
                        last_name: "",
                        nickname: "",
                        email: "",
                        picture: file,
                    }}
                >
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name" id="title">

                                First Name:
                            </label>
                            <Field
                                id="email"
                                className="form-control"
                                name="first_name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.first_name}
                            />
                            {formik.touched.first_name && formik.errors.first_name ? (
                                <div className="fw-bold text-danger">{formik.errors.first_name}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="name" id="title">

                                Last Name:
                            </label>
                            <Field
                                id="email"
                                className="form-control"
                                name="last_name"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.last_name}
                            />
                            {formik.touched.last_name && formik.errors.last_name ? (
                                <div className="fw-bold text-danger">{formik.errors.last_name}</div>
                            ) : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" id="title">
                                {" "}

                                Email Address:
                            </label>
                            <Field
                                id="email"
                                className="form-control"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="fw-bold text-danger" >{formik.errors.email}</div>
                            ) : null}

                        </div>
                        <div className="form-group">
                            <label htmlFor="password" id="title">
                                {" "}

                                Nick Name:
                            </label>
                            <Field
                                id="password"
                                className="form-control"
                                name="nickname"
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.nickname}
                            />
                            {formik.touched.nickname && formik.errors.nickname ? (
                                <div className="fw-bold text-danger">{formik.errors.nickname}</div>
                            ) : null}

                        </div>


                        <div className="form-group">
                            <label htmlFor="username" id="title">

                                Picture url:
                            </label>

                            <input id="exampleFormControlFile1"
                                type="file"
                                name="picture"

                                onChange={onFileChange} />
                        </div>
                        {previewSource && (
                            <img src={previewSource} alt="chosen" height="100px" width="100px" className="ml-auto" />
                        )}
                        {showAlert && <Alert variant="success"> <Alert.Heading>Account Created Successfully</Alert.Heading></Alert>}

                        <button
                            id="btn"
                            type="submit"
                            className="btn btn-success my-2 btn-large w-100"

                        >
                            Register
                        </button>

                    </Form>
                </Formik>
            </Container>


        </div >
    )
}
export default Registration