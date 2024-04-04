import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation } from "@tanstack/react-query";
import userStore from "@/store/userStore";
import { queryClient } from "@/lib/react-query";
import { createVehicle } from "@/services/vehicles";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import yearOptions from "@/json/year.json";

const createVehicleSchema = z.object({
  type: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.string().max(4),
});

type CreateVehicleSchema = z.infer<typeof createVehicleSchema>;

export default function CreateVehicleDialog() {
  const { register, handleSubmit, formState, setValue } =
    useForm<CreateVehicleSchema>({
      resolver: zodResolver(createVehicleSchema),
    });

  const { mutateAsync: createVehicleMutation } = useMutation({
    mutationFn: (data: CreateVehicleSchema) =>
      createVehicle(userStore.getState().token, {
        ...data,
        year: parseInt(data.year),
      }),
    onSuccess: () => {
      toast.success("Veículo criado com sucesso");
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
    onError: () => {
      toast.error("Erro ao criar veículo");
    },
  });

  const handleSubmitCreate = async (data: CreateVehicleSchema) => {
    await createVehicleMutation(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Veículo</DialogTitle>
        <DialogDescription>Criar um novo veículo no sistema</DialogDescription>
      </DialogHeader>
      <form className="space-y-6" onSubmit={handleSubmit(handleSubmitCreate)}>
        <div className="grid grid-cols-4 items-center text-right gap-2">
          <Label htmlFor="tipo">Tipo de Veículo</Label>
          <Select
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
