import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useStates } from "./utilities/states";
import { factory } from "./utilities/FetchHelper";
import { init } from "./utilities/shoppingCartLogic";
import "./utilities/scrollBehavior";
import ProductDetail from "./ProductDetail";
import Header from "./components/Header";
import Home from "./components/Home";
import ProduktLista from "./components/ProduktLista";
import ProductEdit from "./ProductEdit";
import Kundvagn from "./components/Kundvagn";
import Footer from "./components/Footer";
import BackOffice from "./components/BackOffice";
import AddProduct from "./components/addProduct";
import PersonalInfo from "./components/PersonalInfo";

// Create classes used for fetching from the REST-api
const { Product, Categorie: Category } = factory;

export default function App() {
  let s = useStates("main", {
    products: [],
    categories: [],
    chosenCategoryId: 0,
    cartContents: [],
  });

  useEffect(() => {
    (async () => {
      // get the categories from the db
      s.categories = await Category.find();
      // get the products from the db
      s.products = await Product.find();

      // initilize the shopping cart
      // (this provides local storage of cartContents)
      init(s, "cartContents");
    })();
  }, []);

  return s.products.length === 0 ? null : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Kundvagn" element={<Kundvagn />} />
        <Route path="/PersonalInfo" element={<PersonalInfo />} />
        <Route path="/ProduktLista" element={<ProduktLista />} />
        <Route path="/Backoffice" element={<BackOffice />} />
        <Route path="/Backoffice/lagg-till" element={<AddProduct />} />

        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/backoffice/:id" element={<ProductEdit />} />
      </Routes>
      <Footer />
    </Router>
  );
}
