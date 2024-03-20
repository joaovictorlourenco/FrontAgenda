import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search } from "lucide-react";

export default function Clientes() {
  return (
    <>
      <Header />
      <div className="h-full">
        <div className="p-6 max-w-6xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <form className="flex items-center gap-2">
                <Input type="text" placeholder="Pesquisar" />
                <Button type="submit" className="btn btn-secondary">
                  <Search className="w-4 h-4 mr-2" />
                  Filtrar Resultados
                </Button>
              </form>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Novo Cliente
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
