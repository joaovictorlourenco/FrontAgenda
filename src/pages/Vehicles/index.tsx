import CreateVehicleDialog from "@/components/create-vehicles";
import DeleteVehicles from "@/components/delete-vehicles";
import EditVehicles from "@/components/edit-vehicles";
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

import VehiclesFilter from "@/components/vehicles-filters";
import { getAllVehicles } from "@/services/vehicles";
import userStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { Edit, PlusCircle } from "lucide-react";

export default function Veiculos() {
  const { data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getAllVehicles(userStore.getState().token),
  });

  return (
    <>
      <Header />
      <div className="h-full">
        <div className="p-6 max-w-6xl mx-auto space-y-4">
          <h1 className="text-3xl font-bold">Veículos</h1>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <VehiclesFilter />

              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Novo Veículo
                  </Button>
                </DialogTrigger>

                <CreateVehicleDialog />
              </Dialog>
            </div>
            <Table className="border rounded-lg p-2">
              <TableHeader>
                <TableHead className="text-slate-900">Marca</TableHead>
                <TableHead className="text-slate-900">Modelo</TableHead>
                <TableHead className="text-slate-900">Tipo</TableHead>
                <TableHead className="text-slate-900">Ano</TableHead>
                <TableHead className="text-slate-900">Ações</TableHead>
              </TableHeader>
              <TableBody>
                {vehicles?.map((vehicle) => {
                  return (
                    <TableRow key={vehicle.id}>
                      <TableCell>{vehicle.model}</TableCell>
                      <TableCell>{vehicle.brand}</TableCell>
                      <TableCell>
                        {vehicle.type === "car" ? "Carro" : "Moto"}
                      </TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button>
                              <Edit />
                            </button>
                          </DialogTrigger>
                          <EditVehicles vehicle={vehicle} />
                        </Dialog>
                        <DeleteVehicles vehicle={vehicle} />
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
