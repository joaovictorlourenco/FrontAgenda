import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { filterService } from "@/services/services";
import userStore from "@/store/userStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { queryClient } from "@/lib/react-query";

const servicesFiltersSchema = z.object({
  search: z.string().max(255),
});

type ServicesFiltersSchema = z.infer<typeof servicesFiltersSchema>;

export default function ServicesFilter() {
  const { mutateAsync } = useMutation({
    mutationFn: (search: string) =>
      filterService(userStore.getState().token, search),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["services"], data);
    },
  });

  const { register, handleSubmit } = useForm<ServicesFiltersSchema>({
    resolver: zodResolver(servicesFiltersSchema),
  });

  const handleFilterServices = async (data: any) => {
    if (!data.search)
      return queryClient.invalidateQueries({ queryKey: ["services"] });
    await mutateAsync(data.search);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFilterServices)}
      className="flex items-center gap-2"
    >
      <Input type="text" {...register("search")} placeholder="Pesquisar" />
      <Button type="submit" variant="secondary">
        <Search className="w-4 h-4 mr-2" />
        Filtrar Resultados
      </Button>
    </form>
  );
}
