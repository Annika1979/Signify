import { useStates } from "../utilities/states";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { empty, remove, save } from "../utilities/shoppingCartLogic";
import { useEffect } from "react";
import { sweFormat } from "../utilities/currencyFormatter";

export default function ShoppingCart() {
  let s = useStates("main");

  let totalSum = s.cartContents.reduce(
    (acc, row) => acc + row.quantity * row.product.price,
    0
  );

  useEffect(() => {
    // Save the cart contents (on quantity changes)
    save();
  });

  return (
    <Container className="shoppingCart">
      <Row>
        <Col>
          <h1>Kundvagn</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {s.cartContents.length ? (
            <table className="table">
              <thead>
                <tr>
                  <th colSpan={2}>Produkt</th>
                  <th className="text-end">Antal</th>
                  <th className="text-end">à</th>
                  <th className="text-end">Summa</th>
                </tr>
              </thead>
              <tbody>
                {s.cartContents.map((row, i) => (
                  <tr key={i}>
                    <td
                      style={{ cursor: "pointer", width: 1 }}
                      onClick={() => remove(row.product)}
                    >
                      🗑️
                    </td>
                    <td>{row.product.name}</td>
                    <td className="text-end">
                      <input
                        className="text-end"
                        style={{ width: 50 }}
                        type="number"
                        min={1}
                        max={100}
                        {...row.bind("quantity")}
                      />
                    </td>
                    <td className="text-end" style={{ width: 100 }}>
                      {sweFormat(row.product.price)}
                    </td>
                    <td className="text-end" style={{ width: 100 }}>
                      {sweFormat(row.quantity * row.product.price)}
                    </td>
                  </tr>
                ))}
                <tr className="fw-bold">
                  <td>Summa</td>
                  <td colSpan={4} className="text-end">
                    {sweFormat(totalSum)}
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>Kundvagnen är tom...</p>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Link className="float-end text-decoration-none" to={`/ProduktLista`}>
            <button type="button" className="btn btn-primary">
              Tillbaka
            </button>
          </Link>
          {s.cartContents.length ? (
            <button
              onClick={empty}
              type="button"
              className="btn btn-primary float-end me-3"
            >
              Töm varukorg
            </button>
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
}
