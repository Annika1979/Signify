import { useStates } from "../utilities/states";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { scrollRestore } from '../utilities/scrollBehavior';
import CategorySelect from '../CategorySelect';
import { sweFormat } from '../utilities/currencyFormatter';
import { missingImage } from '../utilities/handleMissingImage';
import { useEffect } from "react";
import { factory } from "../utilities/FetchHelper"

const { Product } = factory;


 

export default function backOffice() {
  scrollRestore();

  let s = useStates("main");
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/backoffice/${id}`);
  }
   
   useEffect(() => {
     (async () => {
       // get the categories from the db
      
       // get the products from the db
       s.products = await Product.find();
      
     })},[])

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
      <Row xs={2} md={4} lg={6}>
        {s.products
          .filter(
            (product) =>
              s.chosenCategoryId === 0 /*all*/ ||
              s.chosenCategoryId === product.categoryId
          )
          .map(({ id, name, description, price }) => (
            <Card
              style={{ width: "20rem", margin: "0.25rem" }}
              key={id}
              onClick={() => showDetail(id)}
            >
              <Col xxl="12">
                <h3>{name}</h3>
                <img
                  onError={(event) => missingImage(event, name)}
                  className="float-end ms-3"
                  style={{ width: 300, height: "auto", objectFit: "cover" }}
                  src={`/images/products/${id}.jpg`}
                />
                <p className="mb-5">{description}</p>
              </Col>
              <Col xxl="12" className="mt-5 position-absolute bottom-0 end-1">
                <p>
                  <b>Pris:</b> {sweFormat(price)}
                </p>
              </Col>
              <Link to={`/backoffice/${id}`}>
                <button
                  type="button"
                  className="my-3  btn btn-primary position-absolute bottom-0 end-0"
                >
                  Ändra
                </button>
              </Link>
            </Card>
          ))}
      </Row>
    </Container>
  );
}
