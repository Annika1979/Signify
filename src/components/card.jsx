import { useStates } from '../utilities/states';
import { Container, Col, Card } from 'react-bootstrap';


import { sweFormat } from '../utilities/currencyFormatter';
import { missingImage } from '../utilities/handleMissingImage';


export default function Product() {

 

  let s = useStates('main');
  

  

  return <Container   >
   
    {s.products.filter(product =>
     
      s.chosenCategoryId === 0 /*all*/
      || s.chosenCategoryId === product.categoryId
    ).map(({ id, name, description, price }) =>
      
        <Card >
          <Col  xl="6" xxl="12">
            <h3>{name}</h3>
            <img onError={event => missingImage(event, name)} className="float-end ms-3" style={{ width: 300, height: "auto", objectFit: 'cover' }} src={`/images/products/${id}.jpg`} />
            <p>{description}</p>
          </Col>
          <Col xxl="12">
            <p><b>Price:</b> {sweFormat(price)}</p>
          </Col>
        </Card >
   
    )}
  </Container>
}