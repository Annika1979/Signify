import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PersonalInfo() {
  return (
    <Container
      style={{
        width: "50rem",
        margin: "auto",
        padding: "4rem",
        backgroundColor: "lightgray",
      }}
    >
      <Form>
        <h2>Fyll i leveransadress</h2>
        <Row>
          <Col>
            <Form.Label>Förnamn</Form.Label>
            <Form.Control placeholder="Förnamn" />
          </Col>
          <Col>
            <Form.Label>Efternamn</Form.Label>
            <Form.Control placeholder="Efternamn" />
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Adress</Form.Label>
          <Form.Control placeholder="Gatunamn och nummer" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Postnummer</Form.Label>
            <Form.Control placeholder="Postnummer" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Postort</Form.Label>
            <Form.Control placeholder="Postort" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Emailadress" />
          </Form.Group>
        </Row>

        <Link className="float-end text-decoration-none" to={`/`}>
          <Button variant="primary" type="submit">
            Slutför Köp
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
