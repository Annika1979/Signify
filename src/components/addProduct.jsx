import { useStates } from "../utilities/states";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { initializeMedia, captureImage, uploadImage, getGeolocation, pickImage} from '../utilities/imageCapture';

//import UploadPicture from "./Picture";

import CategoryAdd from '../utilities/addNewCategory';

import { factory } from "../utilities/FetchHelper"
import React, { useEffect } from 'react'



const { Product } = factory;

export default function AddProduct() {

  useEffect(() => {
    initializeMedia();

  }, []);
  
 
  
  let s = useStates("main")
  let { id } = useParams();
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

  let l = useStates({
    captureMode: true,
    replaceImage: false,
    productImage: `/images/products/${id}}.jpg`
  });


 console.log(state.newProduct)
  async function save() {
    // Save to db
    await state.newProduct.save()
    l.replaceImage && await uploadImage(state.newProduct.id);
    console.log(state.newProduct.id);
    // Navigate to detail page
    
    alert("Saved")
    // navigate(`/backoffice/`);
  }

  function takeImage() {
    captureImage();
    getGeolocation();
    l.captureMode = false;
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
    <Container className="product-edit">
      {/* Online */}
     

      {l.replaceImage ?
       
        <Row><Col >
          <video   style={{ display: l.captureMode ? 'block' : 'none',}} autoPlay></video>
          <canvas width="320" height="240" style={{ display: !l.captureMode ? 'block' : 'none' }}></canvas>

          <button style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }} className="btn btn-primary mt-3 mb-5" onClick={takeImage}>Ta bild</button>
<input type="file" onChange={function (e){pickImage(e,l), getGeolocation()}} accept="image/*" id="image-picker"/>
          <div  id="location-display"></div>
          
        </Col></Row> : <Row><Col>

          <button  style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }} className="btn btn-primary mt-3 mb-5" onClick={() => l.replaceImage = true}>Lägg till bild</button>

        </Col></Row>}


      
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
        {...state.newProduct.bind("id")}
      >
        Spara
      </button>

      
    </Container>
  );
}
