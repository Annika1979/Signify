import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { factory } from "../utilities/FetchHelper";
import { useState } from "react";
import React from "react";
import { useStates } from "../utilities/states";
import { useParams, useNavigate } from "react-router-dom";

const { Order } = factory;

export default function PersonalInfo() {
  let s = useStates("main");
  let navigate = useNavigate();

  let state = useStates({
    newOrder: new Order({
      name: "grgamel",
      description: "cdcdcd",
      price: "122332",
      categoryId: "1",
    }),
  });

  async function save() {
    // Save to db
    await state.newOrder.save();
    // Navigate to detail page

    alert("Kategori ändrad!");
    // navigate(`/backoffice/`);
  }

  console.log(state.newOrder);

  return navigator.onLine ?
    <Container
      style={{
        width: "50rem",
        margin: "auto",
        padding: "4rem",
        backgroundColor: "#fff",
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
        {navigator.onLine ? (
          <Link className="float-end text-decoration-none" to={`/`}>
            <Button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }}
              type="submit"
              onClick={save}
            >
              Slutför Köp
            </Button>
          </Link>
        ) : (null)}
      </Form>
    </Container>
    : (
      <Container >
        <Row>
          <Col>
            <h4>Du kan tyvärr inte avsluta ditt köp just nu, försök igen när du är onilne.</h4>
            <Link to={`/kundvagn`}>
              <button
                style={{
                  backgroundColor: "rgba(102, 10, 59, 1)",
                  borderRadius: "10px",
                  border: "none",
                  color: "white",
                }}
                type="button"
                className="my-3 mx-1 btn btn-primary float-end"
              >
                Tillbaka
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    )

};