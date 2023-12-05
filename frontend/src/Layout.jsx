import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <main className="pb-4">
      <Header />
      <Outlet />
    </main>
  );
}
