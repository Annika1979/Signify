import React, { useState, useEffect} from "react";
import { useStates } from '../utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from '../utilities/scrollBehavior';
import CategorySelect from '../CategorySelect';

import { sweFormat } from '../utilities/currencyFormatter';
import { missingImage } from '../utilities/handleMissingImage';





export default function ProduktLista() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showPrice, setShowPrice] = useState("Billigaste");

  function sortPrice(){
    if(showPrice==="Billigaste"){
      s.products.sort((a,b)=>a.price<b.price?-1:1);
    }
    if(showPrice==="Dyraste"){
      s.products.sort((a,b)=>a.price<b.price?1:-1);
    }
  }
  scrollRestore();

  let s = useStates("main");
  let navigate = useNavigate();

  function showDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  useEffect(()=>{
    if(searchTerm==="") {return}   
    if(searchTerm===false) {return}   
     s.products=s.allProducts.filter(x=>x.name.toLowerCase().includes(searchTerm.toLowerCase()))
    
    },[searchTerm])

    
  useEffect(()=>{
    sortPrice();
    
    },[showPrice])
  

  return (
   
    <Container className="productList">
    <Row><Col ><h3 style={{color:"white"}}>Välj Kategori</h3></Col></Row>
      <Row className="mb-3">
        <Col>
          <CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} />
        </Col>
        <Col>
          <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Sök"
                />
        </Col>
        <Col> 
        <select onChange={(event) => 
        {setShowPrice(event.target.value)                     
             }}>
     
      <option>Billigaste</option>
      <option>Dyraste</option>
       </select>          
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