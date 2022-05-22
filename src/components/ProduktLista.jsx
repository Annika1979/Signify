import { useStates } from '../utilities/states';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { scrollRestore } from '../utilities/scrollBehavior';
import CategorySelect from '../CategorySelect';
import { sweFormat } from '../utilities/currencyFormatter';
import { missingImage } from '../utilities/handleMissingImage';
import FilterPrice from '../filterPrice';


export default function ProduktLista() {

  scrollRestore();

  let s = useStates('main');
  let navigate = useNavigate();
 
  




  function showDetail(id) {
    navigate(`/product-detail/${id}`);
  }

  return <Container className="productList">
    <Row><Col ><h3 style={{color:"white"}}>Välj Kategori</h3></Col></Row>
    <Row className="mb-3"><Col><CategorySelect showAllOption bindTo={[s, 'chosenCategoryId']} /></Col></Row>
    {s.products.filter(product =>
     
      s.chosenCategoryId === 0 /*all*/
      || s.chosenCategoryId === product.categoryId
    ).map(({ id, name, description, price }) =>
      <Row  style={{backgroundColor:"white"}} xxl={12} className="product" key={id} onClick={() => showDetail(id)}>
        <Card >
          <Col xxl={12}>
            <h3>{name}</h3>
            <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 250, height: "auto" }} src={`/images/products/${id}.jpg`} />
            <p>{description}</p>
          </Col>
          <Col >
            <p><b>Price:</b> {sweFormat(price)}</p>
          </Col>
        </Card>
     
      </Row>
    )}
  </Container>
}