import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import userStore from "@/store/userStore";
import { queryClient } from "@/lib/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { filterVehicle } from "@/services/vehicles";

const vehiclesFiltersSchema = z.object({
  search: z.string().max(255),
});

type VehiclesFiltersSchema = z.infer<typeof vehiclesFiltersSchema>;

export default function VehiclesFilter() {
  const { mutateAsync } = useMutation({
    mutationFn: (search: string) =>
      filterVehicle(userStore.getState().token, search),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["vehicles"], data);
    },
  });

  const { register, handleSubmit } = useForm<VehiclesFiltersSchema>({
    resolver: zodResolver(vehiclesFiltersSchema),
  });

  const handleFilterProducts = async (data: any) => {
    if (!data.search)
      return queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    await mutateAsync(data.search);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFilterProducts)}
      className="flex items-center gap-2"
    >
      <Input type="text" placeholder="Pesquisar" {...register("search")} />
      <Button type="submit" variant="secondary">
        <Search className="w-4 h-4 mr-2" />
        Filtrar Resultados
      </Button>
    </form>
  );
}
