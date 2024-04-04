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
import CreateService from "@/components/create-services";
import ServicesFilter from "@/components/services-filter";

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
      </body>
    </>
  );
}
// import Header from "@/components/Header";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getAllClients } from "@/services/clients";
// import userStore from "@/store/userStore";

// import { useQuery } from "@tanstack/react-query";

// import { Edit, PlusCircle } from "lucide-react";

// import CreateClientsDialog from "@/components/create-clients-dialog";
// import { ClientsFilters } from "@/components/clients-filters";
// import { DeleteClients } from "@/components/delete-clients";
// import { EditClient } from "@/components/edit-clients";

// export default function Clientes() {
//   const { data: clients } = useQuery({
//     queryKey: ["clients"],
//     queryFn: () => getAllClients(userStore.getState().token),
//   });

//   return (
//     <>
//       <Header />
//       <div className="h-full">
//         <div className="p-6 max-w-6xl mx-auto space-y-4">
//           <h1 className="text-3xl font-bold">Clientes</h1>
//           <div className="flex flex-col gap-2">
//             <div className="flex items-center justify-between">
//               <ClientsFilters />

//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <PlusCircle className="w-4 h-4 mr-2" />
//                     Novo Cliente
//                   </Button>
//                 </DialogTrigger>

//                 <CreateClientsDialog />
//               </Dialog>
//             </div>
//             <Table className="border rounded-lg p-2">
//               <TableHeader>
//                 <TableHead className="text-slate-900">Nome</TableHead>
//                 <TableHead className="text-slate-900">CPF</TableHead>
//                 <TableHead className="text-slate-900">Telefone</TableHead>
//                 <TableHead className="text-slate-900">Ações</TableHead>
//               </TableHeader>
//               <TableBody>
//                 {clients?.map((client) => {
//                   return (
//                     <TableRow key={client.id}>
//                       <TableCell>{client.name}</TableCell>
//                       <TableCell>{client.cpf}</TableCell>
//                       <TableCell>{client.cellphone}</TableCell>
//                       <TableCell className="flex gap-1">
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <button>
//                               <Edit />
//                             </button>
//                           </DialogTrigger>
//                           <EditClient client={client} />
//                         </Dialog>
//                         <DeleteClients client={client} />
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
