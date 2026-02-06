import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-fill" style={{ backgroundColor: "#F5F1EC" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
