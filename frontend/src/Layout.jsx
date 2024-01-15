import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <main className="">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
