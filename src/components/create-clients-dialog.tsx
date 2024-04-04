import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { toast } from "sonner";

import { Input } from "./ui/input";
import { Label } from "./ui/label";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { createClient } from "@/services/clients";
import userStore from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { formatCpfCnpj } from "@/utils/formatCpfCnpj";
import { type } from "os";
import { formatCelular } from "@/utils/formatCelular";

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

export default function CreateClientsDialog() {
  const { register, handleSubmit, formState } = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
  });

  const { mutateAsync: createClientMutation } = useMutation({
    mutationFn: (data: CreateClientSchema) =>
      createClient(userStore.getState().token, data),
    onSuccess: () => {
      toast.success("Cliente criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: () => {
      toast.error("Cpf ou telefone já cadastrado");
    },
  });

  const handleSubmitCreate = async (data: CreateClientSchema) => {
    await createClientMutation(data);
  };

  const { errors } = formState;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Cliente</DialogTitle>
        <DialogDescription>Criar um novo cliente no sistema</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleSubmitCreate)} className="space-y-6">
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
            className="col-span-3"
            maxLength={15}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="default">
            Salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
