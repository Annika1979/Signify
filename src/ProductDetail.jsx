import { useStates } from "./utilities/states";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { add } from "./utilities/shoppingCartLogic";
import { sweFormat } from "./utilities/currencyFormatter";
import { useEffect } from "react";
import { missingImage } from "./utilities/handleMissingImage";

export default function ProductDetail() {
  let s = useStates("main");

  // A local state for this component
  // with one property/state var - buyQuantity
  let localState = useStates({
    buyQuantity: 1,
  });

  // Set the buyQuantity to 1 when the component mounts / "page load"
  useEffect(() => {
    localState.buyQuantity = 1;
  }, []);

  // Find the product
  let { id } = useParams();
  let product = s.products.find((x) => x.id === +id);
  if (!product) {
    return null;
  }

  let { name, description, price, categoryId } = product;

  // Find the category
  let categoryName =
    s.categories.find((category) => category.id === categoryId)?.name || "none";

  let navigate = useNavigate();

  function buy() {
    // Add the product to the cart
    add(product, localState.buyQuantity);
    // Show the cart
    navigate("/Kundvagn");
  }

  return (
    <Container
      style={{ backgroundColor: "white", borderRadius: "10px" }}
      className="productList"
    >
      <Row>
        <Col>
          <Link to={`/ProduktLista`}>
            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }}
              type="button"
              className="my-4 btn btn-primary"
            >
              Tillbaka
            </button>
            <hr />
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="mb-2">{name}</h1>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <h4>Kategori: {categoryName}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <img
            onError={(event) => missingImage(event, name)}
            className="float-end ms-3"
            style={{ width: 300, height: "auto" }}
            src={`/images/products/${id}.jpg`}
          />
          <p>{description}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Pris: {sweFormat(price)}</p>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
      <Row>
        <Col className="mt-2">
          <button
            type="button"
            onClick={buy}
            className="btn btn-primary float-end mb-5"
            style={{
              backgroundColor: "rgba(102, 10, 59, 1)",
              borderRadius: "10px",
              border: "none",
              color: "white",
            }}
          >
            Köp
          </button>
          <input
            style={{ width: 100 }}
            className="float-end mt-1 me-3"
            type="number"
            {...localState.bind("buyQuantity")}
          />
        </Col>
      </Row>
    </Container>
  );
}
