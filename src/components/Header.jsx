import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import Sign from "../../public/images/products/SigniFy.png"
import Home from "../../public/images/products/home.png"
import Cart from "../../public/images/products/shoppingcart.png"


export default function Header() {

  // Detect React router change of location
  let { pathname: route } = useLocation();

  // Links
  let links = [
    [<img src={Home} alt="home" />
    , '/'],
    ['Väggskyltar', '/Vaggskyltar'],
    ['Flaggskyltar', '/Flaggskylt'],
    ['Hängande skyltar', '/Hangandeskylt'],
    [ <img src={Cart} alt="shoppingCart" />, '/kundvagn']
  ];

  return <Navbar fixed="top" expand="lg" className="navbarColor">
    <Container>
    <Navbar.Brand>
            <img src={Sign} alt="logo" />
          </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {links.map(([label, to]) =>
            <Link
              style={{color:"white"}} key={to} to={to}
              className={`nav-link ${to === route ? 'active' : ''}`}
            >{label}</Link>
          )}
         
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
}

