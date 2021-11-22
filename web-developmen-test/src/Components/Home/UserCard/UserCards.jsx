import { Card, Button, Container } from "react-bootstrap"
import "./smallcards.scss"
import { useState } from "react"
import EditForm from "../EditForm/EditForm"
const UserCards = ({ user }) => {
    const [editForm, setEditForm] = useState(false)

    const { first_name, last_name, nickname, email, picture, _id } = user

    return (
        <>
            <Container>

                <div className="cards">
                    <div className="face face1">
                        <div className="content">
                            <img src={picture} />
                            <h3></h3>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <h3>{email}</h3>
                            <p>{first_name}{" "}{last_name}</p>
                            <p>{nickname}</p>

                            <div className="d-flex justify-content-center">
                                <Button variant="info" onClick={() => setEditForm(true)} > Edit Info</Button>
                            </div> </div>
                    </div>
                </div>



            </Container>
            <EditForm trigger={editForm} setTrigger={setEditForm} id={_id} firstname={first_name} lastname={last_name} email={user.email} nickname={nickname} profile={picture} />
        </>
    )
}
export default UserCards