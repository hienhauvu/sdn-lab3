import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddProduct from "./components/AddProducts.js";
import Detail from "./components/ProductDetail.js";
function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddProduct />} />
          <Route path="/detail/:pid" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
