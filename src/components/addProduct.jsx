;
import { useStates } from "../utilities/states";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import CategorySelect from "../CategorySelect";

export default function AddProduct() {
   

  let s = useStates("main");
  
  let navigate = useNavigate();

  let product = s.products;
  console.log(product);
  
  let { id, name, description, price } = product;
  async function save() {
    // Save to db
    await product.save();
    // Navigate to detail page
    navigate(`/backoffice/`);
    
  }
   function routeBack(){
    navigate('/backoffice')
  id = product.length + 1;
  console.log(id);
   }
  


  // Check if we are offline (in that case no editing available)
  // console.log("navigator.onLine", navigator.onLine);

  return !navigator.onLine ? (
    <Container style={{backgroundColor:"rgba(255, 204, 255,0.5 )", borderRadius:"10px"}}>
    
    
     
      {/* Offline */}
      <Row>
        <Col>
          <h4>Du är offline! Du kan endast ändra när du är online.</h4>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container style={{backgroundColor:"rgba(255, 204, 255,0.5 )", borderRadius:"10px"}}>
      {/* Online */}
      <Row>
        <Row>
        <Col>
        <h1 className="text-center mt-4" style={{color:"white"}}>Lägg till en produkt</h1>
        </Col>
        </Row>
        <Col>
          <h1>{name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{description}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Pris: {price}kr</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="mt-3">
            Produkt:
            <input className="form-control" {...product.bind("name")} />
          </label>
        </Col>
      </Row>
      <Row>
        <Col>
          <label className="mt-3">
            Beskrivning:
            <textarea
              className="form-control"
              {...product.bind("description")}
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
              {...product.bind("price")}
            />
          </label>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <label className="mb-5">
            Kategori:&nbsp;
            <CategorySelect bindTo={[product, "categoryId"]} />
          </label>
        </Col>
      </Row>
      <button style={{ backgroundColor:"purple", borderRadius:"10px", border: "none", color:"white" }}
        type="button"
        onClick={routeBack}
        className="my-4 btn btn-primary float-end"
      >
        Tillbaka
      </button>

      <button style={{ backgroundColor:"purple", borderRadius:"10px", border: "none", color:"white", marginRight:"5px" }}
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
