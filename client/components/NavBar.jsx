import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = () => {
  <Navbar bg="light" data-bs-theme="light">
    <Container>
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/library">Library</Nav.Link>
        <Nav.Link href="/pricing">Pricing</Nav.Link>
      </Nav>
    </Container>
  </Navbar>;
};

export default NavBar;
