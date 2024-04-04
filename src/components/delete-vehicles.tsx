import { deleteVehicle, Vehicle } from "@/services/vehicles";
import { XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialogDescription } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import userStore from "@/store/userStore";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

export default function DeleteVehicles({ vehicle }: { vehicle: Vehicle }) {
  const deleteVehicleMutation = useMutation({
    mutationFn: (id: string) => deleteVehicle(userStore.getState().token, id),
    onSuccess: () => {
      toast.success("Veículo excluído com sucesso");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: () => {
      toast.error("Erro ao excluir veículo");
    },
  });

  const handleDelete = (id: string) => {
    deleteVehicleMutation.mutate(id);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>
          <XCircle />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="flex flex-col">
              <span>Marca: {vehicle.brand}</span>
              <span>Modelo: {vehicle.model}</span>
              <span>Tipo: {vehicle.type === "car" ? "Carro" : "Moto"}</span>
              <span>Ano: {vehicle.year}</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => handleDelete(vehicle.id as string)}
            variant="outline"
          >
            Excluir
          </Button>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
