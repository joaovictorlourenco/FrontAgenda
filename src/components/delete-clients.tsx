import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { XCircle } from "lucide-react";
import { AlertDialogHeader, AlertDialogFooter } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { queryClient } from "@/lib/react-query";
import { deleteClient } from "@/services/clients";
import userStore from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface Client {
  id?: string;
  name: string;
  cpf: string;
  cellphone: string;
}

export function DeleteClients({ client }: { client: Client }) {
  const deleteClientMutation = useMutation({
    mutationFn: (id: string) => deleteClient(userStore.getState().token, id),
    onSuccess: () => {
      toast.success("Cliente excluído com sucesso");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: () => {
      toast.error("Erro ao excluir cliente");
    },
  });

  const handleDelete = (id: string) => {
    deleteClientMutation.mutate(id);
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
              <span>Nome: {client.name.split(" ")[0]}</span>
              <span>Cpf: {client.cpf}</span>
              <span>Telefone: {client.cellphone}</span>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            onClick={() => handleDelete(client.id as string)}
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
