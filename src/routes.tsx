import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Servicos from "./pages/Servicos";
import Veiculos from "./pages/Vehicles";
import Clientes from "./pages/Clientes";
import Cadastro from "./pages/Cadastro";
import ProtectRoutes from "./pages/Protect";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route
          path="/dashboard"
          element={
            <ProtectRoutes redirectTo="/">
              <Dashboard />
            </ProtectRoutes>
          }
        />
        <Route
          path="/servicos"
          element={
            <ProtectRoutes redirectTo="/">
              <Servicos />
            </ProtectRoutes>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectRoutes redirectTo="/">
              <Clientes />
            </ProtectRoutes>
          }
        />
        <Route
          path="/veiculos"
          element={
            <ProtectRoutes redirectTo="/">
              <Veiculos />
            </ProtectRoutes>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
