import headerLogo from "@/assets/header-logo.svg";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex content-center items-center border-zinc-200 w-screen border-b justify-between pr-4 pl-4">
      <img src={headerLogo} alt="header logo" />
      <div>
        <NavLink to="/dashboard">
          <Button variant="ghost" className="text-base">
            Dashboard
          </Button>
        </NavLink>

        <NavLink to="/servicos">
          <Button variant="ghost" className="text-base">
            Serviços
          </Button>
        </NavLink>

        <NavLink to="/clientes">
          <Button variant="ghost" className="text-base">
            Clientes
          </Button>
        </NavLink>

        <NavLink to="/veiculos">
          <Button variant="ghost" className="text-base">
            Veículos
          </Button>
        </NavLink>
      </div>
    </header>
  );
}
