import headerLogo from "@/assets/header-logo.svg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <header className="flex content-center items-center border-zinc-200 w-screen border-b justify-between pr-4 pl-4">
      <img src={headerLogo} alt="header logo" />
      <div>
        <Button
          variant="ghost"
          onClick={() => handleClick("/dashboard")}
          className="text-base"
        >
          Dashboard
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleClick("/servicos")}
          className="text-base"
        >
          Serviços
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleClick("/clientes")}
          className="text-base"
        >
          Clientes
        </Button>
        <Button
          variant="ghost"
          onClick={() => handleClick("/veiculos")}
          className="text-base"
        >
          Veículos
        </Button>
      </div>
    </header>
  );
}
