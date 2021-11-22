import UserCard from "./HostCard/HostCard"
import { Row, Col, Container } from "react-bootstrap"
import UserCards from "./UserCard/UserCards"
import { useState, useEffect } from "react"
import EditForm from "./EditForm/EditForm"
import NavBar from "./Navbar/Navbar"
const Home = () => {

    const [allUsers, setAllUser] = useState([])
    const [loading, setLoading] = useState(false)
    const users = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${process.env.REACT_APP_API_HOST}/users`)
            if (response.ok) {
                const data = await response.json()
                await setAllUser(data)
                setLoading(false)
            }

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        users()
    }, [])


    return (

        <Container>


            <Row>
                <Col sm={12} md={12} className="ml-3" >
                    <UserCard />
                </Col>


                {loading ? <h1>loading</h1> :
                    (allUsers.map(user =>
                        <Col sm={12} md={6}  >      <UserCards user={user} /></Col>))}

            </Row>
            <EditForm />


        </Container>
    )
}
export default Home