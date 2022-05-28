import { Container, Carousel, Row, Col } from "react-bootstrap";

import neonSign from "../../dist/images/home_neon.jpg";
import holaSign from "../../dist/images/home_hola.jpg";
import flaggorSign from "../../dist/images/flaggor.jpg";

export default function StartPage() {
  return (
    <Container>
      <div>
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={neonSign} alt="Neon Sign" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={holaSign} alt="Hola Sign" />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={flaggorSign} alt="Hola Sign" />
          </Carousel.Item>
        </Carousel>
        <Row className="mt-5">
          <Col className="mb-3" xs={12} lg={6}>
            <h4>
              Snabba Leveranser Med en lång erfarenhet, välorganiserade
              logistiska transaktioner och perfekt service blir Signify den
              självklara partnern för dig som behöver en leverantör du kan lita
              på.
            </h4>
          </Col>
          <Col xs={12} lg={6}>
            <h4>
              Stort utbud med ett omfattande och unikt utbud av produkter och
              tillgång till ett stort lager har vi möjlighet att hålla hög
              leveranskapacitet. Kunden står i centrum Vi anser att snabba
              leveranser, en god service, med en bra kvalitét och dig som kund i
              centrum ger mycket goda förutsättningar för ett gott slutresultat.
            </h4>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
