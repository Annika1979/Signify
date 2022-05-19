import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useStates } from "./utilities/states";
import { factory } from "./utilities/FetchHelper";
import { init } from "./utilities/shoppingCartLogic";
import "./utilities/scrollBehavior";

import Header from "./components/Header";
import Home from "./components/Home";
import Flaggskylt from "./components/Flaggskylt";
import Hangandeskylt from "./components/Hangandeskylt";
import Vaggskyltar from "./components/Vaggskyltrar";
import ProductDetail from "./ProductDetail";
import ProductEdit from "./ProductEdit";
import Kundvagn from "./components/Kundvagn";
import Footer from "./components/Footer";

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
        <Route path="/Flaggskylt" element={<Flaggskylt />} />
        <Route path="/Hangandeskylt" element={<Hangandeskylt />} />
        <Route path="/Vaggskyltar" element={<Vaggskyltar />} />

        <Route path="/product-detail/:id" element={<ProductDetail />} />
        <Route path="/product-edit/:id" element={<ProductEdit />} />
      </Routes>
      <Footer />
    </Router>
  );
}
