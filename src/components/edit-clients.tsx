import { Client } from "./delete-clients";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import userStore from "@/store/userStore";
import { toast } from "sonner";
import { editClient } from "@/services/clients";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogFooter, DialogHeader } from "./ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { formatCelular } from "@/utils/formatCelular";
import { formatCpfCnpj } from "@/utils/formatCpfCnpj";

const createClientSchema = z.object({
  name: z.string().max(255),
  cpf: z
    .string()
    .max(14)
    .refine((cpf) => cpf.length === 14, {
      message: "CPF deve ter 14 dígitos",
    }),
  cellphone: z
    .string()
    .max(15)
    .refine((cellphone) => cellphone.length === 15, {
      message: "Telefone deve ter 15 dígitos",
    }),
});

type CreateClientSchema = z.infer<typeof createClientSchema>;

export function EditClient({ client }: { client: Client }) {
  const { register, handleSubmit, formState } = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: client.name,
      cpf: client.cpf,
      cellphone: client.cellphone,
    },
  });
  const { errors } = formState;

  const { mutateAsync } = useMutation({
    mutationFn: (client: Client) =>
      editClient(client, userStore.getState().token),
    onSuccess: () => {
      toast.success("Cliente editado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: () => {
      toast.error("Cpf ou telefone já cadastrado");
    },
  });

  const handleEdit = async (data: CreateClientSchema) => {
    await mutateAsync({ ...data, id: client.id });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogDescription>Edite os dados do cliente</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleEdit)} className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input {...register("name")} type="text" className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="cpf" className="text-right">
            CPF
          </Label>
          <Input
            {...register("cpf")}
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              e.target.value = formatCpfCnpj(value);
            }}
            maxLength={14}
            className="col-span-3"
          />
          {errors.cpf && (
            <span className="text-red-500 text-sm col-span-4">
              {errors.cpf.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="cellphone" className="text-right">
            Telefone
          </Label>
          <Input
            {...register("cellphone")}
            type="text"
            onChange={(e) => {
              const { value } = e.target;
              e.target.value = formatCelular(value);
            }}
            maxLength={15}
            className="col-span-3"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="default">
            Editar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
