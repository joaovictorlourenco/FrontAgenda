import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient } from "@/lib/react-query";
import userStore from "@/store/userStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createService } from "@/services/services";
import { getAllClients } from "@/services/clients";
import { getAllVehicles } from "@/services/vehicles";

const createServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  value: z.string(),
  customerId: z.string(),
  vehiclesId: z.string(),
});

type CreateServiceSchema = z.infer<typeof createServiceSchema>;

export default function CreateService() {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getAllClients(userStore.getState().token),
  });

  const { data: vehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: () => getAllVehicles(userStore.getState().token),
  });

  const { register, handleSubmit, formState, setValue } =
    useForm<CreateServiceSchema>({
      resolver: zodResolver(createServiceSchema),
    });

  const { mutateAsync: createServiceMutation } = useMutation({
    mutationFn: (data: CreateServiceSchema) =>
      createService(userStore.getState().token, {
        ...data,
        value: parseFloat(data.value),
      }),
    onSuccess: () => {
      toast.success("Serviço criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Erro ao criar serviço");
    },
  });

  const handleSubmitCreate = async (data: CreateServiceSchema) => {
    await createServiceMutation(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Criar um novo serviço no sistema</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleSubmitCreate)} className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            type="text"
            className="col-span-3"
            id="name"
            {...register("name")}
          />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea
            {...register("description")}
            className="col-span-3"
            id="description"
          />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="value">Valor</Label>
          <Input
            {...register("value")}
            type="string"
            className="col-span-3"
            id="value"
          />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="Cliente">Cliente</Label>
          <Select
            onValueChange={(value: string) => {
              setValue("customerId", value);
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {clients?.map((client) => (
                <SelectItem key={client.id} value={client.id || ""}>
                  {client.name} | {client.cpf}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="vehicle">Veículo</Label>
          <Select
            onValueChange={(value: string) => {
              setValue("vehiclesId", value);
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {vehicles?.map((vehicle) => (
                <SelectItem key={vehicle.id} value={vehicle.id || ""}>
                  {vehicle.brand} | {vehicle.model} | {vehicle.year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
  );
}
