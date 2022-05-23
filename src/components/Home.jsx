import { Container, Row, Col } from "react-bootstrap";
import hemBild from "../../public/images/products/hemBild.png"

export default function StartPage() {
  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ textAlign:"center", color:"white", marginTop:"-50px" }}>SigniFy</h1>
        </Col>
        </Row>
        <Row>
        <Col>
          <h3 style={{ textAlign:"center", color:"white", marginTop:"-30px" }}>När du vill synas</h3>
        </Col>
      </Row>
      <Row>
      <Row>
        <Col>
        <h3 style={{  color:"white" }}>Varför Signify</h3>
        </Col>
        </Row>
        <Col>
        <p className="textAnimation" style={{  color:"white", paddingTop:"50px"}}>Snabba Leveranser
 Med en lång erfarenhet, välorganiserade logistiska transaktioner och perfekt service
  blir Signify den självklara partnern för dig som behöver en leverantör du kan lita på.
Stort Utbud Med ett omfattande och unikt utbud av produkter och tillgång till ett stort lager har vi möjlighet att hålla hög leveranskapacitet.
Kunden står i centrum Vi anser att snabba leveranser, en god service, 
med en bra kvalitét och dig som kund i centrum ger mycket goda förutsättningar för ett gott slutresultat.
        </p>
        </Col>
        <Col>
        <img src={hemBild} alt="signs" style={{ width: 600, height: "auto" }} className="float-end" />
        </Col>

      </Row>
    </Container>
  );
}
