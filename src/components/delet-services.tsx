import { XCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import userStore from "@/store/userStore";
import { toast } from "sonner";
import { deleteService } from "@/services/services";

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

export default function DeleteServices({ service }: { service: Service }) {
  const { mutateAsync } = useMutation({
    mutationFn: (id: string) => deleteService(userStore.getState().token, id),
    onSuccess: () => {
      toast.success("Serviço excluído com sucesso");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Erro ao excluir serviço");
    },
  });

  const handleDelete = (id: string) => {
    mutateAsync(id);
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
              <span>Nome: {service.name}</span>
              <span>Descrição: {service.description}</span>
              <span>
                Valor:{" "}
                {service.value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span>
                Tipo de Veículo:{" "}
                {service.vehicles.type === "car" ? "Carro" : "Moto"}
              </span>
              <span>Marca do Veículo: {service.vehicles.brand}</span>
              <span>Modelo do Veículo: {service.vehicles.model}</span>
              <span>Ano do Veículo: {service.vehicles.year}</span>
              <span>Nome do Cliente: {service.customers.name}</span>
              <span>CPF do Cliente: {service.customers.cpf}</span>
              <span>Telefone do Cliente: {service.customers.cellphone}</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => handleDelete(service.id as string)}
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
