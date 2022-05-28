import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
//import Sign from '../../public/images/products/SigniFy.png'

import { useStates } from "../utilities/states";

export default function Header() {
  // Detect React router change of location
  let { pathname: route } = useLocation();
  let s = useStates("main");
  // Links
  let links = [
    //[<img src={Home} alt="home" />
    // , '/'],

    ["Home", "/"],
    ["Produktlista", "/Produktlista"],
    ["Kundvagn", "/Kundvagn"],
    //[ <img src={Cart} alt="shoppingCart" />, '/kundvagn']
  ];

  return (
    <Navbar fixed="top" expand="lg" className="navbarColor">
      <Container>
        <Navbar.Brand>
          <img src={Sign} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            backgroundColor: "white",
            boxShadow: "2px 4px 6px 1px rgba(0, 0, 0, 0.6)",
          }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: "10px" }} className="me-auto">
            {links.map(([label, to]) => (
              <Link
                style={{
                  color: "white",
                  fontFamily: "Oxygen",
                  fontSize: "150%",
                }}
                key={to}
                to={to}
                className={`nav-link ${to === route ? "active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
