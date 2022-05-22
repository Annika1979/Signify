import { useStates } from "../utilities/states";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { scrollRestore } from "../utilities/scrollBehavior";
import CategorySelect from "../CategorySelect";
import { sweFormat } from "../utilities/currencyFormatter";
import { missingImage } from "../utilities/handleMissingImage";

export default function ProduktLista() {
  scrollRestore();

  let s = useStates("main");
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  return (
    <Container className="productList">
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
      <Row
        // onClick={() => showDetail(id)}
        xs={2}
        md={4}
        lg={6}
      >
        {" "}
        {s.products
          .filter(
            (product) =>
              s.chosenCategoryId === 0 /*all*/ ||
              s.chosenCategoryId === product.categoryId
          )
          .map(({ id, name, description, price }) => (
            <Card style={{ width: "20rem", margin: "0.25rem" }} key={id}>
              <Col xxl="12">
                <Card.Title>{name}</Card.Title>
                <Card.Img
                  onError={(event) => missingImage(event, name)}
                  variant="top"
                  src={`/images/products/${id}.jpg`}
                />
                <Card.Text>{description}</Card.Text>
              </Col>
              <Col xxl="12">
                <Card.Text>
                  <b>Pris:</b> {sweFormat(price)}
                </Card.Text>
              </Col>
            </Card>
          ))}
      </Row>
    </Container>
  );
}
