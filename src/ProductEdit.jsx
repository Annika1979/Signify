import { useStates } from "./utilities/states";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import CategorySelect from "./utilities/CategorySelect";
import {
  initializeMedia,
  captureImage,
  uploadImage,
  getGeolocation,
  pickImage,
} from "./utilities/imageCapture";
import { useEffect } from "react";

export default function ProductDetail() {
  let s = useStates("main");
  let { id } = useParams();
  let navigate = useNavigate();

  // a local state only for this component
  let l = useStates({
    captureMode: true,
    replaceImage: false,
    productImage: `/images/products/${id}.jpg`,
  });

  // initialize media (start talking to camera)
  // when the component loads
  useEffect(() => {
    initializeMedia();
  }, []);

  let product = s.products.find((x) => x.id === +id);
  if (!product) {
    return null;
  }
  let { name, description, price } = product;

  async function save() {
    // Save to db
    await product.save();
    // Upload image if the image should be replaced
    l.replaceImage && (await uploadImage(id));

    navigate(`/backoffice/`);
  }

  function takeImage() {
    captureImage();
    getGeolocation();
    l.captureMode = false;
  }

  async function Tabort() {
    await product.Tabort();

    // Navigate to detail page

    navigate(`/backoffice/`);
  }

  // Behöver uppdatera sidan efter att en produkt tagits bort. Tillfälligt lagt till en nödlösning med window reload.

  async function find() {
    await product.find();
  }
  function routeBack() {
    navigate("/backoffice");
  }
  // Check if we are offline (in that case no editing available)
  // console.log("navigator.onLine", navigator.onLine);

  return !navigator.onLine ? (
    <Container>
      {/* Offline */}
      <Row>
        <Col>
          <h4>
            Du är offline! Du kan endast redigera produkten när du är online.
          </h4>
          <Link to={`/backoffice`}>
            <button
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
            </button>
          </Link>
        </Col>
      </Row>
    </Container>
  ) : (
    <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
      <Container
        style={{
          paddingTop: "50px",
          marginBottom: "50px",
          backgroundColor: "#fff",
          borderRadius: "10px",
        }}
      >
        {/* Online */}
        {l.replaceImage ? (
          <Row className="mx-auto">
            <Col>
              <video
                style={{ display: l.captureMode ? "block" : "none" }}
                autoPlay
              ></video>
              <canvas
                className=" mx-auto "
                width="320"
                height="240"
                style={{ display: !l.captureMode ? "block" : "none" }}
              ></canvas>

              <button
                style={{
                  backgroundColor: "rgba(102, 10, 59, 1)",
                  borderRadius: "10px",
                  border: "none",
                  color: "white",
                }}
                className="btn  mt-3 mb-5"
                onClick={takeImage}
              >
                Ta bild
              </button>
              <input
                type="file"
                onChange={function (e) {
                  pickImage(e, l), getGeolocation();
                }}
                accept="image/*"
                id="image-picker"
              />
              <div id="location-display"></div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <img className="mx-auto" src={l.productImage} />

              <button
                style={{
                  backgroundColor: "rgba(102, 10, 59, 1)",

                  borderRadius: "10px",
                  border: "none",
                  color: "white",
                }}
                className="btn  mt-3 mb-5   d-flex  justify-content-start"
                onClick={() => (l.replaceImage = true)}
              >
                Byt bild
              </button>
            </Col>
          </Row>
        )}
        <Row>
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
        <Row>
          <Col>
            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }}
              type="button"
              onClick={routeBack}
              className="mb-5 btn btn-primary float-end me-3"
            >
              Tillbaka
            </button>

            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }}
              type="button"
              onClick={save}
              className="mb-5 btn btn-primary float-end me-3 "
            >
              Spara
            </button>

            <button
              style={{
                backgroundColor: "rgba(102, 10, 59, 1)",
                borderRadius: "10px",
                border: "none",
                color: "white",
              }}
              type="button"
              onClick={() => Tabort()}
              className="mb-5 btn btn-primary float-end me-3"
            >
              Radera
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
