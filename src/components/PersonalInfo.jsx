import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { factory } from "../utilities/FetchHelper"
import React from "react";
import { useStates } from "../utilities/states";
import { useNavigate } from "react-router-dom";
import { empty } from "../utilities/shoppingCartLogic";



const {Order} = factory;


export default function PersonalInfo() {
  let s = useStates("main");
  let navigate = useNavigate();
  
    function routeBack(){
    navigate('/Kundvagn')
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
    await state.newOrder.save()
    // Navigate to detail page
    
    alert("Tack för din order!")
    // navigate(`/backoffice/`);
  }
  
  console.log(s.cartContents)
  

  

     
              
  return (
    <Container
      style={{
        width: "50rem",
        margin: "auto",
        padding: "4rem",
        backgroundColor: "lightgray",
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
         
        
          <Button  variant="primary" type="submit"  >
            Slutför Köp
          </Button>
          
          <Button variant="primary" onClick={routeBack} >
            tillbaka
          </Button>
       
      </Form>
    </Container>
  );
}
