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
      <Link to={`/backoffice/Edit`}>
        <div className="d-grid gap-2 d-flex justify-content-md-end  justify-content-center  ">
          <button
            style={{
              backgroundColor: "rgba(102, 10, 59, 1)",
              borderRadius: "10px",
              border: "none",
              color: "white",
            }}
            type="button"
            className=" btn "
          >
            Lägg till
          </button>
        </div>
      </Link>

      <Row className="d-grid gap-2 d-md-flex justify-content-center justify-content-md-end">
        <Col>
          <h3>Välj Kategori</h3>
        </Col>
      </Row>

      <Row className="mb-3 d-grid gap-2 d-md-flex justify-content-center justify-content-md-end">
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
                width: "19rem",
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
                  style={{ width: 270, height: "auto", objectFit: "cover" }}
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
                    backgroundColor: "rgba(102, 10, 59, 1)",
                    borderRadius: "10px",
                    border: "none",
                    color: "white",
                  }}
                  type="button"
                  className=" my-2 mx-2 btn  position-absolute bottom-0 end-0"
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
