import { useStates } from "../utilities/states";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

//import UploadPicture from "./Picture";

import CategoryAdd from '../utilities/addNewCategory';

import { factory } from "../utilities/FetchHelper"
import React from 'react'



const { Product } = factory;

export default function AddProduct() {
  

 
  
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
  async function save() {
    // Save to db
    await state.newProduct.save()
    // Navigate to detail page
    
    alert("Saved")
    // navigate(`/backoffice/`);
  }
  
  function routeBack(){
    navigate('/backoffice/Edit')
  }
  // Check if we are offline (in that case no editing available)
  // console.log("navigator.onLine", navigator.onLine);

  return !navigator.onLine ? (
    <Container>
      {/* Offline */}
      <Row>
        <Col>
          <h4>Du är offline! Du kan endast ändra när du är online.</h4>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>
      {/* Online */}
      
      <Row>
        <Col>
          <label className="mt-3">
            Produkt:
            <input className="form-control" { ...state.newProduct.bind("name")} />
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="mt-3">
            Beskrivning:
            <textarea
              className="form-control"
              {...state.newProduct.bind("description")}
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
              {...state.newProduct.bind("price")}
            />
          </label>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <label>
            Kategori:&nbsp;
            <CategoryAdd bindTo={[state.newProduct, 'categoryId']} />
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
        {...state.newProduct.bind("id")}
      >
        Spara
      </button>

      
    </Container>
  );
}
