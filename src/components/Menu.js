import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'

export default function Menu() {
    return (
        <Navbar bg='dark' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand href='#'><img src={logo} alt="Logo" style={{ maxWidth: 30 }}/></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href='/'>Dashboard</Nav.Link>
                    <Nav.Link href='/login'>Login</Nav.Link>
                    {/*<Nav.Link href='/'>Home</Nav.Link>*/}
                </Nav>
            </Container>
        </Navbar>
    )
}