import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { factory } from "../utilities/FetchHelper";
import { useState } from "react";
import React from "react";
import { useStates } from "../utilities/states";
import { useNavigate } from "react-router-dom";
import { empty } from "../utilities/shoppingCartLogic";



const { Order } = factory;

export default function PersonalInfo() {
  let s = useStates("main");
  let navigate = useNavigate();
  
    function routeBack(){
    navigate('/Kundvagn')
  }
    function routeBack2(){
    navigate('/Produktlista')
  }


   let state = useStates({
     newOrder: new Order({
       customerorder: JSON.stringify(s.cartContents),
       firstname: "",
       lastname: "",
       street_number: "",
       zipcode: "",
       area: "",
       email:"",



      
     
    })
   });
  
 
    
  async function save() {
    // Save to db
    await state.newOrder.save();
    // Navigate to detail page
    
    alert("Tack för din order!")
    // navigate(`/backoffice/`);
  }
  
 
  

  

     
              
 

   


  return navigator.onLine ?
    <Container
      style={{
        width: "50rem",
        margin: "auto",
        padding: "4rem",
        backgroundColor: "#fff",
      }}
    >
      <Form onSubmit={function (e) { e.preventDefault(); save(); empty();routeBack()}}>
        <h2>Fyll i leveransadress</h2>
        <Row>
          <Col>
            <Form.Label>Förnamn</Form.Label>
            <Form.Control required placeholder="Förnamn"  { ...state.newOrder.bind("firstname")} />
          </Col>
          <Col>
            <Form.Label>Efternamn</Form.Label>
            <Form.Control required placeholder="Efternamn"  { ...state.newOrder.bind("lastname")}/>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Adress</Form.Label>
          <Form.Control required placeholder="Gatunamn och nummer"  { ...state.newOrder.bind("street_number")}/>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Postnummer</Form.Label>
            <Form.Control required placeholder="Postnummer"  { ...state.newOrder.bind("zipcode")}/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Postort</Form.Label>
            <Form.Control required placeholder="Postort" { ...state.newOrder.bind("area")} />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Emailadress"  { ...state.newOrder.bind("email")} />
          </Form.Group>
        </Row>
    
       
        {navigator.onLine ? (
          <Row>
            <Col>
            <Button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }}
              type="submit"
             
            >
              Slutför Köp
          </Button>
            </Col>
            
            <Col>
           <Button onClick={routeBack2}
                style={{
                  backgroundColor: "rgba(102, 10, 59, 1)",
                  borderRadius: "10px",
                  border: "none",
                  color: "white",
                }}
                type="button"
                className="my-3 mx-1 btn btn-primary float-end"
              >
                Tillbaka
              </Button>
              </Col>
            </Row>
          
         
        ) : (null)}
      </Form>
    </Container>
    : (
      <Container >
        <Row>
          <Col>
            <h4>Du kan tyvärr inte avsluta ditt köp just nu, försök igen när du är onilne.</h4>
           
              <Button onClick={routeBack2}
                style={{
                  backgroundColor: "rgba(102, 10, 59, 1)",
                  borderRadius: "10px",
                  border: "none",
                  color: "white",
                }}
                type="button"
                className="my-3 mx-1 btn btn-primary float-end"
              >
                Tillbaka
              </Button>
            
          </Col>
        </Row>
      </Container>
    )

};