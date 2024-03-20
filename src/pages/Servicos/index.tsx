import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, XCircle, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "@/services/services";
import userStore from "@/store/userStore";

export default function Servicos() {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(userStore.getState().token),
  });

  console.log(services);

  return (
    <>
      <Header />

      <div className="h-full">
        <div className="p-6 max-w-6xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Serviço</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <form className="flex items-center gap-2">
                <Input type="text" placeholder="Pesquisar" />
                <Button type="submit" variant="secondary">
                  <Search className="w-4 h-4 mr-2" />
                  Filtrar Resultados
                </Button>
              </form>

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Novo Serviço
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Novo Serviço</DialogTitle>
                    <DialogDescription>
                      Criar um novo serviço no sistema
                    </DialogDescription>
                  </DialogHeader>
                  <form className="space-y-6">
                    <div className="grid grid-cols-4 items-center text-right gap-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input type="text" className="col-span-3" id="name" />
                    </div>

                    <div className="grid grid-cols-4 items-center text-right gap-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea className="col-span-3" id="description" />
                    </div>

                    <div className="grid grid-cols-4 items-center text-right gap-2">
                      <Label htmlFor="value">Valor</Label>
                      <Input type="number" className="col-span-3" id="value" />
                    </div>

                    <div className="grid grid-cols-4 items-center text-right gap-2">
                      <Label htmlFor="Model">Modelo</Label>
                      <Input type="text" className="col-span-3" id="Model" />
                    </div>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button type="submit" variant="default">
                        Salvar
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Table className="border rounded-lg p-2">
              <TableHeader>
                <TableHead className="text-slate-900">Serviço</TableHead>
                <TableHead className="text-slate-900">Descrição</TableHead>
                <TableHead className="text-slate-900">Valor</TableHead>
                <TableHead className="text-slate-900">Cliente</TableHead>
                <TableHead className="text-slate-900">Contato</TableHead>
                <TableHead className="text-slate-900">Marca</TableHead>
                <TableHead className="text-slate-900">Modelo</TableHead>
                <TableHead className="text-slate-900">Ano</TableHead>
                <TableHead className="text-slate-900">Ações</TableHead>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>Lavagem</TableCell>
                      <TableCell>Lavagem completa</TableCell>
                      <TableCell>$250.00</TableCell>
                      <TableCell>Ana</TableCell>
                      <TableCell>(34) 9997-29839</TableCell>
                      <TableCell>Toyota</TableCell>
                      <TableCell>Corolla</TableCell>
                      <TableCell>2024</TableCell>
                      <TableCell className="flex gap-1">
                        <button>
                          <Edit />
                        </button>
                        <button>
                          <XCircle />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
