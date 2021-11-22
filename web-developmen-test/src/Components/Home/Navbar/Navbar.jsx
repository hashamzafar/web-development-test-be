import { Navbar, Nav } from "react-bootstrap"



const NavBar = () => {
    return (
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">Games App</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
            </Nav>

        </Navbar>
    )
}

export default NavBar