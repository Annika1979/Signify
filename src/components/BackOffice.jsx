import { useStates } from "../utilities/states";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { scrollRestore } from "../utilities/scrollBehavior";
import CategorySelect from "../utilities/CategorySelect";
import { sweFormat } from "../utilities/currencyFormatter";
import { missingImage } from "../utilities/handleMissingImage";
import { useEffect } from "react";
import { factory } from "../utilities/FetchHelper";

const { Product, Categorie: Category } = factory;

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
      s.categories = await Category.find();
    })();
  }, []);

  return (
    <Container xs={2} md={4} lg={6} className="productList">
      <Link to={`/backoffice/lagg-till`}>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="button" className=" btn btn-primary">
            Lägg till
          </button>
        </div>
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
              className="mx-auto"
              style={{
                width: "20rem",
                margin: "0.6rem",
                paddingTop: "20px",
                boxShadow: "2px 4px 4px 1px rgba(0, 0, 0, 0.1)",
              }}
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
                  style={{
                    marginRight: "0.25rem",
                  }}
                  type="button"
                  className=" my-2 mx-2 btn btn-primary position-absolute bottom-0 end-0"
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
