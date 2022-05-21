import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import Sign from "../../public/images/products/SigniFy.png"
import Home from "../../public/images/products/home.png"
import Cart from "../../public/images/products/shoppingcart.png"
import CategorySelect from '../CategorySelect';
import { useStates } from '../utilities/states';


export default function Header() {

  // Detect React router change of location
  let { pathname: route } = useLocation();
  let s = useStates('main');
  // Links
  let links = [
    [<img src={Home} alt="home" />
    , '/'],
   
    ['Produktlista', '/Produktlista'],
    [ <img src={Cart} alt="shoppingCart" />, '/kundvagn']
  ];

  return <Navbar fixed="top" expand="lg" className="navbarColor">
    <Container>
    <Navbar.Brand  >
            <img src={Sign} alt="logo" />
          </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{marginLeft:"250px"}} className="me-auto">
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

