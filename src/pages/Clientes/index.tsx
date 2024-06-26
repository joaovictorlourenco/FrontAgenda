import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllClients } from "@/services/clients";
import userStore from "@/store/userStore";

import { useQuery } from "@tanstack/react-query";

import { Edit, PlusCircle } from "lucide-react";

import CreateClientsDialog from "@/components/create-clients-dialog";
import { ClientsFilters } from "@/components/clients-filters";
import { DeleteClients } from "@/components/delete-clients";
import { EditClient } from "@/components/edit-clients";

export default function Clientes() {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getAllClients(userStore.getState().token),
  });

  return (
    <>
      <Header />
      <div className="h-full">
        <div className="p-6 max-w-6xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Clientes</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <ClientsFilters />

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Novo Cliente
                  </Button>
                </DialogTrigger>

                <CreateClientsDialog />
              </Dialog>
            </div>
            <Table className="border rounded-lg p-2">
              <TableHeader>
                <TableHead className="text-slate-900">Nome</TableHead>
                <TableHead className="text-slate-900">CPF</TableHead>
                <TableHead className="text-slate-900">Telefone</TableHead>
                <TableHead className="text-slate-900">Ações</TableHead>
              </TableHeader>
              <TableBody>
                {clients?.map((client) => {
                  return (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell>{client.cpf}</TableCell>
                      <TableCell>{client.cellphone}</TableCell>
                      <TableCell className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button>
                              <Edit />
                            </button>
                          </DialogTrigger>
                          <EditClient client={client} />
                        </Dialog>
                        <DeleteClients client={client} />
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
