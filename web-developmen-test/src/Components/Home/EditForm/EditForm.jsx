import { Form, Button, Container } from "react-bootstrap";
import "./edit.css"
import { useState } from "react"


const EditForm = (props) => {
    const [user, setUser] = useState({
        first_name: props.firstname,
        last_name: props.lastname,
        email: props.email,
        nickname: props.nickname,

    })

    const handleSubmit = async () => {

        try {
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/${props.id}`, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${window.localStorage.getItem("user_Token")}`
                }

            })

            if (response.ok) {
                let user = await response.json()

            }
        } catch (error) {

        }
    }

    return props.trigger ? (
        <Container className="">

            <Form className="popup p-5" onSubmit={handleSubmit} >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>First Name :</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your First Name" value={user.first_name}
                        onChange={(e) => setUser({ ...user, first_name: e.target.value })} />

                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Last Name :</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Last Name" value={user.last_name}
                        onChange={(e) => setUser({ ...user, last_name: e.target.value })} />

                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address :</Form.Label>
                    <Form.Control type="email" placeholder="Enter Your email" value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />

                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Nick Name :</Form.Label>
                    <Form.Control type="text" placeholder=" Enter Your Nick Name" value={user.nickname}
                        onChange={(e) => setUser({ ...user, nickname: e.target.value })} />
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                    <Button variant="info" type="submit">
                        Submit
                    </Button>
                    <Button
                        className="btn btn-danger mx-5"
                        onClick={() => props.setTrigger(false)}
                    >
                        Close
                    </Button></div>
            </Form>

        </Container>
    ) : (
        ""
    );
};

export default EditForm;