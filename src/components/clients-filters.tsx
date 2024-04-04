import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { filterClient } from "@/services/clients";
import userStore from "@/store/userStore";
import { queryClient } from "@/lib/react-query";

const clientsFiltersSchema = z.object({
  search: z.string().max(255),
});

type ClientsFiltersSchema = z.infer<typeof clientsFiltersSchema>;

export function ClientsFilters() {
  const { mutateAsync } = useMutation({
    mutationFn: (search: string) =>
      filterClient(userStore.getState().token, search),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData(["clients"], data);
    },
  });

  const { register, handleSubmit } = useForm<ClientsFiltersSchema>({
    resolver: zodResolver(clientsFiltersSchema),
  });

  async function handleFilterProducts(data: ClientsFiltersSchema) {
    if (!data.search)
      return queryClient.invalidateQueries({ queryKey: ["clients"] });
    await mutateAsync(data.search);
  }

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
