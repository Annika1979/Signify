import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

export default function BackofficeEditList() {
  return !navigator.onLine ? (
    <Container>
      <Row>
        <Col className="mx-auto d-grid gap-2 d-md-flex justify-content-center ">
          <h4>
            Du kan tyvärr inte göra några ändrigar just nu. Försök igen när du
            är online igen.
          </h4>
          <Link to={`/backoffice`}>
            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
                width: "145px",
                height: "145px",
              }}
              type="button"
              className="my-3 mx-1 "
            >
              Tillbaka
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        maxWidth: "85%",
      }}
      className="mb-3"
    >
      <Row>
        <Col className="mx-auto d-grid gap-2 d-md-flex justify-content-center ">
          <Link to={`/backoffice`}>
            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
                width: "145px",
                height: "145px",
              }}
              type="button"
              className="my-3 mx-1 "
            >
              Tillbaka
            </button>
          </Link>

          <Link to={`/backoffice/lagg-till-produkt`}>
            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
                width: "145px",
                height: "145px",
              }}
              type="button"
              className="my-3 mx-1 "
            >
              Lägg till produkt
            </button>
          </Link>
          <Link to={`/backoffice/lagg-till-kategori`}>
            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
                width: "145px",
                height: "145px",
              }}
              type="button"
              className="my-3 mx-1 "
            >
              Lägg till kategori
            </button>
          </Link>
          <Link to={`/backoffice/andra-kategori`}>
            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
                width: "145px",
                height: "145px",
              }}
              type="button"
              className="my-3 mx-1 "
            >
              Ändra kategori
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
