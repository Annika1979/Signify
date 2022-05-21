;
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import CategorySelect from "../CategorySelect";

export default function AddProduct() {
   
   
  
  let navigate = useNavigate();

  
  
  

  async function save() {
    // Save to db
    await product.save();
    // Navigate to detail page
    navigate(`/backoffice/`);
    
  }
   function routeBack(){
    navigate('/backoffice')
   }
  // Check if we are offline (in that case no editing available)
  // console.log("navigator.onLine", navigator.onLine);

  return !navigator.onLine ? (
    <Container>
    
    
     
      <Row>
        <Col>
          <label className="mt-3">
            Produkt:
            <input className="form-control"  />
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="mt-3">
            Beskrivning:
            <textarea
              className="form-control"
             
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
              
            />
          </label>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
        <label>
            Kategori:&nbsp;
           
          </label>
        </Col>
      </Row>
      <button
        type="button"
        onClick={routeBack}
        className="my-4 btn btn-primary float-end"
      >
        Tillbaka
      </button>

      <button
        type="button"
        onClick={save}
        className="my-4 btn btn-primary float-end"
      >
        Spara
      </button>
    
    </Container>
  );
 }
