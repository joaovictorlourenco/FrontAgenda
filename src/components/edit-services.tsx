import { useMutation, useQuery } from "@tanstack/react-query";
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
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import userStore from "@/store/userStore";
import { getAllClients } from "@/services/clients";
import { getAllVehicles } from "@/services/vehicles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { editService } from "@/services/services";

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
const createServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  value: z.string(),
  customerId: z.string(),
  vehiclesId: z.string(),
});

type CreateServiceSchema = z.infer<typeof createServiceSchema>;

export default function EditServices({ service }: { service: Service }) {
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
      defaultValues: {
        name: service.name,
        description: service.description,
        value: service.value.toString(),
        customerId: service.customers.id,
        vehiclesId: service.vehicles.id,
      },
    });

  const { mutateAsync } = useMutation({
    mutationFn: (data: CreateServiceSchema) =>
      editService(
        userStore.getState().token,
        { ...data, value: parseFloat(data.value) },
        service.id
      ),
    onSuccess: (data, variable, context) => {
      console.log(data, variable, context);
      toast.success("Serviço editado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Erro ao editar serviço");
    },
  });

  const handleSubmitEdit = async (data: CreateServiceSchema) => {
    await mutateAsync(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Cliente</DialogTitle>
        <DialogDescription>Edite os dados do serviço</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleSubmitEdit)} className="space-y-6">
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
            defaultValue={service.customerId}
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
            defaultValue={service.vehiclesId}
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
