import { useForm } from "react-hook-form";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { z } from "zod";
import { editVehicle, Vehicle } from "@/services/vehicles";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import userStore from "@/store/userStore";
import { queryClient } from "@/lib/react-query";
import { toast } from "sonner";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import yearOptions from "@/json/year.json";

const editVehicleSchema = z.object({
  type: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.string().max(4),
});

type EditVehicleSchema = z.infer<typeof editVehicleSchema>;

export default function EditVehicles({ vehicle }: { vehicle: Vehicle }) {
  const { register, handleSubmit, formState, setValue } =
    useForm<EditVehicleSchema>({
      resolver: zodResolver(editVehicleSchema),
      defaultValues: {
        type: vehicle.type,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year.toString(),
      },
    });

  const { mutateAsync } = useMutation({
    mutationFn: (vehicle: Vehicle) =>
      editVehicle(vehicle, userStore.getState().token),
    onSuccess() {
      toast.success("Veículo editado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError() {
      toast.error("Erro ao editar veículo");
    },
  });

  const handleEdit = async (data: EditVehicleSchema) => {
    await mutateAsync({
      ...data,
      id: vehicle.id,
      year: vehicle.year,
    });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Veículo</DialogTitle>
        <DialogDescription>Edite os campos desejados</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleEdit)} className="space-y-6">
        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="tipo">Tipo de Veículo</Label>
          <Select
            defaultValue={vehicle.type}
            onValueChange={(value: string) => {
              setValue("type", value);
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moto">Moto</SelectItem>
              <SelectItem value="car">Carro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="brand" className="text-right">
            Marca
          </Label>
          <Input
            type="text"
            id="brand"
            {...register("brand")}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="model" className="text-right">
            Modelo
          </Label>
          <Input
            type="text"
            id="model"
            {...register("model")}
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="year" className="text-right">
            Ano
          </Label>

          <Select
            defaultValue={vehicle.year.toString()}
            onValueChange={(value: string) => {
              setValue("year", value);
            }}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.years.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
