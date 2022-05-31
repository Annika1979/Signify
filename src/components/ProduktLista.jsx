import React, { useState, useEffect } from "react";
import { useStates } from "../utilities/states";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { scrollRestore } from "../utilities/scrollBehavior";
import CategorySelect from "../utilities/CategorySelect";
import { sweFormat } from "../utilities/currencyFormatter";
import { missingImage } from "../utilities/handleMissingImage";
import { factory } from "../utilities/FetchHelper";

let oldSearchTerm = "";

const { Product, Categorie: Category } = factory;

export default function ProduktLista() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPrice, setShowPrice] = useState("Billigaste");

  function sortPrice() {
    if (showPrice === "Billigaste") {
      s.products.sort((a, b) => (a.price < b.price ? -1 : 1));
    }
    if (showPrice === "Dyraste") {
      s.products.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
    if (showPrice === "A-Ö") {
      s.products.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
        return 0;
      });
    }
  }
  scrollRestore();

  let s = useStates("main");
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  useEffect(() => {
    if (searchTerm === "") {
      return;
    }
    if (searchTerm === false) {
      return;
    }
    s.products = s.allProducts.filter((x) =>
      x.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    sortPrice();
  }, [showPrice]);
   
  useEffect(() => {
    (async () => {
      // get the categories from the db

      // get the products from the db
      s.products = await Product.find();
      s.categories = await Category.find();
    })();
  }, []);


  return (
     <div className="d-flex flex-column " style={{ minHeight: "100vh" }}>
    <Container className="productList">
       <Row className="mb-2  mx-auto d-grid gap-2 d-md-flex justify-content-center justify-content-md-start">
          <Col > <h3 style={{ color: "black" }}>Välj Kategori</h3></Col></Row>
      <Row className="mb-2 mx-auto d-grid gap-2 d-md-flex justify-content-center justify-content-md-start">
        <Col sm={4} md={8} className="mb-2">
          <CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} />
        </Col>
        <Col sm={4} md={6} className="mb-2">
          <select
              style={{ height: "25px", width: "8rem" }}
              onChange={(event) => {
                setShowPrice(event.target.value);
              }}
            >
              <option>Billigaste</option>
              <option>Dyraste</option>
              <option>A-Ö</option>
            </select>
         </Col>
         
          <Col xs={6}>
             <input
              style={{ height: "25px", width: "19rem" }}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Sök"
            />
          </Col>
        </Row>

        
   
    
    
    

      <Row xs={2} md={4} lg={6}>
        {" "}
        {s.products
          .filter(
            (product) =>
              +s.chosenCategoryId === 0 /*all*/ ||
              +s.chosenCategoryId === product.categoryId
          )
          .map(({ id, name, description, price }) => (
              <Card
                className="mx-auto "
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
                  <Card.Title>{name}</Card.Title>
                  <Card.Img
                    onError={(event) => missingImage(event, name)}
                    variant="top"
                    src={`/images/products/${id}.jpg`}
                  />
                  <hr></hr>
                  <Card.Text className="mb-5">{description}</Card.Text>
                </Col>
                <Col
                  xxl="12"
                  className="mt-5 mb-3 position-absolute bottom-0 end-1"
                >
                  <Card.Text>
                    <b>Pris:</b> {sweFormat(price)}
                  </Card.Text>
                </Col>
              </Card>
            ))}
        </Row>
      </Container>
    </div>
  );
}
