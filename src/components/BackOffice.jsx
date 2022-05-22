import { useStates } from "../utilities/states";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { scrollRestore } from "../utilities/scrollBehavior";
import CategorySelect from "../CategorySelect";
import { sweFormat } from "../utilities/currencyFormatter";
import { missingImage } from "../utilities/handleMissingImage";

export default function backOffice() {
  scrollRestore();

  let s = useStates("main");
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/backoffice/${id}`);
  }

  return (
    <Container className="productList">
      <Link to={`/backoffice/lagg-till`}>
        <button type="button" className="my-3 btn btn-primary float-end">
          Lägg till
        </button>
      </Link>
      <Row>
        <Col>
          <h3>Välj Kategori</h3>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <CategorySelect showAllOption bindTo={[s, "chosenCategoryId"]} />
        </Col>
      </Row>
      {s.products
        .filter(
          (product) =>
            s.chosenCategoryId === 0 /*all*/ ||
            s.chosenCategoryId === product.categoryId
        )
        .map(({ id, name, description, price }) => (
          <Row className="product" key={id} onClick={() => showDetail(id)}>
            <Card>
              <Col xxl="12">
                <h3>{name}</h3>
                <img
                  onError={(event) => missingImage(event, name)}
                  className="float-end ms-3"
                  style={{ width: 300, height: "auto", objectFit: "cover" }}
                  src={`/images/products/${id}.jpg`}
                />
                <p>{description}</p>
              </Col>
              <Col xxl="12">
                <p>
                  <b>Pris:</b> {sweFormat(price)}
                </p>
              </Col>
              <Link to={`/backoffice/${id}`}>
                <button
                  type="button"
                  className="my-4 btn btn-primary float-end"
                >
                  Ändra
                </button>
              </Link>
            </Card>
          </Row>
        ))}
    </Container>
  );
}
