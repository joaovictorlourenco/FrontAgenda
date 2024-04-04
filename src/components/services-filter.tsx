import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

const servicesFiltersSchema = z.object({
  search: z.string().max(255),
});

type ServicesFiltersSchema = z.infer<typeof servicesFiltersSchema>;

export default function ServicesFilter() {
  const { MutateAsync } = useMutation({
    mutationFn: (search: string) =>
      filterService(userStore.getState().token, search),
  });

  return (
    <form className="flex items-center gap-2">
      <Input type="text" placeholder="Pesquisar" />
      <Button type="submit" variant="secondary">
        <Search className="w-4 h-4 mr-2" />
        Filtrar Resultados
      </Button>
    </form>
  );
}
