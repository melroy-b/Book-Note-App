import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";

const App = () => {
  <Routes element={<Layout />}>
    <Route path="/" element={<Home />} />
  </Routes>;
};

export default App;
