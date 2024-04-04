import Header from "@/components/Header";
import userStore from "@/store/userStore";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllServices } from "@/services/services";
import { useQuery } from "@tanstack/react-query";
import ChartPie from "@/components/charts/charts-pie";

export default function index() {
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices(userStore.getState().token),
  });

  const total = services?.reduce((acc, service) => acc + service.value, 0);

  const serviceCount = services?.length ?? 0;

  return (
    <>
      <Header />
      <div className="grid content-center items-center m-3 gap-3">
        <h2 className="text-zinc-700 ml-5 text-2xl">
          Seja Bem Vindo, {userStore.getState().name}!
        </h2>

        <div className="m-3 grid grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Dinheiro que entrou</CardTitle>
              <CardDescription>Soma de todos os serviços</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-green-600">
                {total?.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Serviços feitos</CardTitle>
              <CardDescription>Soma todos os serviços feitos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl text-green-600">{serviceCount}</p>
            </CardContent>
          </Card>
        </div>

        <div className="m-3 grid grid-cols-4 gap-6">
          <ChartPie />
        </div>
      </div>
    </>
  );
}
