import { useStates } from "../utilities/states";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import CategorySelect from "../CategorySelect";
import { factory } from "../utilities/FetchHelper"
import React from 'react'



const { Product } = factory;

export default function AddProduct() {
<<<<<<< HEAD
  

 
  
  let s = useStates("main")
  let navigate = useNavigate();
  
  // lokalt state för denna komponent
  let state = useStates({
    newProduct: new Product({
      name: '',
      description: '',
      price: '',
      categoryId: ""
    })
  });
 console.log(state.newProduct)
=======
  let s = useStates("main");

  let navigate = useNavigate();

  let product = s.products;
  console.log(product);

  let { id, name, description, price } = product;

>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
  async function save() {
    // Save to db
    await state.newProduct.save()
    // Navigate to detail page
<<<<<<< HEAD
    
    alert("Saved")
    // navigate(`/backoffice/`);
  }
  
  function routeBack(){
    navigate('/backoffice')
  }
=======
    navigate(`/backoffice/`);
  }
  function routeBack() {
    navigate("/backoffice");
    id = product.length + 1;
    console.log(id);
  }

>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
  // Check if we are offline (in that case no editing available)
  // console.log("navigator.onLine", navigator.onLine);

  return !navigator.onLine ? (
<<<<<<< HEAD
    <Container>
=======
    <Container
      style={{
        backgroundColor: "rgba(255, 204, 255,0.5 )",
        borderRadius: "10px",
      }}
    >
>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
      {/* Offline */}
      <Row>
        <Col>
          <h4>Du är offline! Du kan endast ändra när du är online.</h4>
        </Col>
      </Row>
    </Container>
  ) : (
<<<<<<< HEAD
    <Container>
      {/* Online */}
      <Row>
        <Col>
          <h1>{}</h1>
=======
    <Container
      style={{
        backgroundColor: "rgba(255, 204, 255,0.5 )",
        borderRadius: "10px",
      }}
    >
      {/* Online */}
      <Row>
        <Row>
          <Col>
            <h1 className="text-center mt-4" style={{ color: "white" }}>
              Lägg till en produkt
            </h1>
          </Col>
        </Row>
        <Col>
          <h1>{name}</h1>
>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
        </Col>
      </Row>
      <Row>
        <Col>
<<<<<<< HEAD
          <p>{}</p>
=======
          <p>{description}</p>
>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
        </Col>
      </Row>
      <Row>
        <Col>
<<<<<<< HEAD
          <p>Pris: {}kr</p>
=======
          <p>Pris: {price}kr</p>
>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="mt-3">
            Produkt:
<<<<<<< HEAD
            <input className="form-control" { ...state.newProduct.bind("name")} />
=======
            <input className="form-control" {...product.bind("name")} />
>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="mt-3">
            Beskrivning:
            <textarea
              className="form-control"
<<<<<<< HEAD
              {...state.newProduct.bind("description")}
=======
              {...product.bind("description")}
>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
            />
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="mt-3">
            Pris:
            <input
              type="number"
              className="form-control"
<<<<<<< HEAD
              {...state.newProduct.bind("price")}
=======
              {...product.bind("price")}
>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
            />
          </label>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
<<<<<<< HEAD
          <label>
            Kategori:&nbsp;
            <CategorySelect showAllOption bindTo={[state.newProduct, 'categoryId']} />
=======
          <label className="mb-5">
            Kategori:&nbsp;
            <CategorySelect bindTo={[product, "categoryId"]} />
>>>>>>> 0784e6728c22d832b902bcd09fcbcf4d543532d2
          </label>
        </Col>
      </Row>
      <button
        style={{
          backgroundColor: "purple",
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
          backgroundColor: "purple",
          borderRadius: "10px",
          border: "none",
          color: "white",
          marginRight: "5px",
        }}
        type="button"
        onClick={save}
        className="my-4 btn btn-primary float-end"
        {...product.bind("id")}
      >
        Spara
      </button>
    </Container>
  );
}
