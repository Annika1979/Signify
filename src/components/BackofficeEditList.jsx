import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import React from "react";

export default function BackofficeEditList() {
  return (
    <Container>
      <Row>
        <Col>
          <Link to={`/backoffice`}>
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

          <Link to={`/backoffice/lagg-till-produkt`}>
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
              }}
              type="button"
              className="my-3 mx-1 btn btn-primary float-end"
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
              }}
              type="button"
              className="my-3 mx-1 btn btn-primary float-end"
            >
              Ändra kategori
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
