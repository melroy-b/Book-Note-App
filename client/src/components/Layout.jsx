import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="container flex-fill">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
