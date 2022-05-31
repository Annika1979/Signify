import { useStates } from "../utilities/states";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";

import { factory } from "../utilities/FetchHelper";
import React from "react";

const { Categorie: Category } = factory;

export default function AddCategory() {
  let s = useStates("main");
  let navigate = useNavigate();

  // lokalt state för denna komponent
  let state = useStates({
    newCategory: new Category({
      name: "",
    }),
  });
  console.log(state.newCategory);
  async function save() {
    // Save to db
    await state.newCategory.save();
    // Navigate to detail page

    alert("Saved");
    // navigate(`/backoffice/`);
  }

  function routeBack() {
    navigate("/backoffice/Edit");
  }
  // Check if we are offline (in that case no editing available)
  // console.log("navigator.onLine", navigator.onLine);

  return !navigator.onLine ? (
    <Container>
      {/* Offline */}
      <Row>
        <Col>
          <h4>
            Du är offline! Du kan endast Lägga till en kategori när du är
            online.
          </h4>
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
        </Col>
      </Row>
    </Container>
  ) : (
    <Container
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        maxWidth: "85%",
        height: "200px",
      }}
      className=" p-3 mh-50"
    >
      {/* Online */}

      <Row>
        <Col>
          <label className="mt-3">
            Kategori:
            <input
              className="form-control"
              {...state.newCategory.bind("name")}
            />
          </label>
        </Col>
      </Row>

      <button
        style={{
          backgroundColor: "rgba(102, 10, 59, 1)",
          borderRadius: "10px",
          border: "none",
          color: "white",
        }}
        type="button"
        onClick={routeBack}
        className="my-4 btn btn-primary float-end"
      >
        Tillbaka
      </button>

      <button
        style={{
          backgroundColor: "rgba(102, 10, 59, 1)",
          borderRadius: "10px",
          border: "none",
          color: "white",
          marginRight: "5px",
        }}
        type="button"
        onClick={save}
        className="my-4 btn btn-primary float-end"
        {...state.newCategory.bind("id")}
      >
        Spara
      </button>
    </Container>
  );
}
