import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "@/services/services";
import userStore from "@/store/userStore";
import CreateService from "@/components/create-services";
import ServicesFilter from "@/components/services-filter";
import DeleteServices from "@/components/delet-services";
import EditServices from "@/components/edit-services";

type Service = {
  id: string;
  name: string;
  description: string;
  value: number;
  customerId: string;
  vehiclesId: string;
  vehicles: {
    id: string;
    type: string;
    brand: string;
    model: string;
    year: number;
  };
  customers: {
    id: string;
    name: string;
    cpf: string;
    cellphone: string;
  };
};

export default function Servicos() {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(userStore.getState().token),
  });

  console.log(services);

  return (
    <>
      <Header />

      <body className="h-full">
        <div className="p-6 max-w-6xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Serviço</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <ServicesFilter />

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Novo Serviço
                  </Button>
                </DialogTrigger>
                <CreateService />
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
                {services?.map((service: Service) => {
                  return (
                    <TableRow key={service.id}>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>
                        {service.value.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell>{service.customers.name}</TableCell>
                      <TableCell>{service.customers.cellphone}</TableCell>
                      <TableCell>{service.vehicles.brand}</TableCell>
                      <TableCell>{service.vehicles.model}</TableCell>
                      <TableCell>{service.vehicles.year}</TableCell>
                      <TableCell className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button>
                              <Edit />
                            </button>
                          </DialogTrigger>
                          <EditServices service={service} />
                        </Dialog>
                        <DeleteServices service={service} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </body>
    </>
  );
}
